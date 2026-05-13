import type {
  AgentHomeData,
  AgentPipelineStage,
  AgentSignal,
  HomeData,
  HomeTeamMember,
  TeamLeaderHomeData,
  WorkflowStage,
} from "@/app/(dashboard)/overview/home-client";
import type {
  AgentSalesData,
  AttentionMetric,
  MomentumRow,
  PipelineSummaryRow,
  SalesData,
  SalesTeamRow,
  TeamLeaderSalesData,
  ThisWeekItem,
} from "@/app/(dashboard)/sales/sales-client";
import type {
  AgentMarketingData,
  CampaignRow,
  LeadSourceRow,
  MarketingData,
  OpportunityRow,
  TeamLeaderMarketingData,
} from "@/app/(dashboard)/marketing/marketing-client";
import type { ActionCardData } from "@/components/dashboard/action-card";

/**
 * Email of the seeded demo account.
 * When this user logs in, Home renders rich hardcoded content instead of
 * reading from `agent_data`. Useful for screenshots, demos, and previews
 * while real customer data is loading.
 */
export const DEMO_EMAIL = "test@test.com";

const demoLeaks: ActionCardData[] = [
  {
    id: "d-1",
    tag: "URGENT",
    amount: "$850K",
    summary: "María Fernández — no response in 72h",
  },
  {
    id: "d-2",
    tag: "WORKFLOW BREAK",
    summary: "3 closings waiting on missing documents",
  },
  {
    id: "d-3",
    tag: "OPPORTUNITY",
    amount: "$4M",
    summary: "Project sale — buyer active, no agent assigned",
  },
  {
    id: "d-4",
    tag: "PATTERN",
    summary: "Bolivia leads close 2.5× faster than average",
  },
  {
    id: "d-5",
    tag: "RECOMMENDATION",
    summary: "Reassign 3 stalled deals from Pedro to Sarah",
  },
  {
    id: "d-6",
    tag: "WARNING",
    summary: "Pedro — 5 leads, 0 contacted this week",
  },
  {
    id: "d-7",
    tag: "WIN",
    amount: "$1.2M",
    summary: "Ana closed Pacific Heights in 12 days",
  },
  {
    id: "d-8",
    tag: "DEADLINE",
    summary: "Month-end in 4 days — 3/5 closed · $1.8M in escrow",
  },
];

const demoBottlenecks: WorkflowStage[] = [
  { id: "wf-1", label: "Lead intake", state: "stable" },
  { id: "wf-2", label: "Assignment", state: "delayed" },
  { id: "wf-3", label: "First response", state: "at-risk" },
  { id: "wf-4", label: "Follow-up", state: "at-risk" },
  { id: "wf-5", label: "Closing coordination", state: "stable" },
];

const demoTeam: HomeTeamMember[] = [
  {
    id: "t-1",
    fullName: "Sarah Mitchell",
    initials: "SM",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    avatarColor: "bg-emerald-500",
    primaryLine: "18m avg response",
    secondaryLine: "0 stalled deals",
    tone: "success",
  },
  {
    id: "t-2",
    fullName: "James Carter",
    initials: "JC",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    avatarColor: "bg-amber-500",
    primaryLine: "9 active deals",
    secondaryLine: "2 need follow-up",
    tone: "warning",
  },
  {
    id: "t-3",
    fullName: "Priya Shah",
    initials: "PS",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    avatarColor: "bg-sky-500",
    primaryLine: "27m avg response",
    secondaryLine: "1 stalled in negotiation",
    tone: "warning",
  },
  {
    id: "t-4",
    fullName: "Marcus Reyes",
    initials: "MR",
    avatarUrl: "https://randomuser.me/api/portraits/men/15.jpg",
    avatarColor: "bg-rose-500",
    primaryLine: "7 deals in progress",
    secondaryLine: "Bolivia segment converting 2.1×",
    tone: "success",
  },
  {
    id: "t-5",
    fullName: "Emma Olsen",
    initials: "EO",
    avatarUrl: "https://randomuser.me/api/portraits/women/79.jpg",
    avatarColor: "bg-teal-500",
    primaryLine: "4 leads idle >48h",
    secondaryLine: "Below team SLA",
    tone: "critical",
  },
  {
    id: "t-6",
    fullName: "Daniel Park",
    initials: "DP",
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    avatarColor: "bg-purple-500",
    primaryLine: "5 deals in progress",
    secondaryLine: "1 closing delayed",
    tone: "warning",
  },
];

