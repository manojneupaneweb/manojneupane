"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/data";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  // State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [lastLogin, setLastLogin] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // System real-time clock
  useEffect(() => {
    if (pathname === "/admin/login") return;

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [pathname]);

  // Fetch last login & settings
  useEffect(() => {
    if (pathname === "/admin/login") return;

    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.lastLoginAt) {
          const d = new Date(data.lastLoginAt);
          setLastLogin(
            d.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          );
        } else {
          setLastLogin("Today, Just now");
        }
      })
      .catch(() => {
        setLastLogin("Today, Active");
      });
  }, [pathname]);

  // If on login page, render plain content without shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Logout handler
  const handleConfirmLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch("/api/admin/logout", { method: "POST" });
      setShowLogoutModal(false);
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  };

  const navItems = [
    {
      href: "/admin/analytics",
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: "/admin/blog",
      label: "Blog (CRUD)",
      badge: "Manage",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div data-admin className="on-dark flex h-screen bg-[#111318] text-[#f4f6f8] overflow-hidden font-sans">
      {/* ─── LEFT SIDEBAR ──────────────────────────────────────── */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } hidden md:flex flex-col bg-[#0c0e12] border-r border-white/10 transition-all duration-300 z-30 shrink-0`}
      >
        {/* Brand / Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <Link href="/admin/analytics" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-md bg-[#0c6b74] flex items-center justify-center font-bold text-[#f4f5f2] shrink-0">
              MN
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-wide text-[#F8FAFC] truncate">
                  Admin Panel
                </span>
                <span className="text-[10px] font-mono text-[#22D3EE] uppercase tracking-wider">
                  Manoj Neupane
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {sidebarOpen && (
            <div className="px-3 pb-2 text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
              Navigation
            </div>
          )}

          {navItems.map((item, idx) => {
            const isActive =
              item.href === "/admin/analytics"
                ? pathname === "/admin/analytics" || pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-[#f4f6f8]"
                    : "text-[#b7bec8] hover:text-[#f4f6f8] hover:bg-white/5"
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <div className="shrink-0">{item.icon}</div>
                {sidebarOpen && (
                  <div className="flex-1 flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#9ee7ee] border border-white/10">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-white/10 my-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-md text-sm text-[#b7bec8] hover:text-[#f4f6f8] hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {sidebarOpen && <span>View Live Site</span>}
            </a>
          </div>
        </div>

        {/* Bottom Section: Logout Button */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-sm font-medium text-[#f0b4b4] hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ─── MOBILE DRAWER OVERLAY ─────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-64 h-full bg-[#0c0e12] border-r border-white/10 p-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[#0c6b74] flex items-center justify-center font-bold text-[#f4f5f2] text-xs">
                  MN
                </div>
                <span className="font-bold text-sm text-[#F8FAFC]">Admin Portal</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-[#b7bec8] hover:text-white"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <div className="flex-1 py-6 space-y-2">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-md text-sm ${
                    pathname === item.href || (item.href === "/admin/analytics" && pathname === "/admin")
                      ? "bg-white/10 text-white"
                      : "text-[#b7bec8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowLogoutModal(true);
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-[#EF4444] hover:bg-[#EF4444]/10"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── RIGHT SECTION (TOP BANNER + MAIN CONTENT) ─────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Fixed Banner Header */}
        <header className="h-16 bg-[#0c0e12] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
          {/* Left: 3-line hamburger menu toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop collapse toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:inline-flex p-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Mobile drawer toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors"
              aria-label="Open mobile menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <span className="hidden sm:inline-block text-xs font-mono text-[#64748B]">
              ADMIN DASHBOARD
            </span>
          </div>

          {/* Center: System Time (Live Clock) */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-[#9ee7ee]">
            <span className="text-[#b7bec8] hidden sm:inline">NPT</span>
            <span className="font-semibold text-[#f4f6f8] tabular-nums inline-block min-w-[7.5rem]">{currentTime || "\u00a0"}</span>
          </div>

          {/* Right: Last Login, Fullscreen, Login User, Profile, Default Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Last login info */}
            <div className="hidden xl:flex flex-col text-right">
              <span className="text-[10px] font-mono text-[#64748B] uppercase">Last Login</span>
              <span className="text-xs font-medium text-[#94A3B8]">{lastLogin}</span>
            </div>

            {/* Fullscreen Icon */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>

            {/* User profile with default logo image */}
            <Link
              href="/admin/settings"
              className="flex items-center gap-2.5 p-1 pl-2.5 pr-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
            >
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-xs font-semibold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors leading-tight">
                  Manoj Neupane
                </span>
                <span className="text-[10px] text-[#22D3EE] font-mono">Super Admin</span>
              </div>

              {/* Profile Avatar with fallback / logo image */}
              <div className="relative w-8 h-8 rounded-md overflow-hidden border border-white/15 bg-[#111318] shrink-0">
                <Image
                  src={siteConfig.profileImage}
                  alt="Admin user avatar"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            </Link>
          </div>
        </header>

        {/* Right Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#16181c]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* ─── LOGOUT CONFIRMATION POPUP MODAL ───────────────────── */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#111827] border border-[#334155] rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 animate-scaleUp">
            <div className="w-14 h-14 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center mx-auto text-[#EF4444]">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#F8FAFC]">Confirm Logout</h3>
              <p className="text-sm text-[#94A3B8]">
                Are you sure you want to exit the admin dashboard session?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={loggingOut}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#334155] text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                disabled={loggingOut}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-medium transition-colors shadow-lg shadow-[#EF4444]/25 flex items-center justify-center gap-2"
              >
                {loggingOut ? "Signing Out..." : "Yes, Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
