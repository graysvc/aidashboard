import { dashboardData } from "@/lib/mock-data";
import { ArrowUpRight, TrendingUp, TrendingDown, AlertCircle, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
  const { kpis, insights } = dashboardData;
  
  const heroKpi = kpis[0];
  const pendingInsights = insights.filter((i) => i.state === "pending").slice(0, 3);
  const secondaryKpis = kpis.slice(1, 4);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Hero metric */}
      <section className="text-center py-8">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          {heroKpi.label}
        </p>
        <p className="text-5xl font-semibold text-foreground tracking-tight">
          {heroKpi.value}
        </p>
        <div className="flex items-center justify-center gap-1 mt-2">
          {heroKpi.deltaDirection === "up" ? (
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={heroKpi.deltaDirection === "up" ? "text-sm text-emerald-600" : "text-sm text-red-500"}>
            {heroKpi.delta.value}%
          </span>
          <span className="text-sm text-muted-foreground ml-1">{heroKpi.delta.period}</span>
        </div>
      </section>

      {/* Action cards */}
      {pendingInsights.length > 0 && (
        <section className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Needs attention
          </p>
          <div className="space-y-2">
            {pendingInsights.map((insight) => (
              <Link
                key={insight.id}
                href="/insights"
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={
                    insight.severity === "critical" 
                      ? "h-8 w-8 rounded-full bg-red-50 flex items-center justify-center" 
                      : insight.severity === "warning"
                      ? "h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center"
                      : "h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center"
                  }>
                    {insight.severity === "critical" ? (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : insight.severity === "warning" ? (
                      <Clock className="h-4 w-4 text-amber-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <span className="text-sm text-foreground">{insight.title}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Mini KPIs */}
      <section className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        {secondaryKpis.map((kpi) => (
          <div key={kpi.id} className="text-center">
            <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
            <p className="text-xl font-medium text-foreground">{kpi.value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
