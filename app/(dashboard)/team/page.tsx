import { dashboardData } from "@/lib/mock-data";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { TeamProductionChart } from "@/components/dashboard/team-production-chart";
import { AgentComparisonChart } from "@/components/dashboard/agent-comparison-chart";
import { AgentCard } from "@/components/dashboard/agent-card";
import { PeriodSelector } from "@/components/dashboard/period-selector";
import type { KPI } from "@/lib/types";

function formatCompactCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function TeamPage() {
  const { agents, teamProductionTrend } = dashboardData;

  const teamVolume = agents.reduce(
    (acc, a) => acc + a.metrics.volumeClosedYTD,
    0
  );
  const teamDeals = agents.reduce(
    (acc, a) => acc + a.metrics.dealsClosedYTD,
    0
  );
  const teamPipeline = agents.reduce(
    (acc, a) => acc + a.metrics.pipelineValue,
    0
  );
  const avgConversion =
    agents.reduce((acc, a) => acc + a.metrics.conversionRate, 0) /
    Math.max(agents.length, 1);

  const kpis: KPI[] = [
    {
      id: "team-volume",
      label: "Team Volume YTD",
      value: formatCompactCurrency(teamVolume),
      hint: `${agents.length} agents`,
      iconKey: "revenue",
      tone: "primary",
      delta: { value: 18.4, period: "vs last quarter" },
    },
    {
      id: "team-deals",
      label: "Deals Closed YTD",
      value: teamDeals.toString(),
      hint: "across the team",
      iconKey: "deals",
      tone: "success",
      delta: { value: 12.0, period: "vs last quarter" },
    },
    {
      id: "team-pipeline",
      label: "Active Pipeline",
      value: formatCompactCurrency(teamPipeline),
      hint: `${agents.reduce((a, ag) => a + ag.metrics.activeDeals, 0)} deals`,
      iconKey: "appointment",
      tone: "warning",
      delta: { value: 6.7, period: "vs last week" },
    },
    {
      id: "team-conversion",
      label: "Avg Conversion",
      value: `${avgConversion.toFixed(1)}%`,
      hint: "lead → appointment",
      iconKey: "conversion",
      tone: "danger",
      delta: { value: 1.4, period: "vs last month" },
    },
  ];

  // Sort: top first, then volume desc, but coaching cases pinned high
  const sortedAgents = [...agents].sort((a, b) => {
    if (a.status === "needs-coaching" && b.status !== "needs-coaching")
      return -1;
    if (b.status === "needs-coaching" && a.status !== "needs-coaching")
      return 1;
    return b.metrics.volumeClosedYTD - a.metrics.volumeClosedYTD;
  });

  return (
    <div className="px-6 py-8 lg:px-8 lg:py-10 max-w-[1440px] mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
            Team performance
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Per-agent metrics, coaching opportunities, and pipeline health.
          </p>
        </div>
        <PeriodSelector />
      </header>

      {/* KPI band */}
      <section aria-label="Team metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      {/* Charts row */}
      <section
        aria-label="Team trends"
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        <TeamProductionChart data={teamProductionTrend} />
        <AgentComparisonChart agents={agents} />
      </section>

      {/* Agent grid */}
      <section aria-label="Agents">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">All agents</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Coaching cases first, then by volume closed YTD
            </p>
          </div>
          <span className="text-xs font-medium text-muted-foreground font-mono tabular-nums">
            {agents.length} agents
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </div>
  );
}
