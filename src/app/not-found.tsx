import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow accents matching Midnight Electric theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3B82F6]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#22D3EE]/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6] uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
          HTTP 404 · Not Found
        </div>

        {/* 404 Large Display */}
        <div className="space-y-2">
          <h1
            className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tight gradient-text select-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Lost in Cyberspace?
          </h2>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-md mx-auto">
          The page you are looking for might have been removed, had its URL changed, or is temporarily unavailable.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/" className="btn-primary group">
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Homepage
          </Link>
          <Link href="/projects" className="btn-secondary">
            View Projects
          </Link>
        </div>

        {/* Helpful links card */}
        <div className="pt-6 border-t border-[#334155]/60 mt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-4">
            Or explore popular destinations:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {[
              { href: "/projects", label: "Featured Projects" },
              { href: "/skills", label: "Skills & Tech" },
              { href: "/blog", label: "Technical Blog" },
              { href: "/contact", label: "Get in Touch" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg bg-[#111827] border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#3B82F6]/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
