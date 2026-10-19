import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  siteConfig,
  featuredProjects,
  whatIBuild,
  skillCategories,
  services,
  experiences,
} from "@/lib/data";
import { buildHomeMetadata } from "@/lib/metadata";

// Homepage uses an absolute title (no template suffix) with its own canonical.
export const metadata: Metadata = buildHomeMetadata();

// ─── Animated Grid Background ─────────────────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="grid-bg absolute inset-0 opacity-100" />
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.20) 0%, rgba(34,211,238,0.07) 50%, transparent 75%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to top, #0B1120, transparent)" }}
      />
    </div>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100dvh-4rem)] lg:h-[100dvh] lg:max-h-[100dvh] lg:min-h-[600px] flex flex-col justify-between overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      <GridBackground />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-2 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-4 xl:space-y-5">
            {/* Eyebrow */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                Full Stack Developer · Software Engineer · Nepal
              </span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-[1.12] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Building Software{" "}
              <span className="gradient-text">That Solves</span>
              <br />
              Real Problems.
            </h1>

            {/* Supporting copy */}
            <p className="text-sm sm:text-base lg:text-base xl:text-lg text-[#94A3B8] leading-relaxed max-w-xl">
              I build web applications, SaaS platforms, APIs, and business
              systems that turn complex requirements into practical, maintainable
              software.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/projects" className="btn-primary group !py-2.5 !px-5 text-sm sm:text-base">
                Explore My Work
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/contact" className="btn-secondary !py-2.5 !px-5 text-sm sm:text-base">
                Let&apos;s Discuss Your Project
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-2.5 !px-5 text-sm sm:text-base"
                aria-label="View GitHub profile"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View GitHub
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 pt-3 sm:pt-4 border-t border-[#334155]">
              {[
                { value: "2+", label: "Years experience" },
                { value: "10+", label: "Projects delivered" },
                { value: "Full", label: "Stack capability" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl font-bold text-[#F8FAFC]" style={{ fontFamily: "var(--font-display)" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full max-w-[380px] xl:max-w-[430px] aspect-square mx-auto">
              {/* Decorative rings */}
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

              {/* Central code card */}
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
                    stack: <span className="text-[#22D3EE]">[&quot;Laravel&quot;, &quot;Next.js&quot;]</span>,
                  </div>
                  <div className="pl-3 xl:pl-4 text-[#94A3B8]">
                    focus: <span className="text-[#22D3EE]">&quot;real problems&quot;</span>,
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

              {/* Floating tags */}
              {[
                { label: "Laravel", pos: "top-1 right-1", color: "text-[#F05340]" },
                { label: "Next.js", pos: "bottom-1 right-1", color: "text-[#F8FAFC]" },
                { label: "MySQL", pos: "top-1/2 -left-5 -translate-y-1/2", color: "text-[#22D3EE]" },
                { label: "REST API", pos: "top-1 left-1", color: "text-[#22D3EE]" },
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
        className="hidden md:flex flex-col items-center gap-1 text-[#94A3B8] animate-bounce pb-2 xl:pb-3 shrink-0"
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

// ─── Section 2: Professional Introduction & About ────────────
function IntroSection() {
  return (
    <section className="section bg-transparent" aria-labelledby="intro-heading">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Profile Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              {/* Outer decorative gradient glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition duration-500" aria-hidden="true" />
              
              {/* Image Frame */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl p-1 bg-gradient-to-br from-[#3B82F6] via-[#334155] to-[#22D3EE] shadow-2xl shadow-black/40">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#111827]">
                  <Image
                    src={siteConfig.profileImage}
                    alt={`Portrait of ${siteConfig.name}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  />
                </div>
              </div>

              {/* Floating Role Pill */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#111827]/95 backdrop-blur-md border border-[#334155] text-xs font-medium text-[#F8FAFC] shadow-lg flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                <span>Manoj Neupane · Softworica</span>
              </div>
            </div>
          </div>

          {/* Right Column: Introduction Copy & Capabilities */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div>
              <span className="section-label">About My Work</span>
              <h2 id="intro-heading" className="section-title mt-2">
                More Than Just a Website.
              </h2>
            </div>

            <p className="section-subtitle lg:mx-0">
              Software development for me means the full cycle — understanding
              requirements, designing database schemas, building REST APIs,
              implementing authentication and authorization, creating frontend
              interfaces, and deploying to production. The website is the last
              step, not the only one.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center">
              {[
                { icon: "🔧", label: "Backend Architecture" },
                { icon: "🗄️", label: "Database Design" },
                { icon: "🔐", label: "Auth & RBAC" },
                { icon: "🚀", label: "Production Deployment" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-[#111827]/60 border border-[#334155] space-y-1.5">
                  <div className="text-2xl" aria-hidden="true">{item.icon}</div>
                  <div className="text-xs text-[#94A3B8] font-medium">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-center lg:justify-start">
              <Link href="/about" className="btn-secondary">
                Learn More About Me
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Experience & Programming Instruction ──────────
function ExperienceSection() {
  return (
    <section className="section bg-[#111827]/40 backdrop-blur-sm border-y border-[#334155]/60" aria-labelledby="experience-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="section-label">Experience & Teaching</span>
            <h2 id="experience-heading" className="section-title">
              Professional Experience & Programming Instruction
            </h2>
            <p className="section-subtitle">
              Building production-grade web applications and APIs while actively teaching and mentoring developers in modern programming frameworks.
            </p>
          </div>
          <Link href="/experience" className="btn-secondary text-sm shrink-0">
            Full Experience Timeline
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="card relative overflow-hidden">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#334155]">
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-1.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">{exp.role}</h3>
                    <span className="px-3 py-0.5 rounded-full text-xs font-mono font-medium bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30">
                      Development + Instruction
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap text-sm">
                    {exp.organizationUrl ? (
                      <a
                        href={exp.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3B82F6] hover:text-[#2563EB] font-semibold text-base transition-colors"
                      >
                        {exp.organization}
                      </a>
                    ) : (
                      <span className="text-[#3B82F6] font-semibold text-base">{exp.organization}</span>
                    )}
                    <span className="text-[#94A3B8]">·</span>
                    <span className="text-[#94A3B8]">{exp.type}</span>
                    <span className="text-[#94A3B8]">·</span>
                    <span className="text-xs text-[#22D3EE] font-mono">Nepal 🇳🇵</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="tag font-mono text-xs px-3 py-1">{exp.period}</span>
                </div>
              </div>

              {/* Dual Pillars: Software Engineering & Programming Instruction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                {/* Pillar 1: Production Software Engineering */}
                <div className="bg-[#1E293B]/60 rounded-xl p-5 border border-[#334155]/80 space-y-3">
                  <div className="flex items-center gap-2 text-[#22D3EE] font-semibold text-sm uppercase tracking-wider">
                    <span className="text-base">💻</span>
                    Software Engineering & Architecture
                  </div>
                  <ul className="space-y-2.5 text-sm text-[#94A3B8]">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" aria-hidden="true" />
                      <span>Developing SaaS platforms, business systems, and RESTful APIs for production environments.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" aria-hidden="true" />
                      <span>Designing MySQL schemas, database optimizations, JWT authentication, and Role-Based Access Control (RBAC).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" aria-hidden="true" />
                      <span>Deploying applications with cPanel, Cloudflare, and cloud platforms for reliable uptime.</span>
                    </li>
                  </ul>
                </div>

                {/* Pillar 2: Teaching Programming */}
                <div className="bg-[#1E293B]/60 rounded-xl p-5 border border-[#3B82F6]/40 relative space-y-3 shadow-lg shadow-[#3B82F6]/5">
                  <div className="flex items-center gap-2 text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">
                    <span className="text-base">🎓</span>
                    Teaching Programming & Mentorship
                  </div>
                  <ul className="space-y-2.5 text-sm text-[#94A3B8]">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" aria-hidden="true" />
                      <span><strong className="text-[#F8FAFC] font-medium">Programming Instruction:</strong> Teaching students programming fundamentals, problem-solving techniques, and modern development standards.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" aria-hidden="true" />
                      <span><strong className="text-[#F8FAFC] font-medium">Laravel & Node.js Curriculum:</strong> Guiding learners through MVC architecture, backend API design, and database relationships.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" aria-hidden="true" />
                      <span><strong className="text-[#F8FAFC] font-medium">Mentoring & Code Reviews:</strong> Helping developers debug complex bugs, understand error messages, and build portfolio-ready projects.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="pt-4 border-t border-[#334155] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-[#94A3B8] mr-2">Technologies:</span>
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tag text-xs">{tech}</span>
                  ))}
                </div>
                {exp.projects && exp.projects.length > 0 && (
                  <Link
                    href={`/projects/${exp.projects[0]}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#22D3EE] hover:underline"
                  >
                    Featured project: LinkToGovernment →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── Section 4: Selected Work ─────────────────────────────────
function SelectedWorkSection() {
  return (
    <section className="section bg-transparent" aria-labelledby="work-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="section-label">Selected Work</span>
            <h2 id="work-heading" className="section-title">
              What I&apos;ve Built
            </h2>
          </div>
          <Link href="/projects" className="btn-secondary text-sm shrink-0">
            All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <article
              key={project.slug}
              className="group card hover:shadow-lg hover:shadow-[#3B82F6]/5 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="tag">{project.category}</span>
                    {project.status === "live" && (
                      <span className="inline-flex items-center gap-1 text-xs text-[#22D3EE] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" aria-hidden="true" />
                        Live
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                    {project.title}
                  </h3>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title} live site`}
                    className="shrink-0 p-2 rounded-lg border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#3B82F6]/50 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>

              <p className="text-[#94A3B8] leading-relaxed text-sm mb-4">
                {project.description}
              </p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.slice(0, 5).map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#94A3B8]">
                  <span className="font-medium text-[#3B82F6]">My role: </span>
                  {project.contribution.split(" ").slice(0, 8).join(" ")}…
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium flex items-center gap-1 group/link"
                >
                  Case Study
                  <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}

          {/* All projects CTA card */}
          <Link
            href="/projects"
            className="card border-dashed hover:border-[#3B82F6]/40 flex flex-col items-center justify-center text-center gap-4 min-h-[200px] group"
          >
            <div className="w-12 h-12 rounded-full bg-[#1E293B] flex items-center justify-center group-hover:bg-[#3B82F6]/10 transition-colors">
              <svg className="w-5 h-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                View All Projects
              </p>
              <p className="text-sm text-[#94A3B8] mt-1">
                SaaS, Business Systems, APIs, and more
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: What I Build ──────────────────────────────────
function WhatIBuildSection() {
  return (
    <section className="section bg-transparent" aria-labelledby="what-heading">
      <div className="container">
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="section-label">Capabilities</span>
          <h2 id="what-heading" className="section-title">
            What I Build
          </h2>
          <p className="section-subtitle">
            Each category represents a real type of software problem — not a
            template, but a category of work with its own requirements,
            architecture, and delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whatIBuild.map((item) => (
            <div key={item.id} className="card group hover:shadow-lg hover:shadow-[#3B82F6]/5">
              <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#3B82F6] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Featured Product — LinkToGovernment ──────────
function FeaturedProductSection() {
  return (
    <section
      className="section bg-[#111827]/50 backdrop-blur-sm border-y border-[#334155]/60 relative overflow-hidden"
      aria-labelledby="ltg-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 100% 50%, rgba(56,189,248,0.06) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="section-label">Featured Project</span>
              <div className="flex items-center gap-3">
                <h2 id="ltg-heading" className="section-title">
                  LinkToGovernment
                </h2>
                <span className="inline-flex items-center gap-1 text-xs text-[#22D3EE] font-mono px-2 py-1 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" aria-hidden="true" />
                  Live
                </span>
              </div>
            </div>

            <p className="text-[#94A3B8] leading-relaxed text-lg">
              An independent bilingual directory that helps citizens, researchers,
              and businesses find official Nepal government websites — ministries,
              municipalities, citizen services, emergency contacts, and all seven
              provincial portals.
            </p>

            <div className="bg-[#1E293B] rounded-xl p-4 border border-[#334155] space-y-2">
              <p className="text-xs font-mono text-[#3B82F6] uppercase tracking-widest mb-3">
                What It Covers
              </p>
              {[
                "Federal ministries and departments",
                "Citizen services: Passport, PAN, NID, Driving License, Citizenship",
                "All seven provincial government portals",
                "Local government directory (municipalities & rural units)",
                "Government contacts — phones, emails, addresses",
                "Bilingual search in English and Nepali",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#22D3EE] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#94A3B8]">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://linktogovernment.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit LinkToGovernment
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link href="/projects/linktogovernment" className="btn-secondary">
                Read Case Study
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-[#94A3B8] italic">
              Independent directory — links to official government sites. Not
              affiliated with or endorsed by any government body.
            </p>
          </div>

          {/* Right: Visual representation */}
          <div className="relative">
            <div className="card p-0 overflow-hidden">
              {/* Browser chrome */}
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

              {/* Simulated UI */}
              <div className="p-6 space-y-4 bg-[#111827]">
                <div className="text-center space-y-3">
                  <h3 className="text-sm font-bold text-[#F8FAFC]">
                    Nepal Government Directory
                  </h3>
                  {/* Search bar simulation */}
                  <div className="bg-[#1E293B] border border-[#334155] rounded-lg px-4 py-2.5 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm text-[#94A3B8]">Search ministries, services…</span>
                  </div>
                </div>

                {/* Category pills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Ministries", "Services", "Local Govt", "Contacts"].map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] text-xs text-[#94A3B8]">
                      {c}
                    </span>
                  ))}
                </div>

                {/* Quick links simulation */}
                <div className="grid grid-cols-3 gap-2">
                  {["Passport", "PAN", "NID", "License", "Nagarikta", "Lok Sewa"].map((s) => (
                    <div key={s} className="bg-[#1E293B] rounded-lg p-2 text-center">
                      <span className="text-xs text-[#94A3B8]">{s}</span>
                    </div>
                  ))}
                </div>

                {/* Language toggle */}
                <div className="flex justify-end gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-md bg-[#3B82F6] text-white">ENG</span>
                  <span className="text-xs px-2.5 py-1 rounded-md border border-[#334155] text-[#94A3B8]">NEP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Technical Capabilities ───────────────────────
function TechnicalCapabilitiesSection() {
  const capabilities = [
    {
      title: "Frontend Engineering",
      description: "Building responsive, accessible interfaces with React, Next.js, and Tailwind CSS.",
      icon: "🖥️",
      items: ["React & Next.js", "TypeScript", "Tailwind CSS", "Server-side rendering"],
    },
    {
      title: "Backend Engineering",
      description: "Laravel and Node.js backends with clean architecture, testable code, and maintainable structure.",
      icon: "⚙️",
      items: ["Laravel (PHP)", "Node.js & Express", "REST API design", "Middleware & validation"],
    },
    {
      title: "Database Architecture",
      description: "Relational database design with proper normalization, indexing, and integrity constraints.",
      icon: "🗄️",
      items: ["MySQL schema design", "Eloquent ORM", "Query optimization", "Data integrity"],
    },
    {
      title: "Auth & Authorization",
      description: "Secure authentication flows and role-based access control for multi-role applications.",
      icon: "🔐",
      items: ["JWT authentication", "OTP flows", "RBAC systems", "Multi-tenant isolation"],
    },
    {
      title: "API Development",
      description: "RESTful API contracts designed for reliability — consumed by web, mobile, and third-party clients.",
      icon: "🔌",
      items: ["REST API design", "Request validation", "Error handling", "API documentation"],
    },
    {
      title: "Production Deployment",
      description: "Taking applications from development to production with proper hosting, DNS, and SSL.",
      icon: "🚀",
      items: ["Vercel / cPanel", "Cloudflare DNS & CDN", "SSL configuration", "Environment setup"],
    },
  ];

  return (
    <section className="section bg-transparent" aria-labelledby="capabilities-heading">
      <div className="container">
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="section-label">Technical Capabilities</span>
          <h2 id="capabilities-heading" className="section-title">
            End-to-End Development
          </h2>
          <p className="section-subtitle">
            Real capability demonstrated through production software — not
            proficiency percentages or skill meters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap) => (
            <div key={cap.title} className="card group">
              <div className="text-3xl mb-3" aria-hidden="true">{cap.icon}</div>
              <h3 className="text-base font-bold text-[#F8FAFC] mb-2 group-hover:text-[#3B82F6] transition-colors">
                {cap.title}
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">{cap.description}</p>
              <ul className="space-y-1.5">
                {cap.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <span className="w-1 h-1 rounded-full bg-[#3B82F6] shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Philosophy ────────────────────────────────────
function PhilosophySection() {
  return (
    <section
      className="py-12 sm:py-16 bg-[#111827]/50 backdrop-blur-sm border-y border-[#334155]/60 relative overflow-hidden"
      aria-labelledby="philosophy-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="container relative max-w-4xl mx-auto text-center space-y-4">
        <span className="section-label">My Approach</span>
        <blockquote>
          <h2
            id="philosophy-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;A project isn&apos;t about showcasing complex code;
            it&apos;s about{" "}
            <span className="gradient-text">solving real-world problems.</span>&rdquo;
          </h2>
        </blockquote>
      </div>
    </section>
  );
}

// ─── Section 9: Software Architecture ────────────────────────
function ArchitectureSection() {
  const concepts = [
    {
      title: "Multi-tenant Systems",
      description: "Architecture that serves multiple organizations from one codebase — with strict data isolation per tenant through scoped database queries and middleware.",
      icon: "🏢",
    },
    {
      title: "Role-based Access Control",
      description: "Permission systems where users have roles (admin, staff, customer) and each role controls exactly what data they can read, create, update, or delete.",
      icon: "🔐",
    },
    {
      title: "API Contracts",
      description: "Clearly defined request/response formats that both the frontend and external clients rely on — versioned, validated, and documented.",
      icon: "📋",
    },
    {
      title: "Database Integrity",
      description: "Foreign keys, unique constraints, transactions, and validation at the database level — not just in application code.",
      icon: "🗄️",
    },
  ];

  return (
    <section className="section bg-[#111827]/50 backdrop-blur-sm border-y border-[#334155]/60" aria-labelledby="architecture-heading">
      <div className="container">
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="section-label">Software Architecture</span>
          <h2 id="architecture-heading" className="section-title">
            Built to Last
          </h2>
          <p className="section-subtitle">
            Technical concepts explained for decision-makers — not just developers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {concepts.map((concept) => (
            <div key={concept.title} className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#3B82F6]/40 transition-colors">
              <div className="text-3xl mb-3" aria-hidden="true">{concept.icon}</div>
              <h3 className="text-base font-bold text-[#F8FAFC] mb-2">{concept.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{concept.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/projects" className="btn-secondary">
            See These in Practice
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 11: Teaching & Knowledge Sharing ─────────────────
function TeachingSection() {
  return (
    <section className="section bg-[#111827]/50 backdrop-blur-sm border-y border-[#334155]/60" aria-labelledby="teaching-heading">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="section-label">Knowledge Sharing</span>
            <h2 id="teaching-heading" className="section-title">
              Teaching & Instruction
            </h2>
            <p className="text-[#94A3B8] leading-relaxed">
              Alongside production development work, I engage in programming
              instruction — covering fundamentals, Laravel, Node.js, and practical
              application development. Teaching reinforces understanding; you
              don&apos;t fully know a concept until you can explain it clearly.
            </p>

            <div className="space-y-3">
              {["Programming fundamentals", "Laravel framework", "Node.js", "Application architecture", "Database design"].map(
                (topic) => (
                  <div key={topic} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#94A3B8]">{topic}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-[#1E293B] rounded-2xl border border-[#334155] p-8 space-y-4">
            <div className="font-mono text-sm space-y-3">
              <div className="text-[#94A3B8]">
                <span className="text-[#3B82F6]">{"//"}</span> Understanding comes from doing
              </div>
              <div className="text-[#94A3B8]">
                <span className="text-[#3B82F6]">{"//"}</span> and teaching comes from understanding
              </div>
              <div className="pt-4 space-y-2">
                <div className="text-[#3B82F6]">function teach(concept) {"{"}</div>
                <div className="pl-4 text-[#94A3B8]">
                  explain(concept); <span className="text-[#3B82F6]">{"// clearly"}</span>
                </div>
                <div className="pl-4 text-[#94A3B8]">
                  demonstrate(concept); <span className="text-[#3B82F6]">{"// practically"}</span>
                </div>
                <div className="pl-4 text-[#94A3B8]">
                  practice(concept); <span className="text-[#3B82F6]">{"// repeatedly"}</span>
                </div>
                <div className="text-[#3B82F6]">{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 12: Technology Stack ────────────────────────────
function TechStackSection() {
  return (
    <section className="section bg-transparent" aria-labelledby="stack-heading">
      <div className="container">
        <div className="max-w-2xl mb-12 space-y-3 mx-auto text-center">
          <span className="section-label">Technology Stack</span>
          <h2 id="stack-heading" className="section-title">
            Tools I Work With
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Organized by category — the technologies I use in production software.
          </p>
        </div>

        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div key={category.id}>
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
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/skills" className="btn-secondary">
            View All Skills
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 13: Problem Solving ─────────────────────────────
function ProblemSolvingSection() {
  return (
    <section className="section bg-[#111827]/50 backdrop-blur-sm border-y border-[#334155]/60" aria-labelledby="problem-heading">
      <div className="container">
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="section-label">Case Study</span>
          <h2 id="problem-heading" className="section-title">
            A Real Problem, Solved
          </h2>
          <p className="section-subtitle">
            LinkToGovernment: from a real frustration to a production application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "❓",
              title: "The Problem",
              content:
                "Nepal has hundreds of official government websites. Finding the right URL for a specific ministry, municipality, or citizen service was frustrating — unofficial aggregators were outdated and often linked to wrong URLs.",
            },
            {
              icon: "🔧",
              title: "Technical Approach",
              content:
                "A Laravel backend with a MySQL database organized by category (ministries, services, local governments). A bilingual search system supporting both English and Nepali queries. URL verification tracking to flag outdated links.",
            },
            {
              icon: "✅",
              title: "The Result",
              content:
                "A production-deployed, publicly accessible directory covering federal ministries, all seven provincial portals, citizen services, and government contacts — used by citizens who need reliable access to Nepal's official online presence.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
              <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
              <h3 className="text-base font-bold text-[#F8FAFC] mb-3">{item.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/projects/linktogovernment" className="btn-primary">
            Full Case Study
          </Link>
          <Link href="/projects" className="btn-secondary">
            All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 14: Services ─────────────────────────────────────
function ServicesSection() {
  const activeServices = services.filter((s) => s.active).slice(0, 6);

  return (
    <section className="section bg-transparent" aria-labelledby="services-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="section-label">Freelance Services</span>
            <h2 id="services-heading" className="section-title">
              Available for Hire
            </h2>
          </div>
          <Link href="/services" className="btn-secondary text-sm shrink-0">
            All Services
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {activeServices.map((service) => (
            <div key={service.id} className="card group">
              <div className="text-3xl mb-3" aria-hidden="true">{service.icon}</div>
              <h3 className="text-base font-bold text-[#F8FAFC] mb-2 group-hover:text-[#3B82F6] transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">{service.problem}</p>
              <div className="flex flex-wrap gap-1.5">
                {service.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="tag text-xs">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/contact" className="btn-primary">
            Discuss a Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 15: GitHub ───────────────────────────────────────
function GitHubSection() {
  return (
    <section className="section bg-[#111827]/50 backdrop-blur-sm border-y border-[#334155]/60" aria-labelledby="github-heading">
      <div className="container max-w-3xl mx-auto text-center space-y-6">
        <span className="section-label">Open Source</span>
        <h2 id="github-heading" className="section-title">
          GitHub Profile
        </h2>
        <p className="section-subtitle mx-auto text-center">
          Most of my work is in private repositories — client projects, business
          systems, and SaaS applications. My public GitHub shows personal projects
          and contributions.
        </p>

        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#1E293B] border border-[#334155] text-[#F8FAFC] hover:border-[#3B82F6]/50 hover:bg-[#1c2c4c] transition-all group"
          aria-label="View GitHub profile for manojneupaneweb"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <div className="text-left">
            <div className="font-semibold">@manojneupaneweb</div>
            <div className="text-sm text-[#94A3B8]">github.com/manojneupaneweb</div>
          </div>
          <svg className="w-4 h-4 text-[#94A3B8] ml-auto group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </section>
  );
}

// ─── Section 16: Education ────────────────────────────────────
function EducationSection() {
  return (
    <section className="section bg-transparent" aria-labelledby="education-heading">
      <div className="container max-w-3xl mx-auto">
        <div className="space-y-3 mb-12">
          <span className="section-label">Education</span>
          <h2 id="education-heading" className="section-title">
            Education & Certifications
          </h2>
          <p className="section-subtitle">
            Education details are currently being verified for accuracy.
            Confirmed information will be published here.
          </p>
        </div>

        <div className="card border-dashed text-center py-12">
          <div className="text-4xl mb-4" aria-hidden="true">🎓</div>
          <h3 className="text-base font-semibold text-[#F8FAFC] mb-2">
            Education Details Coming Soon
          </h3>
          <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
            Verified education and certification information will be published here.
            Contact me directly for a complete professional profile.
          </p>
          <div className="mt-6">
            <Link href="/education" className="btn-secondary text-sm">
              View Education Page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 17: Blog ─────────────────────────────────────────
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
    <section className="section bg-[#111827]/50 backdrop-blur-sm border-y border-[#334155]/60" aria-labelledby="blog-heading">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="section-label">Nepali Developer Guide</span>
            <h2 id="blog-heading" className="section-title">
              Featured Tutorials & Insights
            </h2>
            <p className="section-subtitle">
              Real solutions to real problems developers face in Nepal. Free guides with working code.
            </p>
          </div>
          <Link href="/blog" className="btn-secondary text-sm shrink-0">
            View All 18 Guides
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="group card flex flex-col justify-between hover:border-[#3B82F6]/50 hover:shadow-xl hover:shadow-[#3B82F6]/5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="tag text-xs font-mono">{item.category}</span>
                  <span className="text-xs text-[#94A3B8]">⏱️ {item.readingTime}</span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors mb-2 leading-snug">
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
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 18: Contact ──────────────────────────────────────
function ContactSection() {
  return (
    <section
      className="section bg-transparent relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="container relative max-w-3xl mx-auto text-center space-y-8">
        <span className="section-label">Get in Touch</span>
        <h2 id="contact-heading" className="section-title">
          Have an Idea?
          <br />
          <span className="gradient-text">Let&apos;s Build It.</span>
        </h2>
        <p className="section-subtitle mx-auto text-center">
          Tell me about the product, website, or system you want to build.
          Let&apos;s discuss the problem, the requirements, and a practical
          approach to delivering it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          <Link
            href="/contact"
            className="card text-center hover:border-[#3B82F6]/50 group"
          >
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div className="text-sm font-medium text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors mb-1">
              View GitHub
            </div>
            <div className="text-xs text-[#94A3B8] font-mono">@manojneupaneweb</div>
          </a>
        </div>

        <Link href="/contact" className="btn-primary mx-auto">
          Start a Project Inquiry
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

// ─── Page Assembly ────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <IntroSection />
      <ExperienceSection />
      <SelectedWorkSection />
      <WhatIBuildSection />
      <FeaturedProductSection />
      <TechnicalCapabilitiesSection />
      <ArchitectureSection />
      <TeachingSection />
      <TechStackSection />
      <ProblemSolvingSection />
      <ServicesSection />
      <GitHubSection />
      <EducationSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
