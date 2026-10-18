import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login endpoint and login page through
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login"
  ) {
    return NextResponse.next();
  }

  // Intercept all other /admin and /api/admin requests
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthenticated = await verifyAdminSessionToken(sessionCookie);

    if (!isAuthenticated) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json(
          { error: "Unauthorized. Please authenticate as admin." },
          { status: 401 }
        );
      }

      // Redirect admin pages to login with destination redirect param
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
