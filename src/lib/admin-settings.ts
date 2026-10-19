import fs from "fs";
import path from "path";

export interface AdminSecuritySettings {
  customPasswordHash?: string;
  customPasswordSalt?: string;
  lastPasswordChangedAt?: string;
  lastLoginAt?: string;
}

const SETTINGS_FILE = path.join(process.cwd(), ".admin-settings.json");

export function getAdminSettings(): AdminSecuritySettings {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading admin settings:", err);
  }
  return {
    lastPasswordChangedAt: "2026-10-12T00:00:00.000Z",
    lastLoginAt: new Date().toISOString(),
  };
}

export function saveAdminSettings(settings: AdminSecuritySettings): void {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving admin settings:", err);
  }
}
