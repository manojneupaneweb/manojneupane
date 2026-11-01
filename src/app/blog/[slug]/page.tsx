import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getRelatedPosts, getPrevAndNextPosts } from "@/lib/blog-data";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/data";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import TableOfContents from "@/components/blog/TableOfContents";
import ArticleRenderer from "@/components/blog/ArticleRenderer";
import ArticleNavigation from "@/components/blog/ArticleNavigation";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return buildMetadata({
    title: `${post.title} | Nepali Developer Guide`,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const { prevPost, nextPost } = getPrevAndNextPosts(post.slug);

  // Generate Table of Contents items
  const tocItems = [
    ...post.sections.map((sec) => ({
      id: sec.id,
      title: sec.title,
      level: sec.level || 2,
    })),
    { id: "expected-output", title: "Expected Output & Verification", level: 2 },
    { id: "how-to-test", title: "Testing Steps", level: 2 },
    { id: "common-errors", title: "Common Errors & Solutions", level: 2 },
    ...(post.securityNotes && post.securityNotes.length > 0
      ? [{ id: "security-notes", title: "Security Considerations", level: 2 }]
      : []),
    ...(post.faqs && post.faqs.length > 0
      ? [{ id: "faqs", title: "Frequently Asked Questions", level: 2 }]
      : []),
    { id: "summary", title: "Summary of Key Steps", level: 2 },
    ...(post.references && post.references.length > 0
      ? [{ id: "references", title: "Official References", level: 2 }]
      : []),
  ];

  // Article / BlogPosting Schema JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "en-NP",
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: post.author.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    proficiencyLevel: "Beginner",
  };

  // FAQ Schema JSON-LD if faqs exist
  const faqJsonLd = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <main className="min-h-screen text-[#F1F5F9] pb-24">
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Article Hero Banner */}
      <header className="border-b border-[rgba(255,255,255,0.06)] py-14 sm:py-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(34,211,238,0.06) 0%, transparent 70%)" }} />
        </div>
        <div className="container relative">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Nepali Developer Guide", url: "/blog" },
              { name: post.category, url: `/blog?category=${post.categorySlug}` },
              { name: post.title, url: `/blog/${post.slug}` },
            ]}
          />

          {/* Category & Metadata */}
          <div className="flex items-center gap-3 flex-wrap mb-4 text-xs">
            <span className="inline-flex items-center px-3 py-1 rounded-full font-mono font-medium bg-[rgba(34,211,238,0.1)] text-[#22D3EE] border border-[rgba(34,211,238,0.25)]">
              {post.category}
            </span>
            <span className="text-[#94A3B8]">⏱️ {post.readingTime}</span>
            <span className="text-[#94A3B8]">·</span>
            <time dateTime={post.publishedAt} className="text-[#94A3B8]">
              Published {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>

          {/* Main Title */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5 text-[#F1F5F9]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-3xl mb-6">
            {post.description}
          </p>
          {post.category === "Payments" && (
            <p className="text-sm mb-6">
              <Link href="/services#payments" className="text-[#0c6b74] underline underline-offset-2">
                Need this wired into a product? See payment gateway integration.
              </Link>
            </p>
          )}
          {post.category === "Deployment" && (
            <p className="text-sm mb-6">
              <Link href="/services#deployment" className="text-[#0c6b74] underline underline-offset-2">
                Need this on a server? See deployment and maintenance.
              </Link>
            </p>
          )}

          {/* Author Details & Tags */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-3 text-xs">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#22D3EE] to-[#3B82F6] flex items-center justify-center text-black font-bold text-xs font-mono shrink-0">
                MN
              </div>
              <div>
                <span className="text-[#F1F5F9] font-semibold block">{post.author.name}</span>
                <span className="text-[#94A3B8] text-[11px]">{post.author.role}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid: Content + Table of Contents Sidebar */}
      <div className="container pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          {/* Main Article Column (8 cols on lg) */}
          <article className="lg:col-span-8 min-w-0">
            {/* Mobile TOC */}
            <TableOfContents items={tocItems} />

            {/* Article Content Renderer */}
            <ArticleRenderer post={post} />

            {/* Article Navigation & Author Bio */}
            <ArticleNavigation
              prevPost={prevPost}
              nextPost={nextPost}
              relatedPosts={relatedPosts}
            />
          </article>

          {/* Sticky Desktop TOC Sidebar (4 cols on lg) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} />

              {/* Quick Help Card */}
              <div className="mt-6 p-5 card border border-[rgba(34,211,238,0.1)] text-xs space-y-2">
                <div className="font-semibold text-[#F1F5F9] flex items-center gap-1.5">
                  <span>💡</span> Need help implementing this?
                </div>
                <p className="text-[#94A3B8] leading-relaxed">
                  Encountering an error not covered here? Feel free to reach out with your error logs.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[#22D3EE] font-semibold hover:text-[#67E8F9] transition-colors pt-1"
                >
                  Contact Manoj →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
