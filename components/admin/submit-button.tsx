"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

/**
 * Submit button that flips to "pending" state while the parent form's
 * Server Action is running. Drop into any <form action={...}>.
 */
export function SubmitButton({
  children,
  pendingText,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  pendingText?: string;
  variant?: "primary" | "danger";
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-wait",
        variant === "primary" &&
          "bg-foreground text-background hover:bg-foreground/90",
        variant === "danger" &&
          "border border-destructive/40 text-destructive hover:bg-destructive/10",
        className
      )}
    >
      {pending && (
        <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
      )}
      {pending ? pendingText ?? "Saving…" : children}
    </button>
  );
}
