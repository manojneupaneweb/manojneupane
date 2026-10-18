"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B1120]/80 backdrop-blur-lg border-b border-[#334155]/80 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Manoj Neupane — Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] flex items-center justify-center text-white font-bold text-sm font-mono shadow-md shadow-[#3B82F6]/20">
              MN
            </div>
            <span className="font-semibold text-[#F8FAFC] hidden sm:block group-hover:text-[#3B82F6] transition-colors">
              Manoj Neupane
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors rounded-md hover:bg-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120] shadow-sm shadow-[#3B82F6]/30"
            >
              Let&apos;s Work Together
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2 rounded-md text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
                <span
                  className={`block h-0.5 bg-current transition-all duration-200 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transition-all duration-200 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transition-all duration-200 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[#111827]/95 backdrop-blur-xl border-b border-[#334155] shadow-xl"
        >
          <nav aria-label="Mobile navigation" className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2.5 text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#334155] mt-2">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors"
              >
                Let&apos;s Work Together
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
