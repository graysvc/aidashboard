import { dashboardData } from "@/lib/mock-data";
import { PlayCircle, PauseCircle, AlertTriangle } from "lucide-react";

export default function WorkflowsPage() {
  const { workflows } = dashboardData;

  const active = workflows.filter((w) => w.status === "active");
  const paused = workflows.filter((w) => w.status === "paused");
  const broken = workflows.filter((w) => w.status === "broken");

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Hero stat */}
      <section className="text-center py-8">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          Active workflows
        </p>
        <p className="text-5xl font-semibold text-foreground tracking-tight">
          {active.length}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          of {workflows.length} total
        </p>
      </section>

      {/* Broken - needs attention */}
      {broken.length > 0 && (
        <section className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Needs attention
          </p>
          <div className="space-y-2">
            {broken.map((w) => (
              <div
                key={w.id}
                className="flex items-center gap-3 p-4 border border-red-200 bg-red-50 rounded-lg"
              >
                <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                <span className="text-sm text-foreground">{w.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Active */}
      {active.length > 0 && (
        <section className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Running
          </p>
          <div className="space-y-2">
            {active.map((w) => (
              <div
                key={w.id}
                className="flex items-center gap-3 p-4 border border-border rounded-lg"
              >
                <PlayCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-sm text-foreground flex-1">{w.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {w.metrics.triggered} runs
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Paused */}
      {paused.length > 0 && (
        <section className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Paused
          </p>
          <div className="space-y-2">
            {paused.map((w) => (
              <div
                key={w.id}
                className="flex items-center gap-3 p-4 border border-border rounded-lg opacity-60"
              >
                <PauseCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-foreground">{w.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Summary footer */}
      <section className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Total runs</p>
          <p className="text-xl font-medium text-foreground">
            {workflows.reduce((a, w) => a + w.metrics.triggered, 0)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Completion</p>
          <p className="text-xl font-medium text-foreground">
            {Math.round(
              (workflows.reduce((a, w) => a + w.metrics.completed, 0) /
                Math.max(workflows.reduce((a, w) => a + w.metrics.triggered, 0), 1)) *
                100
            )}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Avg ROI</p>
          <p className="text-xl font-medium text-foreground">
            {(
              workflows.filter((w) => w.metrics.triggered > 0).reduce((a, w) => a + w.metrics.roi, 0) /
              Math.max(workflows.filter((w) => w.metrics.triggered > 0).length, 1)
            ).toFixed(1)}x
          </p>
        </div>
      </section>
    </div>
  );
}
