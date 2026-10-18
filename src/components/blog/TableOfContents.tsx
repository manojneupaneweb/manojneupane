"use client";

import { useState, useEffect } from "react";

interface TocItem {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let currentActive = items[0]?.id || "";

      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            currentActive = item.id;
          }
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  if (!items || items.length === 0) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // offset for sticky header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsOpenMobile(false);
    }
  };

  return (
    <div>
      {/* Mobile Collapsible TOC */}
      <div className="lg:hidden mb-8 p-4 rounded-xl border border-[#334155] bg-[#111827]/80 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full flex items-center justify-between text-left font-semibold text-sm text-[#F8FAFC]"
          aria-expanded={isOpenMobile}
        >
          <span className="flex items-center gap-2">
            <span>📑</span> Table of Contents ({items.length} steps)
          </span>
          <svg
            className={`w-4 h-4 text-[#94A3B8] transition-transform ${isOpenMobile ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpenMobile && (
          <nav className="mt-4 pt-3 border-t border-[#334155] space-y-1.5" aria-label="Table of contents mobile">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors ${
                  activeId === item.id
                    ? "bg-[#3B82F6]/15 text-[#22D3EE] font-semibold"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]"
                } ${item.level === 3 ? "pl-5" : ""}`}
              >
                <span className="text-[#64748B] font-mono mr-1.5">{idx + 1}.</span>
                {item.title}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop Sticky TOC */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto p-5 rounded-2xl border border-[#334155] bg-[#111827]/70 backdrop-blur-md"
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#334155]">
          <span className="text-base">📑</span>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#3B82F6]">
            Table of Contents
          </h2>
        </div>
        <ul className="space-y-1 text-xs">
          {items.map((item, idx) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left py-1.5 px-2.5 rounded-lg transition-all leading-normal ${
                  activeId === item.id
                    ? "bg-[#3B82F6]/15 text-[#22D3EE] font-semibold border-l-2 border-[#22D3EE]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/80"
                } ${item.level === 3 ? "pl-5 text-[11px]" : ""}`}
              >
                <span className="text-[#64748B] font-mono mr-1.5 text-[10px]">
                  {idx + 1}.
                </span>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
