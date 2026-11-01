import type { Metadata } from "next";
import Link from "next/link";
import { services, siteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Web Development Services",
  description:
    "Freelance services from Manoj Neupane: custom web apps, Laravel and API development, eSewa and Khalti payments, and production deployment.",
  path: "/services",
});

const icons: Record<string, JSX.Element> = {
  layout: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 19c0-7 3-11 8-13-2 5-6 8-13 8" />
      <path d="M9 15l-5 5M7 12l-4 1" />
    </svg>
  ),
};

const process = [
  { title: "Requirement review", body: "You describe the problem, the users, and what done looks like." },
  { title: "Scope and timeline", body: "I reply with a scope and a timeline only after that review." },
  { title: "Build", body: "I implement the agreed scope and show working software as it lands." },
  { title: "Handover", body: "You get the repo, the deploy, and notes on how to run it." },
];

export default function ServicesPage() {
  const activeServices = services.filter((service) => service.active);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: activeServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.problem,
        provider: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
        areaServed: "NP",
      },
    })),
  };

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section aria-labelledby="services-heading" className="pt-28 pb-10">
        <div className="container">
          <span className="section-label">Services</span>
          <h1 id="services-heading" className="section-title mt-4 mb-5">What I Build</h1>
          <p className="section-subtitle mb-8">
            Four offers. Database design, admin panels, and frontend work sit inside them when the project needs it.
          </p>
          <h2 className="text-sm font-semibold text-[#16181c] mb-3">How a project runs</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {process.map((step, index) => (
              <li key={step.title} className="card">
                <p className="font-mono text-[11px] text-[#0c6b74]">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-1 font-semibold text-sm text-[#16181c]">{step.title}</p>
                <p className="mt-1 text-xs text-[#4e5563]">{step.body}</p>
              </li>
            ))}
          </ol>
          <h2 className="text-sm font-semibold text-[#16181c] mb-3">Engagement models</h2>
          <ul className="max-w-2xl space-y-2 text-sm text-[#4e5563]">
            <li>Fixed-price MVP when the scope is written down.</li>
            <li>Hourly work for a smaller change or a review.</li>
            <li>A monthly retainer for ongoing product work.</li>
            {/* TODO: replace this line with real rates when you want them public. */}
            <li>Pricing: not published yet. I quote after the requirement review.</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="services-list-heading" className="pb-16">
        <div className="container space-y-6">
          <h2 id="services-list-heading" className="sr-only">Available services</h2>
          {activeServices.map((service) => (
            <article key={service.id} id={service.id} className="card">
              <div className="flex items-center gap-3 mb-3 text-[#0c6b74]">
                {icons[service.icon]}
                <h3 className="text-xl font-bold text-[#16181c]">{service.name}</h3>
              </div>
              <p className="text-sm text-[#4e5563] leading-relaxed mb-4">{service.problem}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {service.technologies.map((tech) => (
                  <span key={tech} className="skill-pill text-xs">{tech}</span>
                ))}
              </div>
              {service.proof && (
                <p className="text-sm mb-4">
                  <Link href={service.proof.href} className="text-[#0c6b74] underline underline-offset-2">
                    See {service.proof.label}
                  </Link>
                </p>
              )}
              <Link
                href={`/contact?service=${encodeURIComponent(service.name)}`}
                className="btn-primary text-sm"
              >
                Start a Project
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
