"use client";

import { Check, MessageCircle, Sparkles } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SectionTitle } from "@/components/dashboard/section-title";
import { EmptyState } from "@/components/dashboard/empty-state";
import { cn } from "@/lib/utils";

export type StrategyImprovement = {
  id: string;
  label: string;
  before?: string;
  after?: string;
};

export type StrategyStageState = "done" | "current" | "future";

export type StrategyStage = {
  id: string;
  label: string;
  state: StrategyStageState;
};

export type StrategyData = {
  stages: StrategyStage[];
  currentFocusHeadline: string | null;
  currentFocusItems: string[];
  stageLabel: string | null;
  weekN: number | null;
  weekOf: number | null;
  whatImproved: StrategyImprovement[];
  currentPriorities: string[];
  recommendedNextStep: string | null;
};

export function StrategyClient({ data }: { data: StrategyData }) {
  return (
    <TooltipProvider delay={150}>
      <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[1200px] mx-auto space-y-6">
        <header>
          <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
            Strategy
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            What Pulsor is improving in your operation.
          </p>
        </header>

        {/* ═══ 0 · STAGE TIMELINE ═══ */}
        {data.stages.length > 0 && (
          <section
            aria-label="Stage timeline"
            className="rounded-xl border border-border bg-card px-5 py-6 overflow-x-auto"
          >
            <StageTrack stages={data.stages} />
          </section>
        )}

        {/* ═══ 1 · CURRENT FOCUS ═══ */}
        <section aria-label="Current focus">
          {data.currentFocusHeadline ? (
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Current focus
                </span>
                {(data.stageLabel || (data.weekN && data.weekOf)) && (
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                    {data.stageLabel}
                    {data.stageLabel && data.weekN && data.weekOf && " · "}
                    {data.weekN && data.weekOf &&
                      `Week ${data.weekN} of ${data.weekOf}`}
                  </span>
                )}
              </div>
              <h2 className="text-base font-medium text-foreground tracking-tight">
                {data.currentFocusHeadline}
              </h2>
              {data.currentFocusItems.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {data.currentFocusItems.map((it, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-foreground/40 mt-[2px]">•</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <EmptyState
              title="No focus set yet"
              hint="Your Pulsor advisor will define this week's focus shortly."
            />
          )}
        </section>

        {/* ═══ 2 · WHAT IMPROVED ═══ */}
        <section aria-label="What improved" className="space-y-2">
          <SectionTitle
            title="What improved"
            tooltip="Visible operational progress this period."
          />
          {data.whatImproved.length === 0 ? (
            <EmptyState
              title="No improvements logged yet"
              hint="Measurable wins will surface here as the operation evolves."
            />
          ) : (
            <ul className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
              {data.whatImproved.map((it) => (
                <li
                  key={it.id}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                  <span className="text-sm text-foreground flex-1 truncate">
                    {it.label}
                  </span>
                  {(it.before || it.after) && (
                    <span className="font-mono text-xs tabular-nums text-muted-foreground shrink-0">
                      {it.before && <span>{it.before}</span>}
                      {it.before && it.after && (
                        <span className="mx-1.5 text-foreground/40">→</span>
                      )}
                      {it.after && (
                        <span className="text-success">{it.after}</span>
                      )}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ═══ 3 · CURRENT PRIORITIES ═══ */}
        <section aria-label="Current priorities" className="space-y-2">
          <SectionTitle
            title="Current priorities"
            tooltip="What the operation is working on right now."
          />
          {data.currentPriorities.length === 0 ? (
            <EmptyState
              title="No priorities set"
              hint="Priorities will appear here once defined."
            />
          ) : (
            <ul className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
              {data.currentPriorities.map((p, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                  <span className="text-sm text-foreground flex-1 truncate">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ═══ 4 · RECOMMENDED NEXT STEP ═══ */}
        {data.recommendedNextStep && (
          <section aria-label="Recommended next step">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles
                  className="h-3.5 w-3.5 text-foreground"
                  strokeWidth={2}
                  fill="currentColor"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Recommended next step
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {data.recommendedNextStep}
              </p>
            </div>
          </section>
        )}

        {/* ═══ 5 · SUPPORT ═══ */}
        <section aria-label="Support">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-foreground">
                Need support implementing this workflow?
              </p>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md",
                  "bg-foreground text-background text-xs font-medium",
                  "hover:bg-foreground/90 transition-colors"
                )}
              >
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                Talk to Pulsor
              </button>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}

function StageTrack({ stages }: { stages: StrategyStage[] }) {
  return (
    <ol className="flex items-start gap-0 min-w-[420px]">
      {stages.map((s, i) => {
        const reached = s.state === "done" || s.state === "current";
        const prevReached =
          i > 0 && (stages[i - 1].state === "done" || stages[i - 1].state === "current");
        return (
          <li
            key={s.id}
            className="flex-1 flex flex-col items-center text-center relative"
          >
            {i > 0 && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-3 right-1/2 left-[-50%] h-px",
                  prevReached && reached ? "bg-success" : "bg-border"
                )}
              />
            )}
            <StageDot state={s.state} />
            <span
              className={cn(
                "mt-2.5 text-[11px] font-semibold uppercase tracking-[0.12em]",
                s.state === "done" && "text-success",
                s.state === "current" && "text-foreground",
                s.state === "future" && "text-muted-foreground"
              )}
            >
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StageDot({ state }: { state: StrategyStageState }) {
  if (state === "done") {
    return (
      <span
        aria-label="Done"
        className="h-6 w-6 rounded-full bg-success text-background inline-flex items-center justify-center shrink-0 z-10"
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }
  if (state === "current") {
    return (
      <span
        aria-label="Current"
        className="h-6 w-6 rounded-full bg-foreground inline-flex items-center justify-center shrink-0 z-10 ring-4 ring-foreground/10"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-background" />
      </span>
    );
  }
  return (
    <span
      aria-label="Future"
      className="h-6 w-6 rounded-full border-2 border-muted-foreground/30 bg-background shrink-0 z-10 inline-block"
    />
  );
}
