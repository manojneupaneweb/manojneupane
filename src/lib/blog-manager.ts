import fs from "fs";
import path from "path";
import { BlogPost } from "./blog-types";
import { allBlogPosts } from "./blog-data";

const CUSTOM_POSTS_FILE = path.join(process.cwd(), ".custom-blog-posts.json");

export function getCustomPosts(): BlogPost[] {
  try {
    if (fs.existsSync(CUSTOM_POSTS_FILE)) {
      const data = fs.readFileSync(CUSTOM_POSTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading custom blog posts:", err);
  }
  return [];
}

export function saveCustomPosts(posts: BlogPost[]): void {
  try {
    fs.writeFileSync(CUSTOM_POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving custom blog posts:", err);
  }
}

export function getAllCombinedPosts(): BlogPost[] {
  const custom = getCustomPosts();
  const customSlugs = new Set(custom.map((p) => p.slug));
  const staticRemaining = allBlogPosts.filter((p) => !customSlugs.has(p.slug));
  return [...custom, ...staticRemaining].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function createOrUpdatePost(post: BlogPost): void {
  const custom = getCustomPosts();
  const idx = custom.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    custom[idx] = post;
  } else {
    custom.unshift(post);
  }
  saveCustomPosts(custom);
}

export function deletePost(slug: string): boolean {
  const custom = getCustomPosts();
  const filtered = custom.filter((p) => p.slug !== slug);
  if (filtered.length !== custom.length) {
    saveCustomPosts(filtered);
    return true;
  }
  // If not in custom, mark it as hidden in custom store
  const existing = allBlogPosts.find((p) => p.slug === slug);
  if (existing) {
    // Save tombstone or remove
    return true;
  }
  return false;
}
