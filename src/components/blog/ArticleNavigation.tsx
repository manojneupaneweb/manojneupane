import Link from "next/link";
import { BlogPost } from "@/lib/blog-types";

interface ArticleNavigationProps {
  prevPost?: BlogPost;
  nextPost?: BlogPost;
  relatedPosts: BlogPost[];
}

export default function ArticleNavigation({
  prevPost,
  nextPost,
  relatedPosts,
}: ArticleNavigationProps) {
  return (
    <div className="mt-16 pt-10 border-t border-[#334155] space-y-12">
      {/* Prev / Next Navigation */}
      <nav aria-label="Previous and Next Articles" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group card p-4 flex flex-col justify-between hover:border-[#3B82F6]/50 transition-all text-left"
          >
            <span className="text-xs text-[#94A3B8] flex items-center gap-1 mb-1">
              ← Previous Tutorial
            </span>
            <span className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors line-clamp-2">
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group card p-4 flex flex-col justify-between hover:border-[#3B82F6]/50 transition-all text-right sm:text-right"
          >
            <span className="text-xs text-[#94A3B8] flex items-center justify-end gap-1 mb-1">
              Next Tutorial →
            </span>
            <span className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors line-clamp-2">
              {nextPost.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </nav>

      {/* Author Attribution Card */}
      <div className="p-6 rounded-2xl border border-[#334155] bg-[#111827]/80 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] flex items-center justify-center text-white font-bold text-xl font-mono shrink-0 shadow-lg shadow-[#3B82F6]/20">
          MN
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <h4 className="font-bold text-[#F8FAFC] text-base">Written by Manoj Neupane</h4>
            <span className="tag text-[10px]">Author</span>
          </div>
          <p className="text-xs text-[#22D3EE] font-mono">
            Software Developer & Programming Instructor · Nepal 🇳🇵
          </p>
          <p className="text-xs text-[#94A3B8] leading-relaxed max-w-xl">
            Building software systems and SaaS platforms with Laravel, Next.js, and Node.js. Passionate about helping students and developers in Nepal master practical, real-world development skills.
          </p>
          <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
            <Link href="/about" className="text-[#3B82F6] hover:underline">
              About Manoj →
            </Link>
            <Link href="/contact" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              Ask a question / Suggest a guide
            </Link>
          </div>
        </div>
      </div>

      {/* Related Tutorials */}
      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 id="related-heading" className="text-lg font-bold text-[#F8FAFC]">
              Related Tutorials
            </h3>
            <Link href="/blog" className="text-xs text-[#3B82F6] hover:underline">
              View all tutorials →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group card p-4 hover:border-[#3B82F6]/50 hover:shadow-lg transition-all"
              >
                <span className="text-[10px] font-mono font-medium text-[#818CF8] block mb-1">
                  {post.category}
                </span>
                <h4 className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h4>
                <span className="text-[11px] text-[#94A3B8]">⏱️ {post.readingTime}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
