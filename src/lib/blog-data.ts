import { BlogPost, BlogCategory } from "./blog-types";
import { paymentArticles } from "./articles/payments";
import { deploymentArticles } from "./articles/deployment";
import { devopsArticles } from "./articles/devops-networking";
import { databaseArticles } from "./articles/databases";
import { troubleshootingArticles } from "./articles/troubleshooting";
import { seoArticles } from "./articles/seo";
import { pillarHubArticles } from "./articles/pillar-hubs";
import { clusterPriorityArticles } from "./articles/cluster-priority";
import { clusterExtendedArticles } from "./articles/cluster-extended";
import { clusterProjectsArticles } from "./articles/cluster-projects";

// Aggregate all production articles and pillar hubs
export const allBlogPosts: BlogPost[] = [
  ...pillarHubArticles,
  ...clusterPriorityArticles,
  ...clusterExtendedArticles,
  ...clusterProjectsArticles,
  ...paymentArticles,
  ...deploymentArticles,
  ...devopsArticles,
  ...databaseArticles,
  ...troubleshootingArticles,
  ...seoArticles,
].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

/**
 * Get all published blog articles
 */
export function getAllPosts(): BlogPost[] {
  return allBlogPosts;
}

/**
 * Get a single blog article by its unique slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find((p) => p.slug === slug);
}

/**
 * Get featured articles
 */
export function getFeaturedPosts(): BlogPost[] {
  return allBlogPosts.filter((p) => p.featured);
}

/**
 * Get related articles for a given article
 */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  // Match by explicit relatedSlugs, or by same category, excluding current
  const related = allBlogPosts.filter((p) => {
    if (p.slug === currentSlug) return false;
    if (current.relatedSlugs?.includes(p.slug)) return true;
    return p.category === current.category;
  });

  return related.slice(0, limit);
}

/**
 * Get Previous and Next articles for sequential reading
 */
export function getPrevAndNextPosts(currentSlug: string): {
  prevPost?: BlogPost;
  nextPost?: BlogPost;
} {
  const index = allBlogPosts.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return {};

  const nextPost = index > 0 ? allBlogPosts[index - 1] : undefined;
  const prevPost = index < allBlogPosts.length - 1 ? allBlogPosts[index + 1] : undefined;

  return { prevPost, nextPost };
}

/**
 * Get list of categories with post counts
 */
export function getCategories(): { name: BlogCategory; slug: string; count: number }[] {
  const counts: Record<string, number> = {};
  
  for (const post of allBlogPosts) {
    counts[post.category] = (counts[post.category] || 0) + 1;
  }

  return Object.entries(counts).map(([name, count]) => ({
    name: name as BlogCategory,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    count,
  }));
}
