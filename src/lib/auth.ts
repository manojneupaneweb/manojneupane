// Secure Admin Authentication & Session Management
// Uses Web Crypto API compatible with both Next.js Edge Middleware and Node.js App Router

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// Helper: base64url encode/decode
function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Get encryption key from secret string
async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// Get the system admin secret
export function getAdminSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    (process.env.ADMIN_PASSWORD
      ? `session_salt_${process.env.ADMIN_PASSWORD}`
      : "portfolio_dev_secret_please_set_admin_session_secret")
  );
}

// Verify entered password against configured environment variable
export function verifyAdminPassword(password: string): boolean {
  const configuredPassword = process.env.ADMIN_PASSWORD || "admin1234";
  if (!password || typeof password !== "string") return false;

  // Constant-time string comparison to defend against timing attacks
  if (password.length !== configuredPassword.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < password.length; i++) {
    result |= password.charCodeAt(i) ^ configuredPassword.charCodeAt(i);
  }
  return result === 0;
}

export interface AdminSessionPayload {
  role: "admin";
  issuedAt: number;
  expiresAt: number;
}

// Generate a signed session token
export async function createAdminSessionToken(): Promise<string> {
  const payload: AdminSessionPayload = {
    role: "admin",
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };

  const enc = new TextEncoder();
  const payloadStr = JSON.stringify(payload);
  const payloadBytes = enc.encode(payloadStr);
  const encodedPayload = base64UrlEncode(payloadBytes);

  const key = await getCryptoKey(getAdminSecret());
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(encodedPayload)
  );

  const encodedSignature = base64UrlEncode(new Uint8Array(signatureBuffer));
  return `${encodedPayload}.${encodedSignature}`;
}

// Verify a session token string
export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encodedPayload, encodedSignature] = parts;

  try {
    const enc = new TextEncoder();
    const key = await getCryptoKey(getAdminSecret());
    const signatureBytes = base64UrlDecode(encodedSignature);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as unknown as BufferSource,
      enc.encode(encodedPayload)
    );

    if (!isValid) return false;

    // Decode and verify expiration
    const payloadBytes = base64UrlDecode(encodedPayload);
    const dec = new TextDecoder();
    const payload: AdminSessionPayload = JSON.parse(dec.decode(payloadBytes));

    if (payload.role !== "admin") return false;
    if (!payload.expiresAt || payload.expiresAt < Date.now()) return false;

    return true;
  } catch {
    return false;
  }
}
