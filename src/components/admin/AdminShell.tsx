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

  // If on login page, render plain content
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // System real-time clock
  useEffect(() => {
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
  }, []);

  // Fetch last login & settings
  useEffect(() => {
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
  }, []);

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
      href: "/admin/analytics",
      label: "Analytics",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
    <div className="flex h-screen bg-[#080B14] text-[#F8FAFC] overflow-hidden font-sans">
      {/* ─── LEFT SIDEBAR ──────────────────────────────────────── */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } hidden md:flex flex-col bg-[#0F172A] border-r border-[#1E293B] transition-all duration-300 z-30 shrink-0`}
      >
        {/* Brand / Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#1E293B]">
          <Link href="/admin/analytics" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#22D3EE] flex items-center justify-center font-bold text-white shadow-lg shadow-[#3B82F6]/20 shrink-0">
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
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/25 font-semibold"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]"
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <div className="shrink-0">{item.icon}</div>
                {sidebarOpen && (
                  <div className="flex-1 flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E293B] text-[#22D3EE] border border-[#334155]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-[#1E293B] my-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-all"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {sidebarOpen && <span>View Live Site</span>}
            </a>
          </div>
        </div>

        {/* Bottom Section: Logout Button */}
        <div className="p-3 border-t border-[#1E293B]">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors border border-transparent hover:border-[#EF4444]/20"
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
            className="w-64 h-full bg-[#0F172A] border-r border-[#1E293B] p-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3B82F6] to-[#22D3EE] flex items-center justify-center font-bold text-white text-xs">
                  MN
                </div>
                <span className="font-bold text-sm text-[#F8FAFC]">Admin Portal</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-[#94A3B8] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 py-6 space-y-2">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm ${
                    pathname === item.href
                      ? "bg-[#3B82F6] text-white"
                      : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
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
        <header className="h-16 bg-[#0F172A]/90 backdrop-blur-md border-b border-[#1E293B] px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
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
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B]/60 border border-[#334155]/60 text-xs font-mono text-[#22D3EE] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
            <span className="text-[#94A3B8] hidden sm:inline">System Time:</span>
            <span className="font-semibold text-[#F8FAFC]">{currentTime || "Loading..."}</span>
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
              className="flex items-center gap-2.5 p-1 pl-2.5 pr-1.5 rounded-full bg-[#1E293B]/70 hover:bg-[#1E293B] border border-[#334155]/60 transition-colors group"
            >
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-xs font-semibold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors leading-tight">
                  Manoj Neupane
                </span>
                <span className="text-[10px] text-[#22D3EE] font-mono">Super Admin</span>
              </div>

              {/* Profile Avatar with fallback / logo image */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#3B82F6]/50 bg-[#111827] shrink-0">
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#080B14]">
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
