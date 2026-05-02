"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { dashboardData } from "@/lib/mock-data";
import { signOut } from "@/lib/auth";

export function TopBar({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const router = useRouter();
  const { user } = dashboardData;

  function handleSignOut() {
    signOut();
    router.push("/login");
  }

  return (
    <header className="h-14 sticky top-0 z-10 border-b border-border bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {onOpenSidebar && (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="flex items-center gap-2"
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
            {user.initials}
          </AvatarFallback>
        </Avatar>
      </button>
    </header>
  );
}
