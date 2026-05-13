import { redirect } from "next/navigation";
import { getMyDashboard } from "@/lib/data/dashboard";
import { getCompanyStrategy } from "@/lib/data/company-content";
import { DEMO_EMAIL } from "@/lib/data/demo";
import { StrategyClient, type StrategyData } from "./strategy-client";

const DEMO_STRATEGY: StrategyData = {
  stages: [
    { id: "s-audit", label: "Audit", state: "done" },
    { id: "s-optimization", label: "Optimization", state: "current" },
    { id: "s-review", label: "Review", state: "future" },
    { id: "s-expansion", label: "Expansion", state: "future" },
  ],
  currentFocusHeadline: "Reducing stalled negotiations",
  currentFocusItems: [
    "Lead reassignment active",
    "Follow-up alerts enabled",
    "Coordinator workflow updated",
  ],
  stageLabel: "Optimization",
  weekN: 2,
  weekOf: 4,
  whatImproved: [
    {
      id: "wi-1",
      label: "Avg response time",
      before: "18h",
      after: "4h",
    },
    { id: "wi-2", label: "Stalled deals recovered", after: "7" },
    {
      id: "wi-3",
      label: "Referral leads converting",
      after: "2× higher",
    },
    { id: "wi-4", label: "Coordinator workload reduced", after: "-35%" },
    { id: "wi-5", label: "Leads aging > 48h", before: "12", after: "3" },
  ],
  currentPriorities: [
    "Improve LATAM lead handling",
    "Reduce negotiation delays",
    "Standardize follow-up ownership",
  ],
  recommendedNextStep: "Enable SLA alerts for inbound leads.",
};

const EMPTY_STRATEGY: StrategyData = {
  stages: [],
  currentFocusHeadline: null,
  currentFocusItems: [],
  stageLabel: null,
  weekN: null,
  weekOf: null,
  whatImproved: [],
  currentPriorities: [],
  recommendedNextStep: null,
};

export default async function StrategyPage() {
  const dashboard = await getMyDashboard();
  if (!dashboard) redirect("/login");

  if (dashboard.user.email === DEMO_EMAIL) {
    return <StrategyClient data={DEMO_STRATEGY} />;
  }

  const strategy = dashboard.user.company_id
    ? await getCompanyStrategy(dashboard.user.company_id)
    : null;

  if (!strategy) return <StrategyClient data={EMPTY_STRATEGY} />;

  const data: StrategyData = {
    stages: strategy.milestones.map((m) => ({
      id: m.id,
      label: m.label,
      state: m.state,
    })),
    currentFocusHeadline: strategy.current_focus_label ?? null,
    currentFocusItems: strategy.initiatives
      .filter((i) => i.state !== "future")
      .map((i) => i.label),
    stageLabel: strategy.current_focus_label ?? null,
    weekN: strategy.current_focus_day
      ? Math.max(1, Math.ceil(strategy.current_focus_day / 7))
      : null,
    weekOf: strategy.current_focus_period_length
      ? Math.max(1, Math.ceil(strategy.current_focus_period_length / 7))
      : null,
    whatImproved: [],
    currentPriorities: strategy.action_items
      .filter((i) => i.state === "future")
      .map((i) => i.label),
    recommendedNextStep: null,
  };

  return <StrategyClient data={data} />;
}
