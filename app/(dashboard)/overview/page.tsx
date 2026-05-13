import { redirect } from "next/navigation";
import {
  criticalLeadToCard,
  formatCompactCurrency,
  getMyDashboard,
} from "@/lib/data/dashboard";
import { DEMO_EMAIL, DEMO_HOME_DATA } from "@/lib/data/demo";
import {
  HomeClient,
  type AgentHomeData,
  type HomeData,
  type HomeTeamMember,
  type TeamLeaderHomeData,
} from "./home-client";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export default async function HomePage() {
  const dashboard = await getMyDashboard();
  if (!dashboard) redirect("/login");

  // Demo account: render rich hardcoded snapshot, ignore DB.
  if (dashboard.user.email === DEMO_EMAIL) {
    return <HomeClient data={DEMO_HOME_DATA} />;
  }

  const { user, agentData, team } = dashboard;
  const firstName = (user.full_name?.split(" ")[0] || user.email).trim();
  const isEmpty = !agentData;
  const criticalLeads = agentData?.critical_leads ?? [];

  // ─── Team Leader shape ───────────────────────────────────────
  const leadsAtRiskCount = criticalLeads.filter(
    (l) => (l.days_no_contact ?? 0) > 2
  ).length;

  const pipelineAtRiskUsd = criticalLeads
    .filter((l) => (l.days_no_contact ?? 0) >= 3)
    .reduce((sum, l) => sum + (l.value_usd ?? 0), 0);

  const teamForClient: HomeTeamMember[] | null =
    user.role === "team_leader"
      ? team.map((m): HomeTeamMember => ({
          id: m.id,
          fullName: m.full_name,
          initials: initials(m.full_name).toUpperCase(),
          primaryLine: m.has_data
            ? `${formatCompactCurrency(m.pipeline_value)} pipeline`
            : "No data yet",
          secondaryLine: m.has_data
            ? `${m.leads_total} ${m.leads_total === 1 ? "lead" : "leads"} this week`
            : "Pending",
          tone: m.has_data ? "neutral" : "neutral",
        }))
      : null;

  const teamLeaderData: TeamLeaderHomeData = {
    firstName,
    pipelineAtRisk:
      pipelineAtRiskUsd > 0 ? formatCompactCurrency(pipelineAtRiskUsd) : "—",
    pipelineAtRiskNote: "No response in 72h+",
    leadsAtRiskCount,
    leadsAtRiskNote: "No contact > 48h",
    teamHealthScore: null,
    teamHealthNote: "Composite score",
    operationalLeaks: criticalLeads.map(criticalLeadToCard),
    workflowBottlenecks: [],
    team: teamForClient,
    weeklyInsight: agentData?.weekly_insight ?? null,
    thisWeekGoal: agentData?.this_week_goal ?? null,
    lastWeekWins: agentData?.last_week_wins ?? null,
    isEmpty,
  };

  // ─── Agent shape ─────────────────────────────────────────────
  // For real users the admin doesn't yet capture agent-specific action items,
  // so we degrade gracefully: today's actions come from the same critical_leads
  // signal, and the remaining sections show empty states.
  const dealsAtRiskCount = leadsAtRiskCount;
  const agentData2: AgentHomeData = {
    firstName,
    todayPrioritiesCount: criticalLeads.length,
    hotLeadsCount: 0,
    dealsAtRiskCount,
    todaysActions: criticalLeads.map(criticalLeadToCard),
    recommendedFocus: null,
    performanceSignals: [],
    pipeline: [],
    isEmpty,
  };

  const data: HomeData = {
    teamLeader: teamLeaderData,
    agent: agentData2,
  };

  return <HomeClient data={data} />;
}
