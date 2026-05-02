import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Insight } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TYPE_META } from "./insights/insight-meta";

/**
 * Compact insight card used in the Overview page's "What needs your attention"
 * row. Modern dark theme with subtle gradients and clean typography.
 */
export function InsightCard({ insight }: { insight: Insight }) {
  const meta = TYPE_META[insight.type];
  const Icon = meta.icon;

  return (
    <article
      className={cn(
        "group relative flex flex-col h-full rounded-xl border border-border/50 p-5 transition-all duration-300 bg-card overflow-hidden",
        "hover:border-border hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      {/* Accent line at top */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-0.5",
        meta.type === "act-now" && "bg-gradient-to-r from-destructive to-destructive/50",
        meta.type === "worth-knowing" && "bg-gradient-to-r from-primary to-primary/50",
        meta.type === "this-week" && "bg-gradient-to-r from-warning to-warning/50"
      )} />
      
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105",
            meta.chipClass
          )}
        >
          <Icon className={cn("h-4 w-4", meta.labelClass)} strokeWidth={1.75} />
        </span>
        <div className="flex-1 min-w-0">
          <div
            className={cn(
              "text-[10px] font-medium uppercase tracking-wider mb-1.5",
              meta.labelClass
            )}
          >
            {meta.label}
          </div>
          <h3 className="text-sm font-medium leading-snug text-foreground">
            {insight.title}
          </h3>
        </div>
      </div>

      <p className="mt-3 font-mono text-[11px] text-muted-foreground/80 tabular-nums bg-muted/30 border border-border/30 px-2.5 py-2 rounded-lg">
        {insight.impact}
      </p>

      <div className="mt-auto pt-4">
        <Button 
          size="sm" 
          className="h-8 px-3 text-xs gap-1.5 bg-primary/10 text-primary border-0 hover:bg-primary/20"
        >
          {insight.primaryAction.label}
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </Button>
      </div>
    </article>
  );
}
