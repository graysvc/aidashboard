"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createCompany,
  deleteCompany,
  updateCompany,
} from "@/lib/data/companies";
import {
  createUser,
  deleteUser,
  updateUser,
} from "@/lib/data/users";
import { upsertAgentData } from "@/lib/data/agent-data";
import type {
  CriticalLead,
  IcpType,
  UserRole,
} from "@/lib/data/types";

// ─── Companies ───────────────────────────────────────────────

export async function createCompanyAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const icp_type = String(formData.get("icp_type") ?? "team_leader") as IcpType;
  if (!name) throw new Error("Name required");
  const company = await createCompany({ name, icp_type });
  revalidatePath("/admin/companies");
  redirect(`/admin/companies/${company.id}`);
}

export async function updateCompanyAction(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const icp_type = String(formData.get("icp_type") ?? "team_leader") as IcpType;
  await updateCompany(id, { name, icp_type });
  revalidatePath(`/admin/companies/${id}`);
  revalidatePath("/admin/companies");
}

export async function deleteCompanyAction(id: string) {
  await deleteCompany(id);
  revalidatePath("/admin/companies");
  redirect("/admin/companies");
}

// ─── Users ───────────────────────────────────────────────────

export async function createUserAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const full_name = String(formData.get("full_name") ?? "").trim();
  const role = String(formData.get("role") ?? "agent") as UserRole;
  const companyRaw = String(formData.get("company_id") ?? "");
  const company_id = companyRaw === "" ? null : companyRaw;
  const icpRaw = String(formData.get("icp_type") ?? "");
  const icp_type = icpRaw === "" ? null : (icpRaw as IcpType);

  if (!email || !password || !full_name) {
    throw new Error("Email, password, and full name are required");
  }

  const user = await createUser({
    email,
    password,
    full_name,
    role,
    company_id,
    icp_type,
  });
  if (company_id) revalidatePath(`/admin/companies/${company_id}`);
  revalidatePath("/admin/solo-agents");
  revalidatePath("/admin");
  redirect(`/admin/users/${user.id}`);
}

export async function updateUserAction(id: string, formData: FormData) {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const role = String(formData.get("role") ?? "agent") as UserRole;
  const companyRaw = String(formData.get("company_id") ?? "");
  const company_id = companyRaw === "" ? null : companyRaw;
  const icpRaw = String(formData.get("icp_type") ?? "");
  const icp_type = icpRaw === "" ? null : (icpRaw as IcpType);
  await updateUser(id, { full_name, role, company_id, icp_type });
  revalidatePath(`/admin/users/${id}`);
}

export async function deleteUserAction(id: string, redirectTo?: string) {
  await deleteUser(id);
  revalidatePath("/admin");
  if (redirectTo) redirect(redirectTo);
}

// ─── Agent data ──────────────────────────────────────────────

export async function upsertAgentDataAction(
  userId: string,
  formData: FormData
) {
  const weekIso = String(formData.get("week_iso") ?? "").trim();
  if (!weekIso) throw new Error("week_iso required");

  const num = (v: FormDataEntryValue | null): number =>
    v === null || v === "" ? 0 : Number(v);

  const criticalLeadsRaw = String(formData.get("critical_leads") ?? "[]");
  let critical_leads: CriticalLead[] = [];
  try {
    const parsed = JSON.parse(criticalLeadsRaw);
    if (Array.isArray(parsed)) critical_leads = parsed;
  } catch {
    // tolerate malformed JSON; admin can fix in the textarea
  }

  await upsertAgentData({
    user_id: userId,
    week_iso: weekIso,
    leads_total: num(formData.get("leads_total")),
    pipeline_value: num(formData.get("pipeline_value")),
    conversion_rate: num(formData.get("conversion_rate")),
    lead_leak_rate: num(formData.get("lead_leak_rate")),
    money_on_table: num(formData.get("money_on_table")),
    weekly_insight: (formData.get("weekly_insight") as string) || null,
    this_week_goal: (formData.get("this_week_goal") as string) || null,
    last_week_wins: (formData.get("last_week_wins") as string) || null,
    critical_leads,
  });
  revalidatePath(`/admin/users/${userId}`);
}
