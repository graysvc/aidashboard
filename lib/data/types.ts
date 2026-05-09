/** Domain types matching the Supabase schema (0001_init.sql). */

export type UserRole = "admin" | "team_leader" | "agent";

export type IcpType = "team_leader" | "top_producer_solo" | "broker_boutique";

export type Company = {
  id: string;
  name: string;
  icp_type: IcpType;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  company_id: string | null;
  icp_type: IcpType | null;
  created_at: string;
  updated_at: string;
};

export type CriticalLead = {
  id: string;
  name: string;
  value_usd: number;
  days_no_contact: number;
  agent_assigned_id?: string | null;
  status?: string;
};

export type AgentData = {
  id: string;
  user_id: string;
  week_iso: string;
  leads_total: number;
  pipeline_value: number;
  conversion_rate: number;
  lead_leak_rate: number;
  money_on_table: number;
  weekly_insight: string | null;
  this_week_goal: string | null;
  last_week_wins: string | null;
  critical_leads: CriticalLead[];
  created_at: string;
  updated_at: string;
};

/** Returns the current ISO week string ("2026-W18"). */
export function currentWeekIso(d = new Date()): string {
  // ISO week: weeks start Monday; week 1 has Jan 4.
  const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil(
    ((target.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7
  );
  return `${target.getUTCFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}
