import { redirect } from "next/navigation";
import {
  criticalLeadToCard,
  getMyDashboard,
} from "@/lib/data/dashboard";
import { DEMO_EMAIL, DEMO_SALES_DATA } from "@/lib/data/demo";
import {
  SalesClient,
  type AgentSalesData,
  type AttentionMetric,
  type SalesData,
  type TeamLeaderSalesData,
} from "./sales-client";

export default async function SalesPage() {
  const dashboard = await getMyDashboard();
  if (!dashboard) redirect("/login");

  if (dashboard.user.email === DEMO_EMAIL) {
    return <SalesClient data={DEMO_SALES_DATA} />;
  }

  const { agentData } = dashboard;
  const isEmpty = !agentData;
  const leads = agentData?.critical_leads ?? [];

  const needsFollowUp = leads.filter((l) => (l.days_no_contact ?? 0) > 1).length;
  const stalled = leads.filter((l) => (l.days_no_contact ?? 0) > 5).length;
  const closingsAtRisk = leads.filter(
    (l) =>
      (l.status?.toLowerCase().includes("contract") ||
        l.status?.toLowerCase().includes("closing")) &&
      (l.days_no_contact ?? 0) > 2
  ).length;

  const todaysAttention: AttentionMetric[] = isEmpty
    ? []
    : [
        {
          id: "att-1",
          label: "Leads need follow-up",
          value: `${needsFollowUp}`,
          tone: needsFollowUp > 0 ? "warning" : "neutral",
        },
        {
          id: "att-2",
          label: "Stalled negotiations",
          value: `${stalled}`,
          tone: stalled > 0 ? "warning" : "neutral",
        },
        {
          id: "att-3",
          label: "Closings at risk",
          value: `${closingsAtRisk}`,
          tone: closingsAtRisk > 0 ? "critical" : "neutral",
        },
      ];

  const dealsNeedingAction = leads
    .filter((l) => (l.days_no_contact ?? 0) > 2)
    .slice(0, 6)
    .map(criticalLeadToCard);

  const topDealsToWatch = [...leads]
    .sort((a, b) => (b.value_usd ?? 0) - (a.value_usd ?? 0))
    .slice(0, 3)
    .map(criticalLeadToCard);

  const teamLeaderData: TeamLeaderSalesData = {
    todaysAttention,
    dealsNeedingAction,
    pulsorInsight: agentData?.weekly_insight ?? null,
    topDealsToWatch,
    thisWeek: [],
    teamOverview: [],
    isEmpty,
  };

  const agentDataShape: AgentSalesData = {
    hotLeadsCount: 0,
    hotLeadsNote: "Waiting response",
    followUpsDueCount: needsFollowUp,
    followUpsDueNote: "Overdue or high priority",
    dealsAtRiskCount: stalled,
    dealsAtRiskNote: "Missing next step",
    priorityActions: leads.map(criticalLeadToCard),
    pulsorSuggestion: agentData?.weekly_insight ?? null,
    myPipeline: [],
    momentum: [],
    isEmpty,
  };

  const data: SalesData = {
    teamLeader: teamLeaderData,
    agent: agentDataShape,
  };

  return <SalesClient data={data} />;
}
