import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/contact
//
// Receives contact form submissions. Currently logs to console (stdout).
// To enable email delivery, configure SMTP_HOST, SMTP_USER, SMTP_PASS
// environment variables and integrate Nodemailer or a service like Resend.
//
// Rate limiting: This endpoint should be placed behind a rate limiter in
// production. Recommended approach:
//   - Use Vercel's Edge Middleware with @upstash/ratelimit
//   - Or add express-rate-limit if self-hosting with Node.js
//   - A reasonable limit: 5 requests per IP per 15-minute window
// ---------------------------------------------------------------------------

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "manojneupaneweb@gmail.com";

interface ContactPayload {
  name: string;
  email: string;
  organization?: string;
  projectType: string;
  description: string;
  budget?: string;
  timeline?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, 5000);
}

export async function POST(req: NextRequest) {
  // ------------------------------------------------------------------
  // 1. Parse body
  // ------------------------------------------------------------------
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body. Expected JSON." },
      { status: 400 }
    );
  }

  // ------------------------------------------------------------------
  // 2. Extract and sanitize fields
  // ------------------------------------------------------------------
  const payload: ContactPayload = {
    name: sanitize(body.name),
    email: sanitize(body.email),
    organization: body.organization ? sanitize(body.organization) : undefined,
    projectType: sanitize(body.projectType),
    description: sanitize(body.description),
    budget: body.budget ? sanitize(body.budget) : undefined,
    timeline: body.timeline ? sanitize(body.timeline) : undefined,
  };

  // ------------------------------------------------------------------
  // 3. Validate required fields
  // ------------------------------------------------------------------
  const validationErrors: string[] = [];

  if (!payload.name) {
    validationErrors.push("name is required");
  }

  if (!payload.email) {
    validationErrors.push("email is required");
  } else if (!isValidEmail(payload.email)) {
    validationErrors.push("email is not a valid email address");
  }

  if (!payload.description || payload.description.length < 10) {
    validationErrors.push("description must be at least 10 characters");
  }

  if (validationErrors.length > 0) {
    return NextResponse.json(
      {
        message: `Validation failed: ${validationErrors.join(", ")}.`,
        errors: validationErrors,
      },
      { status: 422 }
    );
  }

  // ------------------------------------------------------------------
  // 4. Log the submission
  // ------------------------------------------------------------------
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    to: CONTACT_EMAIL,
    from: { name: payload.name, email: payload.email },
    organization: payload.organization,
    projectType: payload.projectType,
    description: payload.description,
    budget: payload.budget,
    timeline: payload.timeline,
  };

  console.log("[Contact Form Submission]", JSON.stringify(logEntry, null, 2));

  // ------------------------------------------------------------------
  // 5. TODO: Send email via SMTP
  //
  // Uncomment and configure when SMTP is available:
  //
  // import nodemailer from "nodemailer";
  //
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: Number(process.env.SMTP_PORT ?? 587),
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });
  //
  // await transporter.sendMail({
  //   from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
  //   to: CONTACT_EMAIL,
  //   replyTo: payload.email,
  //   subject: `New Inquiry: ${payload.projectType} from ${payload.name}`,
  //   text: [
  //     `From: ${payload.name} <${payload.email}>`,
  //     payload.organization ? `Organization: ${payload.organization}` : "",
  //     `Project Type: ${payload.projectType}`,
  //     payload.budget ? `Budget: ${payload.budget}` : "",
  //     payload.timeline ? `Timeline: ${payload.timeline}` : "",
  //     "",
  //     "Message:",
  //     payload.description,
  //   ].filter(Boolean).join("\n"),
  // });
  // ------------------------------------------------------------------

  return NextResponse.json(
    {
      message:
        "Your message has been received. I will get back to you within a few business days.",
    },
    { status: 200 }
  );
}

// Return 405 for non-POST methods
export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
