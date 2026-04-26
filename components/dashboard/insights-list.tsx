"use client";

import { useMemo, useState } from "react";
import type { Insight, InsightPriority, InsightState } from "@/lib/types";
import { InsightCardDetail } from "./insight-card-detail";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

type Filter = "all" | InsightState;
type PriorityFilter = "all" | InsightPriority;

const PRIORITY_RANK: Record<InsightPriority, number> = {
  critical: 0,
  warning: 1,
  success: 2,
  neutral: 3,
};

const STATE_RANK: Record<InsightState, number> = {
  pending: 0,
  implemented: 1,
  ignored: 2,
};

export function InsightsList({ insights }: { insights: Insight[] }) {
  const [stateFilter, setStateFilter] = useState<Filter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const counts = useMemo(() => {
    return {
      all: insights.length,
      pending: insights.filter((i) => i.state === "pending").length,
      implemented: insights.filter((i) => i.state === "implemented").length,
      ignored: insights.filter((i) => i.state === "ignored").length,
    };
  }, [insights]);

  const filtered = useMemo(() => {
    return insights
      .filter((i) => stateFilter === "all" || i.state === stateFilter)
      .filter((i) => priorityFilter === "all" || i.priority === priorityFilter)
      .sort((a, b) => {
        const stateDiff = STATE_RANK[a.state] - STATE_RANK[b.state];
        if (stateDiff !== 0) return stateDiff;
        const prioDiff = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
        if (prioDiff !== 0) return prioDiff;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  }, [insights, stateFilter, priorityFilter]);

  const stateChips: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "All", count: counts.all },
    { value: "pending", label: "Pending", count: counts.pending },
    { value: "implemented", label: "Implemented", count: counts.implemented },
    { value: "ignored", label: "Ignored", count: counts.ignored },
  ];

  const priorityChips: { value: PriorityFilter; label: string; dot: string }[] =
    [
      { value: "all", label: "Any priority", dot: "bg-muted-foreground/40" },
      { value: "critical", label: "Critical", dot: "bg-rose-500" },
      { value: "warning", label: "Warning", dot: "bg-amber-500" },
      { value: "success", label: "Opportunity", dot: "bg-emerald-500" },
      { value: "neutral", label: "FYI", dot: "bg-sky-500" },
    ];

  return (
    <div className="space-y-5">
      {/* Filter chips */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {stateChips.map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setStateFilter(chip.value)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                stateFilter === chip.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-foreground/30"
              )}
            >
              {chip.label}
              <span
                className={cn(
                  "font-mono tabular-nums text-[10px]",
                  stateFilter === chip.value
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                )}
              >
                {chip.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {priorityChips.map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setPriorityFilter(chip.value)}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors",
                priorityFilter === chip.value
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", chip.dot)} />
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-lg bg-card">
          <Inbox
            className="h-9 w-9 text-muted-foreground/40 mb-3"
            strokeWidth={1.5}
          />
          <p className="text-sm font-medium text-foreground">
            No insights match this filter
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try a different combination, or clear the priority filter.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((insight) => (
            <InsightCardDetail key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </div>
  );
}
