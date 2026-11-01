import { NextRequest, NextResponse } from "next/server";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { ADMIN_COOKIE_NAME, createAdminSessionToken, verifyAdminSessionToken } from "@/lib/auth";
import { getAdminSettings, saveAdminSettings } from "@/lib/admin-settings";

export const dynamic = "force-dynamic";

const CHALLENGE_COOKIE = "admin_webauthn_challenge";

function bytesToB64url(bytes: Uint8Array) {
  return Buffer.from(bytes).toString("base64url");
}

function b64urlToBytes(value: string) {
  return new Uint8Array(Buffer.from(value, "base64url"));
}

function relyingParty(req: NextRequest) {
  return { rpID: req.nextUrl.hostname, origin: req.nextUrl.origin };
}

function challengeCookie(challenge: string) {
  return {
    name: CHALLENGE_COOKIE,
    value: challenge,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 300,
    },
  };
}

async function isAdmin(req: NextRequest) {
  return verifyAdminSessionToken(req.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

export async function GET() {
  const settings = getAdminSettings();
  return NextResponse.json({ registered: Boolean(settings.passkey?.id) });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const action = body.action;
  const { rpID, origin } = relyingParty(req);

  if (action === "register-options") {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Sign in with your password first." }, { status: 401 });
    }
    const options = await generateRegistrationOptions({
      rpName: "Manoj Neupane Admin",
      rpID,
      userName: "admin",
      userDisplayName: "Manoj Neupane",
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
        residentKey: "preferred",
      },
    });
    const res = NextResponse.json(options);
    const cookie = challengeCookie(options.challenge);
    res.cookies.set(cookie.name, cookie.value, cookie.options);
    return res;
  }

  if (action === "register-verify") {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Sign in with your password first." }, { status: 401 });
    }
    const expectedChallenge = req.cookies.get(CHALLENGE_COOKIE)?.value;
    if (!expectedChallenge) {
      return NextResponse.json({ error: "Fingerprint setup expired. Try again." }, { status: 400 });
    }
    const verification = await verifyRegistrationResponse({
      response: body.response,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });
    if (!verification.verified || !verification.registrationInfo) {
      return NextResponse.json({ error: "Fingerprint was not accepted." }, { status: 400 });
    }
    const credential = verification.registrationInfo.credential;
    const settings = getAdminSettings();
    settings.passkey = {
      id: credential.id,
      publicKey: bytesToB64url(credential.publicKey),
      counter: credential.counter,
    };
    saveAdminSettings(settings);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(CHALLENGE_COOKIE, "", { path: "/", maxAge: 0 });
    return res;
  }

  if (action === "login-options") {
    const passkey = getAdminSettings().passkey;
    if (!passkey) {
      return NextResponse.json({ error: "No fingerprint is registered for this admin." }, { status: 404 });
    }
    const options = await generateAuthenticationOptions({
      rpID,
      allowCredentials: [{ id: passkey.id }],
      userVerification: "required",
    });
    const res = NextResponse.json(options);
    const cookie = challengeCookie(options.challenge);
    res.cookies.set(cookie.name, cookie.value, cookie.options);
    return res;
  }

  if (action === "login-verify") {
    const expectedChallenge = req.cookies.get(CHALLENGE_COOKIE)?.value;
    const passkey = getAdminSettings().passkey;
    if (!expectedChallenge || !passkey) {
      return NextResponse.json({ error: "Fingerprint login expired. Try again." }, { status: 400 });
    }
    const verification = await verifyAuthenticationResponse({
      response: body.response,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: passkey.id,
        publicKey: b64urlToBytes(passkey.publicKey),
        counter: passkey.counter,
      },
    });
    if (!verification.verified) {
      return NextResponse.json({ error: "Fingerprint was not accepted." }, { status: 401 });
    }
    const settings = getAdminSettings();
    if (settings.passkey) {
      settings.passkey.counter = verification.authenticationInfo.newCounter;
      settings.lastLoginAt = new Date().toISOString();
      saveAdminSettings(settings);
    }
    const token = await createAdminSessionToken();
    const from = typeof body.from === "string" && body.from.startsWith("/admin") ? body.from : "/admin/analytics";
    const res = NextResponse.json({ redirect: from });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    res.cookies.set(CHALLENGE_COOKIE, "", { path: "/", maxAge: 0 });
    return res;
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
