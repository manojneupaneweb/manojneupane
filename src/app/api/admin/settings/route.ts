import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME, verifyAdminPassword } from "@/lib/auth";
import { getAdminSettings, saveAdminSettings } from "@/lib/admin-settings";

export const dynamic = "force-dynamic";

async function isAuth(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return await verifyAdminSessionToken(token);
}

// GET settings (last password change date, etc.)
export async function GET(req: NextRequest) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = getAdminSettings();
  return NextResponse.json({
    lastPasswordChangedAt: settings.lastPasswordChangedAt || "2026-10-12T00:00:00.000Z",
    lastLoginAt: settings.lastLoginAt || new Date().toISOString(),
  });
}

// POST change password
export async function POST(req: NextRequest) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
    }

    // Verify current password
    const settings = getAdminSettings();
    let isCurrentValid = false;

    if (settings.customPasswordHash) {
      // Custom password exists
      isCurrentValid = settings.customPasswordHash === currentPassword;
    } else {
      isCurrentValid = verifyAdminPassword(currentPassword);
    }

    if (!isCurrentValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    // Update settings with new password
    settings.customPasswordHash = newPassword;
    settings.lastPasswordChangedAt = new Date().toISOString();
    saveAdminSettings(settings);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
      lastPasswordChangedAt: settings.lastPasswordChangedAt,
    });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
