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
    keywords: post.tags.join(", "),
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
    <main className="min-h-screen text-[#F8FAFC] pb-24 ">
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
      <header className="border-b border-[#334155] py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#111827]/40 to-transparent">
        <div className="max-w-5xl mx-auto">
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
            <span className="inline-flex items-center px-3 py-1 rounded-full font-mono font-medium bg-[#3B82F6]/10 text-[#818CF8] border border-[#3B82F6]/30">
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-3xl mb-6">
            {post.description}
          </p>

          {/* Author Details & Tags */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#334155]/80">
            <div className="flex items-center gap-3 text-xs">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] flex items-center justify-center text-white font-bold text-xs font-mono shrink-0">
                MN
              </div>
              <div>
                <span className="text-[#F8FAFC] font-semibold block">{post.author.name}</span>
                <span className="text-[#94A3B8] text-[11px]">{post.author.role}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-[#1E293B] text-[#94A3B8] border border-[#334155]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid: Content + Table of Contents Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
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
              <div className="mt-6 p-5 rounded-2xl border border-[#334155] bg-[#111827]/50 text-xs text-[#94A3B8] space-y-2">
                <div className="font-semibold text-[#F8FAFC] flex items-center gap-1.5">
                  <span>💡</span> Need help implementing this?
                </div>
                <p className="leading-relaxed">
                  Encountering an error not covered here? Feel free to reach out with your error logs.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[#22D3EE] font-semibold hover:underline pt-1"
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
