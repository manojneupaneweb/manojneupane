import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-data";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/data";
import BlogSearchFilter from "@/components/blog/BlogSearchFilter";
import Breadcrumbs from "@/components/blog/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Nepali Developer Guide | Real Solutions for Developers in Nepal",
  description:
    "Practical, production-tested programming tutorials for developers in Nepal. Payment gateways (eSewa, Khalti), .np domains, cPanel & VPS deployments, Laravel, MERN stack, and troubleshooting.",
  path: "/blog",
  type: "website",
});

export default function BlogHomePage() {
  const allPosts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Nepali Developer Guide",
    description: "Real solutions to real problems developers face in Nepal.",
    url: `${siteConfig.url}/blog`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "Software Developer & Programming Instructor",
    },
    inLanguage: "en-NP",
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    blogPost: allPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: { "@type": "Person", name: post.author.name },
    })),
  };

  return (
    <main className="min-h-screen pb-24">
      {/* Blog Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Hero Header */}
      <section
        aria-labelledby="blog-heading"
        className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.08)] to-transparent" />
          <div
            className="absolute top-1/4 right-0 w-[500px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)" }}
          />
        </div>
        <div className="container relative">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Nepali Developer Guide", url: "/blog" },
            ]}
          />

          <div className="max-w-3xl space-y-5 mt-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="hero-badge">
                <span className="live-dot w-1.5 h-1.5 mr-1" />
                Technical notes from Nepal
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">
                {allPosts.length} Comprehensive Tutorials
              </span>
            </div>

            <h1
              id="blog-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-[#F1F5F9]"
            >
              Nepali Developer{" "}
              <span className="gradient-text">Guide</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed">
              Real solutions to real problems developers face in Nepal. Practical, step-by-step tutorials on payment gateways, free .np domains, deployments, databases, and troubleshooting.
            </p>

            {/* Author note */}
            <div className="pt-2 flex items-center gap-3 text-xs text-[#94A3B8]">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-bold text-xs font-mono flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #22D3EE, #3B82F6)" }}
              >
                MN
              </div>
              <div>
                <span className="text-[#F1F5F9] font-semibold">{siteConfig.name}</span>
                <span className="mx-1.5 text-[#94A3B8]/40">·</span>
                <span>Software Developer &amp; Programming Instructor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container pt-4">
        <BlogSearchFilter posts={allPosts} />
      </section>
    </main>
  );
}
