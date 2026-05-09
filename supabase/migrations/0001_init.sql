-- =============================================================
-- Pulsor — initial schema (Phase 1)
-- Tables, indices, triggers, RLS policies.
-- Idempotent: safe to re-run during dev.
-- =============================================================

-- ─── Enums ─────────────────────────────────────────────────────
do $$ begin
  create type public.user_role as enum ('admin', 'team_leader', 'agent');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.icp_type as enum (
    'team_leader',
    'top_producer_solo',
    'broker_boutique'
  );
exception when duplicate_object then null; end $$;

-- ─── companies ─────────────────────────────────────────────────
create table if not exists public.companies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  icp_type    public.icp_type not null default 'team_leader',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── users (profiles, 1:1 with auth.users) ─────────────────────
create table if not exists public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  role        public.user_role not null default 'agent',
  company_id  uuid references public.companies(id) on delete set null,
  -- For solo agents (no company), keep their icp here. For users in a
  -- company, this stays null and we read companies.icp_type instead.
  icp_type    public.icp_type,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists users_company_id_idx on public.users(company_id);
create index if not exists users_role_idx on public.users(role);

-- ─── agent_data (weekly snapshot per user, loaded by admin) ────
create table if not exists public.agent_data (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references public.users(id) on delete cascade,
  week_iso          text not null,                              -- "2026-W18"

  -- Aggregate metrics
  leads_total       int not null default 0,
  pipeline_value    numeric(14,2) not null default 0,
  conversion_rate   numeric(5,2)  not null default 0,           -- percentage 0–100
  lead_leak_rate    numeric(5,2)  not null default 0,
  money_on_table    numeric(14,2) not null default 0,

  -- Free-text contextual fields
  weekly_insight    text,
  this_week_goal    text,
  last_week_wins    text,

  -- Critical leads as a json array. Shape per element:
  --   { id, name, value_usd, days_no_contact, agent_assigned_id?, status }
  critical_leads    jsonb not null default '[]'::jsonb,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  unique (user_id, week_iso)
);

create index if not exists agent_data_user_id_idx  on public.agent_data(user_id);
create index if not exists agent_data_week_iso_idx on public.agent_data(week_iso);

-- ─── team_data (weekly aggregate per company) ──────────────────
create table if not exists public.team_data (
  id                    uuid primary key default gen_random_uuid(),
  company_id            uuid not null references public.companies(id) on delete cascade,
  week_iso              text not null,

  team_pipeline_value   numeric(14,2) not null default 0,
  top_performer_id      uuid references public.users(id) on delete set null,
  bottom_performer_id   uuid references public.users(id) on delete set null,
  insights              jsonb not null default '[]'::jsonb,

  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  unique (company_id, week_iso)
);

create index if not exists team_data_company_id_idx on public.team_data(company_id);

-- ─── updated_at auto-touch ─────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at_companies  on public.companies;
drop trigger if exists set_updated_at_users      on public.users;
drop trigger if exists set_updated_at_agent_data on public.agent_data;
drop trigger if exists set_updated_at_team_data  on public.team_data;

create trigger set_updated_at_companies  before update on public.companies   for each row execute function public.set_updated_at();
create trigger set_updated_at_users      before update on public.users       for each row execute function public.set_updated_at();
create trigger set_updated_at_agent_data before update on public.agent_data  for each row execute function public.set_updated_at();
create trigger set_updated_at_team_data  before update on public.team_data   for each row execute function public.set_updated_at();

-- ─── auto-create profile when auth user is inserted ───────────
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, role)
  values (new.id, new.email, 'agent')   -- default role; admin promotes later
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- =============================================================
-- RLS policies
-- =============================================================

alter table public.companies  enable row level security;
alter table public.users      enable row level security;
alter table public.agent_data enable row level security;
alter table public.team_data  enable row level security;

-- ─── helpers (security definer to bypass RLS, no recursion) ───
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.users where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.users where id = auth.uid();
$$;

create or replace function public.current_user_company_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select company_id from public.users where id = auth.uid();
$$;

-- ─── companies policies ───────────────────────────────────────
drop policy if exists "companies admin all"     on public.companies;
drop policy if exists "companies members read"  on public.companies;

create policy "companies admin all"
  on public.companies for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "companies members read"
  on public.companies for select
  using (id = public.current_user_company_id());

-- ─── users policies ───────────────────────────────────────────
drop policy if exists "users admin all"               on public.users;
drop policy if exists "users self read"               on public.users;
drop policy if exists "users self update"             on public.users;
drop policy if exists "users team_leader read team"   on public.users;

create policy "users admin all"
  on public.users for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "users self read"
  on public.users for select
  using (id = auth.uid());

-- Users can update their own row but only safe fields. We restrict via
-- column grants below (revoke role/company_id/icp_type from authenticated).
create policy "users self update"
  on public.users for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "users team_leader read team"
  on public.users for select
  using (
    public.current_user_role() = 'team_leader'
    and company_id is not null
    and company_id = public.current_user_company_id()
  );

-- Lock down sensitive columns from regular users (only admin can mutate role / company / icp).
revoke update (role, company_id, icp_type) on public.users from authenticated;

-- ─── agent_data policies ──────────────────────────────────────
drop policy if exists "agent_data admin all"             on public.agent_data;
drop policy if exists "agent_data self read"             on public.agent_data;
drop policy if exists "agent_data team_leader read team" on public.agent_data;

create policy "agent_data admin all"
  on public.agent_data for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "agent_data self read"
  on public.agent_data for select
  using (user_id = auth.uid());

create policy "agent_data team_leader read team"
  on public.agent_data for select
  using (
    public.current_user_role() = 'team_leader'
    and exists (
      select 1 from public.users u
      where u.id = agent_data.user_id
        and u.company_id is not null
        and u.company_id = public.current_user_company_id()
    )
  );

-- ─── team_data policies ───────────────────────────────────────
drop policy if exists "team_data admin all"        on public.team_data;
drop policy if exists "team_data members read"     on public.team_data;

create policy "team_data admin all"
  on public.team_data for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "team_data members read"
  on public.team_data for select
  using (company_id = public.current_user_company_id());
