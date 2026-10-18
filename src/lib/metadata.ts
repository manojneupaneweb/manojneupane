import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

// ─────────────────────────────────────────────────────────────────────────────
// Canonical base — set once, used by every buildMetadata call.
// metadataBase must be set so Next.js resolves relative og:image URLs correctly.
// ─────────────────────────────────────────────────────────────────────────────
export const metadataBase = new URL(siteConfig.url);

type MetaProps = {
  /** Page-specific title (without the site name suffix). */
  title: string;
  /** 120–160-char page-specific description. */
  description: string;
  /** Absolute canonical path, e.g. "/about". Defaults to "" (homepage). */
  path?: string;
  /**
   * Absolute URL of a custom OG image.
   * Falls back to the default branded OG image.
   */
  image?: string;
  /** Override og:type — "website" by default. */
  type?: "website" | "article";
};

/**
 * Builds a complete, page-specific Metadata object for the Next.js App Router.
 *
 * Every public page MUST call this (or export a custom Metadata) so that:
 *  - Titles are unique and descriptive
 *  - Canonical URLs are absolute and correct
 *  - OG images resolve from the canonical domain
 *  - Robots directives are explicitly set to index/follow
 */
export function buildMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
}: MetaProps): Metadata {
  const canonicalUrl = `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}/og-default.png`;
  const ogImageAlt = `${title} — ${siteConfig.name}`;

  return {
    // metadataBase is required for Next.js to resolve relative image URLs
    metadataBase,

    // ─── Title ─────────────────────────────────────────────────
    // Each page provides its own title; the layout template appends " | Manoj Neupane"
    // The root layout template: `%s | Manoj Neupane`
    title,

    // ─── Description ───────────────────────────────────────────
    description,

    // ─── Canonical ─────────────────────────────────────────────
    alternates: {
      canonical: canonicalUrl,
    },

    // ─── Open Graph ────────────────────────────────────────────
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },

    // ─── Twitter / X Card ──────────────────────────────────────
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: ogImage, alt: ogImageAlt }],
    },

    // ─── Robots ────────────────────────────────────────────────
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

    // ─── Authorship ────────────────────────────────────────────
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
  };
}

/**
 * Builds Metadata for the root / homepage specifically.
 * The title does NOT use the template (it is the full branded title).
 */
export function buildHomeMetadata(): Metadata {
  const ogImage = `${siteConfig.url}/og-default.png`;

  return {
    metadataBase,

    title: {
      absolute: "Manoj Neupane | Full Stack Developer & Software Engineer",
      // Template applies to all child pages
      template: `%s | ${siteConfig.name}`,
    },

    description:
      "Manoj Neupane is a Full Stack Web Developer from Nepal building SaaS platforms, REST APIs, business systems, and web applications with Laravel, Next.js, React, and Node.js.",

    alternates: {
      canonical: siteConfig.url,
    },

    openGraph: {
      title: "Manoj Neupane | Full Stack Developer & Software Engineer",
      description:
        "Full Stack Web Developer from Nepal. Building SaaS, APIs, and business systems with Laravel, Next.js, and React.",
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Manoj Neupane — Full Stack Web Developer from Nepal",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Manoj Neupane | Full Stack Developer & Software Engineer",
      description:
        "Full Stack Web Developer from Nepal. Building SaaS, APIs, and business systems with Laravel, Next.js, and React.",
      images: [{ url: ogImage, alt: "Manoj Neupane — Full Stack Web Developer from Nepal" }],
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

    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,

    // Keywords are deprecated by search engines but harmless; keep minimal
    keywords: [
      "Manoj Neupane",
      "Full Stack Developer Nepal",
      "Laravel Developer Nepal",
      "Next.js Developer Nepal",
      "Software Engineer Nepal",
    ],
  };
}
