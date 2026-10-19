import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/data";
import { Analytics } from "@vercel/analytics/react";

// ─── Root Layout Metadata ────────────────────────────────────────────────────
// Provides the global title template only. Every child page MUST export its own
// metadata with:
//   • A unique, descriptive title (shown as "%s | Manoj Neupane")
//   • A unique meta description (120-160 chars)
//   • Its own canonical URL (alternates.canonical)
//
// The sitewide canonical is intentionally NOT set here — setting alternates.canonical
// to the homepage in the root layout would cause every page to declare the homepage
// as its canonical, which is a confirmed SEO error.
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    // Shown only if a page exports no title (should never happen)
    default: "Manoj Neupane | Full Stack Developer & Software Engineer",
    // Applied to every child: "About | Manoj Neupane"
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Manoj Neupane is a Full Stack Web Developer from Nepal building SaaS platforms, REST APIs, business systems, and web applications with Laravel, Next.js, React, and Node.js.",
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  // Minimal OG defaults — each page overrides these with page-specific values
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// ─── Sitewide JSON-LD (Person + WebSite) ─────────────────────────────────────
// Placed in the root layout so it appears on every page.
// Uses @graph to allow Google to associate the Person entity with the WebSite.
// References:
//   • https://schema.org/Person
//   • https://schema.org/WebSite
//   • https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
const sitewideJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: `${siteConfig.url}/`,
      name: siteConfig.name,
      description:
        "Portfolio of Manoj Neupane, Full Stack Web Developer and Software Engineer from Nepal.",
      inLanguage: "en",
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
    {
      // Person entity — schema.org/Person
      // email should be a plain email address string, NOT a mailto: URI
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      url: `${siteConfig.url}/`,
      // Use the actual hosted profile image
      image: {
        "@type": "ImageObject",
        url: siteConfig.profileImage.startsWith("http")
          ? siteConfig.profileImage
          : `${siteConfig.url}${siteConfig.profileImage}`,
        width: 500,
        height: 500,
      },
      jobTitle: "Full Stack Web Developer",
      description:
        "Full Stack Web Developer and Software Engineer from Nepal specializing in Laravel, React, Next.js, Node.js, SaaS platforms, and business systems.",
      // Plain email string — NOT "mailto:..."
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        addressCountry: "NP",
        addressLocality: "Nepal",
      },
      // sameAs: verified public profiles only
      sameAs: [
        siteConfig.github,
        siteConfig.linkedin,
        siteConfig.url,
      ],
      knowsAbout: [
        "Laravel",
        "PHP",
        "React",
        "Next.js",
        "Node.js",
        "MySQL",
        "SaaS architecture",
        "Multi-tenant applications",
        "REST API design",
        "Full stack web development",
        "TypeScript",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Softworica",
        url: "https://softworica.com",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* Theme color for mobile browser chrome */}
        <meta name="theme-color" content="#0B1120" />
        {/* Sitewide Person + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitewideJsonLd) }}
        />
      </head>
      <body className="bg-[#0B1120] text-[#F8FAFC] font-sans antialiased relative min-h-screen">
        {/* Ambient background decoration — Midnight Electric palette */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
          {/* Top-left Electric blue bloom */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#3B82F6]/12 rounded-full blur-[140px]" />
          {/* Top-right Cyan bloom */}
          <div className="absolute top-[12%] -right-40 w-[550px] h-[550px] bg-[#22D3EE]/10 rounded-full blur-[140px]" />
          {/* Middle Blue glow */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#3B82F6]/8 rounded-full blur-[160px]" />
          {/* Lower Cyan/Green bloom */}
          <div className="absolute top-[75%] -left-32 w-[550px] h-[550px] bg-[#34D399]/8 rounded-full blur-[140px]" />
          {/* Bottom-right Blue glow */}
          <div className="absolute -bottom-40 right-10 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[140px]" />
          {/* Subtle dot matrix grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.07)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* Skip-to-content for keyboard and screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#3B82F6] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
