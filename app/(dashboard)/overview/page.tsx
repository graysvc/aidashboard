import { dashboardData } from "@/lib/mock-data";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import { AgentLeaderboard } from "@/components/dashboard/agent-leaderboard";
import { RecentLeads } from "@/components/dashboard/recent-leads";
import { PeriodSelector } from "@/components/dashboard/period-selector";
import { PipelineTrendChart } from "@/components/dashboard/pipeline-trend-chart";
import { LeadsBySourceChart } from "@/components/dashboard/leads-by-source-chart";
import { PipelineStageChart } from "@/components/dashboard/pipeline-stage-chart";
import { ArrowRight } from "lucide-react";

export default function OverviewPage() {
  const {
    user,
    period,
    kpis,
    insights,
    agents,
    leads,
    pipelineTrend,
    leadsBySource,
    pipelineByStage,
  } = dashboardData;
  const firstName = user.name.split(" ")[0];
  const topInsights = insights.filter((i) => i.state === "pending").slice(0, 3);

  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8 max-w-[1600px] mx-auto space-y-6">
      {/* Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Here&apos;s what&apos;s happening with {user.teamName} today.
          </p>
        </div>
        <PeriodSelector label={period.label} />
      </header>

      {/* KPI band */}
      <section aria-label="Key metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      {/* Big chart: pipeline trend */}
      <section aria-label="Pipeline trend">
        <PipelineTrendChart data={pipelineTrend} />
      </section>

      {/* Two-column charts: source mix + stage mix */}
      <section
        aria-label="Pipeline breakdown"
        className="grid grid-cols-1 xl:grid-cols-2 gap-4"
      >
        <LeadsBySourceChart data={leadsBySource} />
        <PipelineStageChart data={pipelineByStage} />
      </section>

      {/* Insights */}
      <section aria-label="Insights" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Needs attention
            </h2>
            <p className="text-xs text-muted-foreground/70 mt-0.5">
              {topInsights.length} active recommendations
            </p>
          </div>
          <a
            href="/insights"
            className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            View all
            <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {topInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

      {/* Two-column: leaderboard + recent leads */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AgentLeaderboard agents={agents} />
        <RecentLeads leads={leads} />
      </section>
    </div>
  );
}
