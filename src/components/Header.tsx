"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className="on-dark fixed top-0 left-0 right-0 z-50 bg-[#111318] border-b border-white/10"
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Manoj Neupane, home"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm font-mono text-black relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #22D3EE, #3B82F6)" }}>
              MN
            </div>
            <span className="font-semibold text-[#F1F5F9] hidden sm:block group-hover:text-[#22D3EE] transition-colors">
              Manoj Neupane
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-3.5 py-2 text-sm rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                    active
                      ? "text-[#22D3EE] bg-[rgba(34,211,238,0.08)]"
                      : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.05)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080D1A]"
              style={{ background: "linear-gradient(135deg, #22D3EE, #3B82F6)" }}
            >
              Start a project
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] transition-colors"
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
                <span className={`block h-0.5 bg-current rounded transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-current rounded transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-current rounded transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[#0D1426]/95 backdrop-blur-xl border-b border-[rgba(34,211,238,0.1)]"
        >
          <nav aria-label="Mobile navigation" className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                    active
                      ? "text-[#22D3EE] bg-[rgba(34,211,238,0.08)]"
                      : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.05)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] mt-2">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-black transition-all"
                style={{ background: "linear-gradient(135deg, #22D3EE, #3B82F6)" }}
              >
                Start a project
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
