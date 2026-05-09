import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
        Loading…
      </div>

      {/* Skeleton blocks */}
      <div className="mt-6 space-y-4">
        <div className="h-9 w-48 rounded-md bg-muted animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl border border-border bg-card animate-pulse"
            />
          ))}
        </div>
        <div className="h-64 rounded-xl border border-border bg-card animate-pulse" />
      </div>
    </div>
  );
}
