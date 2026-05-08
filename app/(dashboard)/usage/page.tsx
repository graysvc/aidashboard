"use client";

import {
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dashboardData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Cost in USD per 1,000 tokens
const COST_PER_KTOKEN = 20; // $1,000 plan / 50,000 tokens = $0.02/token = $20/1K

export default function UsagePage() {
  const { agents } = dashboardData;
  // ---- Mock plan & usage
  const totalTokens = 50_000;
  const usedTokens = 17_600;
  const remainingTokens = totalTokens - usedTokens;
  const usedPct = (usedTokens / totalTokens) * 100;
  const dayOfMonth = 12;
  const daysInMonth = 30;
  const status: "active" | "optimizing" = "active";

  // ---- Value generated (the "why this is worth it" block)
  const valueGenerated = {
    savedUsd: 12_450,
    tasksAutomated: 1_284,
    hoursSaved: 96,
  };

  // ---- Token consumption breakdown (last 7 days)
  const breakdown = [
    { label: "Sales automation", value: 18_200, color: "bg-foreground" },
    { label: "Client communication", value: 9_100, color: "bg-foreground/70" },
    { label: "Data analysis", value: 6_400, color: "bg-foreground/45" },
    { label: "Other", value: 2_300, color: "bg-foreground/25" },
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
          · $1,000 / month · 50,000 tokens included
        </p>
      </header>

      {/* ─── 1. STATUS ─── */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Tokens available
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-3xl font-medium tabular-nums text-foreground">
                {remainingTokens.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                / {totalTokens.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Cycle
            </div>
            <div className="text-sm font-medium text-foreground mt-1">
              Day {dayOfMonth} of {daysInMonth}
            </div>
            <div
              className={cn(
                "inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full text-[11px] font-medium",
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
          <div className="flex justify-between mt-2 text-[11px] text-muted-foreground font-mono tabular-nums">
            <span>{usedTokens.toLocaleString()} used</span>
            <span>{usedPct.toFixed(0)}%</span>
          </div>
        </div>
      </section>

      {/* ─── 2. VALUE GENERATED ─── */}
      <section>
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground mb-3 flex items-center gap-2">
          <Sparkles
            className="h-3.5 w-3.5 text-primary"
            strokeWidth={2}
            fill="currentColor"
          />
          Value generated this month
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ValueTile
            icon={TrendingUp}
            label="Estimated savings"
            value={`$${valueGenerated.savedUsd.toLocaleString()}`}
          />
          <ValueTile
            icon={CheckCircle2}
            label="Tasks automated"
            value={valueGenerated.tasksAutomated.toLocaleString()}
          />
          <ValueTile
            icon={Clock}
            label="Hours saved"
            value={`${valueGenerated.hoursSaved}h`}
          />
        </div>
      </section>

      {/* ─── 3. TOKEN BREAKDOWN ─── */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">
            Token usage · last 7 days
          </h2>
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
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
                    <span className="text-muted-foreground ml-2 text-[11px]">
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
  // Distribute the month's tokens across agents weighted by their AI Adoption
  // Score (higher adopters use the system more). Deterministic so it doesn't
  // change between renders.
  const totalScore = agents.reduce((a, x) => a + x.aiAdoptionScore, 0);
  const rows = agents
    .map((a) => {
      const tokens = Math.round((a.aiAdoptionScore / totalScore) * totalUsed);
      const costUsd = (tokens / 1000) * COST_PER_KTOKEN;
      return { agent: a, tokens, costUsd };
    })
    .sort((a, b) => b.tokens - a.tokens);

  const max = rows[0]?.tokens ?? 1;

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">
            Usage by agent
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Tokens consumed and cost per realtor this cycle.
          </p>
        </div>
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
          {agents.length} agents
        </span>
      </div>

      <ul className="divide-y divide-border/60">
        {rows.map(({ agent, tokens, costUsd }) => {
          const pct = (tokens / max) * 100;
          return (
            <li key={agent.id} className="py-3 flex items-center gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                {agent.avatarUrl && (
                  <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                )}
                <AvatarFallback
                  className={cn(
                    "text-white text-[11px] font-semibold",
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
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground shrink-0">
                    {tokens.toLocaleString()}{" "}
                    <span className="text-muted-foreground/60">tok</span>
                    <span className="text-foreground ml-2">
                      ${costUsd.toFixed(2)}
                    </span>
                  </span>
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

function ValueTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>
      <div className="font-mono text-2xl font-medium tabular-nums text-foreground mt-2">
        {value}
      </div>
    </div>
  );
}
