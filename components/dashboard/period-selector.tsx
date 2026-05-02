"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PeriodSelector({ label }: { label: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 gap-2 font-mono text-xs tabular-nums bg-muted/30 border-border/50 hover:bg-muted/50 hover:border-border"
    >
      <Calendar className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
      {label}
      <ChevronDown className="h-3 w-3 text-muted-foreground/60" strokeWidth={2} />
    </Button>
  );
}
