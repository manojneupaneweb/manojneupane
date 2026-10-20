import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, projects, skillCategories } from "@/lib/data";
import { buildHomeMetadata } from "@/lib/metadata";
import RevealWrapper from "@/components/RevealWrapper";

export const metadata: Metadata = buildHomeMetadata();

// ─── Shared Arrow SVG ─────────────────────────────────────────
function Arrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100dvh-4rem)] lg:h-[100dvh] lg:max-h-[100dvh] lg:min-h-[600px] flex flex-col justify-between overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Grid + glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="grid-bg absolute inset-0 opacity-100" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.18) 0%, rgba(34,211,238,0.06) 50%, transparent 75%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to top, #0B1120, transparent)" }}
        />
      </div>

      <div className="relative container flex-1 flex flex-col justify-center py-4 sm:py-6 lg:py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-5 lg:space-y-6">
            {/* Eyebrow badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                Full Stack Developer · Software Engineer · Nepal
              </span>
            </div>

            {/* Heading */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Building Software{" "}
              <span className="gradient-text">That Solves</span>
              <br />
              Real Problems.
            </h1>

            {/* Supporting copy */}
            <p className="text-base lg:text-base xl:text-lg text-[#94A3B8] leading-relaxed max-w-xl">
              I build web applications, SaaS platforms, APIs, and business systems that
              turn complex requirements into practical, maintainable software.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/projects" className="btn-primary group !py-2.5 !px-5 text-sm sm:text-base">
                Explore My Work
                <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-secondary !py-2.5 !px-5 text-sm sm:text-base">
                Let&apos;s Work Together
              </Link>
            </div>

            {/* Stat strip */}
            <div className="flex flex-wrap gap-6 sm:gap-8 pt-2 border-t border-[#334155]">
              {[
                { value: "3+", label: "Years experience" },
                { value: "10+", label: "Projects delivered" },
                { value: "Full", label: "Stack capability" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-xl sm:text-2xl font-bold text-[#F8FAFC]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code card */}
          <div className="relative hidden lg:block">
            <div className="relative w-full max-w-[380px] xl:max-w-[430px] aspect-square mx-auto">
              <div
                className="absolute inset-0 rounded-full border border-[#334155]"
                style={{ transform: "scale(0.95)" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rounded-full border border-[#334155]/50"
                style={{ transform: "scale(1.08)" }}
                aria-hidden="true"
              />
              <div className="absolute inset-4 xl:inset-6 rounded-2xl bg-[#111827]/90 backdrop-blur-md border border-[#334155] flex items-center justify-center p-5 xl:p-6 glow-accent shadow-2xl">
                <div className="w-full font-mono text-xs xl:text-sm space-y-2 xl:space-y-2.5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" aria-hidden="true" />
                    <span className="ml-2 text-[#94A3B8] text-xs">manoj.ts</span>
                  </div>
                  <div className="text-[#3B82F6]">const developer = {"{"}</div>
                  <div className="pl-3 xl:pl-4 text-[#94A3B8]">
                    name: <span className="text-[#22D3EE]">&quot;Manoj Neupane&quot;</span>,
                  </div>
                  <div className="pl-3 xl:pl-4 text-[#94A3B8]">
                    stack: <span className="text-[#22D3EE]">[&quot;Laravel&quot;, &quot;Node.js&quot;, &quot;Next.js&quot;]</span>,
                  </div>
                  <div className="pl-3 xl:pl-4 text-[#94A3B8]">
                    role: <span className="text-[#22D3EE]">&quot;Engineer + Instructor&quot;</span>,
                  </div>
                  <div className="pl-3 xl:pl-4 text-[#94A3B8]">
                    location: <span className="text-[#22D3EE]">&quot;Nepal 🇳🇵&quot;</span>,
                  </div>
                  <div className="text-[#3B82F6]">{"}"}</div>
                  <div className="pt-1.5 text-[#94A3B8]">
                    <span className="text-[#3B82F6]">developer</span>.build();
                  </div>
                </div>
              </div>

              {/* Floating tech tags */}
              {[
                { label: "Node.js", pos: "top-1 left-1", color: "text-[#34D399]" },
                { label: "Laravel", pos: "top-1 right-1", color: "text-[#F05340]" },
                { label: "Next.js", pos: "bottom-1 right-1", color: "text-[#F8FAFC]" },
                { label: "REST APIs", pos: "top-1/2 -left-5 -translate-y-1/2", color: "text-[#22D3EE]" },
              ].map((tag) => (
                <div
                  key={tag.label}
                  className={`absolute ${tag.pos} px-2.5 py-0.5 rounded-full bg-[#1E293B] border border-[#334155] text-[11px] font-mono ${tag.color} whitespace-nowrap shadow-md`}
                  aria-hidden="true"
                >
                  {tag.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden md:flex flex-col items-center gap-1 text-[#94A3B8] animate-bounce pb-3 shrink-0"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

// ─── Section 2: About ─────────────────────────────────────────
function AboutSection() {
  return (
    <section className="section bg-transparent" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Portrait */}
          <RevealWrapper className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              <div
                className="absolute -inset-2 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] rounded-3xl opacity-25 blur-xl group-hover:opacity-45 transition duration-500"
                aria-hidden="true"
              />
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl p-1 bg-gradient-to-br from-[#3B82F6] via-[#334155] to-[#22D3EE] shadow-2xl shadow-black/40">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#111827]">
                  <Image
                    src={siteConfig.profileImage}
                    alt={`Portrait of ${siteConfig.name}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 288px, 320px"
                  />
                </div>
              </div>
              {/* Status pill */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#111827]/95 backdrop-blur-md border border-[#334155] text-xs font-medium text-[#F8FAFC] shadow-lg flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                <span>Manoj Neupane · Softworica</span>
              </div>
            </div>
          </RevealWrapper>

          {/* Copy */}
          <RevealWrapper className="lg:col-span-7 space-y-6 text-center lg:text-left" delay={100}>
            <div>
              <span className="section-label">About Manoj</span>
              <h2 id="about-heading" className="section-title mt-2">
                I Build Software.{" "}
                <span className="gradient-text">I Teach How It Works.</span>
              </h2>
            </div>

            <div className="space-y-4 text-[#94A3B8] text-base leading-relaxed">
              <p>
                I&apos;m a Full Stack Developer and Software Engineer from Nepal who believes
                great software starts with strong fundamentals. I specialize in building
                production-ready web applications, SaaS platforms, and REST APIs using{" "}
                <span className="text-[#F8FAFC] font-semibold">MERN Stack, Laravel, and Next.js</span>{" "}
                — with a focus on clean architecture, scalable databases, security, and
                real-world problem-solving.
              </p>
              <p>
                I&apos;m also a{" "}
                <span className="text-[#F8FAFC] font-semibold">MERN Stack and Laravel instructor at Softworica</span>.
                Teaching pushes me to question assumptions and understand not just{" "}
                <em>how</em> something works, but <em>why</em>. That mindset shapes how I
                architect systems and write maintainable code.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/about" className="btn-secondary">
                Read My Full Story <Arrow />
              </Link>
              <Link href="/contact" className="btn-primary">
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
      className="section bg-[#111827]/50 backdrop-blur-sm border-y border-[#334155]/60"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        {/* Header */}
        <RevealWrapper className="space-y-3 mb-10">
          <span className="section-label">Proven Experience</span>
          <h2 id="experience-heading" className="section-title">
            Building Software.{" "}
            <span className="gradient-text">Teaching Engineering.</span>
          </h2>
          <p className="section-subtitle">
            3+ years building production applications and mentoring developers in modern full-stack workflows.
          </p>
        </RevealWrapper>

        {/* Experience Card */}
        <RevealWrapper delay={100} className="rounded-2xl border border-[#334155] bg-[#111827] overflow-hidden shadow-xl shadow-black/20">
          {/* Company header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 border-b border-[#334155] bg-[#0B1120]/60">
            <div className="flex items-center gap-4">
              <a
                href="https://softworica.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-12 w-40 shrink-0 bg-white/95 rounded-xl border border-[#334155]/50 hover:opacity-90 transition-opacity overflow-hidden flex items-center justify-center p-1"
              >
                <Image
                  src="/images/softworica-logo.webp"
                  alt="Softworica"
                  fill
                  className="object-contain p-1.5"
                  sizes="160px"
                />
              </a>
              <div>
                <div className="text-sm font-semibold text-[#F8FAFC]">Softworica</div>
                <div className="text-xs text-[#94A3B8]">Software Development · Active Role</div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Current Role
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1E293B] text-[#94A3B8] border border-[#334155]">
                3+ Years
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                Full Stack Software Engineer · Laravel Instructor · MERN Stack Instructor
              </h3>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                I combine hands-on software development with practical programming instruction — developing web
                applications and backend systems while mentoring students in real-world development workflows and
                engineering principles.
              </p>
            </div>

            {/* Two pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1120] border border-[#334155] hover:border-[#3B82F6]/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F8FAFC]">Software Engineering</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">Applications, SaaS and APIs</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1120] border border-[#334155] hover:border-[#22D3EE]/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F8FAFC]">Programming Education</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">Laravel and MERN Stack</div>
                </div>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#94A3B8]">Core Responsibilities</h4>
              <ul className="space-y-2">
                {responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-[#94A3B8]">
                    <span className="text-[#3B82F6] mt-0.5 shrink-0">▸</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech + CTA */}
            <div className="pt-2 border-t border-[#334155] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-mono rounded-md bg-[#1E293B] border border-[#334155] text-[#94A3B8]">
                    {tech}
                  </span>
                ))}
              </div>
              <Link href="/about" className="text-sm font-semibold text-[#F8FAFC] hover:text-[#22D3EE] transition-colors whitespace-nowrap inline-flex items-center gap-1.5">
                Explore My Experience →
              </Link>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── Section 4: Selected Projects ────────────────────────────
function ProjectsSection() {
  const displayProjects = projects.slice(0, 4);

  const categoryColors: Record<string, string> = {
    Directory: "text-[#22D3EE] bg-[#22D3EE]/10 border-[#22D3EE]/30",
    SaaS: "text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30",
    "Business System": "text-[#34D399] bg-[#34D399]/10 border-[#34D399]/30",
    "Educational Portal": "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/30",
    API: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30",
  };

  return (
    <section className="section bg-transparent" aria-labelledby="projects-heading">
      <div className="container">
        {/* Header */}
        <RevealWrapper className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="section-label">Selected Projects</span>
            <h2 id="projects-heading" className="section-title">
              Work That{" "}
              <span className="gradient-text">Solves Problems</span>
            </h2>
            <p className="section-subtitle">
              Production software built around real requirements — not demo templates.
            </p>
          </div>
          <Link href="/projects" className="btn-secondary text-sm shrink-0">
            All Projects <Arrow />
          </Link>
        </RevealWrapper>

        {/* Featured first */}
        {displayProjects.slice(0, 1).map((project) => (
          <RevealWrapper key={project.slug} className="mb-6" delay={50}>
            <div className="rounded-2xl border border-[#334155] bg-[#111827] overflow-hidden hover:border-[#3B82F6]/40 transition-colors group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Info */}
                <div className="p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-full border ${
                          categoryColors[project.category] ?? "text-[#94A3B8] bg-[#1E293B] border-[#334155]"
                        }`}
                      >
                        {project.category}
                      </span>
                      {project.status === "live" && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                          Live
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[#94A3B8] mt-1 text-sm">{project.tagline}</p>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 5).map((tech) => (
                        <span key={tech} className="tag text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 text-sm">
                        Visit Live Site
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    <Link href={`/projects/${project.slug}`} className="btn-secondary !py-2 !px-4 text-sm">
                      Case Study →
                    </Link>
                  </div>
                </div>

                {/* Browser mock */}
                <div className="hidden lg:flex items-center justify-center p-6 sm:p-8 border-l border-[#334155] bg-[#0B1120]/40">
                  <div className="w-full rounded-xl border border-[#334155] overflow-hidden">
                    <div className="bg-[#1E293B] px-4 py-3 border-b border-[#334155] flex items-center gap-3">
                      <div className="flex gap-1.5" aria-hidden="true">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      </div>
                      <div className="flex-1 bg-[#111827] rounded-md px-3 py-1 text-xs font-mono text-[#94A3B8]">
                        linktogovernment.com
                      </div>
                    </div>
                    <div className="p-5 space-y-4 bg-[#111827]">
                      <div className="text-center space-y-2">
                        <h4 className="text-sm font-bold text-[#F8FAFC]">Nepal Government Directory</h4>
                        <div className="bg-[#1E293B] border border-[#334155] rounded-lg px-4 py-2 flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <span className="text-sm text-[#94A3B8]">Search ministries, services…</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {["Ministries", "Services", "Local Govt", "Contacts"].map((c) => (
                          <span key={c} className="px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] text-xs text-[#94A3B8]">{c}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {["Passport", "PAN", "NID", "License", "Nagarikta", "Lok Sewa"].map((s) => (
                          <div key={s} className="bg-[#1E293B] rounded-lg p-2 text-center">
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
                className="card group flex flex-col h-full hover:border-[#3B82F6]/50 hover:shadow-lg hover:shadow-[#3B82F6]/5 transition-all"
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                      categoryColors[project.category] ?? "text-[#94A3B8] bg-[#1E293B] border-[#334155]"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-[#94A3B8] italic mb-3">{project.tagline}</p>
                <p className="text-sm text-[#94A3B8] leading-relaxed flex-1 line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span key={tech} className="tag text-xs">{tech}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-[#334155] mt-4 text-xs font-semibold text-[#3B82F6] group-hover:text-[#22D3EE] flex items-center gap-1">
                  View Details →
                </div>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Tech Stack ────────────────────────────────────
function SkillsSection() {
  return (
    <section
      className="section bg-[#111827]/50 backdrop-blur-sm border-y border-[#334155]/60"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <RevealWrapper className="max-w-2xl mb-12 space-y-3 mx-auto text-center">
          <span className="section-label">Technical Skills</span>
          <h2 id="skills-heading" className="section-title">
            Tools I Work With
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Technologies I use in production software — organized by category.
          </p>
        </RevealWrapper>

        <div className="space-y-8">
          {skillCategories.map((category, i) => (
            <RevealWrapper key={category.id} delay={i * 60}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span aria-hidden="true">{category.icon}</span>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#94A3B8]">
                    {category.name}
                  </h3>
                  <div className="flex-1 h-px bg-[#334155]" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 rounded-lg bg-[#111827] border border-[#334155] text-sm text-[#F8FAFC] hover:border-[#3B82F6]/40 hover:text-[#3B82F6] transition-all cursor-default"
                      title={skill.description}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper className="mt-10 text-center" delay={100}>
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
    <section className="section bg-transparent" aria-labelledby="blog-heading">
      <div className="container">
        <RevealWrapper className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
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
                className="group card flex flex-col justify-between hover:border-[#3B82F6]/50 hover:shadow-xl hover:shadow-[#3B82F6]/5 transition-all duration-300 h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="tag text-xs font-mono">{item.category}</span>
                    <span className="text-xs text-[#94A3B8]">{item.readingTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#334155] mt-4 flex items-center text-xs font-semibold text-[#3B82F6] group-hover:text-[#22D3EE] gap-1">
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
      className="section bg-[#111827]/50 backdrop-blur-sm border-t border-[#334155]/60 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(59,130,246,0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="container relative max-w-3xl mx-auto text-center space-y-8">
        <RevealWrapper className="space-y-4">
          <span className="section-label">Get in Touch</span>
          <h2 id="contact-heading" className="section-title">
            Have an Idea?
            <br />
            <span className="gradient-text">Let&apos;s Build It.</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Tell me about the product, website, or system you want to build. Let&apos;s
            discuss the problem, the requirements, and a practical approach to delivering it.
          </p>
        </RevealWrapper>

        <RevealWrapper className="grid grid-cols-1 sm:grid-cols-3 gap-4" delay={100}>
          <a
            href={`mailto:${siteConfig.email}`}
            className="card text-center hover:border-[#3B82F6]/50 group"
          >
            <div className="text-2xl mb-2" aria-hidden="true">✉️</div>
            <div className="text-sm font-medium text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors mb-1">
              Send an Email
            </div>
            <div className="text-xs text-[#94A3B8] font-mono">{siteConfig.email}</div>
          </a>
          <Link href="/contact" className="card text-center hover:border-[#3B82F6]/50 group">
            <div className="text-2xl mb-2" aria-hidden="true">📋</div>
            <div className="text-sm font-medium text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors mb-1">
              Project Inquiry
            </div>
            <div className="text-xs text-[#94A3B8]">Use the inquiry form</div>
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card text-center hover:border-[#3B82F6]/50 group"
          >
            <div className="text-2xl mb-2" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div className="text-sm font-medium text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors mb-1">
              View GitHub
            </div>
            <div className="text-xs text-[#94A3B8] font-mono">@manojneupaneweb</div>
          </a>
        </RevealWrapper>

        <RevealWrapper delay={160}>
          <Link href="/contact" className="btn-primary mx-auto">
            Start a Project Inquiry <Arrow />
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
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
