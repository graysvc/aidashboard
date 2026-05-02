import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroMetricProps {
  value: string;
  label: string;
  subValue?: string;
  trend?: {
    value: number;
    label: string;
  };
}

export function HeroMetric({ value, label, subValue, trend }: HeroMetricProps) {
  const isPositive = trend && trend.value >= 0;

  return (
    <div className="py-8 md:py-12">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>
        {subValue && (
          <p className="text-base text-muted-foreground">{subValue}</p>
        )}
        {trend && (
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-success" strokeWidth={2} />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" strokeWidth={2} />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}
            >
              {isPositive ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-sm text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
