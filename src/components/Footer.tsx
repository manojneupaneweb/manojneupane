"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/data";
import { LocalTimeCard, ScrollToTopButton } from "./FooterWidgets";

const footerLinks = {
  Navigation: [
    { href: "/about", label: "About Manoj" },
    { href: "/projects", label: "Selected Works" },
    { href: "/skills", label: "Technical Skills" },
    { href: "/services", label: "Freelance & Consulting" },
    { href: "/blog", label: "Engineering Articles" },
    { href: "/contact", label: "Start a Project" },
  ],
  Projects: [
    { href: "/projects/linktogovernment", label: "LinkToGovernment" },
    { href: "/projects/hiresense", label: "Hiresense" },
    { href: "/projects/gogain", label: "GoGain" },
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

const socialLinks = [
  {
    href: siteConfig.github,
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    href: siteConfig.linkedin,
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: `mailto:${siteConfig.email}`,
    label: "Email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const showStory = pathname === "/";

  return (
    <footer className="on-dark relative border-t border-white/10" style={{ background: "#111318" }}>
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.2)] to-transparent" />

      {/* CTA banner */}
      <div className="border-b border-[rgba(255,255,255,0.05)]" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div
              className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center font-mono font-bold text-sm text-black"
              style={{ background: "linear-gradient(135deg, #22D3EE, #3B82F6)" }}
            >
              MN
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <span className="font-bold text-base text-[#F1F5F9]">Manoj Neupane</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono rounded-full bg-[rgba(52,211,153,0.08)] text-[#34D399] border border-[rgba(52,211,153,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  Available for freelance
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Full-stack engineer and Laravel / MERN instructor in Nepal
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-center">
            <LocalTimeCard />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black transition-all hover:shadow-glow-sm hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #22D3EE, #3B82F6)" }}
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-5 space-y-6">
            {showStory && (
              <>
                <h3 className="text-sm font-semibold text-[#22D3EE] font-mono uppercase tracking-widest">
                  The Philosophy
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  &ldquo;Software shouldn&apos;t just look good in mockups; it must survive production.
                  I engineer practical, resilient systems with clean relational schemas,
                  secure auth, and maintainable architectures.&rdquo;
                </p>
                <div className="p-4 rounded-xl border border-[rgba(34,211,238,0.1)] font-mono text-xs text-[#94A3B8] space-y-1.5"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="flex items-center gap-1.5 pb-2 border-b border-[rgba(255,255,255,0.05)] mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="text-[11px] text-[#94A3B8] ml-2">stack.json</span>
                  </div>
                  <div>
                    <span className="text-[#22D3EE]">const</span>{" "}
                    <span className="text-[#F1F5F9]">focus</span> = [
                    <span className="text-[#34D399]">&quot;Node.js&quot;</span>,{" "}
                    <span className="text-[#34D399]">&quot;Laravel&quot;</span>,{" "}
                    <span className="text-[#34D399]">&quot;Next.js&quot;</span>,{" "}
                    <span className="text-[#34D399]">&quot;MySQL&quot;</span>];
                  </div>
                  <div>
                    <span className="text-[#22D3EE]">const</span>{" "}
                    <span className="text-[#F1F5F9]">role</span> ={" "}
                    <span className="text-[#34D399]">&quot;Engineer &amp; Tutor @ Softworica&quot;</span>;
                  </div>
                </div>
              </>
            )}

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={`${social.label} profile`}
                  className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#22D3EE] px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(34,211,238,0.25)] transition-all"
                >
                  {social.icon}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#F1F5F9] mb-4 font-mono">
                  {section}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
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
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
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
