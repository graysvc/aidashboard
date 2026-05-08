"use client";

import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/** Small ⓘ icon that reveals a tooltip on hover. */
export function InfoTooltip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        className="text-muted-foreground/60 hover:text-foreground transition-colors"
        aria-label="More info"
      >
        <Info className="h-3 w-3" strokeWidth={2} />
      </TooltipTrigger>
      <TooltipContent className="max-w-[280px] text-left leading-relaxed">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
