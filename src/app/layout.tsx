import type { Metadata } from "next";
import "./globals.css";
import CursorRing from "@/components/CursorRing";
import SiteFrame from "@/components/SiteFrame";
import { siteConfig } from "@/lib/data";

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
        siteConfig.facebook,
        siteConfig.instagram,
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        {/* Theme color for mobile browser chrome */}
        <meta name="theme-color" content="#080D1A" />
        {/* Sitewide Person + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitewideJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased relative min-h-screen text-[#16181c]">
        <div className="site-grid" aria-hidden="true" />
        <CursorRing />
        <div className="relative z-10">
          <SiteFrame>{children}</SiteFrame>
        </div>
      </body>
    </html>
  );
}
