import { dashboardData } from "@/lib/mock-data";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { CompletionRateChart } from "@/components/dashboard/completion-rate-chart";
import { WorkflowStatusMix } from "@/components/dashboard/workflow-status-mix";
import { WorkflowCard } from "@/components/dashboard/workflow-card";
import { PeriodSelector } from "@/components/dashboard/period-selector";
import type { KPI } from "@/lib/types";

function formatCompactCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function WorkflowsPage() {
  const { workflows, period, completionRateTrend } = dashboardData;

  // Aggregate KPIs from workflows
  const totalTriggered = workflows.reduce(
    (acc, w) => acc + w.metrics.triggered,
    0
  );
  const totalCompleted = workflows.reduce(
    (acc, w) => acc + w.metrics.completed,
    0
  );
  const avgCompletion =
    totalTriggered > 0 ? (totalCompleted / totalTriggered) * 100 : 0;
  const totalRevenue = workflows.reduce(
    (acc, w) => acc + w.metrics.revenueAttributed,
    0
  );
  const activeWorkflows = workflows.filter((w) => w.metrics.triggered > 0);
  const avgRoi =
    activeWorkflows.length > 0
      ? activeWorkflows.reduce((acc, w) => acc + w.metrics.roi, 0) /
        activeWorkflows.length
      : 0;

  const kpis: KPI[] = [
    {
      id: "wf-triggered",
      label: "Total Triggered",
      value: totalTriggered.toLocaleString(),
      hint: `${workflows.length} workflows`,
      iconKey: "workflows",
      tone: "primary",
      delta: { value: 6.2, period: "vs last week" },
    },
    {
      id: "wf-completion",
      label: "Avg Completion",
      value: `${avgCompletion.toFixed(1)}%`,
      hint: `${totalCompleted} of ${totalTriggered}`,
      iconKey: "completion",
      tone: "success",
      delta: { value: -8.4, period: "vs last week" },
    },
    {
      id: "wf-revenue",
      label: "Attributed Revenue",
      value: formatCompactCurrency(totalRevenue),
      hint: "30-day rolling",
      iconKey: "revenue",
      tone: "warning",
      delta: { value: 12.1, period: "vs last month" },
    },
    {
      id: "wf-roi",
      label: "Avg ROI",
      value: `${avgRoi.toFixed(1)}x`,
      hint: `${activeWorkflows.length} active workflows`,
      iconKey: "roi",
      tone: "danger",
      delta: { value: 3.8, period: "vs last month" },
    },
  ];

  // Sort: broken first (needs attention), then by ROI
  const sortedWorkflows = [...workflows].sort((a, b) => {
    if (a.status === "broken" && b.status !== "broken") return -1;
    if (b.status === "broken" && a.status !== "broken") return 1;
    return b.metrics.roi - a.metrics.roi;
  });

  return (
    <div className="px-6 py-8 lg:px-8 lg:py-10 max-w-[1440px] mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
            Workflows
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            ROI and efficiency of every automation across your stack.
          </p>
        </div>
        <PeriodSelector label={period.label} />
      </header>

      {/* KPI band */}
      <section aria-label="Workflow metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      {/* Charts row */}
      <section
        aria-label="Workflow trends"
        className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6"
      >
        <CompletionRateChart data={completionRateTrend} />
        <WorkflowStatusMix workflows={workflows} />
      </section>

      {/* Workflow list */}
      <section aria-label="Workflows">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              All workflows
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sorted by status — issues first, then by ROI
            </p>
          </div>
          <span className="text-xs font-medium text-muted-foreground font-mono tabular-nums">
            {workflows.length} total
          </span>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {sortedWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </section>
    </div>
  );
}
