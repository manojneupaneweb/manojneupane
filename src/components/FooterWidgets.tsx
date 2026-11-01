"use client";

import { useEffect, useState } from "react";

export function LocalTimeCard() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kathmandu",
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

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-xs font-mono text-[#94A3B8]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse flex-shrink-0" />
      <span>NPT:</span>
      <span className="text-[#22D3EE] font-semibold">{time || "Loading..."}</span>
    </div>
  );
}

export function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="group flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-[#22D3EE] transition-colors p-2 rounded-lg hover:bg-[rgba(34,211,238,0.06)]"
    >
      <span>Back to top</span>
      <svg
        className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
