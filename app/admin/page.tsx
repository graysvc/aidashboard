import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { listCompanies } from "@/lib/data/companies";
import { listUsers } from "@/lib/data/users";

export default async function AdminHome() {
  const [companies, allUsers, soloAgents] = await Promise.all([
    listCompanies(),
    listUsers(),
    listUsers({ companyId: null }),
  ]);
  const teamLeaders = allUsers.filter((u) => u.role === "team_leader").length;
  const agents = allUsers.filter((u) => u.role === "agent").length;

  return (
    <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[1200px] mx-auto space-y-6">
      <header>
        <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
          Admin
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Provision teams, users, and weekly data.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Tile label="Companies" value={companies.length.toString()} href="/admin/companies" />
        <Tile label="Team leaders" value={teamLeaders.toString()} href="/admin/users" />
        <Tile label="Agents" value={agents.toString()} href="/admin/users" />
        <Tile label="Solo agents" value={soloAgents.length.toString()} href="/admin/solo-agents" />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ShortcutCard
          title="Create a company"
          description="Add a new team and assign a team leader."
          href="/admin/companies/new"
        />
        <ShortcutCard
          title="Add a user"
          description="Provision a team leader, agent, or solo agent."
          href="/admin/users/new"
        />
      </section>
    </div>
  );
}

function Tile({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-border bg-card p-5 hover:border-foreground/30 transition-colors block"
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
      <div className="font-mono text-3xl font-medium tabular-nums text-foreground mt-2 leading-none">
        {value}
      </div>
    </Link>
  );
}

function ShortcutCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-border bg-card p-5 hover:border-foreground/30 transition-colors block group"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <ArrowRight
          className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground transition-colors shrink-0 mt-0.5"
          strokeWidth={1.75}
        />
      </div>
    </Link>
  );
}
