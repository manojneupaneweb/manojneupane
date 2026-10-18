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
    <div className="my-6 rounded-xl overflow-hidden border border-[#334155] bg-[#0E1626] shadow-xl">
      {/* Header bar: Tabs & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#141F36] border-b border-[#334155] text-xs font-mono">
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
                className={`px-3 py-1.5 rounded-md font-medium transition-all text-xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3B82F6] ${
                  activeTab === idx
                    ? "bg-[#3B82F6] text-white shadow-sm"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E2E4E]"
                }`}
              >
                {snip.label || snip.language}
              </button>
            ))
          ) : (
            <div className="flex items-center gap-2 text-[#94A3B8] px-2 py-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
              <span className="font-semibold text-[#F8FAFC]">
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
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
              copied
                ? "bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40"
                : copyError
                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                : "bg-[#1E2E4E] hover:bg-[#283C66] text-[#CBD5E1] border border-[#2D4470]"
            }`}
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-[#34D399]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
      <div className="relative p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-[#0B1120]">
        <pre className="text-[#E2E8F0] whitespace-pre tab-4">
          <code>{currentSnippet.code}</code>
        </pre>
      </div>
    </div>
  );
}
