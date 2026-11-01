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
  const projectMap = Object.fromEntries(projects.map((p) => [p.slug, p]));

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section
        aria-labelledby="skills-heading"
        className="pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.08)] to-transparent" />
          <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)" }} />
        </div>
        <div className="container relative">
          <span className="section-label">Skills</span>
          <h1
            id="skills-heading"
            className="section-title mt-4 mb-5"
          >
            Technical Skills
          </h1>
          <p className="section-subtitle">
            Technologies I work with regularly — organized by domain. Each entry describes
            what it is and where I apply it.
          </p>
        </div>
      </section>

      {/* Skills by category */}
      <div className="container py-16 space-y-20">
        {skillCategories.map((cat) => (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}-heading`}>
            {/* Category header */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
              <h2
                id={`cat-${cat.id}-heading`}
                className="text-2xl font-bold text-[#F1F5F9]"
              >
                {cat.name}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[rgba(34,211,238,0.2)] to-transparent ml-2" />
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
                    className="card flex flex-col gap-3"
                  >
                    <h3 className="text-[#F1F5F9] font-semibold text-base">
                      {skill.name}
                    </h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed flex-1">
                      {skill.description}
                    </p>
                    <div className="border-t border-[rgba(255,255,255,0.05)] pt-3 space-y-2">
                      <div>
                        <span className="text-[#22D3EE] text-xs font-semibold uppercase tracking-widest font-mono">
                          Applied for
                        </span>
                        <p className="text-[#94A3B8] text-sm mt-0.5">{skill.useCase}</p>
                      </div>
                      {relatedProject && (
                        <div>
                          <span className="text-[#60A5FA] text-xs font-semibold uppercase tracking-widest font-mono">
                            See in project
                          </span>
                          <div className="mt-0.5">
                            <Link
                              href={`/projects/${relatedProject.slug}`}
                              className="text-sm text-[#60A5FA] hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
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
        className="border-t border-[rgba(34,211,238,0.08)] py-16"
        style={{ background: "rgba(255,255,255,0.01)" }}
      >
        <div className="container text-center">
          <h2 id="skills-cta-heading" className="text-2xl font-bold mb-4 text-[#F1F5F9]">
            Have a project in mind?
          </h2>
          <p className="text-[#94A3B8] mb-8">
            Tell me what you&apos;re building — I&apos;ll let you know if I&apos;m a good fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary justify-center">
              Get in Touch
            </Link>
            <Link href="/projects" className="btn-secondary justify-center">
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
