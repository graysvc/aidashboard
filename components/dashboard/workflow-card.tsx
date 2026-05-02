"use client";

import { Fragment, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock,
  DollarSign,
  Pause,
  Play,
} from "lucide-react";
import { BrandIcon } from "@/components/onboarding/brand-icon";
import type { Workflow, WorkflowStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  buildNarrativeLine,
  formatHours,
  timeSavedHours,
} from "@/lib/workflows/manual-time";
import { WorkflowDetailSheet } from "./workflow-detail-sheet";

const STATUS_CONFIG: Record<
  WorkflowStatus,
  { label: string; dot: string; text: string }
> = {
  performing: {
    label: "Performing",
    dot: "bg-success",
    text: "text-success",
  },
  healthy: {
    label: "Healthy",
    dot: "bg-primary",
    text: "text-primary",
  },
  underperforming: {
    label: "Underperforming",
    dot: "bg-warning",
    text: "text-warning",
  },
  broken: {
    label: "Broken",
    dot: "bg-destructive",
    text: "text-destructive",
  },
};

function formatCompactCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return n > 0 ? `$${n}` : "-";
}

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const [open, setOpen] = useState(false);
  const status = STATUS_CONFIG[workflow.status];
  const isUp = workflow.weeklyChange >= 0;
  const hours = timeSavedHours(workflow);
  const narrative = buildNarrativeLine(workflow);

  return (
    <>
      <Card className="p-5 bg-card border-border/50 hover:border-border transition-all flex flex-col gap-4">
        {/* Header: status + delta pill */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className={cn("h-2 w-2 rounded-full shrink-0", status.dot)} />
            <span className={cn("text-[11px] font-medium", status.text)}>
              {status.label}
            </span>
          </div>
          {workflow.status !== "broken" && workflow.weeklyChange !== 0 && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-mono text-[11px] font-medium tabular-nums shrink-0",
                isUp
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
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

        {/* Title + 1-line description */}
        <div>
          <h3 className="text-sm font-semibold leading-tight text-foreground">
            {workflow.name}
          </h3>
          <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-1">
            {workflow.description}
          </p>
        </div>

        {/* Flow chip */}
        <div className="flex items-center gap-2 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 overflow-x-auto">
          {workflow.tools.map((tool, idx) => (
            <Fragment key={tool}>
              <div className="flex items-center gap-1.5 shrink-0">
                <BrandIcon name={tool} size={20} />
                <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                  {tool}
                </span>
              </div>
              {idx < workflow.tools.length - 1 && (
                <ArrowRight
                  className="h-3 w-3 text-muted-foreground/40 shrink-0"
                  strokeWidth={2}
                />
              )}
            </Fragment>
          ))}
        </div>

        {/* Hero metrics */}
        <div className="grid grid-cols-2 gap-3">
          <HeroMetric
            icon={<Clock className="h-4 w-4" strokeWidth={1.75} />}
            iconClass="bg-success/10 text-success"
            value={formatHours(hours)}
            label="saved this month"
          />
          <HeroMetric
            icon={<DollarSign className="h-4 w-4" strokeWidth={1.75} />}
            iconClass="bg-primary/10 text-primary"
            value={formatCompactCurrency(workflow.metrics.revenueAttributed)}
            label="pipeline driven"
          />
        </div>

        {/* Narrative line */}
        <p className="text-xs text-muted-foreground/70 leading-snug">
          {narrative}
        </p>

        {/* Footer */}
        <div className="flex items-center pt-3 border-t border-border/30 mt-auto">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
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
            className="h-7 px-3 text-xs gap-1 ml-auto bg-primary/10 text-primary hover:bg-primary/20 border-0"
            onClick={() => setOpen(true)}
          >
            Details
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

function HeroMetric({
  icon,
  iconClass,
  value,
  label,
}: {
  icon: React.ReactNode;
  iconClass: string;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-border/30 bg-muted/20 p-3 flex items-center gap-3">
      <span
        className={cn(
          "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
          iconClass
        )}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="font-mono text-base font-semibold tabular-nums text-foreground leading-none">
          {value}
        </div>
        <div className="text-[10px] text-muted-foreground/60 mt-1 leading-tight">
          {label}
        </div>
      </div>
    </div>
  );
}
