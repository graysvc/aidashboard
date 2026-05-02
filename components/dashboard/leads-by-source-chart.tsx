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
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import type { CategoryPoint } from "@/lib/types";

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: CategoryPoint }>;
  label?: string;
};

const BAR_COLORS = [
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  "#155e75",
  "#164e63",
  "#083344",
];

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value ?? 0;
  return (
    <div className="rounded-lg border border-border bg-card shadow-lg px-3 py-2">
      <div className="text-xs font-medium text-foreground">{label}</div>
      <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-primary">
        {value} leads
      </div>
    </div>
  );
}

export function LeadsBySourceChart({ data }: { data: CategoryPoint[] }) {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  const top = data[0];
  const topShare = total ? Math.round((top.value / total) * 100) : 0;

  return (
    <Card className="bg-card border-border/50 h-full">
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-primary" strokeWidth={1.75} />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">
              Leads by source
            </CardTitle>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              <span className="font-medium text-foreground">
                {top.label}
              </span>{" "}
              drove{" "}
              <span className="font-medium text-foreground">
                {topShare}%
              </span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-xl font-semibold tabular-nums text-foreground leading-none">
            {total}
          </div>
          <div className="text-[10px] text-muted-foreground/60 mt-0.5">
            Total leads
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4 pr-2">
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            >
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
                fontSize={10}
                tickMargin={10}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                stroke="#525252"
                fontSize={11}
                width={32}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "rgba(6, 182, 212, 0.05)" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
                {data.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
