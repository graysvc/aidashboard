"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ActionTag =
  | "URGENT"
  | "DEADLINE"
  | "WARNING"
  | "PERFORMANCE"
  | "HOT LEAD"
  | "OPPORTUNITY"
  | "WIN"
  | "INSIGHT"
  | "PATTERN"
  | "RECOMMENDATION"
  // Team Leader operational
  | "WORKFLOW BREAK"
  // Agent action verbs
  | "CALL NOW"
  | "FOLLOW UP"
  | "SEND DOCS"
  | "RE-ENGAGE"
  | "CHECK-IN"
  | "PRIORITY"
  | "REMINDER";

export type ActionCardData = {
  id: string;
  tag: ActionTag;
  summary: string;
  amount?: string;
  href?: string;
  onClick?: () => void;
  sortKey?: number;
};

const TAG_BAR: Record<ActionTag, string> = {
  URGENT: "bg-destructive",
  DEADLINE: "bg-destructive",
  WARNING: "bg-warning",
  PERFORMANCE: "bg-warning",
  "HOT LEAD": "bg-warning",
  OPPORTUNITY: "bg-warning",
  WIN: "bg-success",
  INSIGHT: "bg-sky-500",
  PATTERN: "bg-sky-500",
  RECOMMENDATION: "bg-muted-foreground/40",
  "WORKFLOW BREAK": "bg-warning",
  "CALL NOW": "bg-destructive",
  "FOLLOW UP": "bg-warning",
  "SEND DOCS": "bg-sky-500",
  "RE-ENGAGE": "bg-warning",
  "CHECK-IN": "bg-sky-500",
  PRIORITY: "bg-destructive",
  REMINDER: "bg-muted-foreground/40",
};

const TAG_LABEL: Record<ActionTag, string> = {
  URGENT: "Urgent",
  DEADLINE: "Deadline",
  WARNING: "Warning",
  PERFORMANCE: "Performance",
  "HOT LEAD": "Hot lead",
  OPPORTUNITY: "Opportunity",
  WIN: "Win",
  INSIGHT: "Insight",
  PATTERN: "Pattern",
  RECOMMENDATION: "Recommendation",
  "WORKFLOW BREAK": "Workflow break",
  "CALL NOW": "Call now",
  "FOLLOW UP": "Follow up",
  "SEND DOCS": "Send docs",
  "RE-ENGAGE": "Re-engage",
  "CHECK-IN": "Check-in",
  PRIORITY: "Priority",
  REMINDER: "Reminder",
};

const TAG_SHORT: Record<ActionTag, string> = {
  URGENT: "URG",
  DEADLINE: "DUE",
  WARNING: "WRN",
  PERFORMANCE: "PRF",
  "HOT LEAD": "HOT",
  OPPORTUNITY: "OPP",
  WIN: "WIN",
  INSIGHT: "INS",
  PATTERN: "PTN",
  RECOMMENDATION: "REC",
  "WORKFLOW BREAK": "BRK",
  "CALL NOW": "CALL",
  "FOLLOW UP": "FUP",
  "SEND DOCS": "DOC",
  "RE-ENGAGE": "RE",
  "CHECK-IN": "CHK",
  PRIORITY: "PRI",
  REMINDER: "RMD",
};

const TAG_TEXT: Record<ActionTag, string> = {
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

/**
 * Compact action row, fully clickable.
 * Layout: [TAG] · [optional amount] · summary · [✓]
 * The ✓ button toggles a local "done" state — strikethrough + muted.
 */
export function ActionCard({ data }: { data: ActionCardData }) {
  const [done, setDone] = useState(false);

  return (
    <li className="relative">
      {/* Left color bar — replaces the uppercase tag column */}
      <span
        aria-label={TAG_LABEL[data.tag]}
        title={TAG_LABEL[data.tag]}
        className={cn(
          "absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-sm",
          TAG_BAR[data.tag]
        )}
      />
      <a
        href={data.href ?? "#"}
        onClick={
          data.onClick
            ? (e) => {
                e.preventDefault();
                data.onClick?.();
              }
            : undefined
        }
        className={cn(
          "flex items-center gap-3 pl-5 pr-4 py-2.5 hover:bg-muted/40 transition-colors group",
          done && "opacity-55"
        )}
      >
        <span
          className={cn(
            "font-mono text-[11px] font-semibold tabular-nums w-9 shrink-0",
            TAG_TEXT[data.tag]
          )}
          title={TAG_LABEL[data.tag]}
        >
          {TAG_SHORT[data.tag]}
        </span>
        {data.amount && (
          <span className="font-mono text-sm tabular-nums text-foreground w-20 shrink-0">
            {data.amount}
          </span>
        )}
        <p
          className={cn(
            "text-sm text-foreground flex-1 min-w-0 truncate",
            done && "line-through"
          )}
        >
          {data.summary}
        </p>
        <button
          type="button"
          aria-label={done ? "Mark as pending" : "Mark as done"}
          title={done ? "Mark as pending" : "Mark as done"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDone((d) => !d);
          }}
          className={cn(
            "h-6 w-6 inline-flex items-center justify-center rounded-md border shrink-0 transition-colors",
            done
              ? "bg-success border-success text-background"
              : "border-border text-muted-foreground/50 hover:border-foreground hover:text-foreground"
          )}
        >
          <Check className="h-3 w-3" strokeWidth={2.5} />
        </button>
        <ArrowRight
          className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground transition-colors shrink-0 ml-1"
          strokeWidth={1.75}
        />
      </a>
    </li>
  );
}
