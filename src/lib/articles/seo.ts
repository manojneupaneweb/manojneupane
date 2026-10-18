import { BlogPost } from "../blog-types";

export const seoArticles: BlogPost[] = [
  // ─── Article 18: Google Search Console & Sitemap ───────────────────────────
  {
    slug: "how-to-setup-google-search-console-submit-sitemap-seo",
    title: "How to Add Google Search Console, Submit a Sitemap, and Fix Indexing Issues in Next.js",
    description: "Verify your domain in Google Search Console using DNS TXT records, generate a dynamic sitemap.xml and robots.txt in Next.js, and fix 'Discovered - currently not indexed' status.",
    category: "SEO & Web",
    categorySlug: "seo-and-web",
    tags: ["SEO", "Google Search Console", "Sitemap", "Next.js", "Robots.txt"],
    publishedAt: "2025-02-13",
    updatedAt: "2025-02-17",
    readingTime: "12 min read",
    featured: true,
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Developers in Nepal launching portfolios or business sites that are not showing up on Google search results.",
    prerequisites: [
      "A live website deployed with a custom domain",
      "A Google account",
      "Access to DNS records (Cloudflare or domain registrar)",
    ],
    whatYouWillLearn: [
      "The difference between Domain Property and URL-Prefix property verification",
      "Adding the google-site-verification DNS TXT record",
      "Generating dynamic sitemap.ts and robots.ts in Next.js App Router",
      "Submitting your sitemap to Google Search Console",
      "Fixing 'Discovered - currently not indexed' and 'Crawled - currently not indexed'",
    ],
    sections: [
      {
        id: "gsc-verification",
        title: "1. Domain Property vs URL Prefix Verification",
        content: `When adding your site to [Google Search Console](https://search.google.com/search-console/):
- **Domain Property (Recommended):** Covers all subdomains (\`www\`, \`blog\`, \`api\`) and protocols (\`http\` + \`https\`). Verified via a DNS TXT record.
- **URL-Prefix:** Covers only the exact specified protocol and prefix (e.g., only \`https://yourdomain.com\`).

### Verifying via DNS TXT Record:
1. Choose **Domain** and enter \`yourdomain.com\`.
2. Google provides a verification string: \`google-site-verification=abc123xyz...\`.
3. Go to your DNS management dashboard (e.g. Cloudflare) and add a record:
   - **Type:** \`TXT\`
   - **Name:** \`@\`
   - **Content:** \`google-site-verification=abc123xyz...\`
4. Click **Verify** in Search Console.`,
      },
      {
        id: "nextjs-sitemap",
        title: "2. Generating a Dynamic sitemap.xml in Next.js",
        content: `Next.js App Router allows generating dynamic, self-updating XML sitemaps using a special \`app/sitemap.ts\` file:`,
        codeTabs: [
          {
            language: "typescript",
            filename: "src/app/sitemap.ts",
            label: "Next.js sitemap.ts",
            code: `import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com';
  const now = new Date();

  // Static routes
  const routes = ['', '/about', '/projects', '/blog', '/contact'].map((route) => ({
    url: \`\${baseUrl}\${route}\`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic blog posts
  // const posts = getAllPosts().map((post) => ({
  //   url: \`\${baseUrl}/blog/\${post.slug}\`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.7,
  // }));

  return [...routes];
}`,
          },
          {
            language: "typescript",
            filename: "src/app/robots.ts",
            label: "Next.js robots.ts",
            code: `import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}`,
          },
        ],
      },
      {
        id: "submitting-to-gsc",
        title: "3. Submitting the Sitemap to Google",
        content: `1. In Google Search Console, click **Sitemaps** in the left menu.
2. Under "Add a new sitemap", enter \`sitemap.xml\` and click **Submit**.
3. Status should show **Success** with the total number of discovered URLs.`,
      },
      {
        id: "fixing-indexing-status",
        title: "4. Fixing 'Discovered - Currently Not Indexed'",
        content: `### What it means:
Google found the link to your page (from sitemap or internal links), but decided not to crawl and index it yet.

### Fix Checklist:
1. **Request Indexing Manually:** In the top URL Inspection bar, enter your URL and click **Request Indexing**.
2. **Internal Linking:** Ensure other pages on your site link to this article. Google prioritizes pages with internal authority.
3. **Avoid Thin Content:** Ensure articles contain substantive, original technical content with working examples.
4. **Canonical Check:** Verify the page's \`<link rel="canonical">\` matches the exact URL being indexed.`,
      },
    ],
    expectedOutput: `Visiting https://yourdomain.com/sitemap.xml displays clean XML with all site URLs and lastModified dates.
Google Search Console displays:
Status: Success
Discovered pages: [Count of all published pages and articles]`,
    testingSteps: [
      "Open `/sitemap.xml` in browser to verify valid XML schema",
      "Open `/robots.txt` in browser and confirm Sitemap: directive points to absolute domain",
      "Use GSC 'URL Inspection' to test live URL rendering and check Googlebot crawl response",
    ],
    commonErrors: [
      {
        error: "Sitemap could not be read / Format error",
        cause: "Using relative URLs in sitemap instead of absolute URLs with https://.",
        solution: "Ensure every URL in sitemap starts with your canonical domain: 'https://yourdomain.com/blog/...'.",
      },
    ],
    securityNotes: [
      "Disallow internal APIs or private dashboards in robots.txt so Googlebot does not crawl private utility endpoints.",
    ],
    faqs: [
      {
        question: "How long does it take for Google to index a new website?",
        answer: "Initial indexing typically takes anywhere from 3 days to 2 weeks for new domains. Submitting a sitemap speeds up this discovery phase significantly.",
      },
    ],
    summary: [
      "Verify Domain property via DNS TXT record for full coverage.",
      "Generate dynamic sitemap.ts and robots.ts in Next.js.",
      "Request manual indexing in GSC to accelerate initial crawling.",
    ],
    references: [
      {
        title: "Google Search Central: Sitemaps Overview",
        url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview",
        description: "Official Google documentation on sitemap standards.",
      },
    ],
    relatedSlugs: [
      "how-to-deploy-nextjs-on-vercel",
      "how-to-configure-dns-records-fix-common-errors",
    ],
  },
];
