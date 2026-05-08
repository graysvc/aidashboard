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
  | "RECOMMENDATION";

export type ActionCardData = {
  id: string;
  tag: ActionTag;
  summary: string;
  amount?: string;
  href?: string;
  onClick?: () => void;
  sortKey?: number;
};

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
};

/**
 * Compact action row, fully clickable.
 * Layout: [TAG] · [optional amount] · summary · [✓]
 * The ✓ button toggles a local "done" state — strikethrough + muted.
 */
export function ActionCard({ data }: { data: ActionCardData }) {
  const [done, setDone] = useState(false);

  return (
    <li>
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
          "flex items-center gap-4 px-4 py-2.5 hover:bg-muted/40 transition-colors group",
          done && "opacity-55"
        )}
      >
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.12em] w-28 shrink-0",
            TAG_COLOR[data.tag]
          )}
        >
          {data.tag}
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
