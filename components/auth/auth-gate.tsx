// Auth is now enforced server-side via Next middleware (`/middleware.ts`).
// This component used to do a client-side localStorage check; it is now a
// passthrough to avoid breaking existing imports.
export function AuthGate({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