const demoAgentActions: ActionCardData[] = [
  {
    id: "a-1",
    tag: "CALL NOW",
    summary: "John Smith — viewed 3 listings, no response yet",
  },
  {
    id: "a-2",
    tag: "FOLLOW UP",
    summary: "Maria Lopez — showing completed, no next step",
  },
  {
    id: "a-3",
    tag: "SEND DOCS",
    summary: "Buyer packet missing proof of funds",
  },
  {
    id: "a-4",
    tag: "RE-ENGAGE",
    summary: "Brazil investor lead — inactive 6 days",
  },
  {
    id: "a-5",
    tag: "CHECK-IN",
    summary: "Inspection findings unanswered 4d",
  },
  {
    id: "a-6",
    tag: "PRIORITY",
    amount: "$1.2M",
    summary: "Buyer active again this morning",
  },
  {
    id: "a-7",
    tag: "REMINDER",
    summary: "Closing deadline in 3 days",
  },
];

const demoAgentSignals: AgentSignal[] = [
  { id: "s-1", label: "Avg response time", value: "42m", tone: "warning" },
  { id: "s-2", label: "Overdue follow-ups", value: "5", tone: "critical" },
  { id: "s-3", label: "Deals moved forward this week", value: "2", tone: "success" },
  { id: "s-4", label: "Brazil buyers converting 2.1× better", tone: "success" },
  { id: "s-5", label: "Leads contacted under 1h perform best", tone: "neutral" },
];

const demoAgentPipeline: AgentPipelineStage[] = [
  { id: "p-1", label: "New leads", count: 8 },
  { id: "p-2", label: "Showing scheduled", count: 4 },
  { id: "p-3", label: "Negotiation", count: 2 },
  { id: "p-4", label: "Under contract", count: 1 },
  { id: "p-5", label: "At risk", count: 2, tone: "critical" },
];

// ─── Sales demo ────────────────────────────────────────────────

const demoSalesAttention: AttentionMetric[] = [
  { id: "att-1", label: "Leads need follow-up", value: "7", tone: "warning" },
  { id: "att-2", label: "Stalled negotiations", value: "3", tone: "warning" },
  { id: "att-3", label: "Closings at risk", value: "2", tone: "critical" },
];

const demoSalesDealsNeedingAction: ActionCardData[] = [
  {
    id: "sd-1",
    tag: "URGENT",
    summary: "Carlos Mendez — no activity · 5d",
  },
  {
    id: "sd-2",
    tag: "WARNING",
    summary: "Familia Rodríguez — negotiation stalled · 12d",
  },
  {
    id: "sd-3",
    tag: "WORKFLOW BREAK",
    summary: "Pareja NY — missing documents · closing at risk",
  },
  {
    id: "sd-4",
    tag: "OPPORTUNITY",
    summary: "Miami investor — high-value buyer · needs owner",
  },
];

const demoSalesTopDeals: ActionCardData[] = [
  {
    id: "td-1",
    tag: "URGENT",
    summary: "Rodríguez Family — negotiation stalled · 12d",
  },
  {
    id: "td-2",
    tag: "WORKFLOW BREAK",
    summary: "Ana Silva — closing this week · docs pending",
  },
  {
    id: "td-3",
    tag: "HOT LEAD",
    summary: "Miami investor — high intent · no follow-up",
  },
];

const demoSalesThisWeek: ThisWeekItem[] = [
  { id: "tw-1", label: "4 leads aging > 48h", tone: "warning" },
  { id: "tw-2", label: "2 stalled contracts", tone: "warning" },
  { id: "tw-3", label: "1 overloaded agent", tone: "critical" },
];

const demoSalesTeamOverview: SalesTeamRow[] = [
  {
    id: "to-1",
    fullName: "Sarah Mitchell",
    initials: "SM",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    avatarColor: "bg-emerald-500",
    primaryLine: "18m avg response",
    secondaryLine: "0 stalled deals",
    tone: "success",
  },
  {
    id: "to-2",
    fullName: "James Carter",
    initials: "JC",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    avatarColor: "bg-amber-500",
    primaryLine: "9 active deals",
    secondaryLine: "2 need follow-up",
    tone: "warning",
  },
  {
    id: "to-3",
    fullName: "Emma Olsen",
    initials: "EO",
    avatarUrl: "https://randomuser.me/api/portraits/women/79.jpg",
    avatarColor: "bg-teal-500",
    primaryLine: "4 leads idle > 48h",
    secondaryLine: "Below team SLA",
    tone: "critical",
  },
];

