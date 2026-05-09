import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { listCompanies } from "@/lib/data/companies";
import { listUsers } from "@/lib/data/users";

export default async function CompaniesPage() {
  const companies = await listCompanies();
  const allUsers = await listUsers();
  const countsByCompany = new Map<string, number>();
  for (const u of allUsers) {
    if (!u.company_id) continue;
    countsByCompany.set(u.company_id, (countsByCompany.get(u.company_id) ?? 0) + 1);
  }

  return (
    <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[1200px] mx-auto space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
            Companies
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Each company groups a team leader and their agents.
          </p>
        </div>
        <Link
          href="/admin/companies/new"
          className="inline-flex items-center gap-1.5 rounded-md bg-foreground text-background px-3 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New company
        </Link>
      </header>

      {companies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-sm font-medium text-foreground">No companies yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Create your first company to start provisioning users.
          </p>
        </div>
      ) : (
        <ul className="rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
          {companies.map((c) => {
            const userCount = countsByCompany.get(c.id) ?? 0;
            return (
              <li key={c.id}>
                <Link
                  href={`/admin/companies/${c.id}`}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-4 py-3 hover:bg-muted/40 transition-colors group"
                >
                  <span className="text-sm font-medium text-foreground truncate">
                    {c.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {c.icp_type.replace(/_/g, " ")}
                  </span>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground w-24 text-right">
                    {userCount} {userCount === 1 ? "user" : "users"}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground transition-colors"
                    strokeWidth={1.75}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
