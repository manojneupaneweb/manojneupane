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
    { title: "Architecture First", description: "I believe a good system begins with understanding the problem and designing an appropriate structure before implementation.", icon: "📐" },
    { title: "Data Models Matter", description: "A database is more than a place to store information. Its relationships, constraints, and structure influence how an entire application behaves.", icon: "🗄️" },
    { title: "Security by Default", description: "Authentication, authorization, validation, and access control should be part of the original design, not emergency additions after vulnerabilities appear.", icon: "🔐" },
    { title: "Clarity Over Cleverness", description: "I prefer code that communicates its purpose clearly. Readable, maintainable software is easier to debug, test, extend, and collaborate on.", icon: "💡" },
    { title: "Production Is Part of Development", description: "An application is not complete simply because it works locally. Deployment, configuration, security, reliability, and ongoing maintenance are all part of delivering usable software.", icon: "🚢" },
    { title: "Fundamentals Over Framework Dependency", description: "Frameworks evolve, tools change, and new technologies appear. Strong fundamentals make it possible to understand new systems and solve problems beyond any particular framework.", icon: "🧱" },
  ];

  return (
    <main className="min-h-screen">
      {/* ─── Hero Section ──────────────────────────────── */}
      <section aria-labelledby="about-heading" className="pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.08)] to-transparent" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)" }} />
        </div>
        <div className="container relative">
          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center md:items-start">
            {/* Portrait */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl opacity-30 blur-xl"
                  style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.4), rgba(59,130,246,0.3))" }} />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-[rgba(34,211,238,0.2)]">
                  <Image
                    src={siteConfig.profileImage}
                    alt={`Portrait of ${siteConfig.name}`}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="224px"
                  />
                </div>
              </div>
              <p className="text-xs text-[#94A3B8] font-mono">Available for freelance</p>
            </div>

            {/* Title & bio */}
            <div className="text-center md:text-left space-y-4 flex-1">
              <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-widest">Full profile and engineering story</p>
              <h1 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
                Manoj Neupane
              </h1>
              <p className="text-base sm:text-lg font-medium gradient-text-2">
                Full Stack Software Engineer · Programming Instructor · AI Enthusiast
              </p>
              <p className="text-sm text-[#94A3B8]">
                Based in {siteConfig.country} · Available for freelance
              </p>
              <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                <Link href="/contact" className="btn-primary !text-sm !py-2.5 !px-5">
                  Start a project
                </Link>
                <Link href="/projects" className="btn-secondary !text-sm !py-2.5 !px-5">
                  Explore Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Story Section ──────────────────────────────── */}
      <section aria-labelledby="story-heading" className="py-16 sm:py-20 border-t border-[rgba(34,211,238,0.06)]">
        <div className="container space-y-8">
          <div>
            <span className="section-label">Background Story</span>
            <h2 id="story-heading" className="section-title mt-4">
              From Curiosity to Engineering Real-World Software
            </h2>
          </div>
          <div className="space-y-5 text-[#94A3B8] text-base leading-relaxed">
            <p>
              My journey into technology began in{" "}
              <span className="text-[#F1F5F9] font-semibold">2019 with a 2GB RAM laptop</span>,
              a few lines of HTML and CSS, and a curiosity about how websites actually work.
            </p>
            <p>
              I didn&apos;t begin with powerful hardware or a complete roadmap. I started by experimenting,
              making mistakes, and gradually discovering that web development was more than creating pages —
              it was a way to turn ideas into working solutions.
            </p>
            <p>
              In <span className="text-[#F1F5F9] font-medium">February 2022</span>, I completed my Full Stack Development
              training at <span className="text-[#F1F5F9]">DIT Solution, Kathmandu</span>. I then continued with a{" "}
              <span className="text-[#F1F5F9] font-medium">Bachelor&apos;s degree in Information Technology</span>,
              building on my practical experience with a deeper understanding of computing and software systems.
            </p>
            <p>
              Over <span className="text-[#22D3EE] font-medium">2.5+ years of professional web development experience</span>,
              I&apos;ve worked across the full development lifecycle — from database design and backend logic to
              frontend implementation and production deployment.
            </p>
            <p>
              Today, I work at <span className="text-[#F1F5F9] font-semibold">Softworica</span>, where I develop
              software and teach programming.
            </p>
          </div>

          {/* Quote */}
          <div className="p-6 rounded-2xl border border-[rgba(34,211,238,0.15)]"
            style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.04), rgba(59,130,246,0.03))" }}>
            <p className="text-base sm:text-lg font-medium text-[#F1F5F9] leading-relaxed italic">
              &ldquo;I don&apos;t just want to know how to use technology. I want to understand how it works,
              why it works, and how to build something meaningful with it.&rdquo;
            </p>
          </div>

          <div className="space-y-5 text-[#94A3B8] text-base leading-relaxed">
            <p>
              I have a genuine passion for technology and a deep curiosity about how things work behind the scenes.
              This curiosity drives me to continuously explore new technologies, understand complex concepts, and learn quickly.
              I enjoy turning ideas into practical solutions, experimenting with different tools, and challenging myself with new technical problems.
              Beyond my professional work, I dedicate my free time to building a personal AI assistant inspired by J.A.R.V.I.S. from Iron Man,
              exploring artificial intelligence, automation, voice interaction, and intelligent systems.
              For me, technology is more than just a profession; it&apos;s a passion, a continuous learning journey, and an opportunity to create something meaningful.
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-[#F1F5F9] font-medium">Curiosity.</span>{" "}
                I genuinely enjoy understanding how technology works.
              </li>
              <li>
                <span className="text-[#F1F5F9] font-medium">Learning mindset.</span>{" "}
                I naturally explore and adapt to new technologies.
              </li>
              <li>
                <span className="text-[#F1F5F9] font-medium">Innovation.</span>{" "}
                I work on my own J.A.R.V.I.S.-inspired AI assistant beyond my professional responsibilities.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── What I Do ──────────────────────────────────── */}
      <section aria-labelledby="what-heading" className="py-16 sm:py-20 border-t border-[rgba(34,211,238,0.06)]">
        <div className="container space-y-12">
          <div>
            <span className="section-label">Core Roles</span>
            <h2 id="what-heading" className="section-title mt-4">What I Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚙️",
                title: "Full Stack Software Engineering",
                accentClass: "border-[rgba(34,211,238,0.15)]",
                body: [
                  "I design and develop web applications, SaaS platforms, REST APIs, and business systems that solve practical problems. My primary technologies include Laravel, PHP, Node.js, React, Next.js, and MySQL.",
                  "I care about clean architecture, thoughtful database design, secure authentication, maintainable code, and reliable production systems.",
                ],
              },
              {
                icon: "👨‍🏫",
                title: "Programming Instruction & Mentorship",
                accentClass: "border-[rgba(59,130,246,0.15)]",
                body: [
                  "At Softworica, I combine professional development with teaching programming, including MERN Stack and Laravel.",
                  "Explaining a concept requires more than memorizing syntax — it requires understanding the fundamentals, recognizing why something works, and communicating the reasoning clearly.",
                ],
                quote: "I&apos;m not just a developer who writes code; I&apos;m also an instructor who helps others understand the thinking behind it.",
              },
              {
                icon: "🔬",
                title: "Research & Technical Exploration",
                accentClass: "border-[rgba(168,85,247,0.15)]",
                body: [
                  "I&apos;m naturally curious about the systems behind the tools I use. I enjoy researching frameworks, exploring architecture, and investigating technical decisions.",
                  "My interests extend beyond web development into artificial intelligence, automation, and the Internet of Things (IoT).",
                ],
              },
            ].map((card) => (
              <div key={card.title} className={`card border ${card.accentClass} flex flex-col space-y-4`}>
                <div className="text-3xl">{card.icon}</div>
                <h3 className="text-lg font-bold text-[#F1F5F9]">{card.title}</h3>
                {card.body.map((p, i) => (
                  <p key={i} className="text-sm text-[#94A3B8] leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
                ))}
                {card.quote && (
                  <p className="text-xs font-mono text-[#22D3EE] pt-2 border-t border-[rgba(255,255,255,0.05)]">
                    &ldquo;<span dangerouslySetInnerHTML={{ __html: card.quote }} />&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Engineering Philosophy ───────────────────────── */}
      <section aria-labelledby="philosophy-heading" className="py-16 sm:py-20 border-t border-[rgba(34,211,238,0.06)]">
        <div className="container space-y-12">
          <div>
            <span className="section-label">Core Principles</span>
            <h2 id="philosophy-heading" className="section-title mt-4">My Engineering Philosophy</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {philosophies.map((p) => (
              <div key={p.title} className="card space-y-3">
                <div className="text-2xl">{p.icon}</div>
                <h3 className="text-base font-bold text-[#F1F5F9]">{p.title}</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Beyond Professional Development ─────────────── */}
      <section aria-labelledby="beyond-heading" className="py-16 sm:py-20 border-t border-[rgba(34,211,238,0.06)]">
        <div className="container space-y-6">
          <span className="section-label">Curiosity & Continuous Learning</span>
          <h2 id="beyond-heading" className="section-title mt-4">Beyond Professional Development</h2>
          <div className="space-y-4 text-[#94A3B8] text-base leading-relaxed">
            <p>Outside my regular development and teaching work, I enjoy researching how technology functions beneath the surface, experimenting with new ideas, and building personal tools.</p>
            <p>My personal AI assistant is one example of this curiosity. It gives me an opportunity to explore the intersection of AI, software engineering, and automation while learning beyond the boundaries of my day-to-day work.</p>
            <p>I also enjoy helping other developers understand difficult concepts and discovering better ways to explain technical ideas.</p>
          </div>
          <div className="p-6 rounded-2xl border border-[rgba(34,211,238,0.15)]"
            style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.04), rgba(59,130,246,0.03))" }}>
            <p className="text-base sm:text-lg font-semibold text-[#22D3EE]">
              &ldquo;There is always something new to understand, something better to build, and another problem worth solving.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
