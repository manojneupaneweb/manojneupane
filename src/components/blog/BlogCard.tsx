import Link from "next/link";
import { BlogPost } from "@/lib/blog-types";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group card flex flex-col justify-between transition-all duration-300 hover:border-[#3B82F6]/50 hover:shadow-xl hover:shadow-[#3B82F6]/5 ${
        featured ? "lg:col-span-2 border-[#3B82F6]/30 bg-gradient-to-br from-[#111827] to-[#142340]" : ""
      }`}
    >
      <div>
        {/* Meta badges: Category & Reading Time */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono bg-[#3B82F6]/10 text-[#818CF8] border border-[#3B82F6]/30">
            {post.category}
          </span>
          <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
            <span>⏱️ {post.readingTime}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors mb-2.5 leading-snug ${
            featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded">
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-3 mb-4">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono rounded bg-[#1E293B] text-[#94A3B8] border border-[#334155]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Read Link */}
      <div className="pt-4 border-t border-[#334155] flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] flex items-center justify-center text-[10px] font-bold text-white font-mono">
            MN
          </span>
          <span>{post.author.name}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6] group-hover:text-[#22D3EE] group-hover:translate-x-1 transition-all"
        >
          Read Guide
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
