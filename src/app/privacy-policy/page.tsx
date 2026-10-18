import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for manoj-neupane.com.np — what data is collected (contact form submissions, server logs), no analytics or third-party tracking, and how to request data deletion.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen text-[#F8FAFC] ">
      <section
        aria-labelledby="privacy-heading"
        className="border-b border-[#334155] py-20 px-6"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-3">
            Legal
          </p>
          <h1
            id="privacy-heading"
            className="text-4xl font-bold mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-[#94A3B8]">
            Last updated: October 2026
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-12 text-[#94A3B8] leading-relaxed">

        <section aria-labelledby="intro-heading">
          <h2
            id="intro-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Introduction
          </h2>
          <p>
            This Privacy Policy explains how {siteConfig.name} (&quot;I&quot;, &quot;me&quot;,
            &quot;my&quot;) collects, uses, and handles information when you visit this
            portfolio website at{" "}
            <a
              href={siteConfig.url}
              className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
            >
              {siteConfig.url}
            </a>
            . This is a personal portfolio website and is not affiliated with any
            commercial entity.
          </p>
        </section>

        <section aria-labelledby="data-collected-heading">
          <h2
            id="data-collected-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What Data Is Collected
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="text-[#F8FAFC] font-semibold mb-2">Contact Form Submissions</h3>
              <p>
                When you use the contact form, I collect the information you provide:
                your name, email address, and the content of your message. This information
                is used solely to respond to your inquiry. It is not shared with third parties,
                sold, or used for marketing purposes.
              </p>
            </div>
            <div>
              <h3 className="text-[#F8FAFC] font-semibold mb-2">Server Logs</h3>
              <p>
                The hosting provider may automatically record server access logs that
                include your IP address, browser user agent, the pages you visited, and
                the time of your visit. These logs are used for security monitoring and
                troubleshooting and are not actively analyzed for behavioral tracking.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="no-tracking-heading">
          <h2
            id="no-tracking-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            No Analytics or Third-Party Tracking
          </h2>
          <p>
            This website does not use Google Analytics, Facebook Pixel, or any other
            third-party analytics, tracking, or advertising scripts. No cookies are set
            for tracking or marketing purposes. No data about your visit is sent to
            advertising networks.
          </p>
        </section>

        <section aria-labelledby="data-retention-heading">
          <h2
            id="data-retention-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Data Retention
          </h2>
          <p>
            Contact form submissions are retained only as long as necessary to respond
            to the inquiry. Server logs are retained according to the hosting provider&apos;s
            standard retention policies. If you would like your data deleted, please
            contact me at the email below.
          </p>
        </section>

        <section aria-labelledby="your-rights-heading">
          <h2
            id="your-rights-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your Rights
          </h2>
          <p className="mb-3">You may request:</p>
          <ul className="space-y-2 list-none">
            {[
              "Access to the personal data I hold about you",
              "Correction of inaccurate personal data",
              "Deletion of your personal data",
              "Information about how your data was used",
            ].map((right) => (
              <li key={right} className="flex gap-3">
                <span className="text-[#3B82F6] flex-shrink-0" aria-hidden="true">▸</span>
                {right}
              </li>
            ))}
          </ul>
          <p className="mt-4">
            To make any of these requests, email me at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="links-heading">
          <h2
            id="links-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            External Links
          </h2>
          <p>
            This website contains links to external sites (GitHub, LinkedIn, project
            live URLs). I am not responsible for the privacy practices of those sites.
            Please review their privacy policies independently.
          </p>
        </section>

        <section aria-labelledby="changes-heading">
          <h2
            id="changes-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Changes to This Policy
          </h2>
          <p>
            This policy may be updated to reflect changes in this website or legal
            requirements. The &quot;last updated&quot; date at the top of this page will
            reflect any changes.
          </p>
        </section>

        <section aria-labelledby="contact-privacy-heading">
          <h2
            id="contact-privacy-heading"
            className="text-xl font-bold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact
          </h2>
          <p>
            For privacy-related questions or data requests, contact me at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <div className="border-t border-[#334155] pt-8">
          <Link
            href="/"
            className="text-sm text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
          >
            ← Back to home
          </Link>
        </div>
      </article>
    </main>
  );
}
