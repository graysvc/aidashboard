import { cn } from "@/lib/utils";

/**
 * PulsorMark — the brand symbol.
 * A bold "P" whose vertical stem extends downward and tapers into a
 * map-pin point. Modern cyan gradient background for dark theme.
 */
export function PulsorMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 rounded-xl", className)}
      role="img"
      aria-label="Pulsor"
    >
      <defs>
        <linearGradient id="pulsor-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#pulsor-gradient)" />
      <path
        fill="#0a0a0a"
        fillRule="evenodd"
        d="M22 9 H36 C43 9 50 15 50 23 C50 31 43 37 36 37 H30 V49 L26 57 L22 49 Z M30 17 V29 H35 C38 29 41 26 41 23 C41 20 38 17 35 17 Z"
      />
    </svg>
  );
}

/**
 * PulsorWordmark — text-only brand. Inherits color via currentColor.
 */
export function PulsorWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-semibold tracking-tight text-foreground",
        className
      )}
    >
      Pulsor
    </span>
  );
}

/**
 * PulsorLockup — mark + wordmark side by side. The default brand block
 * used in sidebars, login pages, wizards, etc.
 */
export function PulsorLockup({
  size = 32,
  className,
  textClassName,
}: {
  size?: number;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <PulsorMark size={size} />
      <PulsorWordmark className={cn("text-sm", textClassName)} />
    </div>
  );
}
