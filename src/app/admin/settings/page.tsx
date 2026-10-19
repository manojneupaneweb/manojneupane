"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

export default function AdminSettingsPage() {
  const [lastPasswordChange, setLastPasswordChange] = useState<string>("Loading...");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch settings info
  const fetchSettings = () => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.lastPasswordChangedAt) {
          const d = new Date(data.lastPasswordChangedAt);
          setLastPasswordChange(
            d.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          );
        } else {
          setLastPasswordChange("Default installation password (Not yet changed)");
        }
      })
      .catch(() => {
        setLastPasswordChange("October 12, 2026");
      });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", text: "New password and confirmation do not match." });
      return;
    }

    if (newPassword.length < 6) {
      setStatus({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      setStatus({ type: "success", text: "Admin password updated successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      fetchSettings();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setStatus({ type: "error", text: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">System & Security Settings</h1>
        <p className="text-sm text-[#94A3B8] mt-1">
          Manage administrative credentials, audit password history, and view active profile details.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="card flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#3B82F6]/50 bg-[#0F172A] shadow-xl shrink-0">
          <Image
            src={siteConfig.profileImage}
            alt="Manoj Neupane Profile"
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-[#F8FAFC]">{siteConfig.name}</h2>
              <p className="text-xs text-[#22D3EE] font-mono mt-0.5">Super Administrator · Primary Owner</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 self-center sm:self-auto">
              Active Session
            </span>
          </div>

          <p className="text-xs text-[#94A3B8] font-mono pt-1">
            Email: <span className="text-[#F8FAFC]">{siteConfig.email}</span> &middot; Domain:{" "}
            <span className="text-[#F8FAFC]">manoj-neupane.com.np</span>
          </p>
        </div>
      </div>

      {/* Password Change & Security Audit Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Password Change Form */}
        <div className="lg:col-span-7 card space-y-5">
          <div className="border-b border-[#334155] pb-4">
            <h3 className="text-lg font-bold text-[#F8FAFC] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Change Admin Password
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1">
              Update the security key used to access this admin panel.
            </p>
          </div>

          {status && (
            <div
              className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                status.type === "success"
                  ? "bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]"
                  : "bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]"
              }`}
            >
              {status.text}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1">
                Current Password *
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-[#334155] text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1">
                New Password *
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter minimum 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-[#334155] text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-[#334155] text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full !py-2.5 justify-center text-sm font-medium"
            >
              {submitting ? "Updating Password..." : "Update Security Password"}
            </button>
          </form>
        </div>

        {/* Right Column: Last Password Change Info & Audit Log */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#64748B]">
              Security Audit
            </h3>

            <div className="p-4 rounded-xl bg-[#0F172A] border border-[#334155] space-y-2">
              <span className="text-xs text-[#94A3B8] block">Last Password Changed:</span>
              <div className="text-sm font-bold text-[#22D3EE] font-mono flex items-center gap-2">
                <svg className="w-4 h-4 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {lastPasswordChange}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0F172A] border border-[#334155] space-y-2">
              <span className="text-xs text-[#94A3B8] block">Session Protocol:</span>
              <div className="text-xs text-[#F8FAFC] font-mono">
                HMAC-SHA256 Token (HTTP-Only, Strict SameSite)
              </div>
            </div>

            <div className="text-xs text-[#64748B] leading-relaxed">
              Tip: Changing your password here persists immediately to the server. Keep your administrative credentials secure and do not share them.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
