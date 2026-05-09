import { createClient } from "@/lib/supabase/server";
import type { Company, IcpType } from "@/lib/data/types";

export async function listCompanies(): Promise<Company[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Company[];
}

export async function getCompany(id: string): Promise<Company | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null; // no rows
    throw error;
  }
  return data as Company;
}

export async function createCompany(input: {
  name: string;
  icp_type: IcpType;
}): Promise<Company> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("companies")
    .insert({ name: input.name, icp_type: input.icp_type })
    .select()
    .single();
  if (error) throw error;
  return data as Company;
}

export async function updateCompany(
  id: string,
  patch: { name?: string; icp_type?: IcpType }
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("companies").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteCompany(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("companies").delete().eq("id", id);
  if (error) throw error;
}
