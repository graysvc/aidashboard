import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { listUsers } from "@/lib/data/users";

export default async function SoloAgentsPage() {
  const users = await listUsers({ companyId: null });

  return (
    <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[1000px] mx-auto space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
            Solo agents
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Independent users not part of any company.
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center gap-1.5 rounded-md bg-foreground text-background px-3 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New solo agent
        </Link>
      </header>

      {users.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-sm font-medium text-foreground">No solo agents yet</p>
        </div>
      ) : (
        <ul className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
          {users.map((u) => (
            <li key={u.id}>
              <Link
                href={`/admin/users/${u.id}`}
                className="grid grid-cols-[1fr_140px_220px_auto] items-center gap-4 px-4 py-2.5 hover:bg-muted/40 transition-colors group"
              >
                <span className="text-sm font-medium text-foreground truncate">
                  {u.full_name || u.email}
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">
                  {u.icp_type?.replace(/_/g, " ") ?? "—"}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {u.email}
                </span>
                <ArrowRight
                  className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground transition-colors"
                  strokeWidth={1.75}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
