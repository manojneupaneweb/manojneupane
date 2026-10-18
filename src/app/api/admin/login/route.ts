import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminPassword,
  createAdminSessionToken,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

// In-memory rate limiting for brute-force protection
interface RateLimitRecord {
  attempts: number;
  lastAttempt: number;
  lockedUntil?: number;
}
const loginAttempts = new Map<string, RateLimitRecord>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "127.0.0.1";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const now = Date.now();
    const record = loginAttempts.get(ip) || { attempts: 0, lastAttempt: now };

    // Check if locked out (5 failed attempts locks for 15 minutes)
    if (record.lockedUntil && record.lockedUntil > now) {
      const waitMinutes = Math.ceil((record.lockedUntil - now) / 60000);
      return NextResponse.json(
        {
          error: `Too many failed attempts. Please wait ${waitMinutes} minute(s) before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { password, from } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const isValid = verifyAdminPassword(password);

    if (!isValid) {
      record.attempts += 1;
      record.lastAttempt = now;
      if (record.attempts >= 5) {
        record.lockedUntil = now + 15 * 60 * 1000; // 15 mins lock
      }
      loginAttempts.set(ip, record);

      return NextResponse.json(
        {
          error: "Invalid admin password",
          remainingAttempts: Math.max(0, 5 - record.attempts),
        },
        { status: 401 }
      );
    }

    // Reset rate limiter on successful authentication
    loginAttempts.delete(ip);

    // Create signed session token
    const token = await createAdminSessionToken();

    // Sanitize destination URL to prevent open-redirect vulnerabilities
    let destination = "/admin/analytics";
    if (from && typeof from === "string" && from.startsWith("/admin")) {
      destination = from;
    }

    const response = NextResponse.json({
      success: true,
      redirect: destination,
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login" },
      { status: 500 }
    );
  }
}
