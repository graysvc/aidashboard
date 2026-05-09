import { createClient } from "@/lib/supabase/server";
import type { AgentData, CriticalLead } from "@/lib/data/types";

export async function getAgentData(
  userId: string,
  weekIso: string
): Promise<AgentData | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("agent_data")
    .select("*")
    .eq("user_id", userId)
    .eq("week_iso", weekIso)
    .maybeSingle();
  if (error) throw error;
  return data as AgentData | null;
}

export async function listAgentDataWeeks(
  userId: string
): Promise<{ week_iso: string }[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("agent_data")
    .select("week_iso")
    .eq("user_id", userId)
    .order("week_iso", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function upsertAgentData(input: {
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
}): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("agent_data")
    .upsert(input, { onConflict: "user_id,week_iso" });
  if (error) throw error;
}

export async function deleteAgentData(
  userId: string,
  weekIso: string
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("agent_data")
    .delete()
    .eq("user_id", userId)
    .eq("week_iso", weekIso);
  if (error) throw error;
}
