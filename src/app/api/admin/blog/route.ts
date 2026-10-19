import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { getAllCombinedPosts, createOrUpdatePost, deletePost } from "@/lib/blog-manager";
import { BlogPost, BlogCategory } from "@/lib/blog-types";
import { siteConfig } from "@/lib/data";

export const dynamic = "force-dynamic";

async function isAuth(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return await verifyAdminSessionToken(token);
}

// GET all posts
export async function GET(req: NextRequest) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = getAllCombinedPosts();
  return NextResponse.json({ posts });
}

// POST create or update post
export async function POST(req: NextRequest) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, description, category, tags, content } = body;

    if (!title || !slug || !description) {
      return NextResponse.json({ error: "Title, slug, and description are required" }, { status: 400 });
    }

    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const newPost: BlogPost = {
      slug: cleanSlug,
      title: title.trim(),
      description: description.trim(),
      category: (category as BlogCategory) || "Hubs & Guides",
      categorySlug: (category || "hubs-guides").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tags: Array.isArray(tags) ? tags : (tags || "").split(",").map((t: string) => t.trim()).filter(Boolean),
      publishedAt: body.publishedAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      readingTime: body.readingTime || "5 min read",
      author: {
        name: siteConfig.name,
        role: "Full Stack Software Engineer",
        avatar: siteConfig.profileImage,
        url: siteConfig.url,
      },
      featured: Boolean(body.featured),
      prerequisites: body.prerequisites || ["Basic programming concepts"],
      whatYouWillLearn: body.whatYouWillLearn || ["Practical implementation details"],
      expectedOutput: body.expectedOutput || "Working code in production",
      testingSteps: body.testingSteps || ["Test locally with node or artisan"],
      commonErrors: body.commonErrors || [],
      sections: [
        {
          id: "main-content",
          title: "Overview & Implementation",
          content: content || description,
        },
      ],
      faqs: body.faqs || [],
      summary: body.summary || description,
      references: body.references || [],
      relatedSlugs: [],
    };

    createOrUpdatePost(newPost);

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("Error creating/updating post:", error);
    return NextResponse.json({ error: "Failed to save blog post" }, { status: 500 });
  }
}

// DELETE a post
export async function DELETE(req: NextRequest) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const removed = deletePost(slug);
    return NextResponse.json({ success: true, removed });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
