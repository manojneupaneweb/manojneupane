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
    <main className="min-h-screen text-[#F8FAFC] ">
      {/* Header */}
      <section
        aria-labelledby="services-heading"
        className="border-b border-[#334155] py-20 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-3">
            Services
          </p>
          <h1
            id="services-heading"
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What I Build
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl mb-6">
            I work on specific types of projects where I can deliver real value. Each service
            below describes the problem it addresses, what I deliver, and the technologies involved.
          </p>

          {/* Important note */}
          <div className="bg-[#111827] border border-[#334155] rounded-xl p-5 max-w-2xl">
            <div className="flex gap-3">
              <span className="text-xl flex-shrink-0" aria-hidden="true">ℹ️</span>
              <div>
                <p className="text-[#F8FAFC] font-semibold text-sm mb-1">
                  No guaranteed deadlines before reviewing requirements
                </p>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  Timelines depend on scope, complexity, and current workload. I don&apos;t commit
                  to specific delivery dates until I understand the requirements fully. Use the
                  inquiry form below to start the conversation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section aria-labelledby="services-list-heading" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 id="services-list-heading" className="sr-only">
            Available Services
          </h2>
          <div className="space-y-8">
            {activeServices.map((service) => (
              <article
                key={service.id}
                aria-labelledby={`svc-${service.id}-heading`}
                className="bg-[#111827] border border-[#334155] rounded-2xl p-8 hover:border-[#3B82F6]/40 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left: icon + name + problem */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl" aria-hidden="true">{service.icon}</span>
                      <h3
                        id={`svc-${service.id}-heading`}
                        className="text-xl font-bold text-[#F8FAFC]"
                      >
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-[#94A3B8] leading-relaxed mb-5">{service.problem}</p>

                    {/* Technologies */}
                    <div>
                      <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full bg-[#1E293B] border border-[#334155] text-[#94A3B8]"
                          >
                            {tech}
                          </span>
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
                    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 mb-4">
                      <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
                        Deliverables
                      </p>
                      <ul className="space-y-2" role="list">
                        {service.deliverables.map((d) => (
                          <li key={d} className="flex gap-2 text-sm text-[#94A3B8]">
                            <span className="text-[#3B82F6] flex-shrink-0" aria-hidden="true">
                              ✓
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.name)}`}
                      className="block w-full text-center px-4 py-3 rounded-xl bg-[#3B82F6] text-white text-sm font-semibold hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
                    >
                      Inquire about this service
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry summary section */}
      <section
        aria-labelledby="inquiry-heading"
        className="border-t border-[#334155] py-16 px-6 bg-[#111827]"
      >
        <div className="max-w-3xl mx-auto">
          <h2
            id="inquiry-heading"
            className="text-2xl font-bold mb-4 text-[#F8FAFC] text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Project Inquiry
          </h2>
          <p className="text-[#94A3B8] text-center mb-8 leading-relaxed">
            Tell me briefly about your project so I can give you a meaningful response.
            I&apos;ll review your inquiry and get back to you within a few business days.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: "📋",
                title: "Describe the Problem",
                body: "What does your organization need? What workflow or gap is this solving?",
              },
              {
                icon: "⚙️",
                title: "Share Your Requirements",
                body: "Key features, integrations, user types, and any technical constraints.",
              },
              {
                icon: "📅",
                title: "Mention Your Timeline",
                body: "Give a rough idea — I'll be honest about whether it's achievable.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#0B1120] border border-[#334155] rounded-xl p-5 text-center"
              >
                <span className="text-2xl block mb-3" aria-hidden="true">{item.icon}</span>
                <h3 className="text-[#F8FAFC] font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-[#94A3B8] text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
            >
              Send an Inquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
