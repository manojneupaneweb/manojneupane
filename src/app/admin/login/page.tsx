"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/analytics";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your admin password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, from }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed. Check your password.");
        setLoading(false);
        return;
      }

      // Successful login
      router.push(data.redirect || "/admin/analytics");
      router.refresh();
    } catch {
      setError("Network or server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          className="p-3.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs sm:text-sm flex items-start gap-2.5"
          role="alert"
        >
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="admin-password"
          className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2"
        >
          Admin Master Password
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password..."
            className="w-full px-4 py-2.5 pr-11 bg-[#0B1120] border border-[#1E314F] rounded-lg text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748B] hover:text-[#94A3B8] focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#38BDF8] text-white text-sm font-semibold hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 focus:ring-offset-[#0B1120] transition-all shadow-md shadow-[#6366F1]/20 disabled:opacity-50"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Verifying Credentials...
          </>
        ) : (
          <>
            <span>Unlock Admin Portal</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Card Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#38BDF8] text-white font-bold font-mono text-lg shadow-lg shadow-[#6366F1]/20 mb-2">
            MN
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">
            Admin Authentication
          </h1>
          <p className="text-sm text-[#94A3B8]">
            Enter your administrative password to access website analytics and portfolio management.
          </p>
        </div>

        {/* Login Form wrapped in Suspense */}
        <div className="bg-[#111C32] border border-[#1E314F] rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/30">
          <Suspense fallback={
            <div className="py-8 text-center text-sm text-[#94A3B8]">
              Loading login form...
            </div>
          }>
            <LoginForm />
          </Suspense>

          {/* Security Note */}
          <div className="mt-6 pt-6 border-t border-[#1E314F] text-center">
            <p className="text-xs text-[#64748B]">
              Protected with HMAC-signed HTTP-only session cookies and brute-force rate limiting.
            </p>
            <div className="mt-3">
              <Link href="/" className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
                ← Return to Portfolio Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
