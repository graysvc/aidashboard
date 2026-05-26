import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

// Routes anyone can hit without a session.
const PUBLIC_PATHS = [
  "/login",
  "/setup",
  "/landing",          // static HTML landing — served at "/" via rewrite
  "/landing-realtors", // realtor-specific landing — served at "/realtor"
  "/realtor",          // public realtor landing path
  "/closing",          // public closing-progress view shared with clients
  "/icon.svg",
  "/favicon.ico",
];

function isPublic(pathname: string): boolean {
  if (pathname === "/") return true;
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request);

  // Refreshes the session cookie if expired.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ── Public routes ─────────────────────────────────────────────
  if (isPublic(pathname)) {
    // If logged-in user lands on /login, send them home.
    if (pathname === "/login" && user) {
      const url = request.nextUrl.clone();
      url.pathname = "/overview";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // ── Auth required for everything else ─────────────────────────
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    // Run on everything except _next, static assets, and image-optimization paths.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
