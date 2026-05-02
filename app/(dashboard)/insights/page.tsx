import { dashboardData } from "@/lib/mock-data";
import { AlertCircle, Clock, Lightbulb, CheckCircle } from "lucide-react";

export default function InsightsPage() {
  const { insights } = dashboardData;

  const pending = insights.filter((i) => i.state === "pending");
  const critical = pending.filter((i) => i.severity === "critical");
  const warnings = pending.filter((i) => i.severity === "warning");
  const info = pending.filter((i) => i.severity === "info");

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Stats row */}
      <section className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-red-200 bg-red-50">
          <p className="text-xs text-muted-foreground mb-1">Critical</p>
          <p className="text-2xl font-semibold">{critical.length}</p>
        </div>
        <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
          <p className="text-xs text-muted-foreground mb-1">Warnings</p>
          <p className="text-2xl font-semibold">{warnings.length}</p>
        </div>
        <div className="p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Info</p>
          <p className="text-2xl font-semibold">{info.length}</p>
        </div>
      </section>

      {/* Critical */}
      {critical.length > 0 && (
        <section>
          <h2 className="text-sm font-medium mb-3 text-red-600">Act Now</h2>
          <div className="border border-red-200 bg-red-50 rounded-lg divide-y divide-red-100">
            {critical.map((insight) => (
              <div key={insight.id} className="p-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{insight.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{insight.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <section>
          <h2 className="text-sm font-medium mb-3">This Week</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            {warnings.map((insight) => (
              <div key={insight.id} className="p-3">
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{insight.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{insight.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info */}
      {info.length > 0 && (
        <section>
          <h2 className="text-sm font-medium mb-3">Worth Knowing</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            {info.map((insight) => (
              <div key={insight.id} className="p-3">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{insight.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{insight.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {pending.length === 0 && (
        <section className="text-center py-12 border border-dashed border-border rounded-lg">
          <CheckCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">All caught up</p>
        </section>
      )}
    </div>
  );
}
