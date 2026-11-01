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
    <main className="min-h-screen">
      {/* Header */}
      <section
        aria-labelledby="education-heading"
        className="pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.08)] to-transparent" />
          <div
            className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)" }}
          />
        </div>
        <div className="container relative">
          <span className="section-label">Education</span>
          <h1
            id="education-heading"
            className="section-title mt-4 mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Education &amp; Certifications
          </h1>
          <p className="section-subtitle">
            Academic background and professional training. Details are published only when
            they can be verified from original sources.
          </p>
        </div>
      </section>

      {/* Education */}
      <section
        aria-labelledby="formal-education-heading"
        className="py-16 border-t border-b border-[rgba(255,255,255,0.06)]"
      >
        <div className="container">
          <h2
            id="formal-education-heading"
            className="text-2xl font-bold mb-8 text-[#F1F5F9]"
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
                  className="card-glow p-7"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h3
                        id={`edu-${edu.id}-heading`}
                        className="text-[#F1F5F9] font-bold text-lg"
                      >
                        {edu.degree}
                        {edu.field && <span className="text-[#94A3B8] font-normal"> in {edu.field}</span>}
                      </h3>
                      <p className="text-[#22D3EE] font-medium">{edu.institution}</p>
                    </div>
                    <span className="tag font-mono flex-shrink-0">{edu.period}</span>
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
            <div className="card border border-[rgba(255,255,255,0.06)] p-7">
              <div className="flex gap-4 items-start">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">🔍</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[#F1F5F9] font-semibold">
                      Details Being Verified
                    </h3>
                    <span className="px-2 py-0.5 text-xs bg-[rgba(255,255,255,0.06)] text-[#94A3B8] border border-[rgba(255,255,255,0.08)] rounded-full">
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
                      className="text-[#22D3EE] hover:text-[#67E8F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
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
        className="py-16 border-b border-[rgba(255,255,255,0.06)]"
      >
        <div className="container">
          <h2
            id="certifications-heading"
            className="text-2xl font-bold mb-8 text-[#F1F5F9]"
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
                  className="card-glow p-7"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                    <div>
                      <h3
                        id={`cert-${cert.id}-heading`}
                        className="text-[#F1F5F9] font-bold"
                      >
                        {cert.name}
                      </h3>
                      <p className="text-[#22D3EE] text-sm">{cert.provider}</p>
                    </div>
                    {cert.issueDate && (
                      <span className="tag font-mono flex-shrink-0">
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
                      className="inline-block mt-3 text-sm text-[#22D3EE] hover:text-[#67E8F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
                    >
                      View Credential ↗
                    </a>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="card border border-[rgba(255,255,255,0.06)] p-7 flex gap-4 items-start">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">📜</span>
              <div>
                <h3 className="text-[#F1F5F9] font-semibold mb-2">
                  Certifications Pending Verification
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  Professional certifications will be listed here once verified and available
                  for public disclosure. My technical knowledge is demonstrated through{" "}
                  <Link
                    href="/projects"
                    className="text-[#22D3EE] hover:text-[#67E8F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
                  >
                    deployed projects
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/skills"
                    className="text-[#22D3EE] hover:text-[#67E8F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
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
        className="py-16"
      >
        <div className="container">
          <div className="card-glow border border-[rgba(34,211,238,0.15)] p-8">
            <h2
              id="practical-heading"
              className="text-xl font-bold mb-4 text-[#F1F5F9]"
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
                className="text-[#22D3EE] hover:text-[#67E8F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
              >
                LinkToGovernment
              </a>
              , a live public-facing application — and work professionally at Softworica
              developing web applications, SaaS platforms, and APIs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="text-sm text-[#22D3EE] font-medium hover:text-[#67E8F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
              >
                View my projects →
              </Link>
              <Link
                href="/about"
                className="text-sm text-[#94A3B8] font-medium hover:text-[#F1F5F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
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
