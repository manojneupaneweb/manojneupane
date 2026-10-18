import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth";
import { fetchVercelAnalytics } from "@/lib/analytics-service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // 1. Verify admin authentication
    const cookieStore = cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthenticated = await verifyAdminSessionToken(sessionToken);

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized. Admin session is required." },
        { status: 401 }
      );
    }

    // 2. Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const rangeParam = searchParams.get("range") || "30d";
    const range: "7d" | "30d" | "90d" =
      rangeParam === "7d" || rangeParam === "90d" ? rangeParam : "30d";

    // 3. Fetch analytics from server-side service
    const result = await fetchVercelAnalytics(range);

    // 4. Return formatted data
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Admin analytics API route error:", error);
    return NextResponse.json(
      {
        error: "Internal server error fetching analytics",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
