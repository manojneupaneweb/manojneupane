import type { Metadata } from "next";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export const metadata: Metadata = {
  title: "Website Analytics | Manoj Neupane Admin",
  description: "Monitor website traffic, blog readership, and performance metrics from Vercel Web Analytics.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
