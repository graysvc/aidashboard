"use client";

import { Card } from "@/components/ui/card";
import {
  Briefcase,
  Clock,
  CalendarCheck,
  UserPlus,
  DollarSign,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  CheckCircle2,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";
import type { KPI, KpiIconKey, KpiTone } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<KpiIconKey, LucideIcon> = {
  deals: Briefcase,
  leads: UserPlus,
  appointment: CalendarCheck,
  "response-time": Clock,
  revenue: DollarSign,
  conversion: Target,
  workflows: Zap,
  completion: CheckCircle2,
  roi: TrendingUp,
};

const TONE_STYLES: Record<
  KpiTone,
  { iconBg: string; iconColor: string; sparkline: string; sparklineFill: string }
> = {
  primary: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    sparkline: "#06b6d4",
    sparklineFill: "rgba(6, 182, 212, 0.1)",
  },
  success: {
    iconBg: "bg-success/10",
    iconColor: "text-success",
    sparkline: "#10b981",
    sparklineFill: "rgba(16, 185, 129, 0.1)",
  },
  warning: {
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    sparkline: "#f59e0b",
    sparklineFill: "rgba(245, 158, 11, 0.1)",
  },
  danger: {
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    sparkline: "#ef4444",
    sparklineFill: "rgba(239, 68, 68, 0.1)",
  },
  info: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    sparkline: "#8b5cf6",
    sparklineFill: "rgba(139, 92, 246, 0.1)",
  },
};

export function KpiCard({ kpi }: { kpi: KPI }) {
  const Icon = ICON_MAP[kpi.iconKey];
  const styles = TONE_STYLES[kpi.tone];

  let deltaTone: "positive" | "negative" | "neutral" = "neutral";
  let isUp: boolean | null = null;
  if (kpi.delta) {
    isUp = kpi.delta.value >= 0;
    const isImprovement = kpi.delta.inverted ? !isUp : isUp;
    deltaTone = isImprovement ? "positive" : "negative";
  }

  const sparklineData =
    kpi.trend?.map((v, i) => ({ x: i, y: v })) ?? [];

  return (
    <Card className="group relative p-5 bg-card border-border/50 hover:border-border transition-all duration-300 overflow-hidden">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start gap-4">
        <span
          className={cn(
            "h-10 w-10 rounded-xl shrink-0 flex items-center justify-center transition-transform group-hover:scale-105",
            styles.iconBg
          )}
        >
          <Icon className={cn("h-5 w-5", styles.iconColor)} strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {kpi.label}
          </div>
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-2xl font-semibold text-foreground tabular-nums leading-none tracking-tight">
              {kpi.value}
            </span>
            {kpi.delta && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-mono text-[11px] font-medium tabular-nums",
                  deltaTone === "positive" &&
                    "bg-success/10 text-success",
                  deltaTone === "negative" && "bg-destructive/10 text-destructive"
                )}
              >
                {isUp ? (
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                ) : (
                  <ArrowDownRight className="h-3 w-3" strokeWidth={2.5} />
                )}
                {Math.abs(kpi.delta.value).toFixed(1)}%
              </span>
            )}
          </div>
          {(kpi.hint || kpi.delta?.period) && (
            <div className="text-[11px] text-muted-foreground/70 mt-1.5">
              {kpi.hint && <span>{kpi.hint}</span>}
              {kpi.hint && kpi.delta?.period && (
                <span className="text-muted-foreground/40"> · </span>
              )}
              {kpi.delta?.period}
            </div>
          )}
        </div>
      </div>

      {sparklineData.length > 0 && (
        <div className="relative mt-4 -mx-2 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <defs>
                <linearGradient id={`kpi-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={styles.sparkline} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={styles.sparkline} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis hide domain={["dataMin", "dataMax"]} />
              <Area
                type="monotone"
                dataKey="y"
                stroke={styles.sparkline}
                strokeWidth={1.5}
                fill={`url(#kpi-${kpi.id})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
