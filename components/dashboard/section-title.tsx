"use client";

import { InfoTooltip } from "@/components/dashboard/info-tooltip";

/**
 * Section header used across dashboard pages.
 * Title + optional ⓘ tooltip (replaces the muted subtitle line) + optional
 * right-aligned slot (count, link, etc.).
 */
export function SectionTitle({
  title,
  tooltip,
  right,
}: {
  title: string;
  tooltip?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <h2 className="text-lg font-medium text-foreground tracking-tight">
          {title}
        </h2>
        {tooltip && <InfoTooltip text={tooltip} />}
      </div>
      {right}
    </div>
  );
}
