"use client";

import { useState, useMemo, useRef } from "react";
import { BlogPost, BlogCategory } from "@/lib/blog-types";
import BlogCard from "./BlogCard";

interface BlogSearchFilterProps {
  posts: BlogPost[];
}

const CATEGORIES: { label: string; value: BlogCategory | "All" }[] = [
  { label: "All Guides", value: "All" },
  { label: "🗺️ Hubs & Pillars", value: "Hubs & Guides" },
  { label: "💳 Payments", value: "Payments" },
  { label: "🚀 Deployment", value: "Deployment" },
  { label: "🗄️ Databases", value: "Databases" },
  { label: "🛠️ DevOps & Tools", value: "DevOps & Tools" },
  { label: "⚠️ Troubleshooting", value: "Troubleshooting" },
  { label: "🔍 SEO & Web", value: "SEO & Web" },
  { label: "🎓 Career & Projects", value: "Career & Projects" },
];

export default function BlogSearchFilter({ posts }: BlogSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const gridTopRef = useRef<HTMLDivElement>(null);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, selectedCategory]);

  // Reset to page 1 on category change
  const handleCategoryChange = (cat: BlogCategory | "All") => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  // Reset to page 1 on search change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Pagination math
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, filteredPosts.length);
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Smooth scroll to top of article grid on page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Generate numbered pagination items with ellipsis for large page counts
  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safeCurrentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (safeCurrentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, "...", totalPages);
      }
    }
    return pages;
  }, [totalPages, safeCurrentPage]);

  return (
    <div ref={gridTopRef}>
      {/* Search Bar & Category Filters */}
      <div className="mb-10 space-y-5">
        {/* Search Input */}
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94A3B8]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search guides (e.g. eSewa, Khalti, .np domain, cPanel, CORS, Vercel)..."
            aria-label="Search tutorial articles"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#111827] border border-[#334155] text-[#F8FAFC] placeholder-[#64748B] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:border-transparent transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-[#94A3B8] hover:text-[#F8FAFC]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Article categories">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                  isActive
                    ? "bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20 font-semibold"
                    : "bg-[#111827] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] border border-[#334155]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Count Status & Per-Page Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-xs text-[#94A3B8]">
        <div>
          <span>
            Showing <strong className="text-[#F8FAFC]">{filteredPosts.length > 0 ? `${startIndex + 1}–${endIndex}` : "0"}</strong> of{" "}
            <strong className="text-[#F8FAFC]">{filteredPosts.length}</strong> tutorials
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          {totalPages > 1 && (
            <span className="ml-2 font-mono text-[#64748B]">
              (Page {safeCurrentPage} of {totalPages})
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {(searchQuery || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setCurrentPage(1);
              }}
              className="text-[#3B82F6] hover:underline"
            >
              Reset filters
            </button>
          )}

          {/* Per-Page Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B]">Per page:</span>
            {[6, 9, 12].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setPostsPerPage(num);
                  setCurrentPage(1);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  postsPerPage === num
                    ? "bg-[#3B82F6] text-white font-semibold"
                    : "bg-[#111827] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155]"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {currentPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Pagination Navigation Bar */}
          {totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mt-12 pt-8 border-t border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              {/* Left: Summary */}
              <div className="text-xs text-[#94A3B8]">
                Page <strong className="text-[#F8FAFC]">{safeCurrentPage}</strong> of{" "}
                <strong className="text-[#F8FAFC]">{totalPages}</strong>
              </div>

              {/* Center / Right: Page Controls */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#334155] bg-[#111827] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
                  aria-label="Go to previous page"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Prev</span>
                </button>

                {/* Page Number Buttons */}
                {pageNumbers.map((p, idx) => {
                  if (p === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 py-1.5 text-xs text-[#64748B] select-none"
                      >
                        ...
                      </span>
                    );
                  }

                  const isActive = p === safeCurrentPage;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePageChange(p)}
                      aria-current={isActive ? "page" : undefined}
                      className={`min-w-[34px] h-[34px] px-2 rounded-lg text-xs font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                        isActive
                          ? "bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] text-white font-bold shadow-md shadow-[#3B82F6]/30"
                          : "bg-[#111827] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] border border-[#334155]"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#334155] bg-[#111827] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
                  aria-label="Go to next page"
                >
                  <span>Next</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </nav>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl border border-[#334155] bg-[#111827]/60">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">No tutorials found</h3>
          <p className="text-sm text-[#94A3B8] max-w-md mx-auto mb-6">
            We couldn&apos;t find any articles matching your search. Try different keywords or browse all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setCurrentPage(1);
            }}
            className="btn-secondary !py-2 !px-4 text-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
