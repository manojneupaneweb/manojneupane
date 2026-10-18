"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  AnalyticsReportData,
  AnalyticsApiResponse,
} from "@/lib/analytics-service";

type DateRange = "7d" | "30d" | "90d";
type PageFilter = "all" | "blog" | "core";

export default function AnalyticsDashboard() {
  const [range, setRange] = useState<DateRange>("30d");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiResponse, setApiResponse] = useState<AnalyticsApiResponse | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Table controls
  const [pageFilter, setPageFilter] = useState<PageFilter>("all");
  const [pageSearch, setPageSearch] = useState("");
  const [sortField, setSortField] = useState<"pageviews" | "visitors" | "path">("pageviews");
  const [sortAsc, setSortAsc] = useState(false);

  // Fetch analytics data from protected API route
  const loadData = useCallback(async (selectedRange: DateRange, isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setFetchError(null);

    try {
      const res = await fetch(`/api/admin/analytics?range=${selectedRange}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/admin/login?from=/admin/analytics";
          return;
        }
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${res.status}`);
      }

      const json: AnalyticsApiResponse = await res.json();
      setApiResponse(json);
    } catch (err: any) {
      setFetchError(err.message || "Failed to load analytics data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData(range);
  }, [range, loadData]);

  const report = apiResponse?.data;
  const isConfigured = apiResponse?.configured;

  // Filter and sort top pages
  const filteredPages = useMemo(() => {
    if (!report?.topPages) return [];
    let list = [...report.topPages];

    if (pageFilter === "blog") {
      list = list.filter((p) => p.path.startsWith("/blog"));
    } else if (pageFilter === "core") {
      list = list.filter((p) => !p.path.startsWith("/blog"));
    }

    if (pageSearch.trim()) {
      const q = pageSearch.toLowerCase();
      list = list.filter(
        (p) => p.path.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      let diff = 0;
      if (sortField === "pageviews") diff = a.pageviews - b.pageviews;
      else if (sortField === "visitors") diff = a.visitors - b.visitors;
      else diff = a.path.localeCompare(b.path);
      return sortAsc ? diff : -diff;
    });

    return list;
  }, [report?.topPages, pageFilter, pageSearch, sortField, sortAsc]);

  // Chart coordinate calculations
  const chartData = useMemo(() => {
    if (!report?.timeseries || report.timeseries.length === 0) return null;
    const points = report.timeseries;
    const maxViews = Math.max(...points.map((p) => p.pageviews), 10);
    const width = 800;
    const height = 240;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const coords = points.map((p, idx) => {
      const x = padding.left + (points.length > 1 ? (idx / (points.length - 1)) * chartW : chartW / 2);
      const y = padding.top + chartH - (p.pageviews / maxViews) * chartH;
      const yVisitors = padding.top + chartH - (p.visitors / maxViews) * chartH;
      return { ...p, x, y, yVisitors };
    });

    // Build SVG paths
    const pathD = coords.reduce((acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`, "");
    const areaD = `${pathD} L ${coords[coords.length - 1].x} ${padding.top + chartH} L ${coords[0].x} ${padding.top + chartH} Z`;
    const visitorsPathD = coords.reduce((acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.yVisitors}`, "");

    return { coords, pathD, areaD, visitorsPathD, maxViews, width, height, padding, chartH };
  }, [report?.timeseries]);

  return (
    <div className="space-y-8">
      {/* ─── Top Header Bar ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#334155]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#F8FAFC]">
              Website Traffic & Analytics
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30">
              Vercel Web Analytics
            </span>
          </div>
          <p className="text-sm text-[#94A3B8]">
            Traffic metrics, popular blog articles, and visitor trends for{" "}
            <span className="font-mono text-[#22D3EE]">https://manoj-neupane.com.np</span>
          </p>
        </div>

        {/* Range Selector & Refresh Action */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="bg-[#111827] border border-[#334155] rounded-lg p-1 flex items-center">
            {(["7d", "30d", "90d"] as DateRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  range === r
                    ? "bg-[#3B82F6] text-white shadow-sm"
                    : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                {r === "7d" ? "Last 7 Days" : r === "30d" ? "Last 30 Days" : "Last 90 Days"}
              </button>
            ))}
          </div>

          <button
            onClick={() => loadData(range, true)}
            disabled={refreshing || loading}
            className="p-2 rounded-lg bg-[#111827] border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors disabled:opacity-50"
            title="Refresh analytics data"
            aria-label="Refresh analytics data"
          >
            <svg
              className={`w-4 h-4 ${refreshing ? "animate-spin text-[#3B82F6]" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── Vercel SDK Active Banner ──────────────────────────────────── */}
      <div className="bg-[#111827]/80 border border-[#334155] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[#F8FAFC] font-medium">
            Frontend Tracking: <span className="text-[#10B981]">Active</span>
          </span>
          <span className="text-[#94A3B8] hidden md:inline">
            (`&lt;Analytics /&gt;` is collecting real visits in root layout)
          </span>
        </div>
        <div className="flex items-center gap-3 text-[#94A3B8]">
          <span>Privacy: Cookieless & GDPR Compliant</span>
          <a
            href="https://vercel.com/docs/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#22D3EE] hover:underline flex items-center gap-1"
          >
            Vercel Docs
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* ─── Unconfigured / Setup Notice ───────────────────────────────── */}
      {!isConfigured && !loading && (
        <div className="bg-[#1E293B]/60 border border-[#22D3EE]/30 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 text-[#22D3EE] flex items-center justify-center shrink-0 border border-[#22D3EE]/20">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-[#F8FAFC]">
                Connect Vercel Web Analytics REST API
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Frontend tracking via <code className="text-[#22D3EE] font-mono">@vercel/analytics</code> is active on the website. To pull your traffic numbers, timeseries graphs, and top pages into this admin dashboard via Vercel’s API, configure the following server environment variables:
              </p>
              <div className="p-3 bg-[#0B1120] rounded-lg border border-[#334155] font-mono text-xs text-[#94A3B8] space-y-1">
                <div><span className="text-[#3B82F6]">VERCEL_API_TOKEN</span>=vercel_pat_xxxx <span className="text-[#64748B]"># Personal Access Token</span></div>
                <div><span className="text-[#3B82F6]">VERCEL_PROJECT_ID</span>=prj_xxxx <span className="text-[#64748B]"># Project ID from Vercel Project Settings</span></div>
                <div><span className="text-[#64748B]"># VERCEL_TEAM_ID=team_xxxx (Optional: only if project is owned by a team)</span></div>
              </div>
              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <a
                  href="https://vercel.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
                >
                  Open Official Vercel Analytics Dashboard
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://vercel.com/account/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
                >
                  Create Vercel Access Token
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Fetch Error Banner ────────────────────────────────────────── */}
      {fetchError && (
        <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#EF4444]">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{fetchError}</span>
          </div>
          <button
            onClick={() => loadData(range)}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#EF4444]/20 text-[#EF4444] hover:bg-[#EF4444]/30 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* ─── Section A: Overview Metric Cards ──────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Page Views */}
        <div className="bg-[#111827] border border-[#334155] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#94A3B8]">
            <span className="text-xs font-medium">Total Page Views</span>
            <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC]">
            {loading ? (
              <div className="h-8 w-24 bg-[#334155] animate-pulse rounded" />
            ) : report ? (
              report.totalPageviews.toLocaleString()
            ) : (
              "0"
            )}
          </div>
          <p className="text-xs text-[#64748B]">
            Views recorded across all routes ({range})
          </p>
        </div>

        {/* Metric 2: Unique Visitors */}
        <div className="bg-[#111827] border border-[#334155] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#94A3B8]">
            <span className="text-xs font-medium">Unique Visitors</span>
            <div className="w-7 h-7 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC]">
            {loading ? (
              <div className="h-8 w-24 bg-[#334155] animate-pulse rounded" />
            ) : report ? (
              report.uniqueVisitors.toLocaleString()
            ) : (
              "0"
            )}
          </div>
          <p className="text-xs text-[#64748B]">
            Distinct client hashes tracked
          </p>
        </div>

        {/* Metric 3: Views Per Visitor */}
        <div className="bg-[#111827] border border-[#334155] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#94A3B8]">
            <span className="text-xs font-medium">Views Per Visitor</span>
            <div className="w-7 h-7 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-[#F8FAFC]">
            {loading ? (
              <div className="h-8 w-24 bg-[#334155] animate-pulse rounded" />
            ) : report ? (
              report.viewsPerVisitor
            ) : (
              "1.0"
            )}
          </div>
          <p className="text-xs text-[#64748B]">
            Average content engagement depth
          </p>
        </div>

        {/* Metric 4: Top Content Route */}
        <div className="bg-[#111827] border border-[#334155] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#94A3B8]">
            <span className="text-xs font-medium">Top Performing Route</span>
            <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="text-sm font-semibold text-[#F8FAFC] truncate" title={report?.topPages?.[0]?.path || "/"}>
            {loading ? (
              <div className="h-8 w-28 bg-[#334155] animate-pulse rounded" />
            ) : report?.topPages?.[0] ? (
              report.topPages[0].path
            ) : (
              "/"
            )}
          </div>
          <p className="text-xs text-[#64748B] truncate">
            {report?.topPages?.[0]?.title || "Homepage"}
          </p>
        </div>
      </div>

      {/* ─── Section B: Traffic Trend Chart ────────────────────────────── */}
      <div className="bg-[#111827] border border-[#334155] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-[#F8FAFC]">
              Traffic Trend (Daily Page Views & Visitors)
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Daily distribution of page views and unique visitor sessions over time
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#3B82F6]" />
              <span className="text-[#94A3B8]">Page Views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#22D3EE]" />
              <span className="text-[#94A3B8]">Unique Visitors</span>
            </div>
          </div>
        </div>

        {/* Chart View Container */}
        {loading ? (
          <div className="h-60 w-full bg-[#0B1120] rounded-xl flex items-center justify-center">
            <div className="space-y-3 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-[#3B82F6] border-t-transparent rounded-full mx-auto" />
              <span className="text-xs text-[#64748B]">Loading timeseries data...</span>
            </div>
          </div>
        ) : chartData && chartData.coords.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <div className="min-w-[650px] relative">
              <svg viewBox={`0 0 ${chartData.width} ${chartData.height}`} className="w-full h-64 overflow-visible">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guide Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                  const y = chartData.padding.top + chartData.chartH * (1 - ratio);
                  return (
                    <g key={ratio}>
                      <line
                        x1={chartData.padding.left}
                        y1={y}
                        x2={chartData.width - chartData.padding.right}
                        y2={y}
                        stroke="#334155"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={chartData.padding.left - 8}
                        y={y + 3}
                        textAnchor="end"
                        className="text-[10px] fill-[#64748B] font-mono"
                      >
                        {Math.round(chartData.maxViews * ratio)}
                      </text>
                    </g>
                  );
                })}

                {/* Area under curve */}
                <path d={chartData.areaD} fill="url(#chartGradient)" />

                {/* Pageviews Line */}
                <path
                  d={chartData.pathD}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Visitors Line */}
                <path
                  d={chartData.visitorsPathD}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Points & Interactive Tooltips */}
                {chartData.coords.map((pt, i) => (
                  <g key={i} className="group cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      className="fill-[#3B82F6] stroke-[#0B1120] stroke-2 group-hover:r-6 transition-all"
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.yVisitors}
                      r="3"
                      className="fill-[#22D3EE] stroke-[#0B1120] stroke-2 group-hover:r-5 transition-all"
                    />

                    {/* X-axis date labels */}
                    {(chartData.coords.length <= 10 || i % Math.ceil(chartData.coords.length / 8) === 0) && (
                      <text
                        x={pt.x}
                        y={chartData.height - 5}
                        textAnchor="middle"
                        className="text-[10px] fill-[#64748B] font-mono"
                      >
                        {pt.date.slice(5)}
                      </text>
                    )}

                    {/* Hover tooltip title */}
                    <title>{`${pt.date}: ${pt.pageviews} views, ${pt.visitors} visitors`}</title>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        ) : (
          <div className="h-60 bg-[#0B1120] rounded-xl flex flex-col items-center justify-center p-6 text-center space-y-2">
            <svg className="w-10 h-10 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm font-medium text-[#94A3B8]">
              No traffic timeseries recorded yet for this period
            </p>
            <p className="text-xs text-[#64748B] max-w-sm">
              As visitors browse your portfolio and read your tutorials, daily page views and unique visitors will plot automatically.
            </p>
          </div>
        )}
      </div>

      {/* ─── Section C: Top-Performing Content & Blog Tutorials ───────── */}
      <div className="bg-[#111827] border border-[#334155] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-[#F8FAFC]">
              Top-Performing Pages & Articles
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Breakdown of page views and unique visitors across your portfolio and technical blog
            </p>
          </div>

          {/* Filter and Search controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-[#0B1120] border border-[#334155] rounded-lg p-1 flex items-center">
              <button
                onClick={() => setPageFilter("all")}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  pageFilter === "all" ? "bg-[#3B82F6] text-white" : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                All Pages
              </button>
              <button
                onClick={() => setPageFilter("blog")}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  pageFilter === "blog" ? "bg-[#3B82F6] text-white" : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                Blog Tutorials Only
              </button>
              <button
                onClick={() => setPageFilter("core")}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  pageFilter === "core" ? "bg-[#3B82F6] text-white" : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                Public Pages Only
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Filter route or title..."
                value={pageSearch}
                onChange={(e) => setPageSearch(e.target.value)}
                className="px-3 py-1.5 pl-8 bg-[#0B1120] border border-[#334155] rounded-lg text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
              />
              <svg className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Top Pages Table */}
        <div className="overflow-x-auto rounded-xl border border-[#334155]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0B1120] border-b border-[#334155] text-[#94A3B8]">
                <th
                  onClick={() => {
                    setSortField("path");
                    setSortAsc(!sortAsc);
                  }}
                  className="p-3.5 font-semibold cursor-pointer hover:text-[#F8FAFC]"
                >
                  Page Title & Path {sortField === "path" && (sortAsc ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => {
                    setSortField("pageviews");
                    setSortAsc(!sortAsc);
                  }}
                  className="p-3.5 font-semibold text-right cursor-pointer hover:text-[#F8FAFC]"
                >
                  Page Views {sortField === "pageviews" && (sortAsc ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => {
                    setSortField("visitors");
                    setSortAsc(!sortAsc);
                  }}
                  className="p-3.5 font-semibold text-right cursor-pointer hover:text-[#F8FAFC]"
                >
                  Visitors {sortField === "visitors" && (sortAsc ? "↑" : "↓")}
                </th>
                <th className="p-3.5 font-semibold text-right">Share of Views</th>
                <th className="p-3.5 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#94A3B8]">
                    <div className="animate-spin w-5 h-5 border-2 border-[#3B82F6] border-t-transparent rounded-full mx-auto mb-2" />
                    Loading pages...
                  </td>
                </tr>
              ) : filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <tr key={page.path} className="hover:bg-[#1E293B]/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-medium text-[#F8FAFC] flex items-center gap-2">
                        {page.path.startsWith("/blog") ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30">
                            Blog
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/30">
                            Core
                          </span>
                        )}
                        <span className="truncate max-w-md">{page.title}</span>
                      </div>
                      <div className="font-mono text-[11px] text-[#64748B] mt-0.5">
                        {page.path}
                      </div>
                    </td>
                    <td className="p-3.5 text-right font-mono font-semibold text-[#F8FAFC]">
                      {page.pageviews.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-right font-mono text-[#94A3B8]">
                      {page.visitors.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-mono text-[#94A3B8]">{page.percentage}%</span>
                        <div className="w-16 bg-[#0B1120] rounded-full h-1.5 overflow-hidden border border-[#334155]">
                          <div
                            className="bg-[#3B82F6] h-full rounded-full"
                            style={{ width: `${Math.min(100, page.percentage)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-center">
                      <Link
                        href={page.path}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[#22D3EE] hover:text-[#3B82F6] transition-colors"
                        title="View page on public site"
                      >
                        <span className="sr-only">View</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#64748B]">
                    No page data recorded for the selected filter or query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Section D & E: Traffic Sources & Demographics ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-[#111827] border border-[#334155] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#F8FAFC]">
              Traffic Acquisition Sources
            </h3>
            <span className="text-xs text-[#94A3B8]">Referrers</span>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Where visitors discover your portfolio and technical articles
          </p>

          <div className="space-y-3 pt-2">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-[#0B1120] animate-pulse rounded-lg" />
                ))}
              </div>
            ) : report?.referrers && report.referrers.length > 0 ? (
              report.referrers.map((ref, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#0B1120] border border-[#334155] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F8FAFC]">{ref.source}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#1E293B] text-[#94A3B8]">
                      {ref.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span>{ref.visitors} visitors</span>
                    <span>{ref.percentage}%</span>
                  </div>
                  <div className="w-full bg-[#1E293B] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] h-full rounded-full"
                      style={{ width: `${Math.min(100, ref.percentage)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-[#64748B]">
                No external referrer data recorded yet. Direct traffic or first visits will appear here.
              </div>
            )}
          </div>
        </div>

        {/* Geographic & Device Insights */}
        <div className="bg-[#111827] border border-[#334155] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#F8FAFC]">
              Geographic & Device Breakdown
            </h3>
            <span className="text-xs text-[#94A3B8]">Audience</span>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Visitor countries, devices, and browser environments
          </p>

          {/* Countries List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              Top Visitor Countries
            </h4>
            {loading ? (
              <div className="h-20 bg-[#0B1120] animate-pulse rounded-lg" />
            ) : report?.countries && report.countries.length > 0 ? (
              <div className="space-y-2">
                {report.countries.slice(0, 4).map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-[#0B1120] border border-[#334155]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#1E293B] text-[#22D3EE] border border-[#334155]">
                        {c.countryCode}
                      </span>
                      <span className="text-[#F8FAFC] font-medium">{c.countryName}</span>
                    </div>
                    <span className="font-mono text-[#94A3B8]">
                      {c.visitors} visitors ({c.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#64748B]">No country data recorded yet.</p>
            )}

            {/* Devices & Browsers */}
            <div className="pt-2 border-t border-[#334155] grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">
                  Devices
                </h4>
                {report?.devices && report.devices.length > 0 ? (
                  <div className="space-y-1.5 text-xs">
                    {report.devices.map((d, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[#F8FAFC]">{d.device}</span>
                        <span className="font-mono text-[#94A3B8]">{d.percentage}%</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#64748B]">Desktop / Mobile</p>
                )}
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">
                  Browsers
                </h4>
                {report?.browsers && report.browsers.length > 0 ? (
                  <div className="space-y-1.5 text-xs">
                    {report.browsers.map((b, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[#F8FAFC]">{b.browser}</span>
                        <span className="font-mono text-[#94A3B8]">{b.percentage}%</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#64748B]">Chrome / Safari</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
