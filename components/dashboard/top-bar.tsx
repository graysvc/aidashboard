"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Bell,
  Search,
  LogOut,
  UserCircle,
  Settings,
  Menu,
  Command,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { dashboardData } from "@/lib/mock-data";
import { signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

const PAGE_LABEL: Record<string, string> = {
  overview: "Overview",
  workflows: "Workflows",
  team: "Team",
  insights: "Insights",
  tools: "Tools",
};

export function TopBar({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const segments = pathname.split("/").filter(Boolean);
  const currentLabel = PAGE_LABEL[segments[0] ?? ""] ?? "Dashboard";
  const { user } = dashboardData;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  function handleSignOut() {
    signOut();
    router.push("/login");
  }

  return (
    <header className="h-14 sticky top-0 z-10 border-b border-border/50 bg-background/60 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3 min-w-0">
        {onOpenSidebar && (
          <button
            type="button"
            aria-label="Open menu"
            onClick={onOpenSidebar}
            className="lg:hidden h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
        )}
        <h1 className="text-lg font-semibold text-foreground tracking-tight">
          {currentLabel}
        </h1>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-2">
        {/* Search pill */}
        <button
          type="button"
          className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Search className="h-3.5 w-3.5" strokeWidth={2} />
          <span>Search...</span>
          <kbd className="ml-4 flex items-center gap-0.5 text-[10px] font-mono bg-background/50 px-1.5 py-0.5 rounded border border-border/50">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
        >
          <Bell className="h-4 w-4" strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </button>

        {/* User dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className={cn(
              "flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg transition-colors",
              menuOpen ? "bg-muted/60" : "hover:bg-muted/50"
            )}
          >
            <Avatar className="h-7 w-7 ring-1 ring-border">
              <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground text-[10px] font-semibold">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                menuOpen && "rotate-180"
              )}
              strokeWidth={2}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-card border border-border shadow-lg p-1 z-20 animate-in fade-in-0 slide-in-from-top-2 duration-200">
              <div className="px-3 py-2.5 border-b border-border/60">
                <div className="text-sm font-semibold text-foreground truncate">
                  {user.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {user.email}
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {user.role}
                </div>
              </div>
              <div className="py-1">
                <MenuItem icon={UserCircle} label="View profile" />
                <MenuItem icon={Settings} label="Workspace settings" />
              </div>
              <div className="border-t border-border/60 pt-1">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.75} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuItem({
  icon: Icon,
  label,
}: {
  icon: typeof UserCircle;
  label: string;
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors"
    >
      <Icon
        className="h-4 w-4 text-muted-foreground"
        strokeWidth={1.75}
      />
      {label}
    </button>
  );
}
