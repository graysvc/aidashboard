import { cn } from "@/lib/utils";

interface MiniKpiProps {
  label: string;
  value: string;
  trend?: number;
}

export function MiniKpi({ label, value, trend }: MiniKpiProps) {
  const isPositive = trend !== undefined && trend >= 0;
  const hasTrend = trend !== undefined;

  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-lg font-semibold tabular-nums mt-0.5">
        {value}
        {hasTrend && (
          <span
            className={cn(
              "text-xs font-medium ml-1",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {isPositive ? "+" : ""}
            {trend}%
          </span>
        )}
      </p>
    </div>
  );
}
