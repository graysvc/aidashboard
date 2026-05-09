import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { IcpType, User, UserRole } from "@/lib/data/types";

export async function listUsers(opts?: {
  companyId?: string | null;
}): Promise<User[]> {
  const supabase = createClient();
  let q = supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });
  if (opts?.companyId === null) q = q.is("company_id", null);
  else if (opts?.companyId) q = q.eq("company_id", opts.companyId);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as User[];
}

export async function getUser(id: string): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as User;
}

/**
 * Create a new user — uses the service-role admin client because we need to
 * provision an auth.users row with a password. The trigger
 * `on_auth_user_created` will insert a matching row in public.users with
 * role='agent' by default; we then update with the requested role/company.
 */
export async function createUser(input: {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  company_id: string | null;
  icp_type: IcpType | null;
}): Promise<User> {
  const admin = createAdminClient();

  // 1. Create auth user (auto-confirm — no email step)
  const { data: authUser, error: authErr } = await admin.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: true,
  });
  if (authErr) throw authErr;
  if (!authUser.user) throw new Error("Auth user creation returned no user");

  // 2. Promote / fill the public.users row that the trigger just created.
  //    Use the admin (service-role) client so RLS doesn't block the update.
  const { data, error } = await admin
    .from("users")
    .update({
      full_name: input.full_name,
      role: input.role,
      company_id: input.company_id,
      icp_type: input.icp_type,
    })
    .eq("id", authUser.user.id)
    .select()
    .single();
  if (error) throw error;
  return data as User;
}

export async function updateUser(
  id: string,
  patch: Partial<
    Pick<User, "full_name" | "role" | "company_id" | "icp_type">
  >
): Promise<void> {
  // Service role to bypass the column revoke we have for `authenticated`.
  const admin = createAdminClient();
  const { error } = await admin.from("users").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteUser(id: string): Promise<void> {
  const admin = createAdminClient();
  // Deletes the auth user, which cascades to public.users via FK.
  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) throw error;
}
