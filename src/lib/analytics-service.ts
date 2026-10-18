// Vercel Web Analytics Server-Side Integration Service
// Communicates with Vercel Web Analytics REST API (api.vercel.com) securely on the server.
// Never exposes tokens or secret keys to the browser.

import { getAllPosts, getPostBySlug } from "./blog-data";
import { projects } from "./data";

export interface AnalyticsTimeseriesPoint {
  date: string;
  pageviews: number;
  visitors: number;
}

export interface AnalyticsPageItem {
  path: string;
  title: string;
  pageviews: number;
  visitors: number;
  percentage: number;
}

export interface AnalyticsReferrerItem {
  source: string;
  category: "Search Engine" | "Social Media" | "Developer Community" | "Direct Traffic" | "Referral";
  visitors: number;
  percentage: number;
}

export interface AnalyticsCountryItem {
  countryCode: string;
  countryName: string;
  visitors: number;
  percentage: number;
}

export interface AnalyticsDeviceItem {
  device: string;
  visitors: number;
  percentage: number;
}

export interface AnalyticsBrowserItem {
  browser: string;
  visitors: number;
  percentage: number;
}

export interface AnalyticsReportData {
  timeRange: "7d" | "30d" | "90d";
  from: string;
  to: string;
  totalPageviews: number;
  uniqueVisitors: number;
  viewsPerVisitor: number;
  timeseries: AnalyticsTimeseriesPoint[];
  topPages: AnalyticsPageItem[];
  referrers: AnalyticsReferrerItem[];
  countries: AnalyticsCountryItem[];
  devices: AnalyticsDeviceItem[];
  browsers: AnalyticsBrowserItem[];
  lastUpdated: string;
}

export interface AnalyticsApiResponse {
  configured: boolean;
  missingConfig?: string[];
  data: AnalyticsReportData | null;
  error?: string;
  errorDetails?: string;
  provider: "Vercel Web Analytics";
  productionDomain: string;
}

// Map ISO country codes to readable English country names
const COUNTRY_NAMES: Record<string, string> = {
  NP: "Nepal",
  US: "United States",
  IN: "India",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  JP: "Japan",
  SG: "Singapore",
  BD: "Bangladesh",
  PK: "Pakistan",
  AE: "United Arab Emirates",
  QA: "Qatar",
  MY: "Malaysia",
  KR: "South Korea",
  CN: "China",
  NL: "Netherlands",
  BR: "Brazil",
  ID: "Indonesia",
};

// Route title resolver mapping known paths to human-friendly titles
export function resolvePageTitle(path: string): string {
  if (path === "/" || path === "") return "Homepage — Manoj Neupane Portfolio";
  if (path === "/blog") return "Nepali Developer Guide — Blog Archive";
  if (path === "/about") return "About Manoj Neupane";
  if (path === "/projects") return "Projects Showcase";
  if (path === "/skills") return "Technical Skills & Stack";
  if (path === "/experience") return "Professional Experience & Timeline";
  if (path === "/services") return "Engineering & Consulting Services";
  if (path === "/contact") return "Contact Manoj Neupane";
  if (path === "/education") return "Education & Credentials";
  if (path === "/privacy-policy") return "Privacy Policy";
  if (path === "/terms") return "Terms of Use";

  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "").replace(/\/$/, "");
    const post = getPostBySlug(slug);
    if (post) return post.title;
    return `Blog: ${slug.replace(/-/g, " ")}`;
  }

  if (path.startsWith("/projects/")) {
    const slug = path.replace("/projects/", "").replace(/\/$/, "");
    const proj = projects.find((p) => p.slug === slug);
    if (proj) return `${proj.title} (Case Study)`;
    return `Project: ${slug.replace(/-/g, " ")}`;
  }

  return path;
}

