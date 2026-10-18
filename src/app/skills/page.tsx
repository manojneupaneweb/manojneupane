import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, skillCategories, projects } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Technical Skills",
  description:
    "Technical skills of Manoj Neupane: Frontend (React, Next.js, TypeScript, Tailwind), Backend (Laravel, PHP, Node.js), Databases (MySQL, MongoDB), Auth (JWT, RBAC), and Deployment.",
  path: "/skills",
});

export default function SkillsPage() {
  // Build project lookup by slug for related project links
  const projectMap = Object.fromEntries(projects.map((p) => [p.slug, p]));

  return (
    <main className="min-h-screen text-[#F8FAFC] ">
      {/* Header */}
      <section
        aria-labelledby="skills-heading"
        className="border-b border-[#334155] py-20 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-3">
            Skills
          </p>
          <h1
            id="skills-heading"
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Technical Skills
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Technologies I work with regularly — organized by domain. Each entry describes
            what it is and where I apply it.
          </p>
        </div>
      </section>

      {/* Skills by category */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {skillCategories.map((cat, catIdx) => (
          <section
            key={cat.id}
            aria-labelledby={`cat-${cat.id}-heading`}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl" aria-hidden="true">{cat.icon}</span>
              <h2
                id={`cat-${cat.id}-heading`}
                className="text-2xl font-bold text-[#F8FAFC]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {cat.name}
              </h2>
              <div className="flex-1 h-px bg-[#334155] ml-4" />
            </div>

            {/* Skills grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.skills.map((skill) => {
                const relatedProject = skill.relatedProject
                  ? projectMap[skill.relatedProject]
                  : undefined;

                return (
                  <article
                    key={skill.name}
                    className="bg-[#111827] border border-[#334155] rounded-xl p-6 flex flex-col gap-3 hover:border-[#3B82F6]/40 transition-colors"
                  >
                    <h3 className="text-[#F8FAFC] font-semibold text-base">
                      {skill.name}
                    </h3>

                    <p className="text-[#94A3B8] text-sm leading-relaxed flex-1">
                      {skill.description}
                    </p>

                    <div className="border-t border-[#334155] pt-3 space-y-2">
                      <div>
                        <span className="text-[#3B82F6] text-xs font-semibold uppercase tracking-wider">
                          Applied for
                        </span>
                        <p className="text-[#94A3B8] text-sm mt-0.5">{skill.useCase}</p>
                      </div>

                      {relatedProject && (
                        <div>
                          <span className="text-[#22D3EE] text-xs font-semibold uppercase tracking-wider">
                            See in project
                          </span>
                          <div className="mt-0.5">
                            <Link
                              href={`/projects/${relatedProject.slug}`}
                              className="text-sm text-[#22D3EE] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
                            >
                              {relatedProject.title} →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section
        aria-labelledby="skills-cta-heading"
        className="border-t border-[#334155] py-16 px-6 bg-[#111827]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="skills-cta-heading"
            className="text-2xl font-bold mb-4 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Have a project in mind?
          </h2>
          <p className="text-[#94A3B8] mb-6">
            Tell me what you&apos;re building — I&apos;ll let you know if I&apos;m a good fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
            >
              Get in Touch
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
