"use client";

import Link from "next/link";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

function StatusBadge({ status }: { status: Project["status"] }) {
  const map: Record<Project["status"], { label: string; classes: string }> = {
    live: {
      label: "Live",
      classes: "bg-[rgba(52,211,153,0.08)] text-[#34D399] border-[rgba(52,211,153,0.25)]",
    },
    "in-progress": {
      label: "In Progress",
      classes: "bg-[rgba(34,211,238,0.08)] text-[#22D3EE] border-[rgba(34,211,238,0.25)]",
    },
    concept: {
      label: "Concept / Reference",
      classes: "bg-[rgba(148,163,184,0.08)] text-[#94A3B8] border-[rgba(148,163,184,0.2)]",
    },
    sample: {
      label: "Skill sample",
      classes: "bg-[rgba(12,107,116,0.08)] text-[#0c6b74] border-[rgba(12,107,116,0.25)]",
    },
  };
  const { label, classes } = map[status];
  return (
    <span className={`px-2.5 py-0.5 text-xs font-mono font-medium border rounded-full ${classes}`}>
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`proj-${project.slug}-heading`}
      className="card flex flex-col gap-4 group"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2
              id={`proj-${project.slug}-heading`}
              className="text-[#F1F5F9] font-bold text-lg group-hover:text-[#22D3EE] transition-colors"
            >
              {project.title}
            </h2>
            {project.featured && (
              <span className="px-2 py-0.5 text-xs bg-[rgba(34,211,238,0.08)] text-[#22D3EE] border border-[rgba(34,211,238,0.2)] rounded-full font-mono">
                Featured
              </span>
            )}
          </div>
          <p className="text-[#94A3B8] text-sm">{project.tagline}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Description */}
      <p className="text-[#94A3B8] text-sm leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Contribution */}
      <div className="text-xs text-[#94A3B8] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-3 py-2">
        <span className="text-[#22D3EE] font-semibold font-mono">Contribution: </span>
        {project.contribution}
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span key={tech} className="skill-pill text-xs">{tech}</span>
        ))}
      </div>

      {/* Footer links */}
      <div className="flex items-center gap-3 pt-3 border-t border-[rgba(255,255,255,0.05)] flex-wrap">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm text-[#22D3EE] font-medium hover:text-[#67E8F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
        >
          Case Study →
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#34D399] hover:text-[#6EE7B7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
          >
            Live Site ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#94A3B8] hover:text-[#F1F5F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
          >
            Source ↗
          </a>
        )}
        <span className="ml-auto text-xs text-[#94A3B8] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] px-2 py-0.5 rounded-full font-mono">
          {project.category}
        </span>
      </div>
    </article>
  );
}

export default function ProjectsClient() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <section
        aria-labelledby="projects-heading"
        className="pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.08)] to-transparent" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)" }} />
        </div>
        <div className="container relative">
          <span className="section-label">Projects</span>
          <h1 id="projects-heading" className="section-title mt-4 mb-5">
            Work &amp; Projects
          </h1>
          <p className="section-subtitle">
            Most of my work is on private office systems, so it is not listed here.
            The public repositories below are skill samples: the code is mine to show,
            and they are not a stand-in for client projects.
          </p>
        </div>
      </section>

      <section aria-labelledby="projects-grid-heading" className="py-16">
        <div className="container">
          <h2 id="projects-grid-heading" className="sr-only">Project List</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        aria-labelledby="projects-cta-heading"
        className="border-t border-[rgba(34,211,238,0.08)] py-16"
        style={{ background: "rgba(255,255,255,0.01)" }}
      >
        <div className="container text-center">
          <h2 id="projects-cta-heading" className="text-2xl font-bold mb-4 text-[#F1F5F9]">
            Have a project to discuss?
          </h2>
          <p className="text-[#94A3B8] mb-8">
            I work with teams and founders to design and build web applications from the ground up.
          </p>
          <Link href="/contact" className="btn-primary mx-auto">
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
