"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import type { Workflow, WorkflowStatus } from "@/lib/types";

type StatusItem = { label: string; value: number; color: string; status: WorkflowStatus };

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: StatusItem }>;
};

const STATUS_META: Record<
  WorkflowStatus,
  { label: string; color: string }
> = {
  performing: { label: "Performing", color: "#10b981" },
  healthy: { label: "Healthy", color: "#06b6d4" },
  underperforming: { label: "Underperforming", color: "#f59e0b" },
  broken: { label: "Broken", color: "#ef4444" },
};

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length || !payload[0].payload) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-card shadow-lg px-3 py-2">
      <div className="text-xs font-medium text-foreground">{item.label}</div>
      <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-foreground">
        {item.value} {item.value === 1 ? "workflow" : "workflows"}
      </div>
    </div>
  );
}

export function WorkflowStatusMix({ workflows }: { workflows: Workflow[] }) {
  const counts = workflows.reduce(
    (acc, wf) => {
      acc[wf.status] = (acc[wf.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<WorkflowStatus, number>
  );

  const data: StatusItem[] = (Object.keys(STATUS_META) as WorkflowStatus[])
    .map((s) => ({
      status: s,
      label: STATUS_META[s].label,
      color: STATUS_META[s].color,
      value: counts[s] ?? 0,
    }))
    .filter((d) => d.value > 0);

  const total = workflows.length;

  return (
    <Card className="bg-card border-border/50 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center">
            <Activity className="h-4 w-4 text-warning" strokeWidth={1.75} />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">
              Workflow health
            </CardTitle>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              {total} total workflows
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-center">
          <div className="relative h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  stroke="#0a0a0a"
                  strokeWidth={2}
                  isAnimationActive={false}
                >
                  {data.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono text-xl font-semibold tabular-nums text-foreground leading-none">
                {total}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mt-1">
                Total
              </span>
            </div>
          </div>
          <ul className="space-y-2">
            {data.map((d) => (
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
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
