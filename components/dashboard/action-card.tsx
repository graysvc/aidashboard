"use client";

import { ArrowRight, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ActionPriority = "critical" | "warning" | "positive";

interface ActionCardProps {
  priority: ActionPriority;
  title: string;
  subtitle?: string;
  actionLabel: string;
  onAction?: () => void;
  onSnooze?: () => void;
  onDismiss?: () => void;
}

const priorityStyles: Record<ActionPriority, { dot: string; border: string }> = {
  critical: {
    dot: "bg-destructive",
    border: "border-l-destructive",
  },
  warning: {
    dot: "bg-warning",
    border: "border-l-warning",
  },
  positive: {
    dot: "bg-success",
    border: "border-l-success",
  },
};

export function ActionCard({
  priority,
  title,
  subtitle,
  actionLabel,
  onAction,
  onSnooze,
  onDismiss,
}: ActionCardProps) {
  const styles = priorityStyles[priority];

  return (
    <div
      className={cn(
        "group relative border border-border rounded-lg p-4 transition-colors hover:bg-muted/30",
        "border-l-2",
        styles.border
      )}
    >
      {/* Dismiss button */}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-3 right-3 h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted hover:text-foreground transition-all"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      )}

      <div className="space-y-3">
        {/* Content */}
        <div className="flex items-start gap-3 pr-8">
          <span className={cn("h-2 w-2 rounded-full mt-1.5 shrink-0", styles.dot)} />
          <div className="space-y-0.5 min-w-0">
            <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pl-5">
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline underline-offset-2"
          >
            {actionLabel}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          {onSnooze && (
            <>
              <span className="text-border">|</span>
              <button
                type="button"
                onClick={onSnooze}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Clock className="h-3 w-3" strokeWidth={2} />
                Remind later
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
