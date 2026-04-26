"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Pause,
  Play,
  Zap,
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, YAxis } from "recharts";
import { formatDistanceToNowStrict } from "date-fns";
import type { Workflow, WorkflowStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { dashboardData } from "@/lib/mock-data";
import { WorkflowDetailSheet } from "./workflow-detail-sheet";

const STATUS_CONFIG: Record<
  WorkflowStatus,
  { label: string; dot: string; text: string; sparkline: string }
> = {
  performing: {
    label: "Performing",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    sparkline: "#10b981",
  },
  healthy: {
    label: "Healthy",
    dot: "bg-sky-500",
    text: "text-sky-700",
    sparkline: "#0ea5e9",
  },
  underperforming: {
    label: "Underperforming",
    dot: "bg-amber-500",
    text: "text-amber-700",
    sparkline: "#f59e0b",
  },
  broken: {
    label: "Broken",
    dot: "bg-rose-500",
    text: "text-rose-700",
    sparkline: "#dc2626",
  },
};

function formatCompactCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const [open, setOpen] = useState(false);
  const status = STATUS_CONFIG[workflow.status];
  const sparklineData = workflow.trend.map((v, i) => ({ x: i, y: v }));
  const isUp = workflow.weeklyChange >= 0;
  const owner = workflow.ownerAgentId
    ? dashboardData.agents.find((a) => a.id === workflow.ownerAgentId)
    : null;

  return (
    <>
      <Card className="p-5 shadow-sm border-border/70 hover:shadow-md hover:border-border transition-all flex flex-col gap-4">
        {/* Header: status + change pill */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className={cn("h-2 w-2 rounded-full shrink-0", status.dot)} />
            <span className={cn("text-[11px] font-semibold", status.text)}>
              {status.label}
            </span>
          </div>
          {workflow.status !== "broken" && workflow.weeklyChange !== 0 && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full font-mono text-[11px] font-semibold tabular-nums shrink-0",
                isUp
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              )}
            >
              {isUp ? (
                <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
              ) : (
                <ArrowDownRight className="h-3 w-3" strokeWidth={2.5} />
              )}
              {Math.abs(workflow.weeklyChange).toFixed(1)}%
            </span>
          )}
        </div>

        {/* Title + description */}
        <div>
          <h3 className="text-[15px] font-semibold leading-tight text-foreground">
            {workflow.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {workflow.description}
          </p>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5">
          {workflow.tools.map((tool) => (
            <Badge
              key={tool}
              variant="outline"
              className="bg-muted/50 text-muted-foreground border-border/50 font-medium text-[10px] py-0 px-2 h-5"
            >
              {tool}
            </Badge>
          ))}
        </div>

        {/* Metrics + sparkline */}
        <div className="grid grid-cols-[1fr_auto] gap-4 items-end">
          <div className="grid grid-cols-4 gap-3">
            <Metric
              label="Triggered"
              value={workflow.metrics.triggered.toLocaleString()}
            />
            <Metric
              label="Completion"
              value={`${workflow.metrics.completionRate.toFixed(0)}%`}
            />
            <Metric
              label="ROI"
              value={
                workflow.metrics.roi > 0
                  ? `${workflow.metrics.roi.toFixed(1)}x`
                  : "—"
              }
            />
            <Metric
              label="Revenue"
              value={
                workflow.metrics.revenueAttributed > 0
                  ? formatCompactCurrency(workflow.metrics.revenueAttributed)
                  : "—"
              }
            />
          </div>
          <div className="h-10 w-20 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <YAxis hide domain={["dataMin", "dataMax"]} />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke={status.sparkline}
                  strokeWidth={1.75}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Meta row */}
        <div className="grid grid-cols-3 gap-3 rounded-lg bg-muted/40 px-3 py-2.5">
          <MetaItem
            icon={<Zap className="h-3 w-3" strokeWidth={2} />}
            label="Triggers/day"
            value={workflow.triggersPerDay.toFixed(1)}
          />
          <MetaItem
            icon={<Clock className="h-3 w-3" strokeWidth={2} />}
            label="Last run"
            value={`${formatDistanceToNowStrict(
              new Date(workflow.lastTriggeredAt)
            )} ago`}
          />
          <MetaItem
            icon={null}
            label="Owner"
            value={owner ? owner.name.split(" ")[0] : "—"}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center pt-1 border-t border-border/60 -mx-5 -mb-5 px-5 py-3 mt-auto">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            {workflow.status === "broken" ? (
              <>
                <Play className="h-3.5 w-3.5 mr-1" strokeWidth={2} />
                Resume
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 mr-1" strokeWidth={2} />
                Pause
              </>
            )}
          </Button>
          <Button
            size="sm"
            className="h-8 px-3 text-xs gap-1 ml-auto"
            onClick={() => setOpen(true)}
          >
            View details
            <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </Button>
        </div>
      </Card>

      <WorkflowDetailSheet
        workflow={workflow}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </div>
      <div className="font-mono text-sm font-bold tabular-nums text-foreground mt-0.5">
        {value}
      </div>
    </div>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
        {icon}
        {label}
      </div>
      <div className="text-[11px] font-mono font-semibold tabular-nums text-foreground mt-0.5 truncate">
        {value}
      </div>
    </div>
  );
}
