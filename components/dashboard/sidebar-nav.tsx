"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Workflow,
  Users,
  Sparkles,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/overview", icon: LayoutDashboard, label: "Overview" },
  { href: "/workflows", icon: Workflow, label: "Workflows" },
  { href: "/team", icon: Users, label: "Team" },
  { href: "/insights", icon: Sparkles, label: "Insights" },
  { href: "/settings", icon: Settings, label: "Settings", disabled: true },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen w-48 shrink-0 flex-col border-r border-border bg-background sticky top-0">
      <div className="h-14 flex items-center px-4 border-b border-border">
        <div className="h-7 w-7 rounded-md bg-foreground flex items-center justify-center">
          <span className="text-background text-xs font-semibold">P</span>
        </div>
        <span className="ml-2 font-medium text-sm">Pulsor</span>
      </div>
      
      <nav className="flex-1 p-2 space-y-0.5">
        {NAV.map(({ href, icon: Icon, label, disabled }) => {
          const active = pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={disabled ? "#" : href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                disabled && "pointer-events-none opacity-40",
                active
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function MobileSidebar({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <>
      <div
        className="lg:hidden fixed inset-0 z-30 bg-black/20"
        onClick={() => onOpenChange(false)}
      />
      <aside className="lg:hidden fixed top-0 left-0 z-40 h-screen w-48 flex flex-col bg-background border-r border-border">
        <div className="h-14 flex items-center px-4 border-b border-border">
          <div className="h-7 w-7 rounded-md bg-foreground flex items-center justify-center">
            <span className="text-background text-xs font-semibold">P</span>
          </div>
          <span className="ml-2 font-medium text-sm">Pulsor</span>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {NAV.map(({ href, icon: Icon, label, disabled }) => {
            const active = pathname === href || pathname?.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={disabled ? "#" : href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  disabled && "pointer-events-none opacity-40",
                  active
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
