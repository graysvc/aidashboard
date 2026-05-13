"use client";

import { cn } from "@/lib/utils";
import type { ActionTag } from "@/components/dashboard/action-card";

const TAG_COLOR: Record<ActionTag, string> = {
  URGENT: "text-destructive",
  DEADLINE: "text-destructive",
  WARNING: "text-warning",
  PERFORMANCE: "text-warning",
  "HOT LEAD": "text-warning",
  OPPORTUNITY: "text-warning",
  WIN: "text-success",
  INSIGHT: "text-sky-600",
  PATTERN: "text-sky-600",
  RECOMMENDATION: "text-muted-foreground",
  "WORKFLOW BREAK": "text-warning",
  "CALL NOW": "text-destructive",
  "FOLLOW UP": "text-warning",
  "SEND DOCS": "text-sky-600",
  "RE-ENGAGE": "text-warning",
  "CHECK-IN": "text-sky-600",
  PRIORITY: "text-destructive",
  REMINDER: "text-muted-foreground",
};

export type ActionCardExpandedData = {
  id: string;
  tag: ActionTag;
  amount?: string;
  title: string;
  meta: string;
  actions?: { label: string; primary?: boolean; href?: string }[];
};

/**
 * Expanded action row used in deep verticals (Sales pipeline, etc.).
 * Layout:
 *   [TAG]                                           [AMOUNT]
 *   Title (one line, key info)
 *   Meta (agent · stage · last activity)
 *   [Primary]  [Secondary]
 */
export function ActionCardExpanded({ data }: { data: ActionCardExpandedData }) {
  return (
    <li className="px-5 py-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.12em]",
            TAG_COLOR[data.tag]
          )}
        >
          {data.tag}
        </span>
        {data.amount && (
          <span className="font-mono text-sm tabular-nums text-foreground">
            {data.amount}
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-foreground mt-1.5 leading-snug">
        {data.title}
      </p>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
        {data.meta}
      </p>
      {data.actions && data.actions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {data.actions.map((a) => (
            <a
              key={a.label}
              href={a.href ?? "#"}
              className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                a.primary
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "border border-border text-foreground hover:bg-muted/60"
              )}
            >
              {a.label}
            </a>
          ))}
        </div>
      )}
    </li>
  );
}
