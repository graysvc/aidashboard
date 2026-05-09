import { Inbox } from "lucide-react";

/**
 * Inline empty state used inside section bodies (instead of a list).
 * Compact, rounded card with icon + title + optional hint.
 */
export function EmptyState({
  title = "Nothing to show",
  hint,
}: {
  title?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-border rounded-xl bg-card">
      <Inbox
        className="h-7 w-7 text-muted-foreground/40 mb-2"
        strokeWidth={1.5}
      />
      <p className="text-sm font-medium text-foreground">{title}</p>
      {hint && (
        <p className="text-xs text-muted-foreground mt-1">{hint}</p>
      )}
    </div>
  );
}
