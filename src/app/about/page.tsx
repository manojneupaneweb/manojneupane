import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Manoj Neupane — Full Stack Software Engineer & Instructor",
  description:
    "Learn about Manoj Neupane — Full Stack Software Engineer, Programming Instructor at Softworica, and AI Enthusiast from Nepal. Journey, projects, engineering philosophy, and technical toolkit.",
  path: "/about",
});

export default function AboutPage() {
  const philosophies = [
    {
      title: "Architecture First",
      description:
        "I believe a good system begins with understanding the problem and designing an appropriate structure before implementation. Good architectural decisions help reduce complexity and make future changes easier.",
      icon: "📐",
    },
    {
      title: "Data Models Matter",
      description:
        "A database is more than a place to store information. Its relationships, constraints, and structure influence how an entire application behaves. I prioritize data integrity and thoughtful schema design.",
      icon: "🗄️",
    },
    {
      title: "Security by Default",
      description:
        "Authentication, authorization, validation, and access control should be part of the original design, not emergency additions after vulnerabilities appear.",
      icon: "🔐",
    },
    {
      title: "Clarity Over Cleverness",
      description:
        "I prefer code that communicates its purpose clearly. Readable, maintainable software is easier to debug, test, extend, and collaborate on.",
      icon: "💡",
    },
    {
      title: "Production Is Part of Development",
      description:
        "An application is not complete simply because it works locally. Deployment, configuration, security, reliability, and ongoing maintenance are all part of delivering usable software.",
      icon: "🚢",
    },
    {
      title: "Fundamentals Over Framework Dependency",
      description:
        "Frameworks evolve, tools change, and new technologies appear. Strong fundamentals make it possible to understand new systems, make better decisions, and solve problems beyond the boundaries of a particular framework.",
      icon: "🧱",
    },
  ];

  const toolkit = [
    {
      category: "Frontend Development",
      skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
      accent: "#3B82F6",
    },
    {
      category: "Backend Development",
      skills: ["Laravel", "PHP", "Node.js", "Express.js"],
      accent: "#22D3EE",
    },
    {
      category: "Databases",
      skills: ["MySQL", "MongoDB", "SQLite"],
      accent: "#10B981",
    },
    {
      category: "Architecture & Security",
      skills: ["REST APIs", "JWT", "OTP Authentication", "RBAC", "Multi-tenant Architecture", "Relational Database Design"],
      accent: "#F59E0B",
    },
    {
      category: "Tools & Deployment",
      skills: ["Git", "GitHub", "Vercel", "cPanel", "Cloudflare", "Vite"],
      accent: "#8B5CF6",
    },
    {
      category: "Exploring",
      skills: ["AI Agents", "AI Model Integration", "Voice Interfaces", "Automation", "IoT Systems"],
      accent: "#EC4899",
    },
  ];

  return (
    <main className="min-h-screen text-[#F8FAFC]">
      {/* ─── Hero Section ────────────────────────────────────── */}
      <section aria-labelledby="about-heading" className="border-b border-[#334155]/80 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#111827]/60 via-[#0B1120] to-[#0B1120]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center md:items-start">
            {/* Portrait Frame */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl p-1 bg-gradient-to-br from-[#3B82F6] via-[#334155] to-[#22D3EE] shadow-2xl shadow-[#3B82F6]/20">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#111827]">
                  <Image
                    src={siteConfig.profileImage}
                    alt={`Portrait of ${siteConfig.name}`}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    priority
                    sizes="(max-width: 640px) 192px, 224px"
                  />
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#111827] border border-[#334155] text-[#22D3EE]">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                Available for Projects
              </div>
            </div>

            {/* Main Title & Bio */}
            <div className="text-center md:text-left space-y-4 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6] uppercase tracking-wider">
                Full Profile & Engineering Story
              </div>
              <h1
                id="about-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Manoj Neupane
              </h1>
              <p className="text-base sm:text-lg font-medium text-[#22D3EE]">
                Full Stack Software Engineer &middot; Programming Instructor &middot; AI Enthusiast
              </p>
              <p className="text-sm text-[#94A3B8]">
                Based in {siteConfig.country} &middot; Available for freelance and remote opportunities
              </p>

              <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                <Link href="/contact" className="btn-primary !text-sm !py-2.5 !px-5">
                  Let&apos;s Build Together →
                </Link>
                <Link href="/projects" className="btn-secondary !text-sm !py-2.5 !px-5">
                  Explore Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Story Section: From Curiosity to Engineering ────── */}
      <section aria-labelledby="story-heading" className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#334155]/60 bg-[#0B1120]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="section-label">Background Story</span>
            <h2 id="story-heading" className="section-title mt-2">
              From Curiosity to Engineering Real-World Software
            </h2>
          </div>

          <div className="space-y-5 text-[#94A3B8] text-base leading-relaxed">
            <p>
              My journey into technology began in <span className="text-[#F8FAFC] font-semibold">2019 with a 2GB RAM laptop</span>, a few lines of HTML and CSS, and a curiosity about how websites actually work.
            </p>
            <p>
              I didn&apos;t begin with powerful hardware or a complete roadmap. I started by experimenting, making mistakes, and gradually discovering that web development was more than creating pages — it was a way to turn ideas into working solutions.
            </p>
            <p>
              In <span className="text-[#F8FAFC] font-medium">February 2022</span>, I completed my Full Stack Development training at <span className="text-[#F8FAFC]">DIT Solution, Kathmandu</span>. I then continued my academic journey with a <span className="text-[#F8FAFC] font-medium">Bachelor&apos;s degree in Information Technology</span>, building on my practical experience with a deeper understanding of computing and software systems.
            </p>
            <p>
              As my skills developed, so did my interests. I moved from building simple web pages to engineering full-stack applications, REST APIs, SaaS platforms, and business systems. Over <span className="text-[#22D3EE] font-medium">3+ years of professional web development experience</span>, I&apos;ve worked across the development lifecycle, from database design and backend logic to frontend implementation and production deployment.
            </p>
            <p>
              Today, I work at <span className="text-[#F8FAFC] font-semibold">Softworica</span>, where I develop software and teach programming. Outside professional work, I explore AI agents, experiment with emerging technologies, and build personal projects driven by curiosity.
            </p>
          </div>

          {/* Highlight Quote */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#111827] to-[#1E293B] border border-[#3B82F6]/30 shadow-lg">
            <p className="text-base sm:text-lg font-medium text-[#F8FAFC] leading-relaxed italic">
              &ldquo;I don&apos;t just want to know how to use technology. I want to understand how it works, why it works, and how to build something meaningful with it.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ─── What I Do ───────────────────────────────────────── */}
      <section aria-labelledby="what-heading" className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#334155]/60 bg-[#111827]/40">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <span className="section-label">Core Roles</span>
            <h2 id="what-heading" className="section-title mt-2">
              What I Do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="card bg-[#0B1120] border border-[#334155] p-6 flex flex-col justify-between hover:border-[#3B82F6]/50 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-2xl">
                  ⚙️
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC]">Full Stack Software Engineering</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  I design and develop web applications, SaaS platforms, REST APIs, and business systems that solve practical problems. My primary technologies include Laravel, PHP, Node.js, React, Next.js, and MySQL.
                </p>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  I care about clean architecture, thoughtful database design, secure authentication, maintainable code, and reliable production systems. My goal is to build software that works today and remains adaptable as requirements evolve.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card bg-[#0B1120] border border-[#334155] p-6 flex flex-col justify-between hover:border-[#22D3EE]/50 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center text-2xl">
                  👨‍🏫
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC]">Programming Instruction & Mentorship</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  At Softworica, I combine professional development with teaching programming, including MERN Stack and Laravel.
                </p>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Explaining a concept to another developer requires more than memorizing syntax — it requires understanding the fundamentals, recognizing why something works, and communicating the reasoning clearly.
                </p>
                <p className="text-xs font-mono text-[#22D3EE] pt-2 border-t border-[#334155]">
                  &ldquo;I&apos;m not just a developer who writes code; I&apos;m also an instructor who helps others understand the thinking behind it.&rdquo;
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card bg-[#0B1120] border border-[#334155] p-6 flex flex-col justify-between hover:border-[#8B5CF6]/50 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center text-2xl">
                  🔬
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC]">Research & Technical Exploration</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  I&apos;m naturally curious about the systems behind the tools I use. I enjoy researching frameworks, exploring architecture, understanding how applications communicate, and investigating technical decisions.
                </p>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  My interests extend beyond web development into artificial intelligence, automation, and the Internet of Things (IoT) — connecting theoretical concepts with practical engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Selected Projects & Inventions ──────────────────── */}
      <section aria-labelledby="projects-heading" className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#334155]/60 bg-[#111827]/40">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <span className="section-label">Showcase & Inventions</span>
            <h2 id="projects-heading" className="section-title mt-2">
              Selected Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project 1 */}
            <div className="card bg-[#0B1120] border border-[#334155] p-6 space-y-4 hover:border-[#3B82F6]/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30">
                  Public Civic Tech
                </span>
                <span className="text-2xl">🇳🇵</span>
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC]">LinkToGovernment</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                A bilingual directory designed to help people discover Nepal&apos;s official government websites in one place. Reflects my interest in building useful public-facing software that makes digital resources more accessible.
              </p>
              <div className="pt-2 border-t border-[#334155] text-xs font-mono text-[#94A3B8]">
                <strong className="text-[#F8FAFC]">Focus:</strong> Web development, information architecture, search, and user experience.
              </div>
              <div className="pt-2">
                <Link href="/projects/linktogovernment" className="text-xs font-semibold text-[#3B82F6] hover:text-[#22D3EE] inline-flex items-center gap-1">
                  View Project Case Study →
                </Link>
              </div>
            </div>

            {/* Project 2 */}
            <div className="card bg-[#0B1120] border border-[#334155] p-6 space-y-4 hover:border-[#22D3EE]/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30">
                  Production Systems
                </span>
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC]">SaaS Platforms & Business Applications</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                At Softworica, I work on web applications, SaaS platforms, and business systems built around real operational workflows. Involves backend development, relational data modeling, REST API design, authentication, authorization, and production delivery.
              </p>
              <div className="pt-2 border-t border-[#334155] text-xs font-mono text-[#94A3B8]">
                <strong className="text-[#F8FAFC]">Focus:</strong> Laravel, Node.js, MySQL, secure access control, and maintainable architecture.
              </div>
            </div>

            {/* Project 3: AI Assistant */}
            <div className="card bg-[#0B1120] border border-[#8B5CF6]/40 p-6 space-y-4 hover:border-[#8B5CF6] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#8B5CF6]/15 text-[#C084FC] border border-[#8B5CF6]/30">
                  AI Research & Engineering
                </span>
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC]">Personal AI Assistant — Inspired by J.A.R.V.I.S.</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                One of my personal interests is building my own AI assistant inspired by J.A.R.V.I.S. from Iron Man. Rather than building only a conversational chatbot, I want to explore how an AI agent accepts voice input, understands requests, decides which tools to invoke, executes actions, maintains context, and automates real workflows.
              </p>
              <p className="text-xs text-[#94A3B8] italic">
                *Personal research and development project.*
              </p>
              <div className="pt-2 border-t border-[#334155] text-xs font-mono text-[#94A3B8]">
                <strong className="text-[#F8FAFC]">Focus:</strong> AI agents, voice interaction, tool calling, memory, automation, and system design.
              </div>
            </div>

            {/* Project 4: IoT */}
            <div className="card bg-[#0B1120] border border-[#334155] p-6 space-y-4 hover:border-[#10B981]/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/30">
                  Hardware & Systems
                </span>
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC]">Academic IoT Projects</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                During my academic journey, I explored projects involving the Internet of Things, investigating how software, hardware, and connected devices can work together. These experiments broadened my perspective beyond conventional web applications into the physical world.
              </p>
              <div className="pt-2 border-t border-[#334155] text-xs font-mono text-[#94A3B8]">
                <strong className="text-[#F8FAFC]">Focus:</strong> IoT, system integration, practical experimentation, and applied technology.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Engineering Philosophy ──────────────────────────── */}
      <section aria-labelledby="philosophy-heading" className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#334155]/60 bg-[#0B1120]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <span className="section-label">Core Principles</span>
            <h2 id="philosophy-heading" className="section-title mt-2">
              My Engineering Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {philosophies.map((p) => (
              <div key={p.title} className="card bg-[#111827] border border-[#334155] p-5 space-y-3 hover:border-[#3B82F6]/40 transition-colors">
                <span className="text-2xl" aria-hidden="true">{p.icon}</span>
                <h3 className="text-base font-bold text-[#F8FAFC]">{p.title}</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Technical Toolkit ───────────────────────────────── */}
      <section aria-labelledby="toolkit-heading" className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#334155]/60 bg-[#0B1120]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <span className="section-label">Stack & Tools</span>
            <h2 id="toolkit-heading" className="section-title mt-2">
              My Technical Toolkit
            </h2>
            <p className="section-subtitle mt-2">
              I choose technologies based on the problem, project requirements, maintainability, and long-term goals rather than assuming one framework is the right solution for everything.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolkit.map((group) => (
              <div key={group.category} className="card bg-[#111827] border border-[#334155] p-5 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8FAFC] font-mono border-b border-[#334155] pb-2">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-md bg-[#1E293B] border border-[#334155] text-[#F8FAFC] font-mono hover:border-[#3B82F6]/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Beyond Professional Development ─────────────────── */}
      <section aria-labelledby="beyond-heading" className="py-16 sm:py-20 px-4 sm:px-6 bg-[#111827]/40">
        <div className="max-w-4xl mx-auto space-y-6 text-center sm:text-left">
          <span className="section-label">Curiosity & Continuous Learning</span>
          <h2 id="beyond-heading" className="section-title">
            Beyond Professional Development
          </h2>
          <div className="space-y-4 text-[#94A3B8] text-base leading-relaxed">
            <p>
              Outside my regular development and teaching work, I enjoy researching how technology functions beneath the surface, experimenting with new ideas, and building personal tools.
            </p>
            <p>
              My personal AI assistant is one example of this curiosity. It gives me an opportunity to explore the intersection of AI, software engineering, and automation while learning beyond the boundaries of my day-to-day work.
            </p>
            <p>
              I also enjoy helping other developers understand difficult concepts and discovering better ways to explain technical ideas. For me, learning is not something that ends after a course, a degree, or a successful project.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B1120] border border-[#22D3EE]/30 shadow-lg mt-6">
            <p className="text-base sm:text-lg font-semibold text-[#22D3EE] text-center sm:text-left">
              &ldquo;There is always something new to understand, something better to build, and another problem worth solving.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
