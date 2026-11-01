import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.2) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-8">
        <p className="section-label justify-center">Page not found</p>

        <div className="space-y-2">
          <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight select-none gradient-text">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
            This URL is not on the site.
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-md mx-auto">
          The page you are looking for might have been removed, had its URL changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/" className="btn-primary group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Homepage
          </Link>
          <Link href="/projects" className="btn-secondary">View Projects</Link>
        </div>

        <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] mt-8">
          <p className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-4">
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
                className="px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[rgba(34,211,238,0.25)] transition-all font-mono"
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
