"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Info,
  RotateCcw,
  Sparkles,
  TriangleAlert,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Insight, InsightPriority, InsightState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";

const PRIORITY_STYLES: Record<
  InsightPriority,
  {
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
    border: string;
    label: string;
    labelColor: string;
  }
> = {
  critical: {
    icon: AlertCircle,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100",
    border: "border-l-rose-500",
    label: "Critical",
    labelColor: "text-rose-600",
  },
  warning: {
    icon: TriangleAlert,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
    border: "border-l-amber-500",
    label: "Warning",
    labelColor: "text-amber-600",
  },
  success: {
    icon: Sparkles,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    border: "border-l-emerald-500",
    label: "Opportunity",
    labelColor: "text-emerald-600",
  },
  neutral: {
    icon: Info,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
    border: "border-l-sky-500",
    label: "FYI",
    labelColor: "text-sky-600",
  },
};

const STATE_BADGE: Record<
  InsightState,
  { label: string; icon: LucideIcon; className: string } | null
> = {
  pending: null,
  implemented: {
    label: "Implemented",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  ignored: {
    label: "Ignored",
    icon: XCircle,
    className: "bg-muted text-muted-foreground border-border",
  },
};

export function InsightCardDetail({ insight }: { insight: Insight }) {
  const styles = PRIORITY_STYLES[insight.priority];
  const Icon = styles.icon;
  const stateBadge = STATE_BADGE[insight.state];
  const isMuted = insight.state !== "pending";

  return (
    <article
      className={cn(
        "group flex flex-col rounded-xl border border-border/70 border-l-[3px] p-5 shadow-sm transition-all hover:shadow-md bg-card",
        styles.border,
        isMuted && "opacity-80"
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            styles.iconBg
          )}
        >
          <Icon className={cn("h-5 w-5", styles.iconColor)} strokeWidth={2} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider",
                styles.labelColor
              )}
            >
              {styles.label} · {insight.category}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {stateBadge && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                    stateBadge.className
                  )}
                >
                  <stateBadge.icon className="h-3 w-3" strokeWidth={2.5} />
                  {stateBadge.label}
                </span>
              )}
              <span className="text-[10px] text-muted-foreground font-mono tabular-nums">
                {formatDistanceToNowStrict(new Date(insight.createdAt))} ago
              </span>
            </div>
          </div>
          <h3 className="text-base font-semibold leading-tight text-foreground mt-1">
            {insight.title}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground pl-[52px]">
        {insight.description}
      </p>

      {insight.evidence && (
        <p className="mt-3 ml-[52px] font-mono text-[11px] text-muted-foreground/80 tabular-nums bg-muted/40 px-2.5 py-1.5 rounded-md inline-block w-fit max-w-full">
          {insight.evidence}
        </p>
      )}

      <div className="mt-4 pl-[52px] flex items-center gap-2 flex-wrap">
        {insight.state === "pending" ? (
          <>
            <Button size="sm" className="h-8 px-3 text-xs gap-1">
              {insight.primaryAction.label}
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </Button>
            {insight.secondaryAction && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground"
              >
                {insight.secondaryAction.label}
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs gap-1"
            >
              <RotateCcw className="h-3 w-3" strokeWidth={2} />
              Restore
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground"
            >
              View details
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
