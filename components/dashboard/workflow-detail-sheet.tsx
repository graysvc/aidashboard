"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { Workflow, WorkflowStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ExternalLink, Pause, Play } from "lucide-react";

const STATUS_CONFIG: Record<
  WorkflowStatus,
  { label: string; dot: string; text: string; chartColor: string }
> = {
  performing: {
    label: "Performing",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    chartColor: "#10b981",
  },
  healthy: {
    label: "Healthy",
    dot: "bg-sky-500",
    text: "text-sky-700",
    chartColor: "#0ea5e9",
  },
  underperforming: {
    label: "Underperforming",
    dot: "bg-amber-500",
    text: "text-amber-700",
    chartColor: "#f59e0b",
  },
  broken: {
    label: "Broken",
    dot: "bg-rose-500",
    text: "text-rose-700",
    chartColor: "#dc2626",
  },
};

function formatCompactCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

const WEEK_LABELS = [
  "Feb 03",
  "Feb 10",
  "Feb 17",
  "Feb 24",
  "Mar 03",
  "Mar 10",
  "Mar 17",
  "Mar 24",
  "Mar 31",
  "Apr 07",
  "Apr 14",
  "Apr 21",
];

export function WorkflowDetailSheet({
  workflow,
  open,
  onOpenChange,
}: {
  workflow: Workflow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const status = STATUS_CONFIG[workflow.status];
  const trendData = workflow.trend.map((v, i) => ({
    label: WEEK_LABELS[i] ?? `W${i + 1}`,
    value: v,
  }));

  // Funnel stages
  const funnel = [
    { label: "Triggered", value: workflow.metrics.triggered },
    { label: "Completed", value: workflow.metrics.completed },
    { label: "Appointments", value: workflow.metrics.appointmentsCreated },
    { label: "Closed deals", value: workflow.metrics.closedDeals },
  ];
  const funnelMax = Math.max(funnel[0].value, 1);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl overflow-y-auto"
      >
        <SheetHeader className="pr-8">
          <div className="flex items-center gap-2">
            <span className={cn("h-2 w-2 rounded-full shrink-0", status.dot)} />
            <span className={cn("text-[11px] font-semibold", status.text)}>
              {status.label}
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-[11px] font-medium text-muted-foreground">
              {workflow.category}
            </span>
          </div>
          <SheetTitle className="text-xl text-foreground tracking-tight pt-1">
            {workflow.name}
          </SheetTitle>
          <SheetDescription className="text-sm leading-relaxed">
            {workflow.description}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Tools */}
          <section>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Tools
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {workflow.tools.map((tool) => (
                <Badge
                  key={tool}
                  variant="outline"
                  className="bg-muted/50 text-muted-foreground border-border/50 font-medium text-[11px] py-0.5 px-2"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </section>

          {/* Key metrics grid */}
          <section className="grid grid-cols-2 gap-3">
            <MetricBox
              label="Triggered"
              value={workflow.metrics.triggered.toLocaleString()}
              hint="this period"
            />
            <MetricBox
              label="Completion rate"
              value={`${workflow.metrics.completionRate.toFixed(1)}%`}
              hint={`${workflow.metrics.completed} of ${workflow.metrics.triggered}`}
            />
            <MetricBox
              label="Attributed revenue"
              value={
                workflow.metrics.revenueAttributed > 0
                  ? formatCompactCurrency(workflow.metrics.revenueAttributed)
                  : "—"
              }
              hint={`${workflow.metrics.closedDeals} closed deals`}
            />
            <MetricBox
              label="ROI"
              value={
                workflow.metrics.roi > 0
                  ? `${workflow.metrics.roi.toFixed(1)}x`
                  : "—"
              }
              hint={`$${workflow.metrics.costPerLead}/lead cost`}
            />
          </section>

          {/* Trend chart */}
          <section>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              12-week trend
            </h3>
            <div className="h-[180px] w-full -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`wf-${workflow.id}-fill`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={status.chartColor}
                        stopOpacity={0.22}
                      />
                      <stop
                        offset="100%"
                        stopColor={status.chartColor}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="#E5E7EB"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    stroke="#9CA3AF"
                    fontSize={10}
                    tickMargin={8}
                    interval={1}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    stroke="#9CA3AF"
                    fontSize={10}
                    width={32}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={status.chartColor}
                    strokeWidth={2}
                    fill={`url(#wf-${workflow.id}-fill)`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Funnel */}
          <section>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Conversion funnel
            </h3>
            <ul className="space-y-2.5">
              {funnel.map((stage, i) => {
                const pct = funnelMax > 0 ? (stage.value / funnelMax) * 100 : 0;
                const dropoff =
                  i > 0 && funnel[i - 1].value > 0
                    ? ((funnel[i - 1].value - stage.value) /
                        funnel[i - 1].value) *
                      100
                    : null;
                return (
                  <li key={stage.label}>
                    <div className="flex items-baseline justify-between text-xs mb-1">
                      <span className="font-medium text-foreground">
                        {stage.label}
                      </span>
                      <div className="flex items-center gap-2 font-mono tabular-nums">
                        {dropoff !== null && (
                          <span className="text-[10px] text-muted-foreground">
                            -{dropoff.toFixed(0)}%
                          </span>
                        )}
                        <span className="font-bold text-foreground">
                          {stage.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: status.chartColor,
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Actions */}
          <section className="flex items-center gap-2 pt-2 border-t border-border/60 sticky bottom-0 bg-card -mx-6 px-6 pb-2">
            <Button size="sm" variant="outline" className="gap-1.5">
              {workflow.status === "broken" ? (
                <>
                  <Play className="h-3.5 w-3.5" strokeWidth={2} />
                  Resume workflow
                </>
              ) : (
                <>
                  <Pause className="h-3.5 w-3.5" strokeWidth={2} />
                  Pause workflow
                </>
              )}
            </Button>
            <Button size="sm" variant="ghost" className="gap-1.5 ml-auto">
              Open in stack
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
            </Button>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MetricBox({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-border/70 bg-card p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </div>
      <div className="font-mono text-xl font-bold tabular-nums text-foreground mt-1">
        {value}
      </div>
      {hint && (
        <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>
      )}
    </div>
  );
}
