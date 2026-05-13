"use client";

import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dashboardData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function UsagePage() {
  const { agents } = dashboardData;
  // ---- Mock plan & usage
  const totalTokens = 50_000;
  const usedTokens = 32_400;
  const usedPct = (usedTokens / totalTokens) * 100;
  const dayOfMonth = 12;
  const daysInMonth = 30;
  const status: "active" | "optimizing" = "active";

  // ---- Operational visibility (replaces fake ROI block)
  const visibility = [
    {
      icon: AlertTriangle,
      label: "Risks surfaced",
      value: "12",
      hint: "Stalled opportunities detected",
    },
    {
      icon: Eye,
      label: "Workflows monitored",
      value: "4",
      hint: "Actively running across the team",
    },
    {
      icon: CheckCircle2,
      label: "Follow-up sequences",
      value: "18",
      hint: "Running automatically",
    },
    {
      icon: Bell,
      label: "Coordination alerts",
      value: "7",
      hint: "Triggered this cycle",
    },
  ];

  // ---- Operational activity breakdown (last 7 days) — RE-specific labels
  const breakdown = [
    { label: "Lead response monitoring", value: 14_800, color: "bg-foreground" },
    { label: "Follow-up orchestration", value: 8_400, color: "bg-foreground/70" },
    { label: "Closing coordination", value: 5_200, color: "bg-foreground/55" },
    { label: "Buyer communication", value: 2_300, color: "bg-foreground/35" },
    { label: "Pipeline visibility", value: 1_700, color: "bg-foreground/25" },
  ];
  const breakdownTotal = breakdown.reduce((a, x) => a + x.value, 0);

  return (
    <div className="px-4 sm:px-6 py-8 lg:px-8 lg:py-10 max-w-[960px] mx-auto space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
          Usage
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Plan: <span className="text-foreground font-medium">Pulsor Pro</span>{" "}
          · $1,500 / month · 50,000 operational tokens included
        </p>
      </header>

      {/* ─── 1. HERO · USAGE THIS CYCLE ─── */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Usage this cycle
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-3xl font-medium tabular-nums text-foreground">
                {usedTokens.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                / {totalTokens.toLocaleString()} operational tokens used
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Cycle
            </div>
            <div className="text-sm font-medium text-foreground mt-1">
              Day {dayOfMonth} of {daysInMonth}
            </div>
            <div
              className={cn(
                "inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full text-xs font-medium",
                status === "active"
                  ? "bg-success-subtle text-success"
                  : "bg-warning-subtle text-warning"
              )}
            >
              <Activity className="h-3 w-3" strokeWidth={2.25} />
              {status === "active" ? "Active" : "Optimizing"}
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-5">
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${usedPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono tabular-nums">
            <span>{usedTokens.toLocaleString()} used</span>
            <span>{usedPct.toFixed(0)}%</span>
          </div>
        </div>
      </section>

      {/* ─── 1b. OPERATIONAL POSITIONING (compact) ─── */}
      <section className="rounded-xl border border-border bg-card/60 px-5 py-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Operational tokens power the workflows running across your business —
          lead monitoring, follow-ups, coordination, reporting, and operational
          visibility.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed mt-2">
          As activity grows across your team, usage scales with operational
          complexity — not seats.
        </p>
      </section>

      {/* ─── 2. OPERATIONAL VISIBILITY ─── */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground mb-3 flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-foreground" strokeWidth={2} />
          Operational visibility this cycle
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {visibility.map((v) => (
            <ActivityTile
              key={v.label}
              icon={v.icon}
              label={v.label}
              value={v.value}
              hint={v.hint}
            />
          ))}
        </div>
      </section>

      {/* ─── 3. WORKFLOW ACTIVITY ─── */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
            Workflow activity · last 7 days
          </h2>
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {breakdownTotal.toLocaleString()} total
          </span>
        </div>
        <ul className="space-y-3">
          {breakdown.map((b) => {
            const pct = (b.value / breakdownTotal) * 100;
            return (
              <li key={b.label}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-foreground">{b.label}</span>
                  <span className="font-mono tabular-nums text-foreground">
                    {b.value.toLocaleString()}
                    <span className="text-muted-foreground ml-2 text-xs">
                      {pct.toFixed(0)}%
                    </span>
                  </span>
                </div>
                <div className="h-1.5 mt-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn("h-full", b.color)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ─── 4. PER-AGENT BREAKDOWN ─── */}
      <AgentUsageSection agents={agents} totalUsed={usedTokens} />
    </div>
  );
}

// ---------- Per-agent breakdown ----------

function AgentUsageSection({
  agents,
  totalUsed,
}: {
  agents: typeof dashboardData.agents;
  totalUsed: number;
}) {
  // Operational engagement per agent. We avoid a single "score" number on
  // purpose — that reads like a usage leaderboard. Instead each row says
  // what workflows Pulsor is running for that agent in human-readable terms
  // (follow-ups, stalled deals monitored, coordination actions). Tokens stay
  // visible but small and last.
  const totalScore = agents.reduce((a, x) => a + x.aiAdoptionScore, 0);
  const rows = agents
    .map((a) => {
      const share = a.aiAdoptionScore / totalScore;
      const tokens = Math.round(share * totalUsed);
      // Pull operational counts directly from each agent's existing metrics
      // so the breakdown varies meaningfully across the team instead of
      // collapsing to the same number for everyone.
      const followUps = a.metrics.leadsThisMonth;
      const stalledMonitored = Math.max(1, Math.round(a.metrics.activeDeals / 3));
      const coordinationActions = a.metrics.appointmentsSet;
      return {
        agent: a,
        tokens,
        followUps,
        stalledMonitored,
        coordinationActions,
      };
    })
    .sort((a, b) => b.followUps - a.followUps);

  const max = rows[0]?.followUps ?? 1;

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
            Operational activity by agent
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Workflow actions, follow-ups, and AI assists per agent this cycle.
          </p>
        </div>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {agents.length} agents
        </span>
      </div>

      <ul className="divide-y divide-border/60">
        {rows.map(({
          agent,
          tokens,
          followUps,
          stalledMonitored,
          coordinationActions,
        }) => {
          const pct = (followUps / max) * 100;
          return (
            <li key={agent.id} className="py-3 flex items-center gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                {agent.avatarUrl && (
                  <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                )}
                <AvatarFallback
                  className={cn(
                    "text-white text-xs font-semibold",
                    agent.avatarColor
                  )}
                >
                  {agent.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-foreground truncate">
                    {agent.name}
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground/60 shrink-0">
                    {tokens.toLocaleString()} tok
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 truncate">
                  {followUps} follow-ups · {stalledMonitored} stalled deals
                  monitored · {coordinationActions} coordination actions
                </div>
                <div className="h-1 mt-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-foreground/70"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ActivityTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>
      <div className="font-mono text-2xl font-medium tabular-nums text-foreground mt-2">
        {value}
      </div>
      {hint && (
        <div className="text-xs text-muted-foreground mt-1.5">{hint}</div>
      )}
    </div>
  );
}