// Categorize referrer hostname
export function categorizeReferrer(host: string): "Search Engine" | "Social Media" | "Developer Community" | "Direct Traffic" | "Referral" {
  if (!host || host === "(direct)" || host === "none" || host === "direct") {
    return "Direct Traffic";
  }
  const h = host.toLowerCase();
  if (h.includes("google") || h.includes("bing") || h.includes("duckduckgo") || h.includes("yahoo") || h.includes("ecosia") || h.includes("yandex") || h.includes("baidu")) {
    return "Search Engine";
  }
  if (h.includes("linkedin") || h.includes("t.co") || h.includes("twitter") || h.includes("x.com") || h.includes("facebook") || h.includes("instagram") || h.includes("reddit") || h.includes("youtube")) {
    return "Social Media";
  }
  if (h.includes("github") || h.includes("stackoverflow") || h.includes("hashnode") || h.includes("dev.to") || h.includes("medium") || h.includes("npmjs")) {
    return "Developer Community";
  }
  return "Referral";
}

// Cache interface to avoid repetitive Vercel API hits
interface CacheEntry {
  timestamp: number;
  data: AnalyticsReportData;
}
const apiCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes

export async function fetchVercelAnalytics(range: "7d" | "30d" | "90d"): Promise<AnalyticsApiResponse> {
  const token = process.env.VERCEL_API_TOKEN || process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID || process.env.PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  const productionDomain = "https://manoj-neupane.com.np";

  // Check if credentials are configured
  const missing: string[] = [];
  if (!token) missing.push("VERCEL_API_TOKEN");
  if (!projectId) missing.push("VERCEL_PROJECT_ID");

  if (missing.length > 0) {
    return {
      configured: false,
      missingConfig: missing,
      data: null,
      provider: "Vercel Web Analytics",
      productionDomain,
    };
  }

  // Check cache
  const cacheKey = `${projectId}_${range}`;
  const cached = apiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return {
      configured: true,
      data: cached.data,
      provider: "Vercel Web Analytics",
      productionDomain,
    };
  }

  // Compute dates
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const untilDate = new Date();
  const sinceDate = new Date();
  sinceDate.setDate(untilDate.getDate() - days);

  const sinceStr = sinceDate.toISOString().split("T")[0];
  const untilStr = untilDate.toISOString().split("T")[0];

  const baseUrl = "https://api.vercel.com/v1/query/web-analytics/visits/aggregate";

  // Helper to query Vercel API
  const queryVercel = async (byDimension: string, limit = 20) => {
    const params = new URLSearchParams({
      projectId: projectId!,
      "by[]": byDimension,
      since: sinceStr,
      until: untilStr,
      limit: limit.toString(),
    });
    if (teamId) params.append("teamId", teamId);

    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 180 },
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedMessage = response.statusText;
      try {
        const json = JSON.parse(errText);
        parsedMessage = json.error?.message || json.message || errText;
      } catch {
        parsedMessage = errText || response.statusText;
      }
      throw new Error(`Vercel API error (${response.status}): ${parsedMessage}`);
    }

    return await response.json();
  };

  try {
    // Run parallel queries across dimensions
    const [dailyRes, pathRes, refRes, countryRes, deviceRes, browserRes] = await Promise.all([
      queryVercel("day", days).catch(() => ({ data: [] })),
      queryVercel("requestPath", 15).catch(() => ({ data: [] })),
      queryVercel("referrerHostname", 10).catch(() => ({ data: [] })),
      queryVercel("country", 10).catch(() => ({ data: [] })),
      queryVercel("deviceType", 5).catch(() => ({ data: [] })),
      queryVercel("browserName", 5).catch(() => ({ data: [] })),
    ]);

    // Process daily timeseries
    const rawDaily: any[] = dailyRes?.data || dailyRes?.rows || [];
    const timeseries: AnalyticsTimeseriesPoint[] = rawDaily.map((row) => ({
      date: row.day || row.date || row.time || "",
      pageviews: Number(row.pageviews || row.visits || 0),
      visitors: Number(row.visitors || row.unique_visitors || 0),
    }));

    // Calculate totals
    const totalPageviews = timeseries.reduce((acc, curr) => acc + curr.pageviews, 0);
    const uniqueVisitors = timeseries.reduce((acc, curr) => acc + curr.visitors, 0);
    const viewsPerVisitor = uniqueVisitors > 0 ? Number((totalPageviews / uniqueVisitors).toFixed(1)) : 1.0;

    // Process top pages
    const rawPaths: any[] = pathRes?.data || pathRes?.rows || [];
    const topPages: AnalyticsPageItem[] = rawPaths.map((row) => {
      const p = row.requestPath || row.path || "/";
      const pv = Number(row.pageviews || row.visits || 0);
      const uv = Number(row.visitors || 0);
      return {
        path: p,
        title: resolvePageTitle(p),
        pageviews: pv,
        visitors: uv,
        percentage: totalPageviews > 0 ? Number(((pv / totalPageviews) * 100).toFixed(1)) : 0,
      };
    });

    // Process referrers
    const rawRefs: any[] = refRes?.data || refRes?.rows || [];
    const totalRefVisitors = rawRefs.reduce((acc, curr) => acc + Number(curr.visitors || curr.pageviews || 0), 0);
    const referrers: AnalyticsReferrerItem[] = rawRefs.map((row) => {
      const host = row.referrerHostname || row.referrer || "(direct)";
      const vis = Number(row.visitors || row.pageviews || 0);
      return {
        source: host === "" || host === "none" ? "(direct)" : host,
        category: categorizeReferrer(host),
        visitors: vis,
        percentage: totalRefVisitors > 0 ? Number(((vis / totalRefVisitors) * 100).toFixed(1)) : 0,
      };
    });

    // Process countries
    const rawCountries: any[] = countryRes?.data || countryRes?.rows || [];
    const totalCountryVis = rawCountries.reduce((acc, curr) => acc + Number(curr.visitors || curr.pageviews || 0), 0);
    const countries: AnalyticsCountryItem[] = rawCountries.map((row) => {
      const code = (row.country || "NP").toUpperCase();
      const vis = Number(row.visitors || row.pageviews || 0);
      return {
        countryCode: code,
        countryName: COUNTRY_NAMES[code] || code,
        visitors: vis,
        percentage: totalCountryVis > 0 ? Number(((vis / totalCountryVis) * 100).toFixed(1)) : 0,
      };
    });

    // Process devices
    const rawDevices: any[] = deviceRes?.data || deviceRes?.rows || [];
    const totalDeviceVis = rawDevices.reduce((acc, curr) => acc + Number(curr.visitors || curr.pageviews || 0), 0);
    const devices: AnalyticsDeviceItem[] = rawDevices.map((row) => {
      const dev = row.deviceType || row.device || "desktop";
      const vis = Number(row.visitors || row.pageviews || 0);
      return {
        device: dev.charAt(0).toUpperCase() + dev.slice(1),
        visitors: vis,
        percentage: totalDeviceVis > 0 ? Number(((vis / totalDeviceVis) * 100).toFixed(1)) : 0,
      };
    });

    // Process browsers
    const rawBrowsers: any[] = browserRes?.data || browserRes?.rows || [];
    const totalBrowserVis = rawBrowsers.reduce((acc, curr) => acc + Number(curr.visitors || curr.pageviews || 0), 0);
    const browsers: AnalyticsBrowserItem[] = rawBrowsers.map((row) => {
      const b = row.browserName || row.browser || "Chrome";
      const vis = Number(row.visitors || row.pageviews || 0);
      return {
        browser: b,
        visitors: vis,
        percentage: totalBrowserVis > 0 ? Number(((vis / totalBrowserVis) * 100).toFixed(1)) : 0,
      };
    });

    const report: AnalyticsReportData = {
      timeRange: range,
      from: sinceStr,
      to: untilStr,
      totalPageviews,
      uniqueVisitors,
      viewsPerVisitor,
      timeseries,
      topPages,
      referrers,
      countries,
      devices,
      browsers,
      lastUpdated: new Date().toISOString(),
    };

    // Store in cache
    apiCache.set(cacheKey, { timestamp: Date.now(), data: report });

    return {
      configured: true,
      data: report,
      provider: "Vercel Web Analytics",
      productionDomain,
    };
  } catch (err: any) {
    return {
      configured: true,
      data: null,
      error: "Failed to retrieve analytics data from Vercel API",
      errorDetails: err?.message || String(err),
      provider: "Vercel Web Analytics",
      productionDomain,
    };
  }
}
