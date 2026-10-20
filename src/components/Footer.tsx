import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { LocalTimeCard, ScrollToTopButton } from "./FooterWidgets";

const footerLinks = {
  Navigation: [
    { href: "/about", label: "About Manoj" },
    { href: "/projects", label: "Selected Works" },
    { href: "/skills", label: "Technical Skills" },
    { href: "/services", label: "Freelance & Consulting" },
    { href: "/blog", label: "Engineering Articles" },
    { href: "/contact", label: "Start Conversation" },
  ],
  Projects: [
    { href: "/projects/linktogovernment", label: "LinkToGovernment ↗" },
    { href: "/projects/saas-multi-tenant", label: "Multi-Tenant SaaS" },
    { href: "/projects/business-management-system", label: "Business Management System" },
    { href: "/projects", label: "Explore All Works" },
  ],
  Specialties: [
    { href: "/services", label: "Laravel Architecture" },
    { href: "/services", label: "MERN Stack Systems" },
    { href: "/services", label: "REST APIs & Integrations" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#070D18] border-t border-[#334155]/80 overflow-hidden text-[#F8FAFC]">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-[#3B82F6]/10 via-[#22D3EE]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Banner: Quick Availability & Interaction */}
      <div className="border-b border-[#334155]/60 bg-[#0B1120]/50 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 lg:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] p-0.5 shrink-0 shadow-lg shadow-[#3B82F6]/20">
              <div className="w-full h-full bg-[#0B1120] rounded-[10px] flex items-center justify-center font-mono font-bold text-lg text-[#22D3EE]">
                MN
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="font-bold text-base sm:text-lg">Manoj Neupane</span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Open for Q4 Projects
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
                Full-Stack Engineer & Laravel / MERN Stack Mentor · Based in Nepal 🇳🇵
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-center">
            <LocalTimeCard />
            <Link
              href="/contact"
              className="btn-primary !text-xs !py-2 !px-4"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Manifesto Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#3B82F6] font-mono">
              The Philosophy
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              &ldquo;Software shouldn&apos;t just look good in mockups; it must survive production. I engineer practical, resilient systems with clean relational schemas, secure auth, and maintainable architectures.&rdquo;
            </p>

            {/* Quick Terminal / Tech Snippet */}
            <div className="p-4 rounded-xl bg-[#0B1120] border border-[#334155] font-mono text-xs text-[#94A3B8] space-y-1.5 shadow-inner">
              <div className="flex items-center gap-1.5 text-[#334155] pb-1 border-b border-[#334155]/60 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] text-[#64748B] ml-2">stack.json</span>
              </div>
              <div>
                <span className="text-[#38BDF8]">const</span> <span className="text-[#F8FAFC]">focus</span> = [<span className="text-[#A5F3FC]">&quot;Node.js&quot;</span>, <span className="text-[#A5F3FC]">&quot;Laravel&quot;</span>, <span className="text-[#A5F3FC]">&quot;React/Next.js&quot;</span>, <span className="text-[#A5F3FC]">&quot;MySQL&quot;</span>];
              </div>
              <div>
                <span className="text-[#38BDF8]">const</span> <span className="text-[#F8FAFC]">role</span> = <span className="text-[#A5F3FC]">&quot;Engineer & Tutor @ Softworica&quot;</span>;
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#F8FAFC] px-3 py-2 rounded-lg bg-[#111827] border border-[#334155] hover:border-[#3B82F6]/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#F8FAFC] px-3 py-2 rounded-lg bg-[#111827] border border-[#334155] hover:border-[#3B82F6]/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
                className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#F8FAFC] px-3 py-2 rounded-lg bg-[#111827] border border-[#334155] hover:border-[#3B82F6]/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#F8FAFC] px-3 py-2 rounded-lg bg-[#111827] border border-[#334155] hover:border-[#3B82F6]/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Send email"
                className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#F8FAFC] px-3 py-2 rounded-lg bg-[#111827] border border-[#334155] hover:border-[#3B82F6]/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Navigation Links (7 cols total: 3 cols each) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#F8FAFC] mb-4 font-mono">
                  {section}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#334155]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span>&copy; {year} Manoj Neupane. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
