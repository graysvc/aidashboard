import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listCompanies } from "@/lib/data/companies";
import { createUserAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";

export default async function NewUserPage() {
  const companies = await listCompanies();

  return (
    <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[640px] mx-auto space-y-6">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to users
      </Link>

      <header>
        <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
          New user
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Provision an account. Leave Company empty for solo agents.
        </p>
      </header>

      <form
        action={createUserAction}
        className="rounded-xl border border-border bg-card p-6 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full name" htmlFor="full_name">
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Email" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Password" htmlFor="password">
            <input
              id="password"
              name="password"
              type="text"
              required
              minLength={8}
              placeholder="At least 8 characters"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono"
            />
          </Field>
          <Field label="Role" htmlFor="role">
            <select
              id="role"
              name="role"
              defaultValue="agent"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="admin">Admin</option>
              <option value="team_leader">Team Leader</option>
              <option value="agent">Agent</option>
            </select>
          </Field>
          <Field label="Company" htmlFor="company_id">
            <select
              id="company_id"
              name="company_id"
              defaultValue=""
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">— None (solo agent)</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="ICP type (solos only)" htmlFor="icp_type">
            <select
              id="icp_type"
              name="icp_type"
              defaultValue=""
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">— Inherits from company</option>
              <option value="top_producer_solo">Top Producer Solo</option>
              <option value="broker_boutique">Broker Boutique</option>
              <option value="team_leader">Team Leader</option>
            </select>
          </Field>
        </div>

        <SubmitButton className="w-full" pendingText="Creating…">
          Create user
        </SubmitButton>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-xs font-semibold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
