"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import type { Agent } from "@/lib/types";

type Datum = {
  name: string;
  initials: string;
  value: number;
  color: string;
  status: Agent["status"];
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: Datum }>;
  label?: string;
};

const STATUS_COLOR: Record<Agent["status"], string> = {
  top: "#10b981",
  rising: "#06b6d4",
  steady: "#737373",
  "needs-coaching": "#f59e0b",
};

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length || !payload[0].payload) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-card shadow-lg px-3 py-2">
      <div className="text-xs font-medium text-foreground">{item.name}</div>
      <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-foreground">
        {item.value.toFixed(1)}% conversion
      </div>
    </div>
  );
}

export function AgentComparisonChart({ agents }: { agents: Agent[] }) {
  const data: Datum[] = [...agents]
    .sort((a, b) => b.metrics.conversionRate - a.metrics.conversionRate)
    .map((a) => ({
      name: a.name.split(" ")[0] + " " + (a.name.split(" ")[1]?.[0] ?? "") + ".",
      initials: a.initials,
      value: a.metrics.conversionRate,
      color: STATUS_COLOR[a.status],
      status: a.status,
    }));

  const teamAvg =
    data.reduce((acc, d) => acc + d.value, 0) / Math.max(data.length, 1);

  return (
    <Card className="bg-card border-border/50 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-success" strokeWidth={1.75} />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">
              Conversion by agent
            </CardTitle>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              Avg{" "}
              <span className="font-mono font-medium text-muted-foreground">
                {teamAvg.toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4 pr-2">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 24, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                stroke="#262626"
                strokeDasharray="0"
                horizontal={false}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                stroke="#525252"
                fontSize={11}
                tickFormatter={(v: number) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                stroke="#a3a3a3"
                fontSize={11}
                width={80}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "rgba(6, 182, 212, 0.05)" }}
              />
              <ReferenceLine
                x={teamAvg}
                stroke="#525252"
                strokeDasharray="4 4"
                label={{
                  value: `avg`,
                  position: "insideTopRight",
                  fill: "#737373",
                  fontSize: 10,
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                {data.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
