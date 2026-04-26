// Client-side mock auth — placeholder until real auth (Clerk / Supabase / NextAuth) is wired in.
// Stores a flag in localStorage to simulate a logged-in session.

export const AUTH_KEY = "aidashboard:auth";
export const AUTH_VALUE = "demo";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === AUTH_VALUE;
}

export function signIn() {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, AUTH_VALUE);
}

export function signOut() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}
