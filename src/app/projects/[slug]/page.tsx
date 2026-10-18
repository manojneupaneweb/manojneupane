import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { projects, siteConfig } from "@/lib/data";
import { metadataBase } from "@/lib/metadata";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false },
    };
  }

  const canonicalUrl = `${siteConfig.url}/projects/${project.slug}`;
  const ogImage = `${siteConfig.url}/og-default.png`;

  return {
    metadataBase,
    // Title uses the template: "LinkToGovernment | Manoj Neupane"
    title: project.title,
    description: project.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} — ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [{ url: ogImage, alt: `${project.title} — ${siteConfig.name}` }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function StatusBadge({ status }: { status: "live" | "in-progress" | "concept" }) {
  const map = {
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
    <span className={`px-3 py-1 text-sm font-medium border rounded-full ${classes}`}>
      {label}
    </span>
  );
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);
  const fallbackRelated = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3 - related.length);
  const relatedProjects = [...related, ...fallbackRelated].slice(0, 3);

  return (
    <main className="min-h-screen text-[#F8FAFC] ">
      {/* Breadcrumb */}
      <div className="border-b border-[#334155] px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                >
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#F8FAFC]">
                {project.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section
        aria-labelledby="project-title-heading"
        className="border-b border-[#334155] py-16 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <StatusBadge status={project.status} />
            <span className="px-3 py-1 text-sm border border-[#334155] text-[#94A3B8] rounded-full">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 text-sm bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 rounded-full">
                Featured Project
              </span>
            )}
          </div>
          <h1
            id="project-title-heading"
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h1>
          <p className="text-[#94A3B8] text-xl mb-8">{project.tagline}</p>

          {/* Action links */}
          <div className="flex gap-4 flex-wrap">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
              >
                <span>View Live Site</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#334155] text-[#94A3B8] font-semibold hover:text-[#F8FAFC] hover:border-[#3B82F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
              >
                <span>Source Code</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        {/* Overview */}
        <section aria-labelledby="overview-heading">
          <h2
            id="overview-heading"
            className="text-2xl font-bold mb-4 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Overview
          </h2>
          <p className="text-[#94A3B8] leading-relaxed text-base">{project.description}</p>
        </section>

        {/* Problem */}
        {project.problem && (
          <section
            aria-labelledby="problem-heading"
            className="bg-[#111827] border border-[#334155] rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl" aria-hidden="true">🎯</span>
              <h2
                id="problem-heading"
                className="text-xl font-bold text-[#F8FAFC]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The Problem
              </h2>
            </div>
            <p className="text-[#94A3B8] leading-relaxed">{project.problem}</p>
          </section>
        )}

        {/* Audience */}
        {project.audience && (
          <section aria-labelledby="audience-heading">
            <h2
              id="audience-heading"
              className="text-2xl font-bold mb-4 text-[#F8FAFC]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Who It&apos;s For
            </h2>
            <p className="text-[#94A3B8] leading-relaxed">{project.audience}</p>
          </section>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <section aria-labelledby="features-heading">
            <h2
              id="features-heading"
              className="text-2xl font-bold mb-6 text-[#F8FAFC]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Key Features
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3" role="list">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 bg-[#111827] border border-[#334155] rounded-xl p-4"
                >
                  <span className="text-[#3B82F6] mt-0.5 flex-shrink-0" aria-hidden="true">
                    ✓
                  </span>
                  <span className="text-[#94A3B8] text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tech Stack */}
        <section aria-labelledby="stack-heading">
          <h2
            id="stack-heading"
            className="text-2xl font-bold mb-6 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-3" role="list">
            {project.stack.map((tech) => (
              <span
                key={tech}
                role="listitem"
                className="px-4 py-2 rounded-xl bg-[#111827] border border-[#334155] text-[#94A3B8] text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* My Contribution */}
        <section
          aria-labelledby="contribution-heading"
          className="bg-[#111827] border border-[#334155] rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl" aria-hidden="true">🛠️</span>
            <h2
              id="contribution-heading"
              className="text-xl font-bold text-[#F8FAFC]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              My Contribution
            </h2>
          </div>
          <p className="text-[#94A3B8] leading-relaxed">{project.contribution}</p>
        </section>

        {/* Challenges */}
        {project.challenges && (
          <section aria-labelledby="challenges-heading">
            <h2
              id="challenges-heading"
              className="text-2xl font-bold mb-4 text-[#F8FAFC]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Challenges
            </h2>
            <p className="text-[#94A3B8] leading-relaxed">{project.challenges}</p>
          </section>
        )}

        {/* Outcome */}
        {project.outcome && (
          <section
            aria-labelledby="outcome-heading"
            className="bg-[#111827] border border-[#22D3EE]/30 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl" aria-hidden="true">🚀</span>
              <h2
                id="outcome-heading"
                className="text-xl font-bold text-[#F8FAFC]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Outcome
              </h2>
            </div>
            <p className="text-[#94A3B8] leading-relaxed">{project.outcome}</p>
          </section>
        )}
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="border-t border-[#334155] py-16 px-6 bg-[#111827]"
        >
          <div className="max-w-4xl mx-auto">
            <h2
              id="related-heading"
              className="text-2xl font-bold mb-8 text-[#F8FAFC]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Other Projects
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {relatedProjects.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/projects/${rp.slug}`}
                  className="bg-[#0B1120] border border-[#334155] rounded-xl p-5 hover:border-[#3B82F6]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-xl block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[#F8FAFC] font-semibold text-sm">{rp.title}</h3>
                  </div>
                  <p className="text-[#94A3B8] text-xs line-clamp-2">{rp.tagline}</p>
                  <span className="inline-block mt-3 text-xs text-[#3B82F6]">
                    Read more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        aria-labelledby="project-cta-heading"
        className="border-t border-[#334155] py-16 px-6"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="project-cta-heading"
            className="text-2xl font-bold mb-4 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Interested in working together?
          </h2>
          <p className="text-[#94A3B8] mb-6">
            Tell me about your project and let&apos;s see if I&apos;m a good fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
            >
              Contact Me
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-[#334155] text-[#94A3B8] font-semibold hover:text-[#F8FAFC] hover:border-[#3B82F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
            >
              All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
