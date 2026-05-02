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
  { href: "/overview", icon: LayoutDashboard },
  { href: "/workflows", icon: Workflow },
  { href: "/team", icon: Users },
  { href: "/insights", icon: Sparkles },
  { href: "/settings", icon: Settings, disabled: true },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen w-14 shrink-0 flex-col items-center py-4 border-r border-border bg-background sticky top-0">
      <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center mb-6">
        <span className="text-background text-sm font-bold">P</span>
      </div>
      
      <nav className="flex-1 flex flex-col gap-1">
        {NAV.map(({ href, icon: Icon, disabled }) => {
          const active = pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={disabled ? "#" : href}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-lg transition-colors",
                disabled && "pointer-events-none opacity-30",
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
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
        className="lg:hidden fixed inset-0 z-30 bg-background/80"
        onClick={() => onOpenChange(false)}
      />
      <aside className="lg:hidden fixed top-0 left-0 z-40 h-screen w-14 flex flex-col items-center py-4 bg-background border-r border-border">
        <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center mb-6">
          <span className="text-background text-sm font-bold">P</span>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          {NAV.map(({ href, icon: Icon, disabled }) => {
            const active = pathname === href || pathname?.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={disabled ? "#" : href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "h-10 w-10 flex items-center justify-center rounded-lg transition-colors",
                  disabled && "pointer-events-none opacity-30",
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
