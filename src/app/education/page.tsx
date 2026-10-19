import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, education, certifications } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Education & Certifications",
  description:
    "Academic background and professional certifications of Manoj Neupane, Full Stack Web Developer from Nepal. Details published once verified from original sources.",
  path: "/education",
});


export default function EducationPage() {
  const unverifiedEntries = education.filter((e) => e.status === "unverified");
  const verifiedEntries = education.filter((e) => e.status !== "unverified");

  return (
    <main className="min-h-screen text-[#F8FAFC] ">
      {/* Header */}
      <section
        aria-labelledby="education-heading"
        className="border-b border-[#334155] py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-3">
            Education
          </p>
          <h1
            id="education-heading"
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Education &amp; Certifications
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Academic background and professional training. Details are published only when
            they can be verified from original sources.
          </p>
        </div>
      </section>

      {/* Education */}
      <section
        aria-labelledby="formal-education-heading"
        className="py-16 px-6 border-b border-[#334155]"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            id="formal-education-heading"
            className="text-2xl font-bold mb-8 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Formal Education
          </h2>

          {/* Verified entries */}
          {verifiedEntries.length > 0 && (
            <div className="space-y-5 mb-8">
              {verifiedEntries.map((edu) => (
                <article
                  key={edu.id}
                  aria-labelledby={`edu-${edu.id}-heading`}
                  className="bg-[#111827] border border-[#334155] rounded-2xl p-7"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h3
                        id={`edu-${edu.id}-heading`}
                        className="text-[#F8FAFC] font-bold text-lg"
                      >
                        {edu.degree}
                        {edu.field && <span className="text-[#94A3B8] font-normal"> in {edu.field}</span>}
                      </h3>
                      <p className="text-[#22D3EE] font-medium">{edu.institution}</p>
                    </div>
                    <span className="text-[#94A3B8] text-sm flex-shrink-0">{edu.period}</span>
                  </div>
                  {edu.description && (
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{edu.description}</p>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* Unverified / placeholder notice */}
          {unverifiedEntries.length > 0 && (
            <div className="bg-[#111827] border border-[#334155] rounded-2xl p-7">
              <div className="flex gap-4 items-start">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">🔍</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[#F8FAFC] font-semibold">
                      Details Being Verified
                    </h3>
                    <span className="px-2 py-0.5 text-xs bg-[#94A3B8]/10 text-[#94A3B8] border border-[#94A3B8]/30 rounded-full">
                      Pending
                    </span>
                  </div>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    Education credentials are being reviewed to ensure accuracy before
                    publication. I prefer to share verified information only rather than
                    publish details that may be incomplete or incorrectly represented.
                  </p>
                  <p className="text-[#94A3B8] text-sm mt-3">
                    For specific details,{" "}
                    <Link
                      href="/contact"
                      className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                    >
                      contact me directly
                    </Link>{" "}
                    or request a full CV.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section
        aria-labelledby="certifications-heading"
        className="py-16 px-6 border-b border-[#334155] bg-[#111827]"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            id="certifications-heading"
            className="text-2xl font-bold mb-8 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Certifications
          </h2>

          {certifications.length > 0 ? (
            <div className="space-y-5">
              {certifications.map((cert) => (
                <article
                  key={cert.id}
                  aria-labelledby={`cert-${cert.id}-heading`}
                  className="bg-[#0B1120] border border-[#334155] rounded-2xl p-7"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                    <div>
                      <h3
                        id={`cert-${cert.id}-heading`}
                        className="text-[#F8FAFC] font-bold"
                      >
                        {cert.name}
                      </h3>
                      <p className="text-[#22D3EE] text-sm">{cert.provider}</p>
                    </div>
                    {cert.issueDate && (
                      <span className="text-[#94A3B8] text-sm flex-shrink-0">
                        {cert.issueDate}
                      </span>
                    )}
                  </div>
                  {cert.description && (
                    <p className="text-[#94A3B8] text-sm leading-relaxed mt-2">
                      {cert.description}
                    </p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                    >
                      View Credential ↗
                    </a>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-[#0B1120] border border-[#334155] rounded-2xl p-7 flex gap-4 items-start">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">📜</span>
              <div>
                <h3 className="text-[#F8FAFC] font-semibold mb-2">
                  Certifications Pending Verification
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  Professional certifications will be listed here once verified and available
                  for public disclosure. My technical knowledge is demonstrated through{" "}
                  <Link
                    href="/projects"
                    className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                  >
                    deployed projects
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/skills"
                    className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                  >
                    documented skills
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Practical Experience note */}
      <section
        aria-labelledby="practical-heading"
        className="py-16 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111827] border border-[#3B82F6]/30 rounded-2xl p-8">
            <h2
              id="practical-heading"
              className="text-xl font-bold mb-4 text-[#F8FAFC]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Practical Experience
            </h2>
            <p className="text-[#94A3B8] leading-relaxed mb-4">
              Beyond formal credentials, my competence is demonstrated through production
              software. I&apos;ve built and deployed real applications — including{" "}
              <a
                href="https://linktogovernment.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
              >
                LinkToGovernment
              </a>
              , a live public-facing application — and work professionally at Softworica
              developing web applications, SaaS platforms, and APIs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="text-sm text-[#3B82F6] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
              >
                View my projects →
              </Link>
              <Link
                href="/about"
                className="text-sm text-[#3B82F6] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
              >
                About my background →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
