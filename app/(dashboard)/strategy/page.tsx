"use client";

import { Check, Calendar, MessageCircle } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type MilestoneState = "done" | "current" | "future";

type Milestone = {
  id: string;
  label: string;
  date: string;
  state: MilestoneState;
};

const MILESTONES: Milestone[] = [
  { id: "m-onboarding", label: "Onboarding", date: "Apr 15", state: "done" },
  { id: "m-audit", label: "Audit", date: "Apr 22", state: "done" },
  { id: "m-monthly", label: "Optimization", date: "May 1 – 28", state: "current" },
  { id: "m-mid-q", label: "Mid-quarter", date: "May 28", state: "future" },
  { id: "m-q2-final", label: "Q2 review", date: "Jun 30", state: "future" },
];

export default function StrategyPage() {
  // Current focus
  const goalCurrent = 54_000_000;
  const goalTarget = 80_000_000;
  const goalPct = Math.round((goalCurrent / goalTarget) * 100);
  const initiatives: { id: string; label: string; state: MilestoneState }[] = [
    { id: "i-1", label: "Bolivia priority workflow", state: "done" },
    { id: "i-2", label: "Sarah's lead reassignment", state: "current" },
    { id: "i-3", label: "Q2 international expansion", state: "future" },
  ];

  return (
    <TooltipProvider delay={150}>
      <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[1200px] mx-auto space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
            Strategy
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your journey with Pulsor — past, present, and what&apos;s next.
          </p>
        </header>

        {/* Journey timeline */}
        <section className="rounded-xl border border-border bg-card p-5 overflow-x-auto">
          <Timeline milestones={MILESTONES} />
        </section>

        {/* Current focus */}
        <section className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-sm font-medium text-foreground">
              Current focus · Optimization
            </h2>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              Day 12 of 28
            </span>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Q2 pipeline goal
            </div>
            <div className="relative h-3 mt-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-success rounded-full"
                style={{ width: `${goalPct}%` }}
              />
            </div>
          </div>

          <ul className="space-y-1.5 pt-1">
            {initiatives.map((i) => (
              <li
                key={i.id}
                className="flex items-center gap-2.5 text-sm text-foreground"
              >
                <StateDot state={i.state} size="sm" />
                <span
                  className={cn(
                    i.state === "future" && "text-muted-foreground"
                  )}
                >
                  {i.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Action items from last review */}
        <section className="rounded-xl border border-border bg-card p-5 space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-sm font-medium text-foreground">
              Action items from last review
            </h2>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              Apr 28
            </span>
          </div>
          <ul className="space-y-1.5">
            {[
              { id: "ai-1", label: "Implement Bolivia priority workflow", state: "done" as const },
              { id: "ai-2", label: "Reassign 3 stalled deals to Sarah", state: "done" as const },
              { id: "ai-3", label: "Define Q2 reach goals for international market", state: "future" as const },
              { id: "ai-4", label: "Test new lead qualification script", state: "future" as const },
            ].map((i) => (
              <li
                key={i.id}
                className="flex items-center gap-2.5 text-sm text-foreground"
              >
                <StateDot state={i.state} size="sm" />
                <span
                  className={cn(
                    i.state === "future" && "text-muted-foreground"
                  )}
                >
                  {i.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Next milestone */}
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-sm font-medium text-foreground">
              Next · Mid-quarter review
            </h2>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              May 28 · 21d away
            </span>
          </div>
        </section>

        {/* Need help before next session */}
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-medium text-foreground">
                Need help before next session?
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Reach your advisor anytime — don&apos;t wait for the next review.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
              >
                <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
                Schedule emergency session
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                Talk to your advisor
              </button>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}

// ────────── Timeline (horizontal) ──────────

function Timeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <ol className="flex items-start gap-0 min-w-[560px]">
      {milestones.map((m, i) => (
        <li
          key={m.id}
          className="flex-1 flex flex-col items-center text-center relative"
        >
          {i > 0 && (
            <span
              className={cn(
                "absolute top-3 right-1/2 left-[-50%] h-px",
                m.state === "done" || m.state === "current"
                  ? "bg-success"
                  : "bg-border"
              )}
              aria-hidden
            />
          )}
          <StateDot state={m.state} />
          <div className="mt-2.5 px-1">
            <div
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.12em]",
                m.state === "done"
                  ? "text-success"
                  : m.state === "current"
                    ? "text-foreground"
                    : "text-muted-foreground"
              )}
            >
              {m.label}
            </div>
            <div className="text-[11px] font-mono tabular-nums text-muted-foreground mt-0.5">
              {m.date}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ────────── State dot (✓ / ● / ○) ──────────

function StateDot({
  state,
  size = "md",
}: {
  state: MilestoneState;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-3.5 w-3.5" : "h-6 w-6";
  if (state === "done") {
    return (
      <span
        className={cn(
          "rounded-full bg-success text-background inline-flex items-center justify-center shrink-0 z-10",
          dim
        )}
        aria-label="Done"
      >
        <Check
          className={size === "sm" ? "h-2 w-2" : "h-3 w-3"}
          strokeWidth={3}
        />
      </span>
    );
  }
  if (state === "current") {
    return (
      <span
        className={cn(
          "rounded-full bg-foreground inline-flex items-center justify-center shrink-0 z-10 ring-4 ring-foreground/10",
          dim
        )}
        aria-label="In progress"
      >
        <span
          className={cn(
            "rounded-full bg-background",
            size === "sm" ? "h-1 w-1" : "h-1.5 w-1.5"
          )}
        />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "rounded-full border-2 border-muted-foreground/30 bg-background shrink-0 z-10 inline-block",
        dim
      )}
      aria-label="Future"
    />
  );
}