const demoSalesPriorityActions: ActionCardData[] = [
  {
    id: "pa-1",
    tag: "CALL NOW",
    summary: "John Smith · viewed 3 listings",
  },
  {
    id: "pa-2",
    tag: "FOLLOW UP",
    summary: "Maria Lopez · showing completed",
  },
  {
    id: "pa-3",
    tag: "SEND DOCS",
    summary: "Buyer packet missing proof of funds",
  },
  {
    id: "pa-4",
    tag: "RE-ENGAGE",
    summary: "Brazil investor · inactive 6d",
  },
  {
    id: "pa-5",
    tag: "CHECK-IN",
    summary: "Inspection reply overdue",
  },
  {
    id: "pa-6",
    tag: "PRIORITY",
    amount: "$1.2M",
    summary: "Buyer active this morning",
  },
];

const demoSalesMyPipeline: PipelineSummaryRow[] = [
  { id: "mp-1", label: "Active buyers", count: 12 },
  { id: "mp-2", label: "Negotiations", count: 3 },
  { id: "mp-3", label: "Closings this week", count: 2 },
];

const demoSalesMomentum: MomentumRow[] = [
  {
    id: "mo-1",
    label: "You closed 2 deals faster than your average this month",
    tone: "success",
  },
  {
    id: "mo-2",
    label: "Your response time improved 32% this week",
    tone: "success",
  },
];

const demoSalesTeamLeader: TeamLeaderSalesData = {
  todaysAttention: demoSalesAttention,
  dealsNeedingAction: demoSalesDealsNeedingAction,
  pulsorInsight:
    "Referral deals are closing 2× faster than Zillow leads this month.",
  topDealsToWatch: demoSalesTopDeals,
  thisWeek: demoSalesThisWeek,
  teamOverview: demoSalesTeamOverview,
  isEmpty: false,
};

const demoSalesAgent: AgentSalesData = {
  hotLeadsCount: 3,
  hotLeadsNote: "Waiting response",
  followUpsDueCount: 5,
  followUpsDueNote: "Overdue or high priority",
  dealsAtRiskCount: 2,
  dealsAtRiskNote: "Missing next step",
  priorityActions: demoSalesPriorityActions,
  pulsorSuggestion:
    "Leads contacted within 15 minutes are converting 2.4× better this week.",
  myPipeline: demoSalesMyPipeline,
  momentum: demoSalesMomentum,
  isEmpty: false,
};

/** Full SalesData snapshot for the demo account. */
export const DEMO_SALES_DATA: SalesData = {
  teamLeader: demoSalesTeamLeader,
  agent: demoSalesAgent,
};

// ─── Home demo ─────────────────────────────────────────────────

const demoTeamLeader: TeamLeaderHomeData = {
  firstName: "Mike",
  pipelineAtRisk: "$18.7M",
  pipelineAtRiskNote: "No response in 72h",
  leadsAtRiskCount: 7,
  leadsAtRiskNote: "No contact > 48h",
  teamHealthScore: 82,
  teamHealthNote: "Healthy · SLA + follow-through",
  operationalLeaks: demoLeaks,
  workflowBottlenecks: demoBottlenecks,
  team: demoTeam,
  weeklyInsight:
    "Bolivia leads close 2.5× faster than your team average. Lean into that segment this month — there are 14 active prospects matching the pattern.",
  thisWeekGoal:
    "Move 5 deals from 'Negotiation' to 'Under Contract' by Friday. Focus on the 3 deals stalled longer than 10 days.",
  lastWeekWins:
    "Ana Torres closed a $1.2M deal in Pacific Heights — 12-day cycle. Carlos surfaced the Bolivia pattern that's now driving 3× conversion.",
  isEmpty: false,
};

const demoAgent: AgentHomeData = {
  firstName: "Ana",
  todayPrioritiesCount: 6,
  hotLeadsCount: 3,
  dealsAtRiskCount: 2,
  todaysActions: demoAgentActions,
  recommendedFocus:
    "Focus on the 3 leads most likely to convert before starting cold follow-ups.",
  performanceSignals: demoAgentSignals,
  pipeline: demoAgentPipeline,
  isEmpty: false,
};

