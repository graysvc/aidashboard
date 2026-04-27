import { cn } from "@/lib/utils";

/**
 * VyzorMark — the brand symbol.
 * Renders a purple rounded square with a stylized V drawn as a chart line.
 * Use anywhere the brand identity appears (sidebars, login, emails, etc.).
 */
export function VyzorMark({
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
      className={cn("shrink-0 shadow-sm rounded-[25%]", className)}
      role="img"
      aria-label="Vyzor"
    >
      <rect width="64" height="64" rx="16" fill="#7C3AED" />
      <path
        d="M14 21 L32 45 L50 17"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="50" cy="17" r="3.5" fill="white" />
    </svg>
  );
}

/**
 * VyzorWordmark — text-only brand. Inherits color via currentColor.
 */
export function VyzorWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-semibold tracking-tight text-foreground",
        className
      )}
    >
      Vyzor
    </span>
  );
}

/**
 * VyzorLockup — mark + wordmark side by side. The default brand block
 * used in sidebars, login pages, wizards, etc.
 */
export function VyzorLockup({
  size = 32,
  className,
  textClassName,
}: {
  size?: number;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <VyzorMark size={size} />
      <VyzorWordmark className={cn("text-[15px]", textClassName)} />
    </div>
  );
}
