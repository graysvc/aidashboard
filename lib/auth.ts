"use client";

import { createClient } from "@/lib/supabase/client";

/**
 * Client-side sign-out. Clears the Supabase session cookie and redirects
 * to /login. Middleware will block subsequent protected requests.
 */
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}
