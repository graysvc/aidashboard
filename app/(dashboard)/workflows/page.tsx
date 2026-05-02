import { dashboardData } from "@/lib/mock-data";
import { CheckCircle, AlertTriangle, TrendingDown } from "lucide-react";

export default function WorkflowsPage() {
  const { workflows } = dashboardData;

  const broken = workflows.filter((w) => w.status === "broken");
  const underperforming = workflows.filter((w) => w.status === "underperforming");
  const healthy = workflows.filter((w) => w.status === "healthy" || w.status === "performing");

  const totalTriggers = workflows.reduce((a, w) => a + w.metrics.triggered, 0);
  const totalCompleted = workflows.reduce((a, w) => a + w.metrics.completed, 0);

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Stats row */}
      <section className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Active</p>
          <p className="text-2xl font-semibold">{healthy.length}</p>
        </div>
        <div className="p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Total Runs</p>
          <p className="text-2xl font-semibold">{totalTriggers}</p>
        </div>
        <div className="p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Completion</p>
          <p className="text-2xl font-semibold">
            {totalTriggers > 0 ? Math.round((totalCompleted / totalTriggers) * 100) : 0}%
          </p>
        </div>
      </section>

      {/* Broken */}
      {broken.length > 0 && (
        <section>
          <h2 className="text-sm font-medium mb-3 text-red-600">Needs Fix</h2>
          <div className="border border-red-200 bg-red-50 rounded-lg divide-y divide-red-100">
            {broken.map((w) => (
              <div key={w.id} className="p-3 flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm flex-1">{w.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Underperforming */}
      {underperforming.length > 0 && (
        <section>
          <h2 className="text-sm font-medium mb-3">Underperforming</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            {underperforming.map((w) => (
              <div key={w.id} className="p-3 flex items-center gap-3">
                <TrendingDown className="h-4 w-4 text-amber-600" />
                <span className="text-sm flex-1">{w.name}</span>
                <span className="text-xs text-muted-foreground">{w.metrics.completionRate}%</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Healthy */}
      {healthy.length > 0 && (
        <section>
          <h2 className="text-sm font-medium mb-3">Running</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            {healthy.map((w) => (
              <div key={w.id} className="p-3 flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="text-sm flex-1">{w.name}</span>
                <span className="text-xs text-muted-foreground">{w.metrics.triggered} runs</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
