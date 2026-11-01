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
    return { title: "Project Not Found", robots: { index: false } };
  }

  const canonicalUrl = `${siteConfig.url}/projects/${project.slug}`;
  const ogImage = `${siteConfig.url}/og-default.png`;

  return {
    metadataBase,
    title: project.title,
    description: project.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: project.title,
      description: project.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} — ${siteConfig.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [{ url: ogImage, alt: `${project.title} — ${siteConfig.name}` }],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

function StatusBadge({ status }: { status: "live" | "in-progress" | "concept" | "sample" }) {
  const map = {
    live: { label: "Live", classes: "bg-[rgba(52,211,153,0.08)] text-[#34D399] border-[rgba(52,211,153,0.25)]" },
    "in-progress": { label: "In Progress", classes: "bg-[rgba(34,211,238,0.08)] text-[#22D3EE] border-[rgba(34,211,238,0.25)]" },
    concept: { label: "Concept / Reference", classes: "bg-[rgba(148,163,184,0.08)] text-[#94A3B8] border-[rgba(148,163,184,0.2)]" },
    sample: { label: "Skill sample", classes: "bg-[rgba(12,107,116,0.08)] text-[#0c6b74] border-[rgba(12,107,116,0.25)]" },
  };
  const { label, classes } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-mono font-medium border rounded-full ${classes}`}>
      {status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />}
      {label}
    </span>
  );
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 3);
  const fallbackRelated = projects.filter((p) => p.slug !== project.slug).slice(0, 3 - related.length);
  const relatedProjects = [...related, ...fallbackRelated].slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[rgba(34,211,238,0.08)] py-4 pt-20">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[#94A3B8] font-mono">
              <li>
                <Link href="/" className="hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#94A3B8]/40">/</li>
              <li>
                <Link href="/projects" className="hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#94A3B8]/40">/</li>
              <li aria-current="page" className="text-[#F1F5F9]">{project.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section aria-labelledby="project-title-heading" className="py-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.1)] to-transparent" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)" }} />
        </div>
        <div className="container relative">
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <StatusBadge status={project.status} />
            <span className="px-3 py-1 text-sm border border-[rgba(255,255,255,0.08)] text-[#94A3B8] rounded-full font-mono">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 text-sm bg-[rgba(34,211,238,0.08)] text-[#22D3EE] border border-[rgba(34,211,238,0.2)] rounded-full font-mono">
                Featured Project
              </span>
            )}
          </div>
          <h1 id="project-title-heading" className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-[#F1F5F9]">
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
                className="btn-primary"
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
                className="btn-secondary"
              >
                <span>Source Code</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container py-12 space-y-10">

        {/* Overview */}
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-2xl font-bold mb-4 text-[#F1F5F9]">Overview</h2>
          <p className="text-[#94A3B8] leading-relaxed text-base">{project.description}</p>
        </section>

        {/* Problem */}
        {project.problem && (
          <section aria-labelledby="problem-heading" className="card-glow">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl" aria-hidden="true">🎯</span>
              <h2 id="problem-heading" className="text-xl font-bold text-[#F1F5F9]">The Problem</h2>
            </div>
            <p className="text-[#94A3B8] leading-relaxed">{project.problem}</p>
          </section>
        )}

        {/* Audience */}
        {project.audience && (
          <section aria-labelledby="audience-heading">
            <h2 id="audience-heading" className="text-2xl font-bold mb-4 text-[#F1F5F9]">Who It&apos;s For</h2>
            <p className="text-[#94A3B8] leading-relaxed">{project.audience}</p>
          </section>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <section aria-labelledby="features-heading">
            <h2 id="features-heading" className="text-2xl font-bold mb-6 text-[#F1F5F9]">Key Features</h2>
            <ul className="grid sm:grid-cols-2 gap-3" role="list">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 card !py-4"
                >
                  <span className="text-[#22D3EE] mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                  <span className="text-[#94A3B8] text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tech Stack */}
        <section aria-labelledby="stack-heading">
          <h2 id="stack-heading" className="text-2xl font-bold mb-6 text-[#F1F5F9]">Technology Stack</h2>
          <div className="flex flex-wrap gap-3" role="list">
            {project.stack.map((tech) => (
              <span key={tech} role="listitem" className="skill-pill">{tech}</span>
            ))}
          </div>
        </section>

        {/* My Contribution */}
        <section aria-labelledby="contribution-heading" className="card-glow">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl" aria-hidden="true">🛠️</span>
            <h2 id="contribution-heading" className="text-xl font-bold text-[#F1F5F9]">My Contribution</h2>
          </div>
          <p className="text-[#94A3B8] leading-relaxed">{project.contribution}</p>
        </section>

        {/* Challenges */}
        {project.challenges && (
          <section aria-labelledby="challenges-heading">
            <h2 id="challenges-heading" className="text-2xl font-bold mb-4 text-[#F1F5F9]">Challenges</h2>
            <p className="text-[#94A3B8] leading-relaxed">{project.challenges}</p>
          </section>
        )}

        {/* Outcome */}
        {project.outcome && (
          <section
            aria-labelledby="outcome-heading"
            className="rounded-2xl p-8 border border-[rgba(52,211,153,0.2)]"
            style={{ background: "rgba(52,211,153,0.04)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl" aria-hidden="true">🚀</span>
              <h2 id="outcome-heading" className="text-xl font-bold text-[#F1F5F9]">Outcome</h2>
            </div>
            <p className="text-[#94A3B8] leading-relaxed">{project.outcome}</p>
          </section>
        )}
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="border-t border-[rgba(34,211,238,0.08)] py-16"
          style={{ background: "rgba(255,255,255,0.01)" }}
        >
          <div className="container">
            <h2 id="related-heading" className="text-2xl font-bold mb-8 text-[#F1F5F9]">
              Other Projects
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {relatedProjects.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/projects/${rp.slug}`}
                  className="card group block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[#F1F5F9] font-semibold text-sm group-hover:text-[#22D3EE] transition-colors">{rp.title}</h3>
                  </div>
                  <p className="text-[#94A3B8] text-xs line-clamp-2">{rp.tagline}</p>
                  <span className="inline-block mt-3 text-xs text-[#22D3EE] group-hover:text-[#67E8F9] transition-colors">
                    Read more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section aria-labelledby="project-cta-heading" className="border-t border-[rgba(34,211,238,0.08)] py-16">
        <div className="container text-center">
          <h2 id="project-cta-heading" className="text-2xl font-bold mb-4 text-[#F1F5F9]">
            Interested in working together?
          </h2>
          <p className="text-[#94A3B8] mb-8">
            Tell me about your project and let&apos;s see if I&apos;m a good fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary justify-center">Contact Me</Link>
            <Link href="/projects" className="btn-secondary justify-center">All Projects</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
