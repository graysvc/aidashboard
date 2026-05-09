import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createCompanyAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";

export default function NewCompanyPage() {
  return (
    <div className="px-4 sm:px-6 py-6 lg:px-8 lg:py-8 max-w-[640px] mx-auto space-y-6">
      <Link
        href="/admin/companies"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to companies
      </Link>

      <header>
        <h1 className="text-2xl lg:text-3xl font-medium text-foreground tracking-tight">
          New company
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add a team to provision a team leader and agents.
        </p>
      </header>

      <form
        action={createCompanyAction}
        className="rounded-xl border border-border bg-card p-6 space-y-4"
      >
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Gonzalez Team"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </Field>

        <Field label="ICP type" htmlFor="icp_type">
          <select
            id="icp_type"
            name="icp_type"
            defaultValue="team_leader"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
          >
            <option value="team_leader">Team Leader</option>
            <option value="top_producer_solo">Top Producer Solo</option>
            <option value="broker_boutique">Broker Boutique</option>
          </select>
        </Field>

        <SubmitButton className="w-full" pendingText="Creating…">
          Create company
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
