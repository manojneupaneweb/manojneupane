import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, projects } from "@/lib/data";
import { buildHomeMetadata } from "@/lib/metadata";
import RevealWrapper from "@/components/RevealWrapper";
import SkillsBoard from "@/components/SkillsBoard";
import StatCounters from "@/components/StatCounters";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = buildHomeMetadata();

// ─── Arrow SVG ───────────────────────────────────────────────
function Arrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

// ─── External link icon ───────────────────────────────────────
function ExternalIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────
function HeroSection() {
  const techStack = ["Laravel", "Node.js", "Next.js", "React", "MySQL", "REST APIs"];

  return (
    <section
      className="hero-band on-dark relative min-h-screen flex items-center pt-16 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />

      <div className="container relative">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_380px] gap-12 lg:gap-16 items-center">
        <div>
          {/* Badge */}
          <div>
            <span className="hero-badge mb-6 inline-flex">
              <span className="live-dot mr-1" />
              Available for freelance · Nepal
            </span>
          </div>

          {/* Main headline */}
          <div>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6"
            >
              I Build &amp; Teach{" "}
              <span className="gradient-text block sm:inline">
                Full Stack Web
              </span>{" "}
              Applications.
            </h1>
          </div>

          {/* Subheading */}
          <div>
            <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed max-w-2xl mb-8">
              Full Stack Developer at{" "}
              <span className="text-[#F1F5F9] font-medium">Softworica</span>, Nepal.
              Specializing in Laravel, Node.js, and Next.js — building SaaS platforms,
              REST APIs, and scalable business systems.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Link href="/contact" className="btn-primary group">
              Start a Project
              <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/projects" className="btn-secondary">
              View Work
            </Link>
          </div>
          <p className="mb-12 text-sm text-[#b7bec8]">
            I also teach Laravel and the MERN stack at Softworica.{" "}
            <Link href="/about" className="text-[#7ee0e8] underline underline-offset-2">
              Read how I teach
            </Link>
          </p>

          {/* Tech Stack pills */}
          <div>
            <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-widest mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="skill-pill text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="hidden lg:block" aria-label="Current work">
          <div className="rounded-lg border border-white/10 bg-[#0c0e12]/80">
            <div className="px-4 py-2.5 border-b border-white/10">
              <span className="font-mono text-[11px] tracking-wide text-[#d5d8d2]">now.ts</span>
            </div>
            <dl className="p-4 font-mono text-[12px] leading-6 text-[#c5ccd6] grid grid-cols-[4.75rem_1fr] gap-y-1">
              <dt className="text-[#9ee7ee]">role</dt><dd>full-stack engineer</dd>
              <dt className="text-[#9ee7ee]">place</dt><dd>Softworica, Nepal</dd>
              <dt className="text-[#9ee7ee]">builds</dt><dd>Laravel, Node, Next.js</dd>
              <dt className="text-[#9ee7ee]">teaches</dt><dd>Laravel and MERN</dd>
              <p className="col-span-2 pt-3 text-[#a8b3c0]">Most client work stays private.</p>
            </dl>
          </div>
        </aside>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-[#94A3B8] font-mono tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-[rgba(34,211,238,0.5)] to-transparent" />
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="border-b border-[#e3e5e0]" aria-label="Working principle">
      <div className="container py-12 sm:py-16">
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#0c6b74]">
            Working principle
          </p>
          <p className="mt-5 text-2xl sm:text-3xl lg:text-[2.15rem] font-medium leading-snug tracking-tight text-[#16181c]">
            &ldquo;A project is not about showcasing complex code; it&apos;s about solving{" "}
            <span className="quote-mark">real-world problems</span>{" "}
            through meaningful technology.&rdquo;
          </p>
          <footer className="mt-6 font-mono text-xs tracking-wide text-[#4e5563]">
            <span className="text-[#0c6b74]" aria-hidden="true">{"// "}</span>
            Manoj Neupane
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

// ─── Section 2: About ─────────────────────────────────────────
function AboutSection() {
  return (
    <section className="section" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <RevealWrapper direction="left" className="flex flex-col items-center lg:items-start">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-2xl opacity-30 blur-xl"
                style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(59,130,246,0.2))" }} />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-[rgba(34,211,238,0.2)]"
                style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.05), rgba(59,130,246,0.05))" }}>
                <Image
                  src={siteConfig.profileImage}
                  alt={`Portrait of ${siteConfig.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                />
                {/* Caption overlay */}
                <div className="on-dark absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-[#111318]/90 to-transparent">
                  <p className="text-xs font-mono text-[#94A3B8]">Manoj Neupane · Softworica</p>
                </div>
              </div>
            </div>
          </RevealWrapper>

          {/* Copy */}
          <RevealWrapper delay={100} className="space-y-6">
            <div>
              <span className="section-label">About Manoj</span>
              <h2 id="about-heading" className="section-title mt-4">
                I Build Software.{" "}
                <span className="gradient-text">I Teach How It Works.</span>
              </h2>
            </div>

            <div className="space-y-4 text-[#94A3B8] text-base leading-relaxed">
              <p>
                I&apos;m a Full Stack Developer and Software Engineer from Nepal who believes
                great software starts with strong fundamentals. I specialize in building
                production-ready web applications, SaaS platforms, and REST APIs using{" "}
                <span className="text-[#F1F5F9] font-medium">MERN Stack, Laravel, and Next.js</span>
                , with attention to architecture, databases, and security.
              </p>
              <p>
                I&apos;m also a{" "}
                <span className="text-[#F1F5F9] font-medium">MERN Stack and Laravel instructor at Softworica</span>.
                Teaching pushes me to question assumptions — understanding not just{" "}
                <em className="text-[#22D3EE]">how</em> something works, but{" "}
                <em className="text-[#22D3EE]">why</em>. That mindset shapes how I architect systems.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                Read My Full Story <Arrow />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Let&apos;s Build Something
              </Link>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Experience ────────────────────────────────────
function ExperienceSection() {
  const responsibilities = [
    "Engineering full-stack web applications and SaaS platforms.",
    "Designing REST APIs, relational databases, and secure authentication systems.",
    "Teaching Laravel, PHP, Node.js, Express.js, React, and MongoDB.",
    "Guiding students through practical projects and full-stack development workflows.",
    "Applying software engineering principles to maintainability, security, and production deployment.",
  ];

  const techStack = ["Laravel", "PHP", "Node.js", "Express.js", "React", "MongoDB", "MySQL", "REST APIs"];

  return (
    <section
      className="section relative"
      aria-labelledby="experience-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.2)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.1)] to-transparent" />
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.01)]" />
      </div>
      <div className="container relative">
        {/* Header */}
        <RevealWrapper className="space-y-4 mb-14 max-w-2xl">
          <span className="section-label">Experience</span>
          <h2 id="experience-heading" className="section-title">
            Building Software.{" "}
            <span className="gradient-text">Teaching Engineering.</span>
          </h2>
          <p className="section-subtitle">
            Current work at Softworica: shipping applications and teaching Laravel and the MERN stack.
          </p>
        </RevealWrapper>

        {/* Experience Card */}
        <RevealWrapper delay={120} className="card-glow max-w-4xl">
          {/* Company header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 mb-6 border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-4">
              <a
                href="https://softworica.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-12 w-40 shrink-0 rounded-xl border border-[rgba(255,255,255,0.08)] flex items-center justify-center p-2 bg-white/5 hover:border-[rgba(34,211,238,0.3)] transition-colors overflow-hidden"
              >
                <Image src="/images/softworica-logo.webp" alt="Softworica" fill className="object-contain p-1.5" sizes="160px" />
              </a>
              <div>
                <div className="text-sm font-semibold text-[#F1F5F9]">Softworica</div>
                <div className="text-xs text-[#94A3B8] font-mono">Software Development Company</div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[rgba(52,211,153,0.1)] text-[#34D399] border border-[rgba(52,211,153,0.2)]">
                <span className="live-dot w-1.5 h-1.5" />
                Current role
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F1F5F9]">
                Full Stack Software Engineer · Laravel Instructor · MERN Stack Instructor
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                I write web applications and backend systems, and I teach students the same workflows I use at work.
              </p>
            </div>

            {/* Two pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[rgba(34,211,238,0.04)] border border-[rgba(34,211,238,0.12)] hover:border-[rgba(34,211,238,0.25)] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[rgba(34,211,238,0.1)] border border-[rgba(34,211,238,0.2)] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F1F5F9]">Software Engineering</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">Applications, SaaS and APIs</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[rgba(59,130,246,0.04)] border border-[rgba(59,130,246,0.12)] hover:border-[rgba(59,130,246,0.25)] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#60A5FA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F1F5F9]">Programming Education</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">Laravel and MERN Stack</div>
                </div>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-widest">Core Responsibilities</h4>
              <ul className="space-y-2">
                {responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-[#94A3B8]">
                    <span className="text-[#22D3EE] mt-0.5 shrink-0">▸</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="skill-pill text-xs">{tech}</span>
              ))}
            </div>

            <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#22D3EE] hover:text-[#67E8F9] transition-colors">
              Explore my experience
              <Arrow />
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── Section 4: Projects ──────────────────────────────────────
function ProjectsSection() {
  const displayProjects = projects.slice(0, 4);

  const categoryColors: Record<string, string> = {
    Directory:           "tag-green",
    SaaS:                "tag-blue",
    "Business System":   "tag",
    "Educational Portal":"tag-blue",
    "Web Application":   "tag",
    API:                 "tag-purple",
  };

  return (
    <section className="section" aria-labelledby="projects-heading">
      <div className="container">
        {/* Header */}
        <RevealWrapper className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="space-y-4">
            <span className="section-label">Selected Projects</span>
            <h2 id="projects-heading" className="section-title">
              Work That{" "}
              <span className="gradient-text">Solves Problems</span>
            </h2>
            <p className="section-subtitle">
              Most of my work is private office software. These public repos are skill samples, not client case studies.
            </p>
          </div>
          <Link href="/projects" className="btn-secondary text-sm shrink-0">
            All Projects <Arrow />
          </Link>
        </RevealWrapper>

        {/* Featured first */}
        {displayProjects.slice(0, 1).map((project) => (
          <RevealWrapper key={project.slug} className="mb-6" delay={50}>
            <div className="card-glow group hover:shadow-glow-cyan">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Info */}
                <div className="space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={categoryColors[project.category] ?? "tag"}>
                        {project.category}
                      </span>
                      {project.status === "live" && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border border-[rgba(52,211,153,0.25)] bg-[rgba(52,211,153,0.08)] text-[#34D399]">
                          <span className="live-dot w-1.5 h-1.5" />
                          Live
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#F1F5F9] group-hover:text-[#22D3EE] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[#94A3B8] mt-1 text-sm italic">{project.tagline}</p>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 5).map((tech) => (
                        <span key={tech} className="skill-pill text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 text-sm">
                        Visit Live Site <ExternalIcon />
                      </a>
                    )}
                    <Link href={`/projects/${project.slug}`} className="btn-secondary !py-2 !px-4 text-sm">
                      Case Study →
                    </Link>
                  </div>
                </div>

                {/* Browser mock */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-full rounded-xl border border-[rgba(34,211,238,0.12)] overflow-hidden bg-[rgba(255,255,255,0.02)]">
                    <div className="bg-[rgba(255,255,255,0.03)] px-4 py-3 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-3">
                      <div className="flex gap-1.5" aria-hidden="true">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                      </div>
                      <div className="flex-1 bg-[rgba(255,255,255,0.04)] rounded-md px-3 py-1 text-xs font-mono text-[#94A3B8]">
                        linktogovernment.com
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="text-center space-y-2">
                        <h4 className="text-sm font-bold text-[#F1F5F9]">Nepal Government Directory</h4>
                        <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-2 flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <span className="text-sm text-[#94A3B8]">Search ministries, services…</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {["Ministries", "Services", "Local Govt", "Contacts"].map((c) => (
                          <span key={c} className="tag text-xs">{c}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {["Passport", "PAN", "NID", "License", "Nagarikta", "Lok Sewa"].map((s) => (
                          <div key={s} className="bg-[rgba(255,255,255,0.03)] rounded-lg p-2 text-center border border-[rgba(255,255,255,0.04)]">
                            <span className="text-xs text-[#94A3B8]">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealWrapper>
        ))}

        {/* Remaining projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayProjects.slice(1).map((project, i) => (
            <RevealWrapper key={project.slug} delay={(i + 1) * 80}>
              <Link
                href={`/projects/${project.slug}`}
                className="card group flex flex-col h-full"
              >
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className={categoryColors[project.category] ?? "tag"}>
                    {project.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#F1F5F9] group-hover:text-[#22D3EE] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-[#94A3B8] italic mb-3">{project.tagline}</p>
                <p className="text-sm text-[#94A3B8] leading-relaxed flex-1 line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span key={tech} className="skill-pill text-xs">{tech}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-[rgba(255,255,255,0.05)] mt-4 text-sm font-semibold text-[#22D3EE] group-hover:text-[#67E8F9] flex items-center gap-1.5 transition-colors">
                  View details
                  <Arrow />
                </div>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Skills ────────────────────────────────────────
function SkillsSection() {
  return (
    <section
      className="section relative"
      aria-labelledby="skills-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.15)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.08)] to-transparent" />
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.01)]" />
      </div>
      <div className="container relative">
        <RevealWrapper className="max-w-2xl mb-14 space-y-4 mx-auto text-center">
          <span className="section-label">Technical Skills</span>
          <h2 id="skills-heading" className="section-title">
            Tools I Work With
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Technologies I use in production software, grouped by category.
          </p>
        </RevealWrapper>

        <SkillsBoard />

        <RevealWrapper className="mt-12 text-center" delay={100}>
          <Link href="/skills" className="btn-secondary">
            View All Skills <Arrow />
          </Link>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── Section 6: Blog ─────────────────────────────────────────
function BlogSection() {
  const featured = [
    {
      slug: "how-to-integrate-esewa-payment-gateway",
      title: "How to Integrate eSewa Payment Gateway in Node.js and Laravel",
      category: "Payments",
      readingTime: "15 min read",
      desc: "HMAC-SHA256 signature generation, sandbox testing, callbacks, and server-side verification.",
    },
    {
      slug: "how-to-integrate-khalti-payment-gateway",
      title: "How to Integrate Khalti Payment Gateway (ePayment API v2)",
      category: "Payments",
      readingTime: "14 min read",
      desc: "Payment initiation, pidx token handling, checkout redirect, and transaction lookup.",
    },
    {
      slug: "how-to-register-free-np-domain-nepal",
      title: "How to Register a Free .np Domain in Nepal (With Cover Letter)",
      category: "DevOps & Tools",
      readingTime: "12 min read",
      desc: "Eligibility rules, required documents, editable cover letter template, and Cloudflare DNS setup.",
    },
  ];

  return (
    <section className="section" aria-labelledby="blog-heading">
      <div className="container">
        <RevealWrapper className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="space-y-4">
            <span className="section-label">Nepali Developer Guide</span>
            <h2 id="blog-heading" className="section-title">
              Featured Tutorials &amp; Insights
            </h2>
            <p className="section-subtitle">
              Real solutions to real problems developers face in Nepal. Free guides with working code.
            </p>
          </div>
          <Link href="/blog" className="btn-secondary text-sm shrink-0">
            All Guides <Arrow />
          </Link>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item, i) => (
            <RevealWrapper key={item.slug} delay={i * 80}>
              <Link
                href={`/blog/${item.slug}`}
                className="card group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="tag text-xs">{item.category}</span>
                    <span className="text-xs text-[#94A3B8] font-mono">{item.readingTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#F1F5F9] group-hover:text-[#22D3EE] transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-[rgba(255,255,255,0.05)] mt-4 flex items-center text-xs font-semibold text-[#22D3EE] group-hover:text-[#67E8F9] gap-1 transition-colors">
                  Read Tutorial →
                </div>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Contact CTA ───────────────────────────────────
function ContactSection() {
  return (
    <section
      className="section relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.2)] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.15) 0%, transparent 70%)" }} />
      </div>

      <div className="container relative text-center space-y-10">
        <RevealWrapper className="space-y-5">
          <span className="section-label">Start a Project</span>
          <h2 id="contact-heading" className="section-title">
            Have an Idea?
            <br />
            <span className="gradient-text">Start a Project.</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Tell me the problem, the users, and the timeline. I reply within 24 hours.
            Then we do a short discovery call, a written quote, and the build.
          </p>
        </RevealWrapper>

        <RevealWrapper className="grid grid-cols-1 sm:grid-cols-2 gap-4" delay={100}>
          <a
            href={`mailto:${siteConfig.email}`}
            className="card group text-center hover:border-[rgba(34,211,238,0.3)]"
          >
            <div className="text-2xl mb-3">✉️</div>
            <div className="text-sm font-semibold text-[#F1F5F9] group-hover:text-[#22D3EE] transition-colors mb-1">
              Send an Email
            </div>
            <div className="text-xs text-[#94A3B8] font-mono">{siteConfig.email}</div>
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card group text-center hover:border-[rgba(34,211,238,0.3)]"
          >
            <div className="mb-3 flex justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#94A3B8] group-hover:text-[#F1F5F9] transition-colors">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div className="text-sm font-semibold text-[#F1F5F9] group-hover:text-[#22D3EE] transition-colors mb-1">
              View GitHub
            </div>
            <div className="text-xs text-[#94A3B8] font-mono">@manojneupaneweb</div>
          </a>
        </RevealWrapper>

        <RevealWrapper delay={160}>
          <Link href="/contact" className="btn-primary mx-auto">
            Start a Project <Arrow />
          </Link>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── Page Assembly ────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuoteSection />
      <StatCounters />
      <Testimonials />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
