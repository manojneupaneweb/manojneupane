import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, skillCategories, experiences, developmentProcess } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Manoj Neupane",
  description:
    "Learn about Manoj Neupane — Full Stack Web Developer from Nepal working at Softworica. Biography, development philosophy, professional experience, and technical approach.",
  path: "/about",
});


export default function AboutPage() {
  return (
    <main className="min-h-screen text-[#F8FAFC] ">
      {/* Hero */}
      <section
        aria-labelledby="about-heading"
        className="border-b border-[#334155] py-20 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Profile image */}
            <div className="flex-shrink-0 flex flex-col items-center sm:items-start gap-3">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl p-1 bg-gradient-to-br from-[#3B82F6] via-[#334155] to-[#22D3EE] shadow-2xl shadow-[#3B82F6]/20">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#111827]">
                  <Image
                    src={siteConfig.profileImage}
                    alt={`Portrait of ${siteConfig.name}`}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    priority
                    sizes="(max-width: 640px) 176px, 208px"
                  />
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#111827] border border-[#334155] text-[#22D3EE]">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                Available for Projects
              </span>
            </div>

            {/* Identity block */}
            <div>
              <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-3">
                About
              </p>
              <h1
                id="about-heading"
                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {siteConfig.name}
              </h1>
              <p className="text-[#94A3B8] text-lg mb-2">{siteConfig.title}</p>
              <p className="text-[#94A3B8] text-sm">
                Based in {siteConfig.country} &middot; Available for remote projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section
        aria-labelledby="biography-heading"
        className="py-16 px-6 border-b border-[#334155]"
      >
        <div className="max-w-5xl mx-auto">
          <h2
            id="biography-heading"
            className="text-2xl font-bold mb-8 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Biography
          </h2>
          <div className="grid md:grid-cols-2 gap-10 text-[#94A3B8] leading-relaxed text-base space-y-0">
            <div className="space-y-5">
              <p>
                I&apos;m Manoj Neupane, a Full Stack Web Developer based in Nepal. I design
                and build web applications, SaaS platforms, REST APIs, and business
                systems — software that solves real problems for real users.
              </p>
              <p>
                My primary stack centers on Laravel for backend systems and Next.js with
                React for frontend interfaces, with MySQL as the backbone for structured
                data. I&apos;ve worked across the full delivery lifecycle — from database
                modeling and API architecture through frontend implementation, authentication,
                and production deployment.
              </p>
            </div>
            <div className="space-y-5">
              <p>
                I work at Softworica, a software company where I develop web applications
                and SaaS platforms and provide programming instruction in Laravel and
                Node.js. Outside of client work, I build independent projects — most
                notably{" "}
                <a
                  href="https://linktogovernment.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                >
                  LinkToGovernment
                </a>
                , a verified bilingual directory of Nepal&apos;s official government websites.
              </p>
              <p>
                I believe that software should be designed before it is written, that data
                models determine outcomes, and that reliability matters more than feature
                count. I prefer to understand problems thoroughly before proposing solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section
        aria-labelledby="philosophy-heading"
        className="py-16 px-6 border-b border-[#334155] bg-[#111827]"
      >
        <div className="max-w-5xl mx-auto">
          <h2
            id="philosophy-heading"
            className="text-2xl font-bold mb-4 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Full-Stack Philosophy
          </h2>
          <p className="text-[#94A3B8] mb-10 max-w-2xl">
            Building across the full stack means owning the consequences of every decision —
            from schema design to UI behavior. These are the principles I work by.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🏗️",
                title: "Architecture First",
                body: "System structure is decided before implementation begins. Discovering the architecture during debugging is expensive.",
              },
              {
                icon: "🗄️",
                title: "Data Models Matter",
                body: "A well-designed schema enables the features you need later. A poor one limits them permanently.",
              },
              {
                icon: "🔐",
                title: "Security by Default",
                body: "Authentication, authorization, and input validation are not afterthoughts — they are designed into the system from the start.",
              },
              {
                icon: "📋",
                title: "Clarity Over Cleverness",
                body: "Code that is easy to read, trace, and maintain is more valuable than code that is impressive to write.",
              },
              {
                icon: "🚀",
                title: "Production Mindset",
                body: "Software that doesn't run reliably in production is not finished software. Deployment is part of the work.",
              },
              {
                icon: "🔄",
                title: "Iterative Improvement",
                body: "Good software evolves. The first version should be solid, not perfect — perfection comes through real usage feedback.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#0B1120] border border-[#334155] rounded-xl p-6"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-[#F8FAFC] font-semibold mb-2">{item.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience at Softworica */}
      <section
        aria-labelledby="work-heading"
        className="py-16 px-6 border-b border-[#334155]"
      >
        <div className="max-w-5xl mx-auto">
          <h2
            id="work-heading"
            className="text-2xl font-bold mb-10 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Professional Work
          </h2>
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#111827] border border-[#334155] rounded-2xl p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-[#F8FAFC]">{exp.role}</h3>
                    {exp.current && (
                      <span className="px-2 py-0.5 text-xs bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {exp.organizationUrl ? (
                      <a
                        href={exp.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#22D3EE] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
                      >
                        {exp.organization}
                      </a>
                    ) : (
                      <span className="text-[#22D3EE] font-medium">{exp.organization}</span>
                    )}
                    <span className="text-[#94A3B8] text-sm">&middot; {exp.type}</span>
                  </div>
                </div>
                <span className="text-[#94A3B8] text-sm whitespace-nowrap">{exp.period}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
                    Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r) => (
                      <li key={r} className="flex gap-3 text-[#94A3B8] text-sm">
                        <span className="text-[#3B82F6] mt-0.5 flex-shrink-0">▸</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs rounded-full bg-[#1E293B] border border-[#334155] text-[#94A3B8]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Development Process */}
      <section
        aria-labelledby="process-heading"
        className="py-16 px-6 border-b border-[#334155] bg-[#111827]"
      >
        <div className="max-w-5xl mx-auto">
          <h2
            id="process-heading"
            className="text-2xl font-bold mb-4 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How I Work
          </h2>
          <p className="text-[#94A3B8] mb-10 max-w-2xl">
            My development process is deliberate. Each step exists because skipping it
            creates problems downstream.
          </p>
          <div className="space-y-0">
            {developmentProcess.map((step, idx) => (
              <div key={step.step} className="flex gap-6 group">
                {/* Connector */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6] font-bold text-sm flex-shrink-0">
                    {step.step}
                  </div>
                  {idx < developmentProcess.length - 1 && (
                    <div className="w-px flex-1 bg-[#334155] mt-2 mb-2" />
                  )}
                </div>
                {/* Content */}
                <div className={`pb-8 ${idx === developmentProcess.length - 1 ? "" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{step.icon}</span>
                    <h3 className="text-[#F8FAFC] font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section
        aria-labelledby="skills-overview-heading"
        className="py-16 px-6 border-b border-[#334155]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2
                id="skills-overview-heading"
                className="text-2xl font-bold text-[#F8FAFC]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Selected Skills
              </h2>
              <p className="text-[#94A3B8] mt-2">
                Technologies I use regularly in production work.
              </p>
            </div>
            <Link
              href="/skills"
              className="text-sm text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
            >
              View all skills →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#111827] border border-[#334155] rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className="text-[#F8FAFC] font-semibold">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 text-xs rounded-full bg-[#1E293B] border border-[#334155] text-[#94A3B8]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        aria-labelledby="about-cta-heading"
        className="py-20 px-6"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="about-cta-heading"
            className="text-3xl font-bold mb-4 text-[#F8FAFC]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Work Together
          </h2>
          <p className="text-[#94A3B8] mb-8 text-lg">
            If you have a project that needs a full-stack developer who thinks carefully
            before building, I&apos;d like to hear about it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
            >
              Start a Conversation
            </Link>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-[#334155] text-[#94A3B8] font-semibold hover:text-[#F8FAFC] hover:border-[#3B82F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