/** Full HomeData snapshot for the demo account. */
export const DEMO_HOME_DATA: HomeData = {
  teamLeader: demoTeamLeader,
  agent: demoAgent,
};

// ─── Marketing demo ────────────────────────────────────────────

const demoMarketingTLSources: LeadSourceRow[] = [
  {
    id: "ls-1",
    name: "Referrals",
    signal: "Highest close rate",
    tone: "success",
  },
  {
    id: "ls-2",
    name: "Meta Ads",
    signal: "High volume · medium intent",
    tone: "neutral",
  },
  {
    id: "ls-3",
    name: "YouTube",
    signal: "Low volume · premium buyers",
    tone: "success",
  },
  {
    id: "ls-4",
    name: "Instagram",
    signal: "Fast engagement · medium ticket",
    tone: "neutral",
  },
  {
    id: "ls-5",
    name: "Google Ads",
    signal: "High CPL · weak follow-up quality",
    tone: "critical",
  },
];

const demoMarketingTLInsights: ActionCardData[] = [
  {
    id: "mi-1",
    tag: "PATTERN",
    summary: "Bolivia leads convert 3× better than average",
  },
  {
    id: "mi-2",
    tag: "OPPORTUNITY",
    summary: "YouTube leads close at higher ticket sizes",
  },
  {
    id: "mi-3",
    tag: "INSIGHT",
    summary: "Meta response time improved this week",
  },
];

const demoMarketingAgentSources: LeadSourceRow[] = [
  {
    id: "as-1",
    name: "Referrals",
    signal: "Highest reply rate this week",
    tone: "success",
  },
  {
    id: "as-2",
    name: "Instagram",
    signal: "Fastest engagement",
    tone: "success",
  },
  {
    id: "as-3",
    name: "YouTube",
    signal: "Premium buyers",
    tone: "success",
  },
  {
    id: "as-4",
    name: "Zillow",
    signal: "Low response quality",
    tone: "warning",
  },
  {
    id: "as-5",
    name: "WhatsApp",
    signal: "Most active conversations",
    tone: "neutral",
  },
];

const demoMarketingOpportunities: OpportunityRow[] = [
  { id: "op-1", label: "3 LATAM buyers active this week", tone: "success" },
  { id: "op-2", label: "2 premium buyers reopened conversations", tone: "success" },
  { id: "op-3", label: "1 stalled buyer re-engaged today", tone: "warning" },
];

const demoMarketingCampaigns: CampaignRow[] = [
  {
    id: "cmp-1",
    name: "YouTube collaboration",
    signal: "12 leads · 2 high intent",
    tone: "success",
  },
  {
    id: "cmp-2",
    name: "LATAM buyer form",
    signal: "Strong engagement",
    tone: "success",
  },
  {
    id: "cmp-3",
    name: "Google PPC test",
    signal: "High spend · weak quality",
    tone: "critical",
  },
];

const demoMarketingTeamLeader: TeamLeaderMarketingData = {
  highIntentCount: 42,
  highIntentNote: "Likely to convert",
  highIntentTrend: { direction: "up", label: "Close quality improving" },
  strongestSourceName: "Referrals",
  strongestSourceNote: "Highest close quality",
  strongestSourceTrend: { direction: "up", label: "Faster response this week" },
  weakestSourceName: "Google Ads",
  weakestSourceNote: "High cost · low response",
  weakestSourceTrend: { direction: "down", label: "Worsening CPL" },
  leadSources: demoMarketingTLSources,
  activeCampaigns: demoMarketingCampaigns,
  pulsorInsights: demoMarketingTLInsights,
  suggestedFocus:
    "Increase LATAM targeting this week. Current close quality is outperforming paid channels.",
  isEmpty: false,
};

const demoMarketingAgent: AgentMarketingData = {
  bestSourceName: "Referrals",
  bestSourceNote: "Convert best for you",
  fastestSourceName: "Instagram",
  fastestSourceNote: "DMs close faster",
  buyersWaitingCount: 4,
  buyersWaitingNote: "High intent, no reply yet",
  whatsWorking: demoMarketingAgentSources,
  pulsorSuggestion:
    "Referral leads are responding 2× faster this week.",
  followUpPriority: demoMarketingOpportunities,
  isEmpty: false,
};

/** Full MarketingData snapshot for the demo account. */
export const DEMO_MARKETING_DATA: MarketingData = {
  teamLeader: demoMarketingTeamLeader,
  agent: demoMarketingAgent,
};
