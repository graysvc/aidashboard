import { dashboardData } from "@/lib/mock-data";
import { AlertCircle } from "lucide-react";

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function TeamPage() {
  const { agents } = dashboardData;

  const teamVolume = agents.reduce((a, ag) => a + ag.metrics.volumeClosedYTD, 0);
  const needsCoaching = agents.filter((a) => a.status === "needs-coaching");
  const sorted = [...agents].sort(
    (a, b) => b.metrics.volumeClosedYTD - a.metrics.volumeClosedYTD
  );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Hero stat */}
      <section className="text-center py-8">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          Team volume YTD
        </p>
        <p className="text-5xl font-semibold text-foreground tracking-tight">
          {formatCurrency(teamVolume)}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {agents.length} agents
        </p>
      </section>

      {/* Needs attention */}
      {needsCoaching.length > 0 && (
        <section className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Needs coaching
          </p>
          <div className="space-y-2">
            {needsCoaching.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center gap-3 p-4 border border-amber-200 bg-amber-50 rounded-lg"
              >
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                <span className="text-sm text-foreground flex-1">{agent.name}</span>
                <span className="text-xs text-muted-foreground">
                  {agent.metrics.conversionRate.toFixed(0)}% conversion
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All agents */}
      <section className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          All agents
        </p>
        <div className="space-y-2">
          {sorted.map((agent, i) => (
            <div
              key={agent.id}
              className="flex items-center gap-3 p-4 border border-border rounded-lg"
            >
              <span className="text-xs text-muted-foreground w-5">{i + 1}</span>
              <span className="text-sm text-foreground flex-1">{agent.name}</span>
              <span className="text-sm font-medium text-foreground tabular-nums">
                {formatCurrency(agent.metrics.volumeClosedYTD)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Deals closed</p>
          <p className="text-xl font-medium text-foreground">
            {agents.reduce((a, ag) => a + ag.metrics.dealsClosedYTD, 0)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Pipeline</p>
          <p className="text-xl font-medium text-foreground">
            {formatCurrency(agents.reduce((a, ag) => a + ag.metrics.pipelineValue, 0))}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Avg conversion</p>
          <p className="text-xl font-medium text-foreground">
            {(
              agents.reduce((a, ag) => a + ag.metrics.conversionRate, 0) / agents.length
            ).toFixed(0)}%
          </p>
        </div>
      </section>
    </div>
  );
}
