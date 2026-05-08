"use client";

import { InfoTooltip } from "@/components/dashboard/info-tooltip";
import { cn } from "@/lib/utils";

export type StatusTileTone = "neutral" | "critical" | "warning" | "success";

const TONE_VALUE_COLOR: Record<StatusTileTone, string> = {
  neutral: "text-foreground",
  critical: "text-destructive",
  warning: "text-warning",
  success: "text-success",
};

/**
 * KPI tile used across Home, Sales, Marketing.
 * - Uppercase label + optional ⓘ tooltip.
 * - Mono numeric value, font-medium.
 * - Sub-label (delta / context).
 * - Optional href makes the whole tile clickable.
 */
export function StatusTile({
  label,
  value,
  deltaText,
  tone = "neutral",
  href,
  tooltip,
}: {
  label: string;
  value: string;
  deltaText?: string;
  tone?: StatusTileTone;
  href?: string;
  tooltip?: string;
}) {
  const inner = (
    <>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </span>
        {tooltip && <InfoTooltip text={tooltip} />}
      </div>
      <div
        className={cn(
          "font-mono text-3xl font-medium tabular-nums leading-none mt-2",
          TONE_VALUE_COLOR[tone]
        )}
      >
        {value}
      </div>
      {deltaText && (
        <div className="text-[11px] text-muted-foreground mt-2">
          {deltaText}
        </div>
      )}
    </>
  );

  const className = cn(
    "rounded-xl border border-border bg-card p-5 block",
    href && "hover:border-foreground/30 transition-colors cursor-pointer"
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }
  return <div className={className}>{inner}</div>;
}
