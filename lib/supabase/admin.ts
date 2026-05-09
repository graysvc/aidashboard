import { createClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client — server-only. Uses the service_role key.
 * Bypasses RLS and can manage auth.users (create, list, delete).
 *
 * NEVER import this from a Client Component. Only API routes / Server Actions /
 * server-only utilities.
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Required for admin operations."
    );
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
