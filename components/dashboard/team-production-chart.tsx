"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimeseriesPoint } from "@/lib/types";

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: TimeseriesPoint }>;
  label?: string;
};

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value ?? 0;
  return (
    <div className="rounded-lg border border-border bg-card shadow-lg px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        Week of {label}
      </div>
      <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-foreground">
        {value} {value === 1 ? "deal" : "deals"} closed
      </div>
    </div>
  );
}

export function TeamProductionChart({ data }: { data: TimeseriesPoint[] }) {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  const last = data[data.length - 1]?.value ?? 0;
  const first = data[0]?.value ?? 0;
  const change = first > 0 ? ((last - first) / first) * 100 : 0;
  const isUp = change >= 0;

  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-primary" strokeWidth={1.75} />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">
              Team production
            </CardTitle>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              Weekly closed deals
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-mono text-2xl font-semibold tabular-nums text-foreground leading-none tracking-tight">
            {total}
          </span>
          <span className="text-xs text-muted-foreground/70">deals YTD</span>
          <span
            className={cn(
              "ml-auto inline-flex items-center font-mono text-xs font-medium tabular-nums px-1.5 py-0.5 rounded-md",
              isUp ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}
          >
            {isUp ? "+" : ""}
            {change.toFixed(0)}% wk/wk
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-4 pr-2">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="teamProductionFill" x1="0" y1="0" x2="0" y2="1">
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
                width={28}
                allowDecimals={false}
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
                fill="url(#teamProductionFill)"
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
