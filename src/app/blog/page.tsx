import type { Metadata } from "next";
import { getAllPosts, getFeaturedPosts } from "@/lib/blog-data";
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
  const featuredPosts = getFeaturedPosts();

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
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  };

  return (
    <main className="min-h-screen text-[#F8FAFC] pb-24 ">
      {/* Blog Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Hero Header */}
      <section
        aria-labelledby="blog-heading"
        className="relative border-b border-[#334155] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#111827]/40 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Nepali Developer Guide", url: "/blog" },
            ]}
          />

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-xs font-mono text-[#3B82F6] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                Technical Education · Nepal 🇳🇵
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">
                {allPosts.length} Comprehensive Tutorials
              </span>
            </div>

            <h1
              id="blog-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nepali Developer <span className="gradient-text">Guide</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed">
              Real solutions to real problems developers face in Nepal. Practical, step-by-step tutorials on payment gateways, free .np domains, deployments, databases, and troubleshooting.
            </p>

            {/* Author note */}
            <div className="pt-2 flex items-center gap-3 text-xs text-[#94A3B8]">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] flex items-center justify-center text-white font-bold text-xs font-mono">
                MN
              </div>
              <div>
                <span className="text-[#F8FAFC] font-semibold">{siteConfig.name}</span>
                <span className="mx-1.5">·</span>
                <span>Software Developer & Programming Instructor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Search, Category Filters, and Article Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <BlogSearchFilter posts={allPosts} />
      </section>
    </main>
  );
}
