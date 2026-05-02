"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PulsorLockup } from "@/components/brand/pulsor";
import { signIn } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("maria@gonzalezteam.com");
  const [password, setPassword] = useState("g0nzalez-team-2026");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      signIn();
      router.push("/overview");
    }, 600);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Decorative gradient */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(6,182,212,0.08), transparent 60%)",
        }}
      />

      {/* Centered brand + card */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-[400px]">
          {/* Brand */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <PulsorLockup size={48} textClassName="text-xl" />
          </div>

          <div className="rounded-xl bg-card border border-border/50 p-6 sm:p-8">
            {/* Title */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Demo session
              </span>
              <h1 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-muted-foreground/70">
                Sign in to your command center.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@team.com"
                  required
                  className="h-10 bg-muted/30 border-border/50 focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="h-10 pr-10 bg-muted/30 border-border/50 focus:border-primary focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-lg inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                    ) : (
                      <Eye className="h-4 w-4" strokeWidth={1.75} />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-muted/30 text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>

              <Button
                type="submit"
                disabled={submitting}
                className={cn(
                  "w-full h-10 gap-1.5 font-medium bg-primary text-primary-foreground hover:bg-primary/90",
                  submitting && "opacity-90"
                )}
              >
                {submitting ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      strokeWidth={2}
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border/50" />
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">
                or continue with
              </span>
              <div className="h-px flex-1 bg-border/50" />
            </div>

            {/* SSO buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-10 gap-2 font-medium bg-muted/30 border-border/50 hover:bg-muted/50 hover:border-border"
              >
                <GoogleIcon className="h-4 w-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-10 gap-2 font-medium bg-muted/30 border-border/50 hover:bg-muted/50 hover:border-border"
              >
                <MicrosoftIcon className="h-4 w-4" />
                Microsoft
              </Button>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-5 text-center text-xs text-muted-foreground/70">
            New here?{" "}
            <a
              href="/setup"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Set up your workspace
            </a>
          </p>
          <p className="mt-2 text-center text-[10px] text-muted-foreground/50 font-mono">
            Demo workspace - no real authentication
          </p>
        </div>
      </main>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
        fill="#EA4335"
      />
    </svg>
  );
}

function MicrosoftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M11.4 11.4H1V1h10.4v10.4z" fill="#F25022" />
      <path d="M23 11.4H12.6V1H23v10.4z" fill="#7FBA00" />
      <path d="M11.4 23H1V12.6h10.4V23z" fill="#00A4EF" />
      <path d="M23 23H12.6V12.6H23V23z" fill="#FFB900" />
    </svg>
  );
}
