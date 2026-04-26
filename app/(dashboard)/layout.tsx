"use client";

import { useState } from "react";
import { SidebarNav, MobileSidebar } from "@/components/dashboard/sidebar-nav";
import { TopBar } from "@/components/dashboard/top-bar";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { AuthGate } from "@/components/auth/auth-gate";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AuthGate>
      <div className="flex min-h-screen bg-background">
        <SidebarNav />
        <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
        <div className="flex-1 min-w-0 flex flex-col">
          <TopBar onOpenSidebar={() => setMobileOpen(true)} />
          <main className="flex-1">{children}</main>
          <DashboardFooter />
        </div>
      </div>
    </AuthGate>
  );
}
