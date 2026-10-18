/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "manoj-neupane.com.np",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
    // Serve modern image formats for better performance
    formats: ["image/avif", "image/webp"],
  },

  // Enforce trailing-slash consistency (no trailing slash)
  trailingSlash: false,

  // Security and performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Cache static assets aggressively
          ...(process.env.NODE_ENV === "production"
            ? []
            : []),
        ],
      },
      // Cache static public assets
      {
        source: "/favicon.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/og-default.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },

  // Redirect www to non-www (applied by Cloudflare in prod, but belt-and-suspenders)
  async redirects() {
    return [
      // Redirect /index to root to avoid duplicate content
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
