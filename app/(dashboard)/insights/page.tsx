import { dashboardData } from "@/lib/mock-data";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { InsightsList } from "@/components/dashboard/insights-list";
import { PeriodSelector } from "@/components/dashboard/period-selector";
import type { KPI } from "@/lib/types";

export default function InsightsPage() {
  const { insights, period } = dashboardData;

  const pending = insights.filter((i) => i.state === "pending");
  const implementedThisMonth = insights.filter(
    (i) => i.state === "implemented"
  );
  const critical = pending.filter((i) => i.priority === "critical");
  const opportunities = pending.filter((i) => i.priority === "success");

  const kpis: KPI[] = [
    {
      id: "ins-pending",
      label: "Active Recommendations",
      value: pending.length.toString(),
      hint: `${critical.length} critical`,
      iconKey: "completion",
      tone: "primary",
    },
    {
      id: "ins-implemented",
      label: "Implemented This Month",
      value: implementedThisMonth.length.toString(),
      hint: "wins logged",
      iconKey: "deals",
      tone: "success",
      delta: { value: 50.0, period: "vs last month" },
    },
    {
      id: "ins-opportunities",
      label: "Open Opportunities",
      value: opportunities.length.toString(),
      hint: "scale candidates",
      iconKey: "roi",
      tone: "warning",
    },
    {
      id: "ins-critical",
      label: "Issues Need Attention",
      value: critical.length.toString(),
      hint: "blocking team output",
      iconKey: "workflows",
      tone: "danger",
    },
  ];

  return (
    <div className="px-6 py-8 lg:px-8 lg:py-10 max-w-[1440px] mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
            Insights
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Actionable recommendations — implement, ignore, or come back later.
          </p>
        </div>
        <PeriodSelector label={period.label} />
      </header>

      {/* KPI band */}
      <section aria-label="Insight metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      {/* Insights list with filters */}
      <section aria-label="Insights queue">
        <InsightsList insights={insights} />
      </section>
    </div>
  );
}
