import { dashboardData } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
  const { kpis, insights, leads } = dashboardData;
  const pendingInsights = insights.filter((i) => i.state === "pending").slice(0, 2);
  const hotLeads = leads.filter((l) => l.status === "hot").slice(0, 3);

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      {/* KPIs */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="p-4 rounded-lg border border-border bg-background">
            <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
            <p className="text-2xl font-semibold">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {kpi.delta.value >= 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={kpi.delta.value >= 0 ? "text-xs text-emerald-600" : "text-xs text-red-500"}>
                {Math.abs(kpi.delta.value)}%
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Hot Leads */}
      {hotLeads.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium">Hot Leads</h2>
            <Link href="/team" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="border border-border rounded-lg divide-y divide-border">
            {hotLeads.map((lead) => (
              <div key={lead.id} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {lead.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.property}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{lead.stage}</p>
                  <p className="text-xs text-muted-foreground">{lead.assignedAgentName}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Insights */}
      {pendingInsights.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium">Needs Attention</h2>
            <Link href="/insights" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {pendingInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-3 rounded-lg border ${
                  insight.severity === "critical" 
                    ? "border-red-200 bg-red-50" 
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <p className="text-sm font-medium">{insight.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{insight.impact}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
