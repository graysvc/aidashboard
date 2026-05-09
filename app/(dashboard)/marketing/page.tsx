"use client";

import { AlertTriangle } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PeriodSelector, usePeriod } from "@/components/dashboard/period-selector";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusTile } from "@/components/dashboard/status-tile";
import { SectionTitle } from "@/components/dashboard/section-title";
import {
  ActionCard,
  type ActionCardData,
} from "@/components/dashboard/action-card";
import { cn } from "@/lib/utils";

export default function MarketingPage() {
  const period = usePeriod();
  const isEmptyRange = period >= 30;

  // ───── Section 2 — Channel breakdown ─────
  const channels = [
    { name: "Meta Ads", count: 142, cpl: 14, outlier: false },
    { name: "LaHouse AI", count: 68, cpl: 22, outlier: false },
    { name: "Organic Web", count: 23, cpl: 0, outlier: false },
    { name: "YouTube Channel", count: 9, cpl: 0, outlier: false },
    { name: "Google Ads", count: 5, cpl: 89, outlier: true },
  ];
  const totalLeads = channels.reduce((a, c) => a + c.count, 0);
  const maxCount = Math.max(...channels.map((c) => c.count));

  // ───── Section 3 — Pulsor insights ─────
  const insights: ActionCardData[] = [
    {
      id: "ins-1",
      tag: "INSIGHT",
      summary: "Bolivia leads convert 3× better than average",
    },
    {
      id: "ins-2",
      tag: "PATTERN",
      summary: "Meta CPL dropped 23% this week — capitalize",
    },
    {
      id: "ins-3",
      tag: "WARNING",
      summary: "Google Ads CPL is 6× higher than Meta",
    },
    {
      id: "ins-4",
      tag: "OPPORTUNITY",
      summary: "YouTube generates premium leads — $2.4M avg",
    },
    {
      id: "ins-5",
      tag: "RECOMMENDATION",
      summary: "LaHouse converts 2× better with internationals",
    },
  ];

  return (
    <TooltipProvider delay={150}>
      <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[1200px] mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
              Marketing
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Where your leads come from and what&apos;s working.
            </p>
          </div>
          <PeriodSelector />
        </header>

        {/* ═══ 1 · CHANNEL PERFORMANCE — KPIs ═══ */}
        <section aria-label="Channel performance" className="space-y-2">
          <SectionTitle
            title="Channel performance"
            tooltip="How your acquisition channels are performing this month."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatusTile
              label="Total leads this month"
              value="247"
              deltaText="+23% vs last month"
              tone="neutral"
              tooltip="All leads captured across all channels in the current month. Includes paid, organic, and referral sources."
            />
            <StatusTile
              label="Best channel"
              value="Meta Ads"
              deltaText="142 leads · 58% of total"
              tone="success"
              tooltip="Channel generating the most qualified leads this month. Quality is measured by conversion to first contact, not just volume."
            />
            <StatusTile
              label="Cost per lead"
              value="$18.50"
              deltaText="−12% vs last month"
              tone="success"
              tooltip="Total ad spend divided by leads generated this month. Lower is better. Industry average for real estate is $35–50."
            />
          </div>
        </section>

        {/* ═══ 2 · CHANNEL BREAKDOWN — horizontal bars ═══ */}
        <section aria-label="Channel breakdown" className="space-y-2">
          <SectionTitle
            title="Channel breakdown"
            tooltip="Where your leads are coming from in the last 30 days."
          />
          <div className="rounded-xl border border-border bg-card p-5">
            <ul className="space-y-4">
              {channels.map((c) => {
                const pct = Math.round((c.count / totalLeads) * 100);
                const barWidth = (c.count / maxCount) * 100;
                return (
                  <li key={c.name}>
                    <a
                      href="#"
                      className="grid grid-cols-[140px_1fr_auto_auto_auto] items-center gap-4 -mx-2 px-2 py-1 rounded-md hover:bg-muted/40 transition-colors"
                    >
                      <span className="text-sm text-foreground truncate">
                        {c.name}
                      </span>
                      <div className="h-2 rounded-sm bg-muted overflow-hidden">
                        <div
                          className="h-full bg-foreground/85"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm tabular-nums text-foreground w-10 text-right">
                        {c.count}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground w-10 text-right">
                        {pct}%
                      </span>
                      <span
                        className={cn(
                          "font-mono text-xs tabular-nums w-24 text-right inline-flex items-center justify-end gap-1",
                          c.outlier ? "text-warning" : "text-muted-foreground"
                        )}
                      >
                        {c.cpl === 0 ? "$0/lead" : `$${c.cpl}/lead`}
                        {c.outlier && (
                          <AlertTriangle
                            className="h-3 w-3"
                            strokeWidth={2}
                          />
                        )}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ═══ 3 · PULSOR INSIGHTS ═══ */}
        <section aria-label="Pulsor insights" className="space-y-2">
          <SectionTitle
            title="Pulsor insights"
            tooltip="What Pulsor learned from your marketing this week."
            right={
              !isEmptyRange && (
                <span className="font-mono text-xs tabular-nums text-muted-foreground shrink-0">
                  {insights.length} insights
                </span>
              )
            }
          />
          {isEmptyRange ? (
            <EmptyState
              title={`No insights in last ${period} days`}
              hint="Pulsor surfaces new marketing patterns weekly."
            />
          ) : (
            <ul className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
              {insights.map((i) => (
                <ActionCard key={i.id} data={i} />
              ))}
            </ul>
          )}
        </section>

      </div>
    </TooltipProvider>
  );
}
