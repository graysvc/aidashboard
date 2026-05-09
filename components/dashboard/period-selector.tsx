"use client";

import { useEffect, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const KEY = "pulsor:period";
const EVENT = "pulsor:period-change";

export type PeriodValue = 7 | 15 | 30;

const OPTIONS: { value: PeriodValue; label: string }[] = [
  { value: 7, label: "Last 7 days" },
  { value: 15, label: "Last 15 days" },
  { value: 30, label: "Last 30 days" },
];

const DEFAULT: PeriodValue = 7;

function read(): PeriodValue {
  if (typeof window === "undefined") return DEFAULT;
  const n = Number(window.localStorage.getItem(KEY));
  return n === 7 || n === 15 || n === 30 ? (n as PeriodValue) : DEFAULT;
}

/**
 * Hook for any page/section that wants to react to the current global period.
 * Returns the selected number of days (7 | 15 | 30).
 */
export function usePeriod(): PeriodValue {
  const [period, setPeriod] = useState<PeriodValue>(DEFAULT);
  useEffect(() => {
    setPeriod(read());
    function onChange() {
      setPeriod(read());
    }
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return period;
}

/**
 * PeriodSelector — global date-range dropdown shown in page headers.
 * Stores the choice in localStorage so all pages stay in sync.
 * The optional `label` prop is ignored now that the dropdown is the source
 * of truth, but kept for backwards compatibility with existing call sites.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PeriodSelector(_props: { label?: string } = {}) {
  const [period, setPeriod] = useState<PeriodValue>(DEFAULT);

  useEffect(() => {
    setPeriod(read());
  }, []);

  function pick(next: PeriodValue) {
    setPeriod(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, String(next));
      window.dispatchEvent(new Event(EVENT));
    }
  }

  return (
    <Select
      value={String(period)}
      onValueChange={(v) => pick(Number(v) as PeriodValue)}
    >
      <SelectTrigger className="h-9 w-[150px] text-xs font-medium gap-1.5">
        <Calendar
          className="h-3.5 w-3.5 text-muted-foreground"
          strokeWidth={1.75}
        />
        <SelectValue />
        <ChevronDown
          className="h-3.5 w-3.5 text-muted-foreground"
          strokeWidth={1.75}
        />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((o) => (
          <SelectItem key={o.value} value={String(o.value)}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
