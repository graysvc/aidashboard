"use client";

import { useState } from "react";
import { dashboardData } from "@/lib/mock-data";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PeriodSelector } from "@/components/dashboard/period-selector";
import { PipelineTrendChart } from "@/components/dashboard/pipeline-trend-chart";
import { LeadsBySourceChart } from "@/components/dashboard/leads-by-source-chart";
import { PipelineStageChart } from "@/components/dashboard/pipeline-stage-chart";
import {
  ActionCard,
  type ActionCardData,
} from "@/components/dashboard/action-card";
import {
  ActionCardExpanded,
  type ActionCardExpandedData,
} from "@/components/dashboard/action-card-expanded";
import { cn } from "@/lib/utils";

type DealTab = "at-risk" | "closing-week" | "hot" | "all-active";

export default function SalesPage() {
  const { period, agents, pipelineTrend, leadsBySource, pipelineByStage } =
    dashboardData;
  const [activeTab, setActiveTab] = useState<DealTab>("at-risk");

  // ───── Performance snapshot (one line, derived from agents) ─────
  const totalActive = agents.reduce((a, x) => a + x.metrics.activeDeals, 0);
  const totalPipeline = agents.reduce((a, x) => a + x.metrics.pipelineValue, 0);
  const totalClosedYTD = agents.reduce(
    (a, x) => a + x.metrics.dealsClosedYTD,
    0
  );
  const totalLeads = agents.reduce((a, x) => a + x.metrics.leadsThisMonth, 0);
  const winRate = totalLeads > 0 ? (totalClosedYTD / totalLeads) * 100 : 0;
  const closedThisMonth = "$4.2M"; // mock
  const snapshotLine = `${formatCompactCurrency(
    totalPipeline
  )} pipeline · ${totalActive} deals · ${winRate.toFixed(
    1
  )}% win rate · ${closedThisMonth} closed this month`;

  // ───── Pulsor insights (sales-specific) ─────
  const insights: ActionCardData[] = [
    {
      id: "si-1",
      tag: "INSIGHT",
      amount: "$3.8M",
      summary: "Deals from Bolivia close 2.5× faster than average",
    },
    {
      id: "si-2",
      tag: "PATTERN",
      amount: "$12M",
      summary: "Win rate drops 40% when 'Showing' exceeds 14 days",
    },
    {
      id: "si-3",
      tag: "WARNING",
      amount: "$5.2M",
      summary: "3 deals stalled at 'Negotiation' — typical close 7d",
    },
    {
      id: "si-4",
      tag: "OPPORTUNITY",
      amount: "$8.4M",
      summary: "$4M+ deals: 60% win rate when assigned to Sarah",
    },
  ];

  // ───── Active deals by tab ─────
  const dealsByTab: Record<DealTab, ActionCardExpandedData[]> = {
    "at-risk": [
      {
        id: "ar-1",
        tag: "URGENT",
        amount: "$850K",
        title: "Carlos Mendez — no update from agent 5 days",
        meta: "Sarah Mitchell · Stage: Negotiation · Last activity: 5d ago",
        actions: [
          { label: "View deal", primary: true },
          { label: "Ping Sarah" },
        ],
      },
      {
        id: "ar-2",
        tag: "WARNING",
        amount: "$4.2M",
        title: "Familia Rodríguez — stalled in Negotiation 12 days",
        meta: "James Carter · Stage: Negotiation · Typical close: 7 days",
        actions: [
          { label: "View deal", primary: true },
          { label: "Push to next stage" },
        ],
      },
      {
        id: "ar-3",
        tag: "URGENT",
        amount: "$2.1M",
        title: "Pareja NY — contract expires Friday",
        meta: "Priya Shah · Stage: Under Contract · 3 days remaining",
        actions: [
          { label: "View deal", primary: true },
          { label: "Ping Priya" },
        ],
      },
      {
        id: "ar-4",
        tag: "WARNING",
        amount: "$1.5M",
        title: "Inversor Bolivia — no follow-up after showing",
        meta: "Marcus Reyes · Stage: Showing · Last activity: 6d ago",
        actions: [
          { label: "View deal", primary: true },
          { label: "Reassign" },
        ],
      },
      {
        id: "ar-5",
        tag: "WARNING",
        amount: "$680K",
        title: "Tech founder — inspection findings unanswered",
        meta: "Aisha Patel · Stage: Inspection · Last activity: 4d ago",
        actions: [
          { label: "View deal", primary: true },
          { label: "Ping Aisha" },
        ],
      },
    ],
    "closing-week": [
      {
        id: "cw-1",
        tag: "HOT LEAD",
        amount: "$4.2M",
        title: "Carlos Mendez — visit confirmed Friday",
        meta: "Sarah Mitchell · Stage: Closing · Docs in escrow",
        actions: [{ label: "View deal", primary: true }],
      },
      {
        id: "cw-2",
        tag: "HOT LEAD",
        amount: "$2.8M",
        title: "Familia Rodríguez — final negotiation Wed",
        meta: "James Carter · Stage: Negotiation · Counter-offer pending",
        actions: [{ label: "View deal", primary: true }],
      },
      {
        id: "cw-3",
        tag: "HOT LEAD",
        amount: "$980K",
        title: "Project Brickell — tour scheduled",
        meta: "Marcus Reyes · Stage: Showing · Tour Thursday 2pm",
        actions: [{ label: "View deal", primary: true }],
      },
      {
        id: "cw-4",
        tag: "HOT LEAD",
        amount: "$650K",
        title: "Pareja NY — first contact this week",
        meta: "Emma Olsen · Stage: New lead · Email confirmed",
        actions: [{ label: "View deal", primary: true }],
      },
      {
        id: "cw-5",
        tag: "HOT LEAD",
        amount: "$420K",
        title: "Garcia family — offer submitted",
        meta: "Tyler Brennan · Stage: Offer · Awaiting response",
        actions: [{ label: "View deal", primary: true }],
      },
    ],
    hot: [
      {
        id: "h-1",
        tag: "HOT LEAD",
        amount: "$4.2M",
        title: "Carlos Mendez — high engagement, repeat visits",
        meta: "Sarah Mitchell · Stage: Closing · 92% close score",
        actions: [{ label: "View deal", primary: true }],
      },
      {
        id: "h-2",
        tag: "OPPORTUNITY",
        amount: "$3.5M",
        title: "Coral Way penthouse — premium buyer profile",
        meta: "James Carter · Stage: Showing · 88% close score",
        actions: [{ label: "View deal", primary: true }],
      },
      {
        id: "h-3",
        tag: "HOT LEAD",
        amount: "$2.8M",
        title: "Familia Rodríguez — strong intent signals",
        meta: "James Carter · Stage: Negotiation · 84% close score",
        actions: [{ label: "View deal", primary: true }],
      },
      {
        id: "h-4",
        tag: "HOT LEAD",
        amount: "$1.9M",
        title: "Tech founder — pre-approved, motivated",
        meta: "Aisha Patel · Stage: Inspection · 81% close score",
        actions: [{ label: "View deal", primary: true }],
      },
      {
        id: "h-5",
        tag: "OPPORTUNITY",
        amount: "$1.5M",
        title: "Inversor Bolivia — international cash buyer",
        meta: "Marcus Reyes · Stage: Showing · 79% close score",
        actions: [{ label: "View deal", primary: true }],
      },
    ],
    "all-active": [],
  };
  // All Active = sum of the three buckets (deduped by title)
  const seen = new Set<string>();
  dealsByTab["all-active"] = [
    ...dealsByTab["at-risk"],
    ...dealsByTab["closing-week"],
    ...dealsByTab.hot,
  ].filter((d) => {
    if (seen.has(d.title)) return false;
    seen.add(d.title);
    return true;
  });

  const TABS: { key: DealTab; label: string; count: number }[] = [
    { key: "at-risk", label: "At Risk", count: dealsByTab["at-risk"].length },
    {
      key: "closing-week",
      label: "Closing This Week",
      count: dealsByTab["closing-week"].length,
    },
    { key: "hot", label: "Hot", count: dealsByTab.hot.length },
    {
      key: "all-active",
      label: "All Active",
      count: dealsByTab["all-active"].length,
    },
  ];

  const visibleDeals = dealsByTab[activeTab];

  return (
    <TooltipProvider delay={150}>
      <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[1200px] mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
              Sales
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your pipeline, prioritized by what matters now.
            </p>
          </div>
          <PeriodSelector label={period.label} />
        </header>

        {/* ═══ 1 · PERFORMANCE SNAPSHOT (one-line + charts) ═══ */}
        <section aria-label="Performance snapshot" className="space-y-2">
          <div>
            <h2 className="text-lg font-medium text-foreground tracking-tight">
              Performance snapshot
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Where the pipeline stands and where it&apos;s coming from.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card px-5 py-4">
            <p className="font-mono text-sm tabular-nums text-foreground">
              {snapshotLine}
            </p>
          </div>

          {/* Trend (full width) */}
          <PipelineTrendChart data={pipelineTrend} />

          {/* Source mix + Stage mix */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <LeadsBySourceChart data={leadsBySource} />
            <PipelineStageChart data={pipelineByStage} />
          </div>
        </section>

        {/* ═══ 2 · PULSOR INSIGHTS (sales-specific) ═══ */}
        <section aria-label="Pulsor insights" className="space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <h2 className="text-lg font-medium text-foreground tracking-tight">
                Pulsor insights
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                What Pulsor learned about your pipeline this week.
              </p>
            </div>
            <span className="font-mono text-xs tabular-nums text-muted-foreground shrink-0">
              {insights.length} insights
            </span>
          </div>
          <ul className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
            {insights.map((i) => (
              <ActionCard key={i.id} data={i} />
            ))}
          </ul>
        </section>

        {/* ═══ 3 · ACTIVE DEALS (the core) ═══ */}
        <section aria-label="Active deals" className="space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <h2 className="text-lg font-medium text-foreground tracking-tight">
                Active deals
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your full pipeline, organized by what needs you most.
              </p>
            </div>
            <span className="font-mono text-xs tabular-nums text-muted-foreground shrink-0">
              {totalActive} deals · {formatCompactCurrency(totalPipeline)}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {TABS.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition-colors border",
                    active
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-foreground border-border hover:border-foreground/30"
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      "font-mono tabular-nums text-[10px]",
                      active ? "text-background/70" : "text-muted-foreground"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Deal list */}
          <ul className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
            {visibleDeals.map((d) => (
              <ActionCardExpanded key={d.id} data={d} />
            ))}
          </ul>
        </section>
      </div>
    </TooltipProvider>
  );
}

function formatCompactCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}
