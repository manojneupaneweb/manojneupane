"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

const CATEGORIES = [
  "All",
  "SaaS",
  "Web Application",
  "Business System",
  "Educational Portal",
  "API",
  "Admin Panel",
  "Directory",
] as const;

type FilterCategory = (typeof CATEGORIES)[number];

function StatusBadge({ status }: { status: Project["status"] }) {
  const map: Record<Project["status"], { label: string; classes: string }> = {
    live: { label: "Live", classes: "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/30" },
    "in-progress": {
      label: "In Progress",
      classes: "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/30",
    },
    concept: {
      label: "Concept / Reference",
      classes: "bg-[#94A3B8]/10 text-[#94A3B8] border-[#94A3B8]/30",
    },
  };
  const { label, classes } = map[status];
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium border rounded-full ${classes}`}>
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`proj-${project.slug}-heading`}
      className="bg-[#111827] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#3B82F6]/50 transition-colors group"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2
              id={`proj-${project.slug}-heading`}
              className="text-[#F8FAFC] font-bold text-lg group-hover:text-[#3B82F6] transition-colors"
            >
              {project.title}
            </h2>
            {project.featured && (
              <span className="px-2 py-0.5 text-xs bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 rounded-full">
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
      <div className="text-xs text-[#94A3B8] bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2">
        <span className="text-[#3B82F6] font-semibold">Contribution: </span>
        {project.contribution}
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-xs rounded-full bg-[#1E293B] border border-[#334155] text-[#94A3B8]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer links */}
      <div className="flex items-center gap-3 pt-2 border-t border-[#334155] flex-wrap">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm text-[#3B82F6] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
        >
          Case Study →
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#22D3EE] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
          >
            Live Site ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
          >
            Source ↗
          </a>
        )}
        <span className="ml-auto text-xs text-[#94A3B8] bg-[#1E293B] border border-[#334155] px-2 py-0.5 rounded-full">
          {project.category}
        </span>
      </div>
    </article>
  );
}

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen text-[#F8FAFC] ">
      {/* Header */}
      <section
        aria-labelledby="projects-heading"
        className="border-b border-[#334155] py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-3">
            Projects
          </p>
          <h1
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Work &amp; Projects
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Applications, platforms, and systems I&apos;ve designed and built. Each entry
            includes the problem context, technical contribution, and stack.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <nav
        aria-label="Filter projects by category"
        className="border-b border-[#334155] bg-[#111827] sticky top-0 z-10"
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                activeFilter === cat
                  ? "bg-[#3B82F6] border-[#3B82F6] text-white"
                  : "border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#3B82F6]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Grid */}
      <section aria-labelledby="projects-grid-heading" className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 id="projects-grid-heading" className="sr-only">
            Project List
          </h2>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#94A3B8]">
              <p className="text-2xl mb-2">No projects in this category yet.</p>
              <button
                onClick={() => setActiveFilter("All")}
                className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
              >
                View all projects
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        aria-labelledby="projects-cta-heading"
        className="border-t border-[#334155] py-16 px-6 bg-[#111827]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="projects-cta-heading"
            className="text-2xl font-bold mb-4 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Have a project to discuss?
          </h2>
          <p className="text-[#94A3B8] mb-6">
            I work with teams and founders to design and build web applications from the
            ground up.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
