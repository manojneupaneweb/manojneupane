import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, experiences } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Professional Experience",
  description:
    "Professional experience of Manoj Neupane — Software Developer at Softworica. Building web applications, SaaS platforms, and REST APIs. Full CV available on request.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <main className="min-h-screen text-[#F8FAFC] ">
      {/* Header */}
      <section
        aria-labelledby="experience-heading"
        className="border-b border-[#334155] py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-3">
            Experience
          </p>
          <h1
            id="experience-heading"
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Professional Experience
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Where I&apos;ve worked, what I&apos;ve built, and what technologies I&apos;ve applied
            in production environments.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section
        aria-labelledby="timeline-heading"
        className="py-16 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 id="timeline-heading" className="sr-only">
            Work Timeline
          </h2>

          <div className="space-y-0">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="flex gap-8">
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#3B82F6] border-2 border-[#3B82F6]/40 mt-1 flex-shrink-0" />
                  {idx < experiences.length - 1 && (
                    <div className="w-px flex-1 bg-[#334155] my-2" style={{ minHeight: "100%" }} />
                  )}
                </div>

                {/* Card */}
                <div className="pb-12 flex-1">
                  <article
                    aria-labelledby={`exp-${exp.id}-heading`}
                    className="bg-[#111827] border border-[#334155] rounded-2xl p-8"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <h3
                            id={`exp-${exp.id}-heading`}
                            className="text-xl font-bold text-[#F8FAFC]"
                          >
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <span className="px-2.5 py-0.5 text-xs font-medium bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 rounded-full">
                              Current Position
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {exp.organizationUrl ? (
                            <a
                              href={exp.organizationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#22D3EE] font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
                            >
                              {exp.organization}
                            </a>
                          ) : (
                            <span className="text-[#22D3EE] font-semibold">
                              {exp.organization}
                            </span>
                          )}
                          <span className="text-[#334155]">&middot;</span>
                          <span className="text-[#94A3B8] text-sm">{exp.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-lg" aria-hidden="true">📅</span>
                        <span className="text-[#94A3B8] text-sm">{exp.period}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Responsibilities */}
                      <div>
                        <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-4">
                          Responsibilities
                        </h4>
                        <ul className="space-y-3" role="list">
                          {exp.responsibilities.map((r) => (
                            <li key={r} className="flex gap-3 text-sm text-[#94A3B8]">
                              <span className="text-[#3B82F6] mt-0.5 flex-shrink-0" aria-hidden="true">
                                ▸
                              </span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-4">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2" role="list">
                          {exp.technologies.map((t) => (
                            <span
                              key={t}
                              role="listitem"
                              className="px-3 py-1.5 text-xs rounded-lg bg-[#1E293B] border border-[#334155] text-[#94A3B8]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Related projects */}
                        {exp.projects && exp.projects.length > 0 && (
                          <div className="mt-5">
                            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">
                              Related Projects
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.projects.map((slug) => (
                                <Link
                                  key={slug}
                                  href={`/projects/${slug}`}
                                  className="px-3 py-1.5 text-xs rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-lg"
                                >
                                  View project →
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>

          {/* CV note */}
          <div className="mt-4 bg-[#111827] border border-[#334155] rounded-xl p-6 flex gap-4 items-start">
            <span className="text-2xl flex-shrink-0" aria-hidden="true">📄</span>
            <div>
              <h3 className="text-[#F8FAFC] font-semibold mb-1">Full CV Available on Request</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                A detailed curriculum vitae with complete work history, references, and project
                details is available upon request for employers and clients. Please{" "}
                <Link
                  href="/contact"
                  className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                >
                  get in touch
                </Link>{" "}
                to request a copy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        aria-labelledby="exp-cta-heading"
        className="border-t border-[#334155] py-16 px-6 bg-[#111827]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="exp-cta-heading"
            className="text-2xl font-bold mb-4 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Looking for a developer?
          </h2>
          <p className="text-[#94A3B8] mb-6">
            I&apos;m open to project-based and contract work. Let me know what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
            >
              Contact Me
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[#334155] text-[#94A3B8] font-semibold hover:text-[#F8FAFC] hover:border-[#3B82F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
