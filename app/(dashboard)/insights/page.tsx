import { dashboardData } from "@/lib/mock-data";
import { AlertCircle, Clock, Lightbulb, CheckCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function InsightsPage() {
  const { insights } = dashboardData;

  const pending = insights.filter((i) => i.state === "pending");
  const critical = pending.filter((i) => i.severity === "critical");
  const warnings = pending.filter((i) => i.severity === "warning");
  const info = pending.filter((i) => i.severity === "info");

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Hero stat */}
      <section className="text-center py-8">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          Pending actions
        </p>
        <p className="text-5xl font-semibold text-foreground tracking-tight">
          {pending.length}
        </p>
        {pending.length === 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            You&apos;re all caught up
          </p>
        )}
      </section>

      {/* Critical */}
      {critical.length > 0 && (
        <section className="space-y-2">
          <p className="text-xs text-red-600 uppercase tracking-wide font-medium">
            Act now
          </p>
          <div className="space-y-2">
            {critical.map((insight) => (
              <InsightRow key={insight.id} insight={insight} variant="critical" />
            ))}
          </div>
        </section>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <section className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            This week
          </p>
          <div className="space-y-2">
            {warnings.map((insight) => (
              <InsightRow key={insight.id} insight={insight} variant="warning" />
            ))}
          </div>
        </section>
      )}

      {/* Info */}
      {info.length > 0 && (
        <section className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Worth knowing
          </p>
          <div className="space-y-2">
            {info.map((insight) => (
              <InsightRow key={insight.id} insight={insight} variant="info" />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {pending.length === 0 && (
        <section className="text-center py-8 border border-dashed border-border rounded-lg">
          <CheckCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground">No pending insights</p>
        </section>
      )}

      {/* Summary */}
      <section className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Critical</p>
          <p className="text-xl font-medium text-foreground">{critical.length}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Warnings</p>
          <p className="text-xl font-medium text-foreground">{warnings.length}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Info</p>
          <p className="text-xl font-medium text-foreground">{info.length}</p>
        </div>
      </section>
    </div>
  );
}

function InsightRow({
  insight,
  variant,
}: {
  insight: { id: string; title: string };
  variant: "critical" | "warning" | "info";
}) {
  const styles = {
    critical: "border-red-200 bg-red-50",
    warning: "border-amber-200 bg-amber-50",
    info: "border-border bg-background",
  };

  const icons = {
    critical: <AlertCircle className="h-4 w-4 text-red-600" />,
    warning: <Clock className="h-4 w-4 text-amber-600" />,
    info: <Lightbulb className="h-4 w-4 text-muted-foreground" />,
  };

  return (
    <Link
      href="#"
      className={`flex items-center gap-3 p-4 border rounded-lg hover:opacity-80 transition-opacity group ${styles[variant]}`}
    >
      <div className="shrink-0">{icons[variant]}</div>
      <span className="text-sm text-foreground flex-1">{insight.title}</span>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
