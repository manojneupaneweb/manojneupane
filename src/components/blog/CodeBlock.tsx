"use client";

import { useState } from "react";
import { CodeSnippet } from "@/lib/blog-types";

interface CodeBlockProps {
  snippets: CodeSnippet[];
  defaultTab?: number;
}

export default function CodeBlock({ snippets, defaultTab = 0 }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  if (!snippets || snippets.length === 0) return null;

  const currentSnippet = snippets[activeTab] || snippets[0];

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentSnippet.code);
        setCopied(true);
        setCopyError(false);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = currentSnippet.code;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setCopyError(false);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy code: ", err);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  return (
    <div className="on-dark my-6 rounded-lg overflow-hidden border border-white/10 bg-[#111318]">
      {/* Header bar: Tabs & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#0F1A2E] border-b border-[rgba(255,255,255,0.06)] text-xs font-mono">
        {/* Left: Language Tabs or Filename */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
          {snippets.length > 1 ? (
            snippets.map((snip, idx) => (
              <button
                key={snip.label || snip.language + idx}
                type="button"
                onClick={() => {
                  setActiveTab(idx);
                  setCopied(false);
                }}
                className={`px-3 py-1.5 rounded-md font-medium transition-all text-xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#22D3EE] ${
                  activeTab === idx
                    ? "bg-[rgba(34,211,238,0.15)] text-[#22D3EE] border border-[rgba(34,211,238,0.3)]"
                    : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.05)]"
                }`}
              >
                {snip.label || snip.language}
              </button>
            ))
          ) : (
            <div className="flex items-center gap-2 text-[#94A3B8] px-2 py-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE]" aria-hidden="true" />
              <span className="font-semibold text-[#CBD5E1]">
                {currentSnippet.filename || currentSnippet.label || currentSnippet.language.toUpperCase()}
              </span>
            </div>
          )}

          {/* If multi-tab and active tab has a specific filename */}
          {snippets.length > 1 && currentSnippet.filename && (
            <span className="text-[#64748B] text-xs pl-2 hidden sm:inline">
              📁 {currentSnippet.filename}
            </span>
          )}
        </div>

        {/* Right: Copy Button */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
              copied
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : copyError
                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                : "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(34,211,238,0.08)] text-[#94A3B8] hover:text-[#22D3EE] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(34,211,238,0.25)]"
            }`}
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </>
            ) : copyError ? (
              <span>Failed</span>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="relative p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-[#070E1A]">
        <pre className="text-[#E2E8F0] whitespace-pre tab-4">
          <code>{currentSnippet.code}</code>
        </pre>
      </div>
    </div>
  );
}
