"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Workflow,
  Users,
  Sparkles,
  Boxes,
  Settings,
  LifeBuoy,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PulsorLockup } from "@/components/brand/pulsor";

const NAV_PRIMARY = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { href: "/team", label: "Team", icon: Users },
  { href: "/insights", label: "Insights", icon: Sparkles },
  { href: "/tools", label: "Tools", icon: Boxes },
] as const;

const NAV_SECONDARY = [
  { href: "/settings", label: "Settings", icon: Settings, disabled: true },
  { href: "/help", label: "Help & support", icon: LifeBuoy, disabled: true },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 pb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
          Workspace
        </p>
        {NAV_PRIMARY.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full" />
              )}
              <Icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
                strokeWidth={1.75}
              />
              <span className="flex-1">{label}</span>
              {active && (
                <ChevronRight className="h-4 w-4 text-muted-foreground/50" strokeWidth={1.75} />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-6 space-y-1 border-t border-border/50 pt-4 mt-auto">
        {NAV_SECONDARY.map(({ href, label, icon: Icon }) => (
          <button
            key={href}
            type="button"
            disabled
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground/40 cursor-not-allowed"
          >
            <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
            {label}
          </button>
        ))}
      </div>
    </>
  );
}

function Brand() {
  return (
    <div className="flex h-16 items-center gap-2.5 px-4 border-b border-border/50">
      <PulsorLockup size={28} />
    </div>
  );
}

export function SidebarNav() {
  return (
    <aside className="hidden lg:flex h-screen w-56 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-border/50 sticky top-0">
      <Brand />
      <NavList />
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
  return (
    <>
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm animate-in fade-in-0"
          onClick={() => onOpenChange(false)}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 z-40 h-screen w-64 flex flex-col bg-sidebar text-sidebar-foreground border-r border-border/50 transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between gap-2.5 px-4 border-b border-border/50">
          <PulsorLockup size={28} />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
        <NavList onNavigate={() => onOpenChange(false)} />
      </aside>
    </>
  );
}
