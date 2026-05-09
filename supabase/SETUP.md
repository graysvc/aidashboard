# Pulsor — Supabase setup

Quick guide to apply the migration and seed the first admin.

## 1. Apply the schema

1. Open **Supabase Dashboard → SQL Editor → New query**
2. Paste the entire contents of `migrations/0001_init.sql`
3. Click **Run**
4. Verify tables: **Database → Tables** should show `companies`, `users`, `agent_data`, `team_data`

## 2. Create the first admin user

There is no public signup. You create users by hand.

1. **Authentication → Users → Add user → Create new user**
2. Email: `guido@grays.vc` (or whatever you want)
3. Password: pick a strong one
4. Auto-confirm email: ✅
5. Click **Create user**

The trigger `on_auth_user_created` will automatically insert a row in
`public.users` with `role = 'agent'`. Now promote yourself to admin:

```sql
update public.users
set role = 'admin', full_name = 'Guido — Admin'
where email = 'guido@grays.vc';
```

(Run that in SQL Editor.)

## 3. Verify RLS

Quick sanity check while logged in as your admin user (browser → app):

```sql
select public.is_admin();          -- should return true
select public.current_user_role(); -- should return 'admin'
```

## 4. Env vars (Phase 2)

Copy `.env.example` to `.env.local` and fill:

```
NEXT_PUBLIC_SUPABASE_URL=https://pevbwnevoafwmqamxebj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...   # server-only
```

Then add the same three to **Vercel → Project → Settings → Environment Variables**
(scope: Production + Preview). Mark `SUPABASE_SERVICE_ROLE_KEY` as **encrypted**.

## Reset / wipe

If you mess up during dev and want to start over:

```sql
drop table if exists public.team_data  cascade;
drop table if exists public.agent_data cascade;
drop table if exists public.users      cascade;
drop table if exists public.companies  cascade;
drop type  if exists public.user_role  cascade;
drop type  if exists public.icp_type   cascade;
```

Then re-run `0001_init.sql`.
