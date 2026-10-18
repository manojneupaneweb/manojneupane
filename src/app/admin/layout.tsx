import type { Metadata } from "next";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin Panel | Manoj Neupane Portfolio",
  description: "Secure administrative management dashboard for Manoj Neupane Portfolio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC]">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
