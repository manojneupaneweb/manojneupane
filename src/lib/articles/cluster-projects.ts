import { BlogPost } from "../blog-types";
import { siteConfig } from "../data";

const authorManoj = {
  name: siteConfig.name,
  role: "Software Developer & Programming Instructor",
  avatar: siteConfig.profileImage,
  url: siteConfig.url,
};

export const clusterProjectsArticles: BlogPost[] = [
  // ─── Article 1: Tuition Fee Payment Reminder App ──────────────────────────────
  {
    slug: "tuition-fee-payment-reminder-app-nextjs-khalti",
    title: "Build a College Tuition Fee Reminder & Online Khalti Payment App in Next.js 14",
    description: "Step-by-step practical project tutorial: Build an automated tuition tracking web application with SMS/Email reminders and Khalti ePayment v2 checkout for Nepali schools and colleges.",
    category: "Career & Projects",
    categorySlug: "career-and-projects",
    tags: ["Next.js 14", "Khalti v2", "Nepal Projects", "Tailwind CSS", "TypeScript", "PostgreSQL"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "16 min read",
    author: authorManoj,
    featured: true,
    whoIsThisFor: "Full-stack developers and students looking to build a production-ready educational SaaS or final year project integrating Khalti payment gateway in Next.js.",
    prerequisites: [
      "Familiarity with Next.js 14 App Router and TypeScript",
      "Node.js 18+ installed on your development machine",
      "A free Khalti merchant test account (sandbox keys)",
      "Basic understanding of SQL database relations (Prisma ORM or PostgreSQL)",
    ],
    whatYouWillLearn: [
      "Design a real-world multi-tenant fee structure with automated late fine formulas",
      "Implement server-to-server Khalti payment initiation using Next.js Route Handlers",
      "Verify transaction authenticity using Khalti lookup API before updating fee records",
      "Generate printable NPR payment receipts with QR verification for Nepali colleges",
    ],
    expectedOutput: "A fully functional Next.js 14 tuition payment portal where students can view pending semester bills, calculate late penalties, and pay directly via Khalti sandbox.",
    testingSteps: [
      "Launch Next.js development server and navigate to /tuition/student-portal",
      "Trigger payment initiation and verify redirect to Khalti sandbox checkout page",
      "Complete test payment using Khalti test wallet credentials (9800000000 / OTP 987654)",
      "Verify return_url callback triggers server lookup API and updates invoice to PAID",
    ],
    sections: [
      {
        id: "project-overview",
        title: "1. Problem Statement & Architecture",
        level: 2,
        content: `In Nepal, academic institutions from secondary colleges in Kathmandu to regional IT colleges in Pokhara and Chitwan struggle with fragmented tuition fee collection. Parents often queue up at administrative counters or make unreferenced bank deposits that require hours of manual voucher reconciliation.

This project solves this exact pain point by creating a modern, lightweight **Student Tuition Management & Khalti Online Payment Portal** using Next.js 14 App Router, Prisma ORM, and Khalti ePayment API v2.

### System Workflow:
1. **Admin / College Staff:** Uploads student fee quotas per semester/trimester (tuition, lab fee, library deposit).
2. **Scheduled Reminder:** Checks due dates and flags overdue student accounts with standard institutional late fees.
3. **Student / Parent Portal:** Displays balance breakdown in NPR, itemized discounts, and an instant **'Pay with Khalti'** button.
4. **Payment Flow:** Initiates a signed session on Khalti gateway; upon return, our server verifies payment status with Khalti's \`/epayment/lookup/\` API and issues a verifiable digital receipt.`,
      },
      {
        id: "database-schema",
        title: "2. Database Schema (Prisma / SQL)",
        level: 2,
        content: `Here is the clean database schema modeling colleges, students, fee invoices, and verified digital payment records:`,
        codeTabs: [
          {
            language: "prisma",
            filename: "prisma/schema.prisma",
            label: "Prisma Schema",
            code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum InvoiceStatus {
  UNPAID
  PARTIALLY_PAID
  PAID
  OVERDUE
}

model Student {
  id           String        @id @default(cuid())
  rollNumber   String        @unique
  fullName     String
  email        String        @unique
  phone        String
  faculty      String        // e.g. "BCA", "BSc.CSIT", "BBM"
  semester     Int           // 1 to 8
  invoices     FeeInvoice[]
  createdAt    DateTime      @default(now())
}

model FeeInvoice {
  id           String        @id @default(cuid())
  studentId    String
  student      Student       @relation(fields: [studentId], references: [id], onDelete: Cascade)
  title        String        // e.g. "4th Semester Tuition & Lab Fee"
  amount       Float         // Original fee in NPR
  lateFee      Float         @default(0.0)
  totalDue     Float         // amount + lateFee
  dueDate      DateTime
  status       InvoiceStatus @default(UNPAID)
  transactions PaymentTransaction[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model PaymentTransaction {
  id             String      @id @default(cuid())
  invoiceId      String
  invoice        FeeInvoice  @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
  gateway        String      @default("KHALTI")
  pidx           String      @unique // Khalti payment session ID
  transactionId  String?     // Khalti permanent transaction ID after success
  amountPaisa    Int         // Amount sent to gateway in Paisa (NPR * 100)
  status         String      // "Initiated", "Completed", "Refunded", "Failed"
  verifiedAt     DateTime?
  rawResponse    Json?
  createdAt      DateTime    @default(now())
}`,
          },
        ],
      },
      {
        id: "due-date-calculation",
        title: "3. Due Date Calculation & Late Fee Engine",
        level: 2,
        content: `Nepali academic colleges typically charge a 5% to 10% penalty when tuition is unpaid past the 15th of the Nepali month (Baisakh, Jestha, etc.). We encapsulate this calculation in a reusable utility function:`,
        codeTabs: [
          {
            language: "typescript",
            filename: "src/lib/fee-engine.ts",
            label: "TypeScript Utility",
            code: `export interface InvoiceCalculation {
  baseAmount: number;
  lateFee: number;
  totalPayableNpr: number;
  isOverdue: boolean;
  daysLate: number;
}

/**
 * Calculates penalty based on deadline rules
 * Rule: 0 penalty before due date. 2% after 7 days, 5% after 15 days late.
 */
export function calculateLateFee(baseAmount: number, dueDate: Date): InvoiceCalculation {
  const now = new Date();
  const diffTime = now.getTime() - dueDate.getTime();
  const daysLate = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

  let lateFeePercentage = 0;
  if (daysLate > 15) {
    lateFeePercentage = 0.05; // 5% penalty
  } else if (daysLate > 7) {
    lateFeePercentage = 0.02; // 2% penalty
  }

  const lateFee = Math.round(baseAmount * lateFeePercentage);
  const totalPayableNpr = baseAmount + lateFee;

  return {
    baseAmount,
    lateFee,
    totalPayableNpr,
    isOverdue: daysLate > 0,
    daysLate,
  };
}`,
          },
        ],
      },
      {
        id: "khalti-initiation",
        title: "4. Khalti ePayment v2 API Route Handler",
        level: 2,
        content: `When the student clicks **"Pay Now with Khalti"**, our frontend triggers a POST request to \`/api/pay/khalti/initiate\`. This Next.js Server Route Handler registers the payment intent with Khalti and returns the hosted payment URL.`,
        codeTabs: [
          {
            language: "typescript",
            filename: "src/app/api/pay/khalti/initiate/route.ts",
            label: "Next.js Route Handler",
            code: `import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const KHALTI_INITIATE_URL = "https://a.khalti.com/api/v2/epayment/initiate/";

export async function POST(req: NextRequest) {
  try {
    const { invoiceId } = await req.json();

    const invoice = await prisma.feeInvoice.findUnique({
      where: { id: invoiceId },
      include: { student: true },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (invoice.status === "PAID") {
      return NextResponse.json({ error: "This invoice is already paid." }, { status: 400 });
    }

    // Khalti accepts amount in Paisa (1 NPR = 100 Paisa)
    const amountInPaisa = Math.round(invoice.totalDue * 100);
    const purchaseOrderId = \`INV-\${invoice.id.slice(-6)}-\${Date.now()}\`;

    const payload = {
      return_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/payment/khalti-callback\`,
      website_url: process.env.NEXT_PUBLIC_APP_URL || "https://manoj-neupane.com.np",
      amount: amountInPaisa,
      purchase_order_id: purchaseOrderId,
      purchase_order_name: invoice.title,
      customer_info: {
        name: invoice.student.fullName,
        email: invoice.student.email,
        phone: invoice.student.phone,
      },
      amount_breakdown: [
        { label: "Base Tuition Fee", amount: Math.round(invoice.amount * 100) },
        { label: "Late Fine Penalty", amount: Math.round(invoice.lateFee * 100) },
      ],
      product_details: [
        {
          identity: invoice.id,
          name: invoice.title,
          total_price: amountInPaisa,
          quantity: 1,
          unit_price: amountInPaisa,
        },
      ],
    };

    const response = await fetch(KHALTI_INITIATE_URL, {
      method: "POST",
      headers: {
        "Authorization": \`Key \${process.env.KHALTI_SECRET_KEY}\`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Khalti Initiation Failed:", data);
      return NextResponse.json({ error: data.detail || "Khalti session error" }, { status: 400 });
    }

    // Save pending transaction record
    await prisma.paymentTransaction.create({
      data: {
        invoiceId: invoice.id,
        gateway: "KHALTI",
        pidx: data.pidx,
        amountPaisa: amountInPaisa,
        status: "Initiated",
      },
    });

    return NextResponse.json({ paymentUrl: data.payment_url, pidx: data.pidx });
  } catch (error) {
    console.error("Initiate error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}`,
          },
        ],
      },
      {
        id: "khalti-callback",
        title: "5. Return URL & Server-Side Verification",
        level: 2,
        content: `Once the student pays via Khalti wallet, mobile banking, or SCT card, Khalti redirects back to our \`return_url\` with query parameters \`?pidx=...&status=Completed\`. Never trust the URL parameter alone—always verify using Khalti's \`/epayment/lookup/\` API.`,
        codeTabs: [
          {
            language: "typescript",
            filename: "src/app/api/pay/khalti/verify/route.ts",
            label: "Next.js Verification Handler",
            code: `import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const KHALTI_LOOKUP_URL = "https://a.khalti.com/api/v2/epayment/lookup/";

export async function POST(req: NextRequest) {
  try {
    const { pidx } = await req.json();

    if (!pidx) {
      return NextResponse.json({ error: "pidx is required" }, { status: 400 });
    }

    // Call Khalti Lookup Server API
    const khaltiRes = await fetch(KHALTI_LOOKUP_URL, {
      method: "POST",
      headers: {
        "Authorization": \`Key \${process.env.KHALTI_SECRET_KEY}\`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });

    const statusData = await khaltiRes.json();

    if (!khaltiRes.ok || statusData.status !== "Completed") {
      return NextResponse.json({
        success: false,
        message: statusData.detail || "Payment has not been completed",
        status: statusData.status,
      }, { status: 400 });
    }

    // Check existing transaction in DB
    const existingTx = await prisma.paymentTransaction.findUnique({
      where: { pidx },
      include: { invoice: true },
    });

    if (!existingTx) {
      return NextResponse.json({ error: "Transaction record not found" }, { status: 404 });
    }

    // Idempotency: avoid double-marking
    if (existingTx.status === "Completed") {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
        invoiceId: existingTx.invoiceId,
      });
    }

    // Execute atomic update
    await prisma.$transaction([
      prisma.paymentTransaction.update({
        where: { pidx },
        data: {
          status: "Completed",
          transactionId: statusData.transaction_id,
          verifiedAt: new Date(),
          rawResponse: statusData,
        },
      }),
      prisma.feeInvoice.update({
        where: { id: existingTx.invoiceId },
        data: {
          status: "PAID",
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      transactionId: statusData.transaction_id,
      amount: statusData.total_amount / 100,
    });
  } catch (err) {
    console.error("Verification error:", err);
    return NextResponse.json({ error: "Verification server error" }, { status: 500 });
  }
}`,
          },
        ],
      },
      {
        id: "student-portal-ui",
        title: "6. Interactive Student Payment Portal UI",
        level: 2,
        content: `Here is the clean Next.js client component that renders the student's tuition bill with breakdown, overdue indicators, and a one-click payment launcher:`,
        codeTabs: [
          {
            language: "tsx",
            filename: "src/components/tuition/InvoicePaymentCard.tsx",
            label: "React Client Component",
            code: `'use client';

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, CreditCard } from "lucide-react";

interface InvoiceProps {
  invoice: {
    id: string;
    title: string;
    amount: number;
    lateFee: number;
    totalDue: number;
    dueDate: string;
    status: string;
    studentName: string;
    rollNumber: string;
  };
}

export function InvoicePaymentCard({ invoice }: InvoiceProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleKhaltiPay = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pay/khalti/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to initiate payment");

      // Redirect student to Khalti secure checkout
      window.location.href = data.paymentUrl;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const isPaid = invoice.status === "PAID";

  return (
    <div className="bg-[#111827] border border-[#334155] rounded-2xl p-6 text-white max-w-lg mx-auto shadow-xl">
      <div className="flex justify-between items-start border-b border-[#334155] pb-4 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">Fee Invoice</span>
          <h2 className="text-xl font-bold text-slate-100">{invoice.title}</h2>
          <p className="text-xs text-slate-400 mt-1">{invoice.studentName} ({invoice.rollNumber})</p>
        </div>
        <span className={\`px-3 py-1 text-xs font-bold rounded-full \${
          isPaid ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
        }\`}>
          {invoice.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-300 mb-6">
        <div className="flex justify-between">
          <span className="text-slate-400">Base Tuition Fee:</span>
          <span>Rs. {invoice.amount.toLocaleString("en-NP")}</span>
        </div>
        {invoice.lateFee > 0 && (
          <div className="flex justify-between text-rose-400">
            <span>Late Fine Penalty:</span>
            <span>+ Rs. {invoice.lateFee.toLocaleString("en-NP")}</span>
          </div>
        )}
        <div className="flex justify-between text-xs text-slate-400">
          <span>Payment Deadline:</span>
          <span>{new Date(invoice.dueDate).toLocaleDateString("en-NP", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
        <div className="border-t border-[#334155] pt-2 flex justify-between font-bold text-base text-slate-100">
          <span>Total Payable:</span>
          <span className="text-sky-400 text-lg">Rs. {invoice.totalDue.toLocaleString("en-NP")}</span>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isPaid ? (
        <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
          <CheckCircle2 className="w-5 h-5" />
          <span>Invoice Settled • Verified by Khalti</span>
        </div>
      ) : (
        <button
          onClick={handleKhaltiPay}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#5D2E8E] hover:bg-[#4E2479] disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-purple-950/40"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Redirecting to Khalti...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Pay Rs. {invoice.totalDue} with Khalti</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}`,
          },
        ],
      },
    ],
    commonErrors: [
      {
        error: "Khalti initiate returns 400 'amount: Ensure this value is greater than or equal to 1000'",
        cause: "Khalti minimum transaction amount is 10 NPR (1000 Paisa). Passing a smaller amount causes validation failure.",
        solution: "Ensure amount is at least 1000 paisa (Rs. 10). If testing small amounts, use at least Rs. 10 in your sandbox test invoice.",
      },
      {
        error: "CORS error when calling Khalti initiate directly from browser",
        cause: "Calling Khalti initiate API directly from client-side React code exposes your Secret Key and triggers CORS browser blocks.",
        solution: "Never call Khalti initiate from the browser. Always route the request through your Next.js Server Route Handler (/api/pay/khalti/initiate).",
      },
    ],
    securityConsiderations: [
      "Keep KHALTI_SECRET_KEY strictly in server environment variables (.env.local), never with NEXT_PUBLIC_ prefix.",
      "Never trust the ?status=Completed URL redirect param; always call /epayment/lookup/ server-to-server.",
      "Use Prisma transactions ($transaction) when updating payment logs and invoice status to prevent partial writes.",
    ],
    faqs: [
      {
        question: "Can parents pay using Mobile Banking apps like NIC Asia or Global IME through Khalti?",
        answer: "Yes! Khalti's ePayment v2 hosted checkout supports Khalti Wallet, ConnectIPS, e-Banking, and all major Nepali commercial bank mobile banking apps directly.",
      },
      {
        question: "What is Khalti's transaction charge for college tuition?",
        answer: "Standard Khalti gateway fees range from 1.5% to 2.0% per transaction, though academic institutions can negotiate customized educational tariff rates directly with Khalti's merchant onboarding team.",
      },
    ],
    summary: "Building a tuition fee tracker in Next.js 14 gives Nepali schools and colleges a reliable, automated collection pipeline with Khalti v2 ePayment, SMS due-date notifications, and automatic receipt generation.",
    references: [
      { title: "Khalti ePayment API v2 Documentation", url: "https://docs.khalti.com/khalti-epayment-v2/" },
      { title: "Next.js 14 Route Handlers Guide", url: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers" },
    ],
    relatedSlugs: [
      "khalti-epayment-v2-api-nodejs-express-guide",
      "nepal-payment-gateway-integration-hub",
      "stop-spoofed-payment-verification-esewa-khalti-nepal",
    ],
  },

  // ─── Article 2: Kathmandu Room & Flat Finder ──────────────────────────────
  {
    slug: "room-finder-kathmandu-nextjs-mongodb-atlas",
    title: "Build a Kathmandu Room & Flat Finder Web App in Next.js 14 & MongoDB Atlas",
    description: "Complete student final-year project guide: Build a localized Kathmandu room rental platform featuring geolocation search, Cloudinary photo uploads, price filtering in NPR, and owner phone verification.",
    category: "Career & Projects",
    categorySlug: "career-and-projects",
    tags: ["Next.js 14", "MongoDB Atlas", "Geospatial", "Final Year Project", "Kathmandu", "Nepal"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "18 min read",
    author: authorManoj,
    featured: true,
    whoIsThisFor: "BCA, BSc. CSIT, BIT, and BE Computer students in Nepal seeking a practical, high-scoring major or minor capstone project for university evaluation.",
    prerequisites: [
      "Basic understanding of Next.js 14 App Router and React Server Components",
      "A free MongoDB Atlas account with an active M0 cluster",
      "A free Cloudinary account for property photo storage",
    ],
    whatYouWillLearn: [
      "Implement MongoDB 2dsphere indexing and $near geospatial queries for Kathmandu valley coordinates",
      "Handle server-side image compression and direct upload to Cloudinary without local disk dependency",
      "Design accessible search filters for Nepali rent budgets (Under 10k, 10k-20k, 20k+)",
      "Confidently defend architectural decisions during college final-year project viva examinations",
    ],
    expectedOutput: "A deployable real estate portal specifically tailored to Kathmandu valley renting conditions (Melamchi water supply, sub-meters, neighborhood coordinates).",
    testingSteps: [
      "Create a listing in Baneshwor with coordinates [85.3412, 27.6915]",
      "Query listings within 3km of Koteshwor [85.3475, 27.6781] and verify distance ranking",
      "Upload test photos and verify optimization as WebP in Cloudinary dashboard",
      "Test mobile layout and WhatsApp direct dialing button on smartphone",
    ],
    sections: [
      {
        id: "project-scope",
        title: "1. Kathmandu Rental Problem & Features",
        level: 2,
        content: `Finding a decent room or 1BHK/2BHK flat in Kathmandu, Lalitpur, or Bhaktapur is notoriously stressful for students moving from outside the valley and young IT professionals. Traditional Facebook groups are flooded with middleman brokers who charge high commissions and share duplicate listings.

Building a **Verified Room & Flat Finder for Kathmandu Valley** is one of the highest-scoring, practical final-year capstone projects for **BCA, BSc. CSIT, BIT, and BE Computer** students in Nepal.

### Essential Features Implemented in this Project:
- **Neighborhood Search:** Filter listings by Kathmandu hotspots (*New Baneshwor, Koteshwor, Kirtipur, Putalisadak, Tinkune, Kumaripati, Jhamsikhel*).
- **Geospatial Distance Query:** Locate rooms within 2 km of colleges (e.g., TU Kirtipur, Pulchowk Campus, St. Xavier's).
- **Detailed Nepali Amenities:** 24/7 water supply (*Melamchi or Boring*), solar water heater, bike/car parking, separate electricity sub-meter, kitchen sharing.
- **Direct Landlord Contact:** Verified phone numbers with quick WhatsApp call link.`,
      },
      {
        id: "mongodb-geospatial-schema",
        title: "2. MongoDB Atlas Geospatial Schema (2dsphere)",
        level: 2,
        content: `To enable location searches (e.g. *\"Find rooms within 3km of New Baneshwor\"*), MongoDB requires a **GeoJSON Point** field paired with a \`2dsphere\` index.

Here is the Mongoose schema:`,
        codeTabs: [
          {
            language: "typescript",
            filename: "src/models/Listing.ts",
            label: "Mongoose Model",
            code: `import mongoose, { Schema, Document, Model } from "mongoose";

export interface IListing extends Document {
  title: string;
  description: string;
  category: "Single Room" | "Double Room" | "Flat 1BHK" | "Flat 2BHK";
  rentNpr: number;
  area: string; // e.g. "New Baneshwor, Kathmandu"
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude] -> NOTE: Longitude FIRST in GeoJSON!
  };
  amenities: {
    waterSupply: "Melamchi" | "Boring" | "Jar Water Only";
    parking: "Bike Only" | "Car and Bike" | "None";
    wifiIncluded: boolean;
    separateSubMeter: boolean;
  };
  photos: string[];
  landlord: {
    name: string;
    phone: string;
    isVerified: boolean;
  };
  isAvailable: boolean;
  createdAt: Date;
}

const ListingSchema: Schema = new Schema<IListing>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Single Room", "Double Room", "Flat 1BHK", "Flat 2BHK"],
      required: true,
    },
    rentNpr: { type: Number, required: true, min: 1000 },
    area: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    amenities: {
      waterSupply: { type: String, default: "Melamchi" },
      parking: { type: String, default: "Bike Only" },
      wifiIncluded: { type: Boolean, default: false },
      separateSubMeter: { type: Boolean, default: true },
    },
    photos: [{ type: String }],
    landlord: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      isVerified: { type: Boolean, default: false },
    },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// CRITICAL: 2dsphere index for geospatial proximity queries
ListingSchema.index({ location: "2dsphere" });
ListingSchema.index({ rentNpr: 1 });
ListingSchema.index({ area: "text", title: "text" });

export const Listing: Model<IListing> =
  mongoose.models.Listing || mongoose.model<IListing>("Listing", ListingSchema);`,
          },
        ],
      },
      {
        id: "location-search-api",
        title: "3. Location-Based Query API (Baneshwor, Kirtipur, Patan)",
        level: 2,
        content: `Here is the Next.js Route Handler supporting geospatial radius queries along with price filters:`,
        codeTabs: [
          {
            language: "typescript",
            filename: "src/app/api/listings/route.ts",
            label: "Next.js Route Handler",
            code: `import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Listing } from "@/models/Listing";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const lng = searchParams.get("lng");
    const lat = searchParams.get("lat");
    const maxDistanceKm = Number(searchParams.get("radiusKm")) || 5;
    const maxRent = searchParams.get("maxRent");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: any = { isAvailable: true };

    // Price filter
    if (maxRent) {
      query.rentNpr = { $lte: Number(maxRent) };
    }

    // Category filter
    if (category && category !== "All") {
      query.category = category;
    }

    // Text keyword filter
    if (search) {
      query.$text = { $search: search };
    }

    // Geospatial filter: $near requires [longitude, latitude]
    if (lng && lat) {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: maxDistanceKm * 1000, // converted to meters
        },
      };
    }

    const listings = await Listing.find(query).limit(50).lean();

    return NextResponse.json({ success: true, count: listings.length, data: listings });
  } catch (error: any) {
    console.error("Listing query error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}`,
          },
        ],
      },
      {
        id: "filtering-ui",
        title: "4. Next.js Filter & Map Listing Component",
        level: 2,
        content: `Here is the clean listing card with direct WhatsApp dialing and amenity badges:`,
        codeTabs: [
          {
            language: "tsx",
            filename: "src/components/rooms/RoomCard.tsx",
            label: "React Component",
            code: `import Image from "next/image";
import { MapPin, Phone, Droplet, Bike, Wifi } from "lucide-react";

interface ListingProps {
  listing: {
    _id: string;
    title: string;
    category: string;
    rentNpr: number;
    area: string;
    photos: string[];
    amenities: {
      waterSupply: string;
      parking: string;
      wifiIncluded: boolean;
      separateSubMeter: boolean;
    };
    landlord: {
      name: string;
      phone: string;
      isVerified: boolean;
    };
  };
}

export function RoomCard({ listing }: ListingProps) {
  const whatsappUrl = \`https://wa.me/977\${listing.landlord.phone.replace(/\\D/g, "")}?text=Namaste, I saw your room listing for \${encodeURIComponent(listing.title)} in \${encodeURIComponent(listing.area)}. Is it still available?\`;

  return (
    <div className="bg-[#111827] border border-[#334155] rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all flex flex-col group">
      <div className="relative h-48 w-full bg-slate-800">
        <Image
          src={listing.photos[0] || "/placeholder-room.jpg"}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-sky-300">
          {listing.category}
        </div>
        <div className="absolute bottom-3 right-3 bg-sky-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold">
          Rs. {listing.rentNpr.toLocaleString("en-NP")} / month
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{listing.area}</span>
          </div>
          <h3 className="text-base font-bold text-slate-100 line-clamp-1 mb-2">{listing.title}</h3>

          <div className="flex flex-wrap gap-2 text-xs text-slate-300 mb-4">
            <span className="flex items-center gap-1 bg-[#334155] px-2 py-0.5 rounded">
              <Droplet className="w-3 h-3 text-cyan-400" /> {listing.amenities.waterSupply}
            </span>
            <span className="flex items-center gap-1 bg-[#334155] px-2 py-0.5 rounded">
              <Bike className="w-3 h-3 text-emerald-400" /> {listing.amenities.parking}
            </span>
            {listing.amenities.wifiIncluded && (
              <span className="flex items-center gap-1 bg-[#334155] px-2 py-0.5 rounded">
                <Wifi className="w-3 h-3 text-amber-400" /> Free WiFi
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-[#334155] pt-4 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-400 block">Owner</span>
            <span className="font-semibold text-slate-200">{listing.landlord.name}</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}`,
          },
        ],
      },
    ],
    commonErrors: [
      {
        error: "MongoServerError: Can't extract geo keys: ... coordinates must be valid longitude/latitude",
        cause: "Passing latitude first or providing values outside valid bounds (-180 to 180 for longitude, -90 to 90 for latitude).",
        solution: "Ensure coordinates are strictly formatted as [longitude, latitude]. For Kathmandu, longitude is ~85.32 and latitude is ~27.71.",
      },
      {
        error: "Vercel upload error: EROFS: read-only file system, open 'uploads/photo.jpg'",
        cause: "Attempting to save multipart file uploads to a local folder like ./public/uploads on serverless Vercel functions.",
        solution: "Use memory buffers to stream uploads directly to Cloudinary or AWS S3 instead of local disk.",
      },
    ],
    securityConsiderations: [
      "Rate-limit landlord contact lookups to prevent web scrapers from harvesting phone numbers for telemarketing.",
      "Validate uploaded image mime types on the server side (allow only image/jpeg, image/png, image/webp).",
      "Sanitize property descriptions to eliminate Cross-Site Scripting (XSS) vectors.",
    ],
    faqs: [
      {
        question: "Can I use Leaflet / OpenStreetMap instead of Google Maps API for this project?",
        answer: "Yes! OpenStreetMap with React-Leaflet is 100% free, requires no credit card, and has comprehensive building footprints across Kathmandu, Patan, and Bhaktapur.",
      },
      {
        question: "Is this project suitable for a 7th/8th semester major project?",
        answer: "Yes. Adding recommendation filtering, automated contract agreement PDF generation, and Khalti deposit booking transforms this into a top-tier major capstone project.",
      },
    ],
    summary: "A localized Kathmandu Room & Flat Finder built with Next.js 14, MongoDB Atlas geospatial indexing, and Cloudinary provides an impactful real-world solution and an outstanding portfolio/viva project for Nepali students.",
    references: [
      { title: "MongoDB 2dsphere Index Documentation", url: "https://www.mongodb.com/docs/manual/core/indexes/index-types/geospatial/2dsphere/" },
      { title: "GeoJSON Specification (RFC 7946)", url: "https://datatracker.ietf.org/doc/html/rfc7946" },
    ],
    relatedSlugs: [
      "bca-csit-full-stack-roadmap-nepal-students",
      "first-it-internship-interview-questions-nepal",
      "tuition-fee-payment-reminder-app-nextjs-khalti",
    ],
  },

  // ─── Article 3: Local SEO for Nepali Businesses ──────────────────────────────
  {
    slug: "local-seo-nepal-google-business-profile",
    title: "Local SEO for Nepali Businesses: Google Business Profile, Local Schema & Ranking Guide",
    description: "The definitive guide to ranking Nepali local businesses in Kathmandu, Pokhara, and Chitwan on Google Maps and search results using Google Business Profile, LocalBusiness Schema in NPR, and local citations.",
    category: "SEO & Web",
    categorySlug: "seo-and-web",
    tags: ["Local SEO", "Google Business Profile", "Nepal Marketing", "Schema.org", "Next.js SEO"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "14 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Freelancers, business owners, and agency developers building websites for Nepali businesses who want to dominate local Google search and Google Maps rankings.",
    prerequisites: [
      "A registered business or client project in Nepal",
      "Access to Google Search Console and website source code",
      "Basic understanding of JSON-LD Schema markup in Next.js or HTML",
    ],
    whatYouWillLearn: [
      "Successfully verify Google Business Profile in Nepal despite postal delays",
      "Implement compliant LocalBusiness structured data with NPR currency and Kathmandu geocoordinates",
      "Capture high-converting 'near me' and neighborhood searches across major Nepali cities",
      "Optimize local landing pages for low-bandwidth mobile network users",
    ],
    expectedOutput: "A fully optimized Google Business Profile and website rich snippet setup that shows in Google's Local 3-Pack with opening hours, directions, and reviews.",
    testingSteps: [
      "Submit company registration certificate for instant GBP video/support verification",
      "Embed JSON-LD schema with exact latitude/longitude and postal code 44600",
      "Test page URL on Google Rich Results Test and verify zero schema errors",
      "Verify NAP consistency across Facebook, Instagram, Google Maps, and footer",
    ],
    sections: [
      {
        id: "local-seo-reality-nepal",
        title: "1. The Local SEO Landscape in Nepal",
        level: 2,
        content: `When a customer in Kathmandu searches for *\"best dentist in New Baneshwor\"*, *\"web development company in Lalitpur\"*, or *\"bike servicing near me\"*, Google displays the **Local 3-Pack (Map Results)** before any standard website links.

In Nepal, most businesses fail at local SEO because:
1. They ignore **Google Business Profile (GBP)** optimization.
2. Their website lacks **Schema.org structured data** linking their digital site to their physical location.
3. Their Name, Address, and Phone number (NAP) vary wildly between Facebook, Instagram, Google Maps, and their website.

Mastering Local SEO gives Nepali agencies, retail stores, clinics, and startups a massive organic competitive advantage without spending thousands of rupees on Facebook or TikTok ads.`,
      },
      {
        id: "schema-markup-npr",
        title: "2. JSON-LD LocalBusiness Schema with NPR Currency",
        level: 2,
        content: `Embed this JSON-LD script into your Next.js root layout or homepage to inform Google bot about your exact GPS coordinates, business hours, and accepted currency in Nepal:`,
        codeTabs: [
          {
            language: "tsx",
            filename: "src/components/seo/LocalBusinessJsonLd.tsx",
            label: "Next.js JSON-LD Component",
            code: `export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Tech Himal Pvt. Ltd.",
    "image": "https://techhimal.com.np/logo.png",
    "@id": "https://techhimal.com.np",
    "url": "https://techhimal.com.np",
    "telephone": "+977-1-4112345",
    "priceRange": "NPR 15,000 - 500,000",
    "currenciesAccepted": "NPR",
    "paymentAccepted": "Cash, eSewa, Khalti, ConnectIPS, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Subidhanagar, Tinkune",
      "addressLocality": "Kathmandu",
      "addressRegion": "Bagmati Province",
      "postalCode": "44600",
      "addressCountry": "NP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.6872,
      "longitude": 85.3496
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:30",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/techhimalnp",
      "https://linkedin.com/company/techhimalnp",
      "https://instagram.com/techhimalnp"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}`,
          },
        ],
      },
    ],
    commonErrors: [
      {
        error: "Google Business Profile suspended immediately after editing phone number or address",
        cause: "Editing core NAP data triggers Google's automated anti-fraud algorithm in developing regions.",
        solution: "Avoid making frequent edits to your business name or category. If suspended, submit an official reinstatement request with your PAN certificate and office lease agreement.",
      },
      {
        error: "Rich Results Test reports 'Missing field: priceRange or addressCountry'",
        cause: "Omitting required Schema.org fields or using informal country codes like 'Nepal' instead of the ISO 3166-1 alpha-2 code 'NP'.",
        solution: "Always use 'NP' for addressCountry and specify priceRange in NPR (e.g. 'NPR 1,000 - 50,000').",
      },
    ],
    securityConsiderations: [
      "Protect your Google Business Profile primary ownership by requiring 2-Factor Authentication on manager accounts.",
      "Never buy fake Google reviews from automated bots; Google's updated spam filters flag and permanently demote penalized listings.",
    ],
    faqs: [
      {
        question: "Can I rank in Kathmandu if my office is located outside the Ring Road?",
        answer: "Yes! While physical proximity to the searcher is a major factor, having strong local schema, dozens of legitimate customer reviews, and neighborhood-specific landing pages allows you to outrank competitors located inside the Ring Road.",
      },
      {
        question: "Does having a .com.np domain help with local SEO in Nepal?",
        answer: "Yes. Google views ccTLDs (.np, .com.np) as a strong geotargeting signal that your content and services are specifically intended for users searching from within Nepal.",
      },
    ],
    summary: "Ranking in Nepal's local search results requires strict NAP consistency, video verification on Google Business Profile, and validated LocalBusiness Schema with NPR pricing.",
    references: [
      { title: "Google Search Central Local Business Guidelines", url: "https://developers.google.com/search/docs/appearance/structured-data/local-business" },
      { title: "Schema.org LocalBusiness Documentation", url: "https://schema.org/LocalBusiness" },
    ],
    relatedSlugs: [
      "point-com-np-domain-to-vercel-cloudflare-dns",
      "nepal-developer-hosting-and-domain-hub",
      "bca-csit-full-stack-roadmap-nepal-students",
    ],
  },

  // ─── Article 4: Core Web Vitals on Slow 4G ──────────────────────────────
  {
    slug: "core-web-vitals-nepal-slow-4g",
    title: "Optimizing Core Web Vitals for Nepal's Mobile Networks: WebP, Font Subsetting & LCP Fixes",
    description: "Learn how to optimize Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) for budget Android phones and fluctuating 4G mobile data connections in Nepal.",
    category: "SEO & Web",
    categorySlug: "seo-and-web",
    tags: ["Performance", "Core Web Vitals", "Next.js", "WebP", "Nepal Mobile", "PageSpeed"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "13 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Frontend developers who want their Next.js websites to load under 2 seconds on budget smartphones connected to NTC/Ncell 4G networks in Nepal.",
    prerequisites: [
      "A Next.js 14 or React web project",
      "Basic familiarity with Chrome DevTools Performance and Network tabs",
    ],
    whatYouWillLearn: [
      "Reduce bundle size by 60%+ using modern image formats and responsive picture sizing",
      "Eliminate Flash of Unstyled Text (FOUT) on slow mobile connections using font subsets",
      "Prevent layout shifts caused by dynamic banners and unreserved media slots",
      "Achieve 95+ mobile Lighthouse scores on real NTC and Ncell mobile networks",
    ],
    expectedOutput: "A high-performing Next.js application that achieves green Core Web Vitals across LCP, INP, and CLS on throttled mobile connections.",
    testingSteps: [
      "Configure Slow 4G network throttling in Chrome DevTools Network tab",
      "Audit homepage using PageSpeed Insights and verify LCP < 2.5s",
      "Verify next/font subsetting delivers zero Flash of Invisible Text",
      "Check Cloudflare Edge cache headers (CF-Cache-Status: HIT)",
    ],
    sections: [
      {
        id: "nepal-network-reality",
        title: "1. The Reality of Mobile Performance in Nepal",
        level: 2,
        content: `While developers in Kathmandu often test websites on high-speed fiber internet (WorldLink, Vianet, Subisu with 100+ Mbps), **over 70% of real Nepali website visitors browse on mobile devices using NTC or Ncell 4G data packs**.

In real-world conditions outside Kathmandu valley—or even indoors in concrete buildings in Baneshwor or Lalitpur—mobile latency frequently spikes above **300ms**, and bandwidth drops to **1.5–3.0 Mbps**.

When your website loads 4MB unoptimized PNG hero banners and un-subsetted Google fonts, pages take **8 to 12 seconds to load**, causing 60%+ bounce rates.

### Core Web Vitals Targets:
- **LCP (Largest Contentful Paint):** $\\le 2.5\\text{s}$ (Time until main content renders).
- **INP (Interaction to Next Paint):** $\\le 200\\text{ms}$ (Smooth response to clicks and taps).
- **CLS (Cumulative Layout Shift):** $\\le 0.1$ (Zero jarring screen jumps).`,
      },
      {
        id: "lcp-hero-optimization",
        title: "2. Crushing Largest Contentful Paint (LCP < 2.5s)",
        level: 2,
        content: `The hero banner is almost always the LCP element. In Next.js, follow these rules:

1. Use \`priority\` on the above-the-fold hero image.
2. Specify modern format conversions (AVIF / WebP) in \`next.config.js\`.
3. Provide accurate \`sizes\` attributes so mobile browsers never download 4K desktop assets.`,
        codeTabs: [
          {
            language: "javascript",
            filename: "next.config.js",
            label: "Next.js Config",
            code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache for CDN edge
  },
};

module.exports = nextConfig;`,
          },
        ],
      },
      {
        id: "font-optimization",
        title: "3. Devanagari & Latin Font Subsetting (next/font)",
        level: 2,
        content: `Loading full multi-weight Google fonts like Mukta, Poppins, or Roboto can add 300KB+ of render-blocking CSS and font files.

Use \`next/font/google\` with explicit **subsetting** and \`display: 'swap'\`:`,
        codeTabs: [
          {
            language: "typescript",
            filename: "src/app/fonts.ts",
            label: "Font Subsetting",
            code: `import { Inter, Mukta } from "next/font/google";

// Latin typography for code and English headings
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Devanagari typography for Nepali text
export const mukta = Mukta({
  weight: ["400", "600", "700"],
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-mukta",
});`,
          },
        ],
      },
    ],
    commonErrors: [
      {
        error: "Image optimizer fails on Vercel: 'Source image exceeds max allowed size of 20MB'",
        cause: "Uploading raw DSLR camera photos directly into the /public folder.",
        solution: "Resize hero photos to a maximum width of 1920px and compress using Squoosh.app or Sharp CLI before committing to Git.",
      },
      {
        error: "Google PageSpeed warns 'Ensure text remains visible during webfont load'",
        cause: "Custom fonts without display: 'swap' causing FOIT (Flash of Invisible Text).",
        solution: "Specify display: 'swap' in your font declaration so a fallback system font is displayed instantly until custom glyphs download.",
      },
    ],
    securityConsiderations: [
      "Ensure third-party script sources are explicitly whitelisted in your Content Security Policy (CSP) headers.",
    ],
    faqs: [
      {
        question: "Does Cloudflare CDN help users located in Nepal?",
        answer: "Yes! Cloudflare has Edge Points of Presence (PoPs) in Kathmandu (KTM) peering directly with major Nepali ISPs like WorldLink and NTC, reducing asset latency from 150ms+ to under 15ms.",
      },
      {
        question: "Is AVIF supported on all Nepali smartphones?",
        answer: "AVIF is supported on Chrome for Android (version 85+) and Safari on iOS (version 16+). Next.js automatically falls back to WebP for older devices.",
      },
    ],
    summary: "Optimizing Core Web Vitals for Nepal means prioritizing mobile 4G latency with Next.js priority hero images, AVIF/WebP compression, font subsetting, and lazy-loading third-party analytics.",
    references: [
      { title: "Google Web Vitals Documentation", url: "https://web.dev/vitals/" },
      { title: "Next.js Image Optimization Guide", url: "https://nextjs.org/docs/app/building-your-application/optimizing/images" },
    ],
    relatedSlugs: [
      "point-com-np-domain-to-vercel-cloudflare-dns",
      "local-seo-nepal-google-business-profile",
      "nepal-developer-hosting-and-domain-hub",
    ],
  },
];
