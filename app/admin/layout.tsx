import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, email, role")
    .eq("id", user.id)
    .single();
  if (!profile || profile.role !== "admin") redirect("/overview");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar
        adminName={profile.full_name ?? ""}
        adminEmail={profile.email}
      />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
