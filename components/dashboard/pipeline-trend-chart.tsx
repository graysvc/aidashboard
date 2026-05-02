"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TimeseriesPoint } from "@/lib/types";

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: TimeseriesPoint }>;
  label?: string;
};

const RANGES = ["12W", "YTD", "1Y"] as const;
type Range = (typeof RANGES)[number];

function formatCompactCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value ?? 0;
  return (
    <div className="rounded-lg border border-border bg-card shadow-lg px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        Week of {label}
      </div>
      <div className="mt-1 font-mono text-base font-semibold tabular-nums text-foreground">
        {formatCompactCurrency(value)}
      </div>
    </div>
  );
}

export function PipelineTrendChart({ data }: { data: TimeseriesPoint[] }) {
  const [range, setRange] = useState<Range>("12W");
  const last = data[data.length - 1]?.value ?? 0;
  const first = data[0]?.value ?? 0;
  const change = first ? ((last - first) / first) * 100 : 0;
  const isUp = change >= 0;

  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Pipeline volume
            </h2>
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="font-mono text-3xl font-semibold tabular-nums text-foreground leading-none tracking-tight">
              {formatCompactCurrency(last)}
            </span>
            <span
              className={cn(
                "inline-flex items-center font-mono text-xs font-medium tabular-nums px-1.5 py-0.5 rounded-md",
                isUp ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              )}
            >
              {isUp ? "+" : ""}
              {change.toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground/70">
              vs. 12 weeks ago
            </span>
          </div>
        </div>
        <div className="inline-flex p-0.5 rounded-lg bg-muted/50 border border-border/50 shrink-0">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200",
                range === r
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-4 pr-2">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="pipelineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#262626"
                strokeDasharray="0"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                stroke="#525252"
                fontSize={11}
                tickMargin={12}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                stroke="#525252"
                fontSize={11}
                width={52}
                tickFormatter={(v: number) => formatCompactCurrency(v)}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ stroke: "#06b6d4", strokeOpacity: 0.3, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#pipelineFill)"
                activeDot={{
                  r: 5,
                  fill: "#06b6d4",
                  stroke: "#0a0a0a",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
