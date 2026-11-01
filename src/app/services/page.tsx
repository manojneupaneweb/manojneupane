import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, services } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Web Development Services",
  description:
    "Web development services by Manoj Neupane: custom web applications, Laravel backends, Next.js/React frontends, SaaS platforms, REST API development, database design, and production deployment.",
  path: "/services",
});

export default function ServicesPage() {
  const activeServices = services.filter((s) => s.active);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section
        aria-labelledby="services-heading"
        className="pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.08)] to-transparent" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)" }} />
        </div>
        <div className="container relative">
          <span className="section-label">Services</span>
          <h1 id="services-heading" className="section-title mt-4 mb-5">
            What I Build
          </h1>
          <p className="section-subtitle mb-6">
            I work on specific types of projects where I can deliver real value. Each service
            below describes the problem it addresses, what I deliver, and the technologies involved.
          </p>

          {/* Important note */}
          <ul className="mb-6 max-w-2xl space-y-2 text-sm text-[#4e5563]">
            <li>Fixed-price work when the MVP scope is written down.</li>
            <li>Hourly work for a smaller change or a review.</li>
            <li>A monthly retainer for ongoing product work.</li>
          </ul>
          <p className="mb-6 max-w-2xl text-sm text-[#4e5563]">
            I quote after I understand the requirements. I do not publish a rate card.
          </p>

          <div className="card border border-[rgba(34,211,238,0.12)] max-w-2xl">
            <div className="flex gap-3">
              <span className="text-xl flex-shrink-0" aria-hidden="true">ℹ️</span>
              <div>
                <p className="text-[#F1F5F9] font-semibold text-sm mb-1">
                  No guaranteed deadlines before reviewing requirements
                </p>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  Timelines depend on scope, complexity, and current workload. I don&apos;t commit
                  to specific delivery dates until I understand the requirements fully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section aria-labelledby="services-list-heading" className="py-16">
        <div className="container">
          <h2 id="services-list-heading" className="sr-only">Available Services</h2>
          <div className="space-y-6">
            {activeServices.map((service) => (
              <article
                key={service.id}
                aria-labelledby={`svc-${service.id}-heading`}
                className="card"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl" aria-hidden="true">{service.icon}</span>
                      <h3 id={`svc-${service.id}-heading`} className="text-xl font-bold text-[#F1F5F9]">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-[#94A3B8] leading-relaxed mb-5">{service.problem}</p>

                    {/* Technologies */}
                    <div>
                      <p className="text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-widest mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span key={tech} className="skill-pill text-xs">{tech}</span>
                        ))}
                      </div>
                    </div>

                    {service.example && (
                      <p className="text-sm text-[#94A3B8] mt-4">
                        <span className="text-[#22D3EE] font-medium">Example: </span>
                        {service.example}
                      </p>
                    )}
                  </div>

                  {/* Right: deliverables + CTA */}
                  <div className="md:w-64 flex-shrink-0">
                    <div className="rounded-xl p-5 mb-4 border border-[rgba(255,255,255,0.06)]"
                      style={{ background: "rgba(255,255,255,0.02)" }}>
                      <p className="text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">
                        Deliverables
                      </p>
                      <ul className="space-y-2" role="list">
                        {service.deliverables.map((d) => (
                          <li key={d} className="flex gap-2 text-sm text-[#94A3B8]">
                            <span className="text-[#22D3EE] flex-shrink-0" aria-hidden="true">✓</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.name)}`}
                      className="btn-primary w-full justify-center text-sm"
                    >
                      Inquire about this
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry summary */}
      <section
        aria-labelledby="inquiry-heading"
        className="border-t border-[rgba(34,211,238,0.08)] py-16"
        style={{ background: "rgba(255,255,255,0.01)" }}
      >
        <div className="container">
          <h2 id="inquiry-heading" className="text-2xl font-bold mb-4 text-[#F1F5F9] text-center">
            Project Inquiry
          </h2>
          <p className="text-[#94A3B8] text-center mb-10 leading-relaxed">
            Tell me briefly about your project so I can give you a meaningful response.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "📋", title: "Describe the Problem", body: "What does your organization need? What workflow or gap is this solving?" },
              { icon: "⚙️", title: "Share Your Requirements", body: "Key features, integrations, user types, and any technical constraints." },
              { icon: "📅", title: "Mention Your Timeline", body: "Give a rough idea. I'll say whether that schedule is realistic." },
            ].map((item) => (
              <div key={item.title} className="card text-center">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-[#F1F5F9] font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-[#94A3B8] text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact" className="btn-primary mx-auto">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
