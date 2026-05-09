"use client";

import { ArrowRight, AlertTriangle } from "lucide-react";
import { dashboardData } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PeriodSelector, usePeriod } from "@/components/dashboard/period-selector";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusTile } from "@/components/dashboard/status-tile";
import { SectionTitle } from "@/components/dashboard/section-title";
import {
  ActionCard,
  type ActionCardData,
} from "@/components/dashboard/action-card";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { user, agents } = dashboardData;
  const firstName = user.name.split(" ")[0];
  const period = usePeriod();
  const isEmptyRange = period >= 30; // mocked: only 7/15 days have data

  // ───── Section 1 — Team status TODAY (3 numbers) ─────
  const totalPipeline = agents.reduce(
    (a, x) => a + x.metrics.pipelineValue,
    0
  );
  const leadsAtRisk = 7; // mock: leads sin contacto >48h
  const closedThisMonth = 3;
  const closedTarget = 5;

  // ───── Section 2 — Pulsor insights (curated; top 5 visible, rest in /insights) ─────
  const HOME_INSIGHTS_LIMIT = 5;
  const allInsights: ActionCardData[] = [
    {
      id: "act-1",
      tag: "URGENT",
      summary: "$850K lead — no response 3 days · María Fernández",
    },
    {
      id: "act-2",
      tag: "PERFORMANCE",
      summary: "Pedro García — 5 leads, 0 contacted this week",
    },
    {
      id: "act-3",
      tag: "WIN",
      summary: "Ana Torres closed a $1.2M deal · Pacific Heights",
    },
    {
      id: "act-4",
      tag: "HOT LEAD",
      summary: "$4M project sale — 3 IDX visits, no agent assigned",
    },
    {
      id: "act-5",
      tag: "DEADLINE",
      summary: `Month-end in 4 days — ${closedThisMonth}/${closedTarget} closed · $1.8M in escrow`,
    },
    {
      id: "act-6",
      tag: "WARNING",
      summary: "Inversor Bolivia — no follow-up after showing 6d ago",
    },
    {
      id: "act-7",
      tag: "INSIGHT",
      summary: "Bolivia leads close 2.5× faster than average",
    },
    {
      id: "act-8",
      tag: "OPPORTUNITY",
      summary: "Coral Way penthouse — premium buyer profile, 88% close score",
    },
    {
      id: "act-9",
      tag: "PATTERN",
      summary: "Win rate drops 40% when 'Showing' exceeds 14 days",
    },
    {
      id: "act-10",
      tag: "RECOMMENDATION",
      summary: "Reassign 3 stalled deals from Pedro to Sarah",
    },
    {
      id: "act-11",
      tag: "WIN",
      summary: "Carlos identified Bolivia pattern — 3× conversion",
    },
    {
      id: "act-12",
      tag: "WARNING",
      summary: "Tech founder — inspection findings unanswered 4d",
    },
  ];
  const todayActions = allInsights.slice(0, HOME_INSIGHTS_LIMIT);
  const remainingInsights = allInsights.length - todayActions.length;

  // ───── Section 2.5 — This week goal (deals committed to close) ─────
  const weekGoal: ActionCardData[] = [
    {
      id: "wg-1",
      tag: "HOT LEAD",
      amount: "$4.2M",
      summary: "Carlos Mendez · Visit Friday · Sarah M.",
      sortKey: 4_200_000,
    },
    {
      id: "wg-2",
      tag: "HOT LEAD",
      amount: "$2.8M",
      summary: "Familia Rodríguez · Negotiation · James C.",
      sortKey: 2_800_000,
    },
    {
      id: "wg-3",
      tag: "WARNING",
      amount: "$1.5M",
      summary: "Inversor Bolivia · Decision Wed · Priya S.",
      sortKey: 1_500_000,
    },
    {
      id: "wg-4",
      tag: "HOT LEAD",
      amount: "$980K",
      summary: "Project Brickell · Tour scheduled · Marcus",
      sortKey: 980_000,
    },
    {
      id: "wg-5",
      tag: "HOT LEAD",
      amount: "$650K",
      summary: "Pareja NY · First contact · Emma O.",
      sortKey: 650_000,
    },
  ];
  weekGoal.sort((a, b) => (b.sortKey ?? 0) - (a.sortKey ?? 0));

  // ───── Section 3 — Team quick view (5-dot health, 1 line each) ─────
  const teamRows = agents.slice(0, 6).map((a) => {
    const dots = Math.max(1, Math.min(5, Math.round(a.aiAdoptionScore / 20)));
    return {
      id: a.id,
      name: a.name,
      initials: a.initials,
      avatarUrl: a.avatarUrl,
      avatarColor: a.avatarColor,
      dots,
      pipeline: a.metrics.pipelineValue,
      note: deriveNote(a),
    };
  });

  return (
    <TooltipProvider delay={150}>
    <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
            Good morning, {firstName}.
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            What needs your attention today.
          </p>
        </div>
        <PeriodSelector />
      </header>

      {/* ═══ 1 · TEAM STATUS — 3 numbers ═══ */}
      <section aria-label="Team status today" className="space-y-2">
        <SectionTitle
          title="Team status"
          tooltip="How your business is doing today at a glance."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatusTile
            label="Active pipeline"
            value={formatCompactCurrency(totalPipeline)}
            deltaText="Total in negotiation · +12% vs last month"
            tone="neutral"
            tooltip="Sum of estimated value of all active deals across your team (from first contact through close). Excludes closed and lost deals."
          />
          <StatusTile
            label="Leads at risk"
            value={`${leadsAtRisk}`}
            deltaText="No contact > 48h"
            tone="critical"
            href="/sales?filter=at-risk"
            tooltip="Active leads that haven't been followed up by their assigned agent in over 48 hours. Close probability drops 50% after 72 hours of silence."
          />
          <StatusTile
            label="Closes this month"
            value={`${closedThisMonth} / ${closedTarget}`}
            deltaText={`${Math.round((closedThisMonth / closedTarget) * 100)}% of target`}
            tone={closedThisMonth >= closedTarget ? "success" : "warning"}
            tooltip="Deals closed this month versus the team's monthly target. Updates in real time when a deal moves to 'closed'."
          />
        </div>
      </section>

      {/* ═══ 2 · PULSOR INSIGHTS ═══ */}
      <section aria-label="Pulsor insights" className="space-y-2">
        <SectionTitle
          title="Pulsor insights"
          tooltip="What Pulsor surfaced for you to act on today."
          right={
            !isEmptyRange && (
              <span className="font-mono text-xs tabular-nums text-muted-foreground shrink-0">
                {allInsights.length} pending
              </span>
            )
          }
        />
        {isEmptyRange ? (
          <EmptyState
            title={`No insights in last ${period} days`}
            hint="Try a shorter range or wait for new signals."
          />
        ) : (
          <>
            <ul className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
              {todayActions.map((a) => (
                <ActionCard key={a.id} data={a} />
              ))}
            </ul>
            {remainingInsights > 0 && (
              <a
                href="/insights"
                className="inline-flex items-center justify-center w-full gap-1.5 rounded-lg border border-border/70 bg-card hover:bg-muted/50 hover:border-foreground/30 px-4 py-2.5 text-xs font-medium text-foreground transition-colors"
              >
                +{remainingInsights} more in Insights
                <ArrowRight className="h-3 w-3" strokeWidth={2} />
              </a>
            )}
          </>
        )}
      </section>

      {/* ═══ 2.5 · THIS WEEK GOAL ═══ */}
      <section aria-label="This week goal" className="space-y-2">
        <SectionTitle
          title="This week goal"
          tooltip="Deals you committed to close this week."
          right={
            !isEmptyRange && (
              <span className="font-mono text-xs tabular-nums text-muted-foreground shrink-0">
                {weekGoal.length} to close
              </span>
            )
          }
        />
        {isEmptyRange ? (
          <EmptyState
            title={`No deals committed in last ${period} days`}
            hint="Switch to a shorter range to see active commitments."
          />
        ) : (
          <ul className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
            {weekGoal.map((a) => (
              <ActionCard key={a.id} data={a} />
            ))}
          </ul>
        )}
      </section>

      {/* ═══ 3 · TEAM QUICK VIEW ═══ */}
      <section aria-label="Team this week" className="space-y-2">
        <SectionTitle
          title="My team this week"
          tooltip="Quick agent status — click any name for the full breakdown."
          right={
            <a
              href="/team"
              className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 shrink-0"
            >
              View full detail
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </a>
          }
        />
        <ul className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
          {teamRows.map((r) => (
            <li key={r.id} className="flex items-center gap-3 px-4 py-2.5">
              <Avatar className="h-7 w-7 shrink-0">
                {r.avatarUrl && <AvatarImage src={r.avatarUrl} alt={r.name} />}
                <AvatarFallback
                  className={cn(
                    "text-white text-[11px] font-semibold",
                    r.avatarColor
                  )}
                >
                  {r.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground w-32 shrink-0 truncate">
                {r.name}
              </span>
              <HealthLabel count={r.dots} />
              <span className="font-mono text-xs tabular-nums text-foreground w-24 shrink-0">
                {formatCompactCurrency(r.pipeline)}
              </span>
              <Tooltip>
                <TooltipTrigger className="text-xs text-muted-foreground truncate flex-1 cursor-help text-left">
                  {r.note.text}
                  {r.note.warning && (
                    <AlertTriangle
                      className="inline-block h-3 w-3 ml-1 text-warning"
                      strokeWidth={2}
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent className="max-w-[280px] text-left leading-relaxed">
                  {r.note.tooltip}
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </section>
    </div>
    </TooltipProvider>
  );
}

// ───── Helpers / building blocks ─────

function formatCompactCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

// ────────── Health label (text replaces 5-dot indicator)

const HEALTH_LABEL: Record<
  number,
  { label: string; className: string }
> = {
  5: { label: "Top performer", className: "text-success" },
  4: { label: "Strong", className: "text-foreground" },
  3: { label: "Steady", className: "text-foreground" },
  2: { label: "Needs attention", className: "text-warning" },
  1: { label: "At risk", className: "text-destructive" },
};

function HealthLabel({ count }: { count: number }) {
  const meta = HEALTH_LABEL[count] ?? HEALTH_LABEL[3];
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "text-xs font-medium w-32 shrink-0 cursor-help text-left",
          meta.className
        )}
        aria-label={`Health: ${meta.label}`}
      >
        {meta.label}
      </TooltipTrigger>
      <TooltipContent className="max-w-[280px] text-left leading-relaxed">
        Activity & results indicator for this week. Combines: leads contacted,
        appointments set, deals advanced, and closes.
      </TooltipContent>
    </Tooltip>
  );
}

// ────────── Per-agent narrative note (deterministic from metrics)

function deriveNote(a: typeof dashboardData.agents[number]): {
  text: string;
  warning: boolean;
  tooltip: string;
} {
  if (a.metrics.activeDeals === 0) {
    return {
      text: "No active deals",
      warning: true,
      tooltip:
        "Agent has no leads or deals currently active. May need re-engagement or coaching.",
    };
  }
  if (a.aiAdoptionScore < 50) {
    return {
      text: "Underperforming",
      warning: true,
      tooltip:
        "Performance dropped significantly vs the agent's last 2–4 weeks or vs the team average.",
    };
  }
  if (a.metrics.activeDeals >= 8) {
    return {
      text: `Closing ${a.metrics.activeDeals} deals`,
      warning: false,
      tooltip:
        "Deals in 'closing' or 'under contract' stages expected to close this month.",
    };
  }
  if (a.metrics.activeDeals >= 4) {
    return {
      text: `${a.metrics.activeDeals} deals in progress`,
      warning: false,
      tooltip:
        "Active deals advancing through the pipeline at a healthy pace.",
    };
  }
  return {
    text: `${a.metrics.activeDeals} deal in escrow`,
    warning: false,
    tooltip: "Single deal currently in escrow — closure expected soon.",
  };
}
