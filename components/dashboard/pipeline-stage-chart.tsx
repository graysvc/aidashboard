"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart as PieChartIcon } from "lucide-react";
import type { CategoryPoint } from "@/lib/types";

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: CategoryPoint }>;
};

const STAGE_COLORS = [
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
];

function formatCompactCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length || !payload[0].payload) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-card shadow-lg px-3 py-2">
      <div className="text-xs font-medium text-foreground">{item.label}</div>
      <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-foreground">
        {item.value} deals
      </div>
      {item.secondary !== undefined && (
        <div className="font-mono text-[11px] text-muted-foreground tabular-nums">
          {formatCompactCurrency(item.secondary)} value
        </div>
      )}
    </div>
  );
}

export function PipelineStageChart({ data }: { data: CategoryPoint[] }) {
  const totalDeals = data.reduce((acc, d) => acc + d.value, 0);
  const totalValue = data.reduce((acc, d) => acc + (d.secondary ?? 0), 0);
  
  // Assign colors to data
  const coloredData = data.map((d, i) => ({
    ...d,
    color: d.color ?? STAGE_COLORS[i % STAGE_COLORS.length],
  }));

  return (
    <Card className="bg-card border-border/50 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center">
            <PieChartIcon className="h-4 w-4 text-warning" strokeWidth={1.75} />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">
              Pipeline by stage
            </CardTitle>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              {totalDeals} deals · {formatCompactCurrency(totalValue)} value
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-center">
          {/* Donut */}
          <div className="relative h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={coloredData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  stroke="#0a0a0a"
                  strokeWidth={2}
                  isAnimationActive={false}
                >
                  {coloredData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono text-xl font-semibold tabular-nums text-foreground leading-none">
                {totalDeals}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mt-1">
                Active
              </span>
            </div>
          </div>

          {/* Legend */}
          <ul className="space-y-2">
            {coloredData.map((d) => (
              <li
                key={d.label}
                className="flex items-center justify-between gap-3 text-xs group cursor-default"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors truncate">
                    {d.label}
                  </span>
                </span>
                <span className="font-mono tabular-nums text-foreground shrink-0">
                  {d.value}
                  {d.secondary !== undefined && (
                    <span className="text-muted-foreground/50 ml-1.5">
                      {formatCompactCurrency(d.secondary)}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
