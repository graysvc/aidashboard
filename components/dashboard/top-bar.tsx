"use client";

import { Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { dashboardData } from "@/lib/mock-data";
import { signOut } from "@/lib/auth";

export function TopBar({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const router = useRouter();
  const { user, period } = dashboardData;

  function handleSignOut() {
    signOut();
    router.push("/login");
  }

  return (
    <header className="h-14 sticky top-0 z-10 border-b border-border bg-background flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-3">
        {onOpenSidebar && (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="lg:hidden h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        )}
        <span className="text-sm text-muted-foreground hidden sm:block">{period.label}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-muted-foreground text-sm">
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
              {user.initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </header>
  );
}
