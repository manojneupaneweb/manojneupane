"use client";

import { useState } from "react";
import { FaqItem } from "@/lib/blog-types";

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3 my-8">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.question}
            className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm sm:text-base text-[#F1F5F9] hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
            >
              <span className="flex items-center gap-3">
                <span className="text-[#22D3EE] font-mono text-xs">Q{idx + 1}.</span>
                <span>{faq.question}</span>
              </span>
              <svg
                className={`w-4 h-4 text-[#94A3B8] shrink-0 ml-2 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-[#22D3EE]" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-1 text-sm text-[#94A3B8] leading-relaxed border-t border-[rgba(255,255,255,0.06)]">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
