import { redirect } from "next/navigation";
import { getMyDashboard } from "@/lib/data/dashboard";
import { getCompanyMarketing } from "@/lib/data/company-content";
import { DEMO_EMAIL, DEMO_MARKETING_DATA } from "@/lib/data/demo";
import {
  MarketingClient,
  type AgentMarketingData,
  type LeadSourceRow,
  type MarketingData,
  type TeamLeaderMarketingData,
} from "./marketing-client";

export default async function MarketingPage() {
  const dashboard = await getMyDashboard();
  if (!dashboard) redirect("/login");

  if (dashboard.user.email === DEMO_EMAIL) {
    return <MarketingClient data={DEMO_MARKETING_DATA} />;
  }

  const m = dashboard.user.company_id
    ? await getCompanyMarketing(dashboard.user.company_id)
    : null;

  const channels = m?.channels ?? [];
  const isEmpty = !m || channels.length === 0;

  const sorted = [...channels].sort((a, b) => b.count - a.count);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  const leadSources: LeadSourceRow[] = channels.map((c, i) => ({
    id: `src-${i}`,
    name: c.name,
    signal: c.outlier
      ? `High CPL · weak signal · ${c.count} leads`
      : `${c.count} leads · $${c.cpl}/lead`,
    tone: c.outlier ? "critical" : i === 0 ? "success" : "neutral",
  }));

  const totalLeads = channels.reduce((acc, c) => acc + c.count, 0);

  const teamLeaderData: TeamLeaderMarketingData = {
    highIntentCount: totalLeads,
    highIntentNote: "Total leads this period",
    highIntentTrend: null,
    strongestSourceName: strongest?.name ?? "—",
    strongestSourceNote: strongest
      ? `${strongest.count} leads · highest volume`
      : "No data yet",
    strongestSourceTrend: null,
    weakestSourceName: weakest?.name ?? "—",
    weakestSourceNote: weakest
      ? weakest.outlier
        ? "High cost · low response"
        : `${weakest.count} leads · lowest volume`
      : "No data yet",
    weakestSourceTrend: null,
    leadSources,
    activeCampaigns: [],
    pulsorInsights: m?.insights ?? [],
    suggestedFocus: null,
    isEmpty,
  };

  const agentData: AgentMarketingData = {
    bestSourceName: strongest?.name ?? "—",
    bestSourceNote: strongest ? "Highest volume source" : "No data yet",
    fastestSourceName: "—",
    fastestSourceNote: "Personal channel data coming soon",
    buyersWaitingCount: 0,
    buyersWaitingNote: "High intent, no reply yet",
    whatsWorking: leadSources,
    pulsorSuggestion: m?.insights?.[0]?.summary ?? null,
    followUpPriority: [],
    isEmpty,
  };

  const data: MarketingData = {
    teamLeader: teamLeaderData,
    agent: agentData,
  };

  return <MarketingClient data={data} />;
}
