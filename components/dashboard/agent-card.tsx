"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";
import type { Agent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AgentDetailSheet } from "./agent-detail-sheet";

const STATUS_CONFIG: Record<
  Agent["status"],
  { label: string; dot: string; text: string; sparkline: string }
> = {
  top: {
    label: "Top performer",
    dot: "bg-success",
    text: "text-success",
    sparkline: "#10b981",
  },
  rising: {
    label: "Rising",
    dot: "bg-primary",
    text: "text-primary",
    sparkline: "#06b6d4",
  },
  steady: {
    label: "Steady",
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
    sparkline: "#737373",
  },
  "needs-coaching": {
    label: "Needs coaching",
    dot: "bg-warning",
    text: "text-warning",
    sparkline: "#f59e0b",
  },
};

function formatCompactCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export function AgentCard({ agent }: { agent: Agent }) {
  const [open, setOpen] = useState(false);
  const status = STATUS_CONFIG[agent.status];
  const sparklineData = agent.trend.map((v, i) => ({ x: i, y: v }));

  return (
    <>
      <Card className="p-5 bg-card border-border/50 hover:border-border transition-all flex flex-col gap-4">
        {/* Header: avatar + name + status */}
        <div className="flex items-start gap-3">
          <Avatar className="h-11 w-11 shrink-0 ring-1 ring-border">
            <AvatarFallback
              className={cn("text-xs font-semibold", agent.avatarColor)}
            >
              {agent.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold leading-tight text-foreground truncate">
              {agent.name}
            </h3>
            <div className="text-xs text-muted-foreground/60 mt-0.5 truncate">
              {agent.role}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", status.dot)} />
              <span className={cn("text-[10px] font-medium", status.text)}>
                {status.label}
              </span>
            </div>
          </div>
          <div className="h-8 w-16 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id={`agent-${agent.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={status.sparkline} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={status.sparkline} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis hide domain={["dataMin", "dataMax"]} />
                <Area
                  type="monotone"
                  dataKey="y"
                  stroke={status.sparkline}
                  strokeWidth={1.5}
                  fill={`url(#agent-${agent.id})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-4 gap-3 pt-1">
          <Metric
            label="Volume"
            value={formatCompactCurrency(agent.metrics.volumeClosedYTD)}
          />
          <Metric label="Closed" value={agent.metrics.dealsClosedYTD.toString()} />
          <Metric
            label="Pipeline"
            value={formatCompactCurrency(agent.metrics.pipelineValue)}
          />
          <Metric
            label="Conv."
            value={`${agent.metrics.conversionRate.toFixed(0)}%`}
          />
        </div>

        {/* Coaching note (if any) */}
        {agent.coachingNote && (
          <div className="flex gap-2 rounded-lg bg-warning/10 border border-warning/20 px-3 py-2">
            <MessageCircle
              className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5"
              strokeWidth={2}
            />
            <p className="text-[11px] leading-relaxed text-warning">
              {agent.coachingNote}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center pt-3 border-t border-border/30 mt-auto">
          <span className="text-[10px] font-mono text-muted-foreground/60 tabular-nums">
            {agent.metrics.activeDeals} active · {agent.metrics.leadsThisMonth} leads
          </span>
          <Button
            size="sm"
            className="h-7 px-3 text-xs gap-1 ml-auto bg-primary/10 text-primary hover:bg-primary/20 border-0"
            onClick={() => setOpen(true)}
          >
            Profile
            <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </Button>
        </div>
      </Card>

      <AgentDetailSheet agent={agent} open={open} onOpenChange={setOpen} />
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground/60 font-medium">
        {label}
      </div>
      <div className="font-mono text-sm font-semibold tabular-nums text-foreground mt-0.5">
        {value}
      </div>
    </div>
  );
}
