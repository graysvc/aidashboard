import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-component Supabase client. Reads/writes the session cookie via Next's
 * cookies() helper so server-rendered pages know who the user is.
 */
export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component — cookie setting not allowed here.
            // Middleware refreshes the session, so this is fine.
          }
        },
      },
    }
  );
}
