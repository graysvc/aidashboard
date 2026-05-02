import type { LucideIcon } from "lucide-react";
import { AlertOctagon, Info, Sparkles, TriangleAlert } from "lucide-react";
import type { InsightType } from "@/lib/types";

/** Centralized visual language for insight types — keeps cards consistent. */
export const TYPE_META: Record<
  InsightType,
  {
    type: "act-now" | "this-week" | "worth-knowing";
    label: string;
    icon: LucideIcon;
    /** Darker shade — used on filled chips and titles */
    color: string;
    /** Tailwind text class for the label tag */
    labelClass: string;
    /** Tailwind classes for the type chip background */
    chipClass: string;
    /** Tailwind class for the small dot */
    dotClass: string;
    /** Border-left accent class (for ACT NOW cards) */
    borderClass: string;
  }
> = {
  critical: {
    type: "act-now",
    label: "Critical",
    icon: AlertOctagon,
    color: "#ef4444",
    labelClass: "text-destructive",
    chipClass: "bg-destructive/10 text-destructive",
    dotClass: "bg-destructive",
    borderClass: "border-l-destructive",
  },
  warning: {
    type: "this-week",
    label: "Warning",
    icon: TriangleAlert,
    color: "#f59e0b",
    labelClass: "text-warning",
    chipClass: "bg-warning/10 text-warning",
    dotClass: "bg-warning",
    borderClass: "border-l-warning",
  },
  opportunity: {
    type: "worth-knowing",
    label: "Opportunity",
    icon: Sparkles,
    color: "#10b981",
    labelClass: "text-success",
    chipClass: "bg-success/10 text-success",
    dotClass: "bg-success",
    borderClass: "border-l-success",
  },
  info: {
    type: "worth-knowing",
    label: "FYI",
    icon: Info,
    color: "#06b6d4",
    labelClass: "text-primary",
    chipClass: "bg-primary/10 text-primary",
    dotClass: "bg-primary",
    borderClass: "border-l-primary",
  },
};
