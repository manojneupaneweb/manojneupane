import Link from "next/link";
import { BlogPost } from "@/lib/blog-types";
import CodeBlock from "./CodeBlock";
import FaqAccordion from "./FaqAccordion";

interface ArticleRendererProps {
  post: BlogPost;
}

export default function ArticleRenderer({ post }: ArticleRendererProps) {
  return (
    <div className="prose-developer space-y-10 text-[#CBD5E1] text-base leading-relaxed">
      {/* 1. Who this is for & Prerequisites Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] backdrop-blur-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
            <span>🎯</span> Who This Tutorial Is For
          </div>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {post.whoThisIsFor}
          </p>
        </div>

        <div className="space-y-2 border-t md:border-t-0 md:border-l border-[rgba(255,255,255,0.06)] pt-4 md:pt-0 md:pl-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">
            <span>📋</span> Prerequisites
          </div>
          <ul className="space-y-1 text-xs text-[#94A3B8]">
            {post.prerequisites.map((req) => (
              <li key={req} className="flex items-start gap-2">
                <span className="text-[#22D3EE] font-bold">✓</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. What you'll learn */}
      <div className="p-6 rounded-2xl border border-[rgba(34,211,238,0.15)] bg-[rgba(34,211,238,0.04)]">
        <h3 className="text-base font-bold text-[#F1F5F9] flex items-center gap-2 mb-3">
          <span>🚀</span> What You Will Learn &amp; Build
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#94A3B8]">
          {post.whatYouWillLearn.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-[#22D3EE] font-bold">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Main Step-by-Step Sections */}
      <div className="space-y-12">
        {post.sections.map((sec, idx) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-4">
            {/* Section Heading */}
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-[rgba(34,211,238,0.1)] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#F1F5F9] leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                {sec.title}
              </h2>
            </div>

            {/* Content text */}
            <div
              className="text-sm sm:text-base text-[#94A3B8] leading-relaxed space-y-4 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: sec.content }}
            />

            {/* Callout if any */}
            {sec.callout && (
              <div
                className={`p-4 rounded-xl text-sm border leading-relaxed my-4 ${
                  sec.callout.type === "security"
                    ? "bg-red-500/10 border-red-500/30 text-red-200"
                    : sec.callout.type === "warning"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                    : sec.callout.type === "tip"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                    : "bg-[rgba(34,211,238,0.05)] border-[rgba(34,211,238,0.2)] text-[#CBD5E1]"
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  <span>
                    {sec.callout.type === "security"
                      ? "🔒 Security Notice"
                      : sec.callout.type === "warning"
                      ? "⚠️ Warning"
                      : sec.callout.type === "tip"
                      ? "💡 Pro-Tip"
                      : "📌 Note"}
                  </span>
                  {sec.callout.title && <span>— {sec.callout.title}</span>}
                </div>
                <p>{sec.callout.text}</p>
              </div>
            )}

            {/* Code Tabs if any */}
            {sec.codeTabs && sec.codeTabs.length > 0 && (
              <CodeBlock snippets={sec.codeTabs} />
            )}

            {/* Table if any */}
            {sec.table && (
              <div className="overflow-x-auto my-4 rounded-xl border border-[rgba(255,255,255,0.06)]">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[rgba(34,211,238,0.06)] text-[#F1F5F9] font-semibold border-b border-[rgba(255,255,255,0.06)]">
                    <tr>
                      {sec.table.headers.map((h) => (
                        <th key={h} className="p-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(255,255,255,0.05)] text-[#94A3B8] bg-[rgba(255,255,255,0.01)]">
                    {sec.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[rgba(255,255,255,0.03)]">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 font-mono text-xs">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Checklist if any */}
            {sec.checklist && (
              <ul className="space-y-1.5 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-xs sm:text-sm text-[#94A3B8]">
                {sec.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#22D3EE] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* 4. Expected Output */}
      <section id="expected-output" className="scroll-mt-24 p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] space-y-3">
        <h3 className="text-lg font-bold text-[#F1F5F9] flex items-center gap-2">
          <span>✨</span> Expected Output &amp; Verification
        </h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed whitespace-pre-line">
          {post.expectedOutput}
        </p>
      </section>

      {/* 5. Testing Steps */}
      <section id="how-to-test" className="scroll-mt-24 p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] space-y-3">
        <h3 className="text-lg font-bold text-[#F1F5F9] flex items-center gap-2">
          <span>🧪</span> How to Test the Implementation
        </h3>
        <ol className="space-y-2 text-sm text-[#94A3B8]">
          {post.testingSteps.map((step, sIdx) => (
            <li key={step} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[rgba(34,211,238,0.1)] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                {sIdx + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. Common Errors & Solutions */}
      <section id="common-errors" className="scroll-mt-24 space-y-4">
        <h3 className="text-xl font-bold text-[#F1F5F9] flex items-center gap-2">
          <span>⚠️</span> Common Errors &amp; How to Fix Them
        </h3>
        <div className="space-y-4">
          {post.commonErrors.map((err, eIdx) => (
            <div key={eIdx} className="p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] space-y-2">
              <div className="flex items-start gap-2 text-sm font-bold text-red-300">
                <span className="shrink-0">❌</span>
                <span className="font-mono text-xs sm:text-sm">{err.error}</span>
              </div>
              <div className="pl-6 text-xs sm:text-sm text-[#94A3B8] space-y-1">
                <p>
                  <strong className="text-[#CBD5E1]">Root Cause:</strong> {err.cause}
                </p>
                <p className="text-emerald-300">
                  <strong className="text-emerald-400">Fix:</strong> {err.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Security Considerations */}
      {(post.securityNotes || post.securityConsiderations) && (
        <section id="security-notes" className="scroll-mt-24 p-6 rounded-2xl border border-red-500/30 bg-red-950/20 space-y-3">
          <h3 className="text-lg font-bold text-red-200 flex items-center gap-2">
            <span>🛡️</span> Security Considerations &amp; Best Practices
          </h3>
          {Array.isArray(post.securityNotes || post.securityConsiderations) ? (
            <ul className="space-y-2 text-sm text-red-200/80">
              {((post.securityNotes || post.securityConsiderations) as string[]).map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">!</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-red-200/80 leading-relaxed">
              {(post.securityNotes || post.securityConsiderations) as string}
            </p>
          )}
        </section>
      )}

      {/* 8. FAQs */}
      {post.faqs && post.faqs.length > 0 && (
        <section id="faqs" className="scroll-mt-24 space-y-3">
          <h3 className="text-xl font-bold text-[#F1F5F9] flex items-center gap-2">
            <span>❓</span> Frequently Asked Questions (FAQ)
          </h3>
          <FaqAccordion faqs={post.faqs} />
        </section>
      )}

      {/* 9. Summary */}
      <section id="summary" className="scroll-mt-24 p-6 rounded-2xl border border-[rgba(34,211,238,0.15)] bg-[rgba(34,211,238,0.04)] space-y-3">
        <h3 className="text-lg font-bold text-[#F1F5F9] flex items-center gap-2">
          <span>📌</span> Summary of Key Takeaways
        </h3>
        {Array.isArray(post.summary) ? (
          <ul className="space-y-2 text-sm text-[#94A3B8]">
            {post.summary.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="text-[#22D3EE] font-bold">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {post.summary as string}
          </p>
        )}
      </section>

      {/* 10. Official References */}
      {post.references && post.references.length > 0 && (
        <section id="references" className="scroll-mt-24 p-5 rounded-xl border border-[rgba(34,211,238,0.12)] bg-[rgba(34,211,238,0.04)] space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
            Official References &amp; Further Reading
          </h4>
          <ul className="space-y-1.5 text-xs">
            {post.references.map((ref) => (
              <li key={ref.url} className="flex items-center gap-2">
                <span className="text-[#22D3EE]">🔗</span>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#22D3EE] hover:text-[#67E8F9] hover:underline font-medium transition-colors"
                >
                  {ref.title}
                </a>
                {ref.description && (
                  <span className="text-[#64748B]">— {ref.description}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
