"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const admin = pathname.startsWith("/admin");

  if (admin) return <>{children}</>;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#2563EB] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-[#18181B]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
