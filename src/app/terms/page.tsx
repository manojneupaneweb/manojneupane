import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for manoj-neupane.com.np — the personal portfolio website of Manoj Neupane, Full Stack Web Developer from Nepal.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="min-h-screen text-[#F8FAFC] ">
      <section
        aria-labelledby="terms-heading"
        className="border-b border-[#334155] py-20 px-6"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-3">
            Legal
          </p>
          <h1
            id="terms-heading"
            className="text-4xl font-bold mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Terms of Use
          </h1>
          <p className="text-[#94A3B8]">Last updated: October 2026</p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-12 text-[#94A3B8] leading-relaxed">

        <section aria-labelledby="acceptance-heading">
          <h2
            id="acceptance-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Acceptance
          </h2>
          <p>
            By visiting{" "}
            <a
              href={siteConfig.url}
              className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
            >
              {siteConfig.url}
            </a>
            , you agree to these terms of use. If you do not agree, please do not use
            this website. This is a personal portfolio website operated by {siteConfig.name}.
          </p>
        </section>

        <section aria-labelledby="purpose-heading">
          <h2
            id="purpose-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Purpose of This Site
          </h2>
          <p>
            This website exists to present my professional work, skills, and background
            as a software developer. It contains project descriptions, technical articles,
            and a contact form for professional inquiries. It is not an e-commerce site,
            marketplace, or platform providing services to the general public.
          </p>
        </section>

        <section aria-labelledby="content-heading">
          <h2
            id="content-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Content Ownership
          </h2>
          <p className="mb-3">
            All written content, design, and code on this website are the intellectual
            property of {siteConfig.name} unless otherwise noted. You may:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "Read, share links to, and reference content for personal or professional purposes",
              "Quote brief excerpts with attribution",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-[#22D3EE] flex-shrink-0" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mb-3">You may not:</p>
          <ul className="space-y-2">
            {[
              "Reproduce or republish substantial portions of content without permission",
              "Use content for commercial purposes without prior written agreement",
              "Claim content as your own",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-[#94A3B8] flex-shrink-0" aria-hidden="true">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="contact-form-heading">
          <h2
            id="contact-form-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact Form
          </h2>
          <p>
            The contact form is provided for genuine professional inquiries only. By
            submitting a message, you confirm that the information you provide is accurate
            and that you are not using the form for spam, solicitation, or any unlawful
            purpose. I reserve the right to not respond to any message at my discretion.
          </p>
        </section>

        <section aria-labelledby="accuracy-heading">
          <h2
            id="accuracy-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Accuracy of Information
          </h2>
          <p>
            I make reasonable efforts to ensure the accuracy of information on this
            website. Project details, technical descriptions, and professional information
            are kept current to the best of my ability. However, I make no warranties
            regarding the completeness or accuracy of any content.
          </p>
        </section>

        <section aria-labelledby="external-links-heading">
          <h2
            id="external-links-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            External Links
          </h2>
          <p>
            This site contains links to external websites (GitHub, LinkedIn, live project
            URLs). These links are provided for reference only. I am not responsible for
            the content, availability, or accuracy of external websites.
          </p>
        </section>

        <section aria-labelledby="liability-heading">
          <h2
            id="liability-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Limitation of Liability
          </h2>
          <p>
            This portfolio website is provided &quot;as is&quot; without warranties of any kind.
            I am not liable for any damages arising from your use of or inability to use
            this website. No professional services are provided through this website — any
            engagement for services requires a separate written agreement.
          </p>
        </section>

        <section aria-labelledby="changes-terms-heading">
          <h2
            id="changes-terms-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Changes to These Terms
          </h2>
          <p>
            These terms may be updated at any time. The &quot;last updated&quot; date at the
            top of this page reflects when changes were last made. Continued use of the
            website after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section aria-labelledby="contact-terms-heading">
          <h2
            id="contact-terms-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact
          </h2>
          <p>
            Questions about these terms can be directed to{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <div className="border-t border-[#334155] pt-8 flex gap-6 flex-wrap">
          <Link
            href="/"
            className="text-sm text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
          >
            ← Back to home
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
          >
            Privacy Policy →
          </Link>
        </div>
      </article>
    </main>
  );
}
