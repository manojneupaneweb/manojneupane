"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, don't show full admin navigation
  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      setLoggingOut(false);
    }
  };

  return (
    <div className="bg-[#111827] border-b border-[#334155] sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Admin Brand & Navigation */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-sm font-semibold text-[#F8FAFC]">Admin Portal</span>
            </div>

            <nav className="flex items-center gap-1 sm:gap-2" aria-label="Admin navigation">
              <Link
                href="/admin/analytics"
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  pathname === "/admin/analytics" || pathname === "/admin"
                    ? "bg-[#3B82F6] text-white shadow-sm shadow-[#3B82F6]/30"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]"
                }`}
              >
                Analytics
              </Link>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors flex items-center gap-1.5"
                title="Open official Vercel Dashboard in new tab"
              >
                Vercel Dashboard
                <svg className="w-3 h-3 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </nav>
          </div>

          {/* Right: Environment Info & Logout */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-[#1E293B] text-[#94A3B8] border border-[#334155]">
              <span className="text-[#22D3EE]">Domain:</span> manoj-neupane.com.np
            </span>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#EF4444] hover:bg-[#EF4444]/10 rounded-md transition-colors border border-[#EF4444]/30 disabled:opacity-50"
              aria-label="Log out of admin"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
