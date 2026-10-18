import { BlogPost } from "../blog-types";
import { siteConfig } from "../data";

const authorManoj = {
  name: siteConfig.name,
  role: "Software Developer & Programming Instructor",
  avatar: siteConfig.profileImage,
  url: siteConfig.url,
};

export const clusterExtendedArticles: BlogPost[] = [
  // ─── Article 9: ConnectIPS Integration in PHP ─────────────────────
  {
    slug: "connectips-integration-php-rsa-key-signing-guide",
    title: "ConnectIPS Integration in PHP from Scratch: RSA Key Signing Explained for Beginners",
    description: "Learn how to integrate ConnectIPS (NCHL) in PHP and Laravel from scratch. Covers OpenSSL RSA SHA256 key signing, .pfx / .pem certificate extraction, UAT environment testing, and transaction verification.",
    category: "Payments",
    categorySlug: "payments",
    tags: ["ConnectIPS", "NCHL", "PHP", "Laravel", "RSA Signing", "OpenSSL", "Payment Gateway"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "14 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "PHP and Laravel developers building enterprise applications, tuition portals, or high-value B2B checkout systems in Nepal requiring bank-to-bank direct clearing via ConnectIPS.",
    prerequisites: [
      "PHP 8.1+ with OpenSSL extension enabled ('extension=openssl' in php.ini)",
      "ConnectIPS UAT test credentials and certificate (.pfx file) from NCHL",
      "Basic understanding of asymmetric cryptography (public and private keys)"
    ],
    whatYouWillLearn: [
      "The role of NCHL ConnectIPS in Nepal's National Payment Switch (NPS)",
      "How to extract private key (.pem) from ConnectIPS .pfx keystore using OpenSSL",
      "Building the token payload string and signing with OPENSSL_ALGO_SHA256",
      "Submitting to ConnectIPS UAT and verifying the transaction return token"
    ],
    sections: [
      {
        id: "connectips-overview",
        title: "1. Understanding ConnectIPS vs Wallets",
        level: 2,
        content: `ConnectIPS, operated by **Nepal Clearing House Limited (NCHL)**, is not a digital wallet. It is an account-to-account (A2A) payment gateway that debits the customer's commercial bank account directly and credits the merchant's account.

Because ConnectIPS deals with direct bank clearing, its security standards are stricter than wallets:
- eSewa and Khalti use shared symmetric keys (HMAC-SHA256).
- ConnectIPS uses **asymmetric Public Key Cryptography (RSA with SHA256)**. You must sign the payment payload with your private key, and ConnectIPS verifies it using your registered public key.`
      },
      {
        id: "certificate-extraction",
        title: "2. Extracting Your Private Key from .pfx Keystore",
        level: 2,
        content: `When NCHL provides your UAT credentials, they provide a certificate keystore file (e.g. \`CREDITMERCHANT.pfx\`) with a password. You must extract the private key into a \`.pem\` file:

\`\`\`bash
# Extract private key from .pfx file
openssl pkcs12 -in CREDITMERCHANT.pfx -nocerts -out connectips_private.pem -nodes
\`\`\`
Place \`connectips_private.pem\` in your non-public storage directory (e.g. \`storage/app/connectips/\`). Never put this file in your web root!`
      },
      {
        id: "php-signing-class",
        title: "3. Complete PHP Class for ConnectIPS RSA Signing",
        level: 2,
        content: `Here is a complete, standalone PHP class that signs the payload string using OpenSSL:`,
        codeTabs: [
          {
            language: "php",
            label: "ConnectIPS.php",
            filename: "app/Services/ConnectIPS.php",
            code: `<?php

namespace App\Services;

class ConnectIPS
{
    private string $merchantId;
    private string $appId;
    private string $appName;
    private string $privateKeyPath;

    public function __construct()
    {
        $this->merchantId = env('CONNECTIPS_MERCHANT_ID', '1234');
        $this->appId = env('CONNECTIPS_APP_ID', 'MER-1234-APP');
        $this->appName = env('CONNECTIPS_APP_NAME', 'TestMerchant');
        $this->privateKeyPath = storage_path('app/connectips/connectips_private.pem');
    }

    /**
     * Generate RSA-SHA256 Digital Signature
     */
    public function generateToken(string $txnId, float $amount, string $referenceId): string
    {
        // ConnectIPS strictly requires amount formatted in paisa (multiply NPR by 100)
        $amountInPaisa = (int) round($amount * 100);

        // Required Token String Format:
        // MER_ID={MER_ID},APP_NAME={APP_NAME},APP_ID={APP_ID},TXN_ID={TXN_ID},TXN_DATE={TXN_DATE},TXN_CRN_CY={TXN_CRN_CY},TXN_AMT={TXN_AMT},REFERENCE_ID={REFERENCE_ID},REMARKS={REMARKS},PARTICULARS={PARTICULARS},TOKEN=TOKEN
        $stringToSign = "MER_ID={$this->merchantId},APP_NAME={$this->appName},APP_ID={$this->appId},TXN_ID={$txnId},TXN_DATE=" . date('d-m-Y') . ",TXN_CRN_CY=NPR,TXN_AMT={$amountInPaisa},REFERENCE_ID={$referenceId},REMARKS=Payment,PARTICULARS=Order_{$txnId},TOKEN=TOKEN";

        // Read private key
        $privateKey = openssl_pkey_get_private(file_get_contents($this->privateKeyPath));
        if (!$privateKey) {
            throw new \\Exception("Failed to read ConnectIPS private key. Check path and permissions.");
        }

        // Compute binary signature using SHA256
        $signature = '';
        $success = openssl_sign($stringToSign, $signature, $privateKey, OPENSSL_ALGO_SHA256);
        openssl_free_key($privateKey);

        if (!$success) {
            throw new \\Exception("OpenSSL RSA signature generation failed.");
        }

        return base64_encode($signature);
    }
}`
          }
        ]
      }
    ],
    expectedOutput: "A cryptographically valid RSA signature that ConnectIPS UAT validates without 'Invalid Signature' errors.",
    testingSteps: [
      "Extract the .pem key from NCHL's UAT .pfx file using OpenSSL in terminal",
      "Instantiate ConnectIPS class and test signature generation with sample transaction ID",
      "Verify that openssl_sign returns true without OpenSSL errors in logs"
    ],
    commonErrors: [
      {
        error: "error:0906D06C:PEM routines:PEM_read_bio:no start line",
        cause: "OpenSSL cannot find '-----BEGIN PRIVATE KEY-----' header in connectips_private.pem.",
        solution: "Inspect your .pem file in a text editor to ensure it starts with standard PEM headers."
      }
    ],
    securityConsiderations: [
      "Set permissions on your private key file to chmod 600 so only the web server process can read it."
    ],
    faqs: [
      {
        question: "How do I get ConnectIPS UAT test credentials?",
        answer: "Contact NCHL business integration team (nchl.com.np) to request developer UAT credentials and a test merchant certificate package."
      }
    ],
    summary: "ConnectIPS uses RSA-SHA256 asymmetric signing. Extract your private key with OpenSSL, build the structured token string, and sign with OPENSSL_ALGO_SHA256.",
    references: [
      { title: "Nepal Clearing House (ConnectIPS)", url: "https://nchl.com.np/" }
    ],
    relatedSlugs: [
      "nepal-payment-gateway-integration-hub",
      "stop-spoofed-payment-verification-esewa-khalti-nepal"
    ]
  },

  // ─── Article 10: Dynamic Fonepay QR in Next.js ───────────────────
  {
    slug: "dynamic-fonepay-qr-integration-nextjs-guide",
    title: "Dynamic Fonepay QR Integration in Next.js: A Beginner’s Guide",
    description: "Generate and display real-time dynamic Fonepay merchant QR codes in Next.js App Router. Allow customers to pay using any Nepali mobile banking app and poll transaction status automatically.",
    category: "Payments",
    categorySlug: "payments",
    tags: ["Fonepay", "QR Code", "Next.js", "App Router", "TypeScript", "Payment Gateway"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "12 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Next.js and React developers building modern web checkouts in Nepal who want customers to scan and pay directly using commercial mobile banking apps.",
    prerequisites: [
      "A Next.js 14/15 project using the App Router",
      "Fonepay merchant test credentials from merchant.fonepay.com",
      "A client-side QR rendering library (e.g. 'qrcode.react')"
    ],
    whatYouWillLearn: [
      "How Fonepay dynamic QR generation works via their Merchant API",
      "Creating a Next.js Server Route Handler (/api/fonepay/generate-qr)",
      "Rendering dynamic QR codes on the frontend using SVG",
      "Implementing client-side status polling until payment is verified"
    ],
    sections: [
      {
        id: "fonepay-qr-flow",
        title: "1. The Fonepay Dynamic QR Architecture",
        level: 2,
        content: `Static QR stickers pasted on shops require the customer to type the amount manually. **Dynamic QR codes** generated via the Fonepay API embed the exact amount, merchant code, and unique invoice ID into the EMV QR string.

When the customer scans the QR with their mobile banking app (e.g. Nabil SmartBank, Global Smart Plus), the app automatically loads the exact NPR amount and merchant name. The user simply taps "Confirm".`
      },
      {
        id: "nextjs-route-handler",
        title: "2. Next.js Server Route Handler (app/api/fonepay/qr/route.ts)",
        level: 2,
        content: `In Next.js App Router, keep your Fonepay merchant secrets inside server route handlers:`,
        codeTabs: [
          {
            language: "typescript",
            label: "app/api/fonepay/qr/route.ts",
            filename: "app/api/fonepay/qr/route.ts",
            code: `import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { amount, orderId } = await req.json();

    const merchantCode = process.env.FONEPAY_MERCHANT_CODE || "FNPLTEST";
    const secretKey = process.env.FONEPAY_SECRET_KEY || "fonepay_test_key";
    
    // Format timestamp
    const dateStr = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
    
    // Hash fields for Fonepay API signature
    const hashData = \`\${merchantCode},\${orderId},\${amount},\${dateStr}\`;
    const signature = crypto.createHmac("sha512", secretKey).update(hashData).digest("hex");

    // Call Fonepay Dynamic QR API
    const res = await fetch("https://dev-clientapi.fonepay.com/api/merchant/merchantDetailsForThirdParty/thirdPartyMerchantQR", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchantCode,
        amount,
        remarks1: \`Order \${orderId}\`,
        prn: orderId,
        date: dateStr,
        signature
      })
    });

    const data = await res.json();
    return NextResponse.json({ success: true, qrString: data.qrMessage });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate QR" }, { status: 500 });
  }
}`
          }
        ]
      }
    ],
    expectedOutput: "A high-conversion checkout screen displaying a dynamic QR code that automatically updates to 'Payment Verified' when scanned.",
    testingSteps: [
      "Send a POST request to /api/fonepay/qr with amount and orderId",
      "Render the returned qrMessage string in a React QRCode component",
      "Simulate payment using Fonepay developer sandbox portal"
    ],
    commonErrors: [
      {
        error: "Signature mismatch on Fonepay API",
        cause: "Fonepay uses SHA512 (not SHA256) with specific parameter order.",
        solution: "Verify that crypto.createHmac('sha512', key) is used with the exact merchant code and timestamp."
      }
    ],
    securityConsiderations: [
      "Always verify payment status on the server before fulfilling digital downloads or credits."
    ],
    faqs: [
      {
        question: "Can any mobile banking app in Nepal scan Fonepay QR?",
        answer: "Yes, over 50 commercial, development, and microfinance banks in Nepal are members of the Fonepay network."
      }
    ],
    summary: "Dynamic Fonepay QR integration in Next.js allows customers to pay with any Nepali bank app without leaving your website.",
    references: [
      { title: "Fonepay Merchant Documentation", url: "https://merchant.fonepay.com" }
    ],
    relatedSlugs: [
      "nepal-payment-gateway-integration-hub",
      "khalti-epayment-v2-api-nodejs-express-guide"
    ]
  },

  // ─── Article 11: Stop Spoofed Payment Verification ────────────────
  {
    slug: "stop-spoofed-payment-verification-esewa-khalti-nepal",
    title: "Server-Side Payment Verification in Nepal: How to Stop Spoofed eSewa and Khalti Transactions",
    description: "Learn how malicious users spoof client-side eSewa and Khalti redirects in Nepal, and how to implement airtight server-to-server verification, amount checks, and replay prevention in Laravel and Node.js.",
    category: "Payments",
    categorySlug: "payments",
    tags: ["Payment Security", "Anti-Fraud", "eSewa", "Khalti", "Laravel", "Node.js", "Web Security"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "13 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Full-stack developers, e-commerce store owners, and SaaS creators in Nepal who want to protect their checkout from URL forgery and payment spoofing.",
    prerequisites: [
      "An active payment integration (eSewa, Khalti, or ConnectIPS)",
      "Basic understanding of SQL transactions and state machines"
    ],
    whatYouWillLearn: [
      "How attackers exploit beginner payment tutorials that rely solely on frontend redirects",
      "How to query gateway verification endpoints server-to-server with secret keys",
      "Preventing cart total manipulation ($10,000 cart paid with NPR 10)",
      "Database state machine architecture to prevent duplicate callback replay attacks"
    ],
    sections: [
      {
        id: "how-attackers-steal-goods",
        title: "How Attackers Steal Goods with Spoofed Redirects",
        level: 2,
        content: `Many beginner tutorials in Nepal end with this dangerous pattern:
\`\`\`javascript
// DANGEROUS CODE - DO NOT USE
router.get("/payment/success", async (req, res) => {
  // Attacker simply visits: /payment/success?order_id=105
  await Order.update({ id: req.query.order_id }, { status: "PAID" });
  res.send("Thank you! Your order has been delivered.");
});
\`\`\`
Any visitor can open DevTools, copy the success URL, and trigger order fulfillment without spending a single Rupee.

### The 4 Pillars of Secure Payment Verification:
1. **Never trust query parameters:** Never treat \`?status=COMPLETE\` in the browser URL as proof.
2. **Server-to-Server Lookup:** Your server must initiate an outbound HTTPS request directly to eSewa's status API or Khalti's \`/lookup/\` endpoint.
3. **Double-Verify the Amount:** Verify that \`response.total_amount === order.total_amount\`.
4. **Idempotent Transitions:** Ensure orders in state \`PAID\` cannot be re-triggered by repeated network callbacks.`
      }
    ],
    expectedOutput: "A hardened, fraud-proof payment pipeline that rejects spoofed callbacks and alerts administrators to tampered transactions.",
    testingSteps: [
      "Simulate an attack by visiting your success_url with a fake orderId in an incognito tab",
      "Verify that your server rejects the request with 400 Bad Request or unverified status",
      "Test legitimate sandbox payment and verify database order transitions atomically to PAID"
    ],
    commonErrors: [
      {
        error: "Ignoring duplicate webhook callbacks",
        cause: "Network retries trigger multiple order fulfillments, sending customers duplicate credits.",
        solution: "Use database atomic transactions and check if (order.status === 'PAID') return early."
      }
    ],
    securityConsiderations: [
      "Keep all payment transaction logs in an append-only audit table with timestamps and raw JSON payloads."
    ],
    faqs: [
      {
        question: "Can an attacker forge an eSewa HMAC-SHA256 signature?",
        answer: "No, as long as your secret key has never been committed to GitHub or exposed in frontend code. HMAC-SHA256 cannot be reverse-engineered without the secret key."
      }
    ],
    summary: "Frontend redirects are for user experience; server-to-server lookups are for financial truth. Always verify status, amounts, and enforce idempotency.",
    references: [
      { title: "OWASP Payment Gateway Cheat Sheet", url: "https://cheatsheetseries.owasp.org/" }
    ],
    relatedSlugs: [
      "esewa-payment-integration-laravel-12-complete-guide",
      "khalti-epayment-v2-api-nodejs-express-guide",
      "nepal-payment-gateway-integration-hub"
    ]
  },

  // ─── Article 12: React "Objects are not valid as a React child" ──
  {
    slug: "react-objects-are-not-valid-as-a-react-child-fix",
    title: "React “Objects are not valid as a React child”: What It Means and How to Fix It",
    description: "Fix the #1 rendering error in React and Next.js: 'Objects are not valid as a React child'. Learn why rendering raw JavaScript objects crashes your UI, how to inspect API data safely, and how to map object arrays.",
    category: "Troubleshooting",
    categorySlug: "troubleshooting",
    tags: ["React", "Next.js", "JavaScript", "JSX", "Debugging", "Error Fix"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "9 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "React and Next.js beginners who get a red screen crash: 'Error: Objects are not valid as a React child (found: object with keys {...})'.",
    prerequisites: [
      "A React or Next.js application fetching data from an API",
      "Basic understanding of JSX and JavaScript data types"
    ],
    whatYouWillLearn: [
      "Why React cannot render plain JavaScript objects inside JSX expressions",
      "The 3 most common scenarios that cause this error",
      "How to safely render object properties, array maps, and debug with JSON.stringify"
    ],
    sections: [
      {
        id: "why-this-error-happens",
        title: "Why React Throws This Error",
        level: 2,
        content: `In JSX, curly braces \`{expression}\` can only render **primitive values** (strings, numbers) or valid React Elements (like \`<div>\` or another component). React **cannot** render a plain JavaScript object \`{ ... }\` directly:

\`\`\`jsx
// THIS CRASHES REACT:
const user = { name: "Manoj", email: "manoj@example.com" };
return <div>Welcome, {user}!</div>; // 💥 Error!
\`\`\`

The exact error message reads:
\`\`\`bash
Error: Objects are not valid as a React child (found: object with keys {name, email}).
If you meant to render a collection of children, use an array instead.
\`\`\``
      },
      {
        id: "how-to-fix-it",
        title: "The 3 Solutions",
        level: 2,
        content: `### Solution 1: Access Specific Primitive Properties
Render strings or numbers directly:
\`\`\`jsx
<div>Welcome, {user.name}! ({user.email})</div>
\`\`\`

### Solution 2: Mapping Arrays of Objects
When rendering lists fetched from your backend, map over the array and return JSX:
\`\`\`jsx
<ul>
  {products.map((item) => (
    <li key={item.id}>{item.title} — NPR {item.price}</li>
  ))}
</ul>
\`\`\`

### Solution 3: Quick Debugging with JSON.stringify
If you want to inspect a raw object on screen during development:
\`\`\`jsx
<pre>{JSON.stringify(user, null, 2)}</pre>
\`\`\``
      }
    ],
    expectedOutput: "Clean, crash-free React component rendering with properly structured JSX property access.",
    testingSteps: [
      "Check your console for the line number pointing to the offending JSX curly brace",
      "Identify the variable inside {variable} and inspect its type using typeof or console.log",
      "Replace with primitive property access like {variable.title}"
    ],
    commonErrors: [
      {
        error: "Passing Date object directly in JSX",
        cause: "Writing <div>{new Date()}</div> instead of <div>{new Date().toLocaleDateString()}</div>.",
        solution: "Format dates to strings using toLocaleDateString() or date-fns."
      }
    ],
    securityConsiderations: [
      "Always validate that nested properties exist before accessing: {user?.profile?.bio} to prevent null pointer exceptions."
    ],
    faqs: [
      {
        question: "Can React render arrays?",
        answer: "Yes, React can render arrays of strings, numbers, or JSX elements (like [<span>A</span>, <span>B</span>]). It only rejects arrays containing raw object literals."
      }
    ],
    summary: "React cannot render raw object literals inside JSX. Always extract primitive strings or numbers, map over arrays with keys, or use JSON.stringify for debugging.",
    references: [
      { title: "React Official Docs: Rendering Lists", url: "https://react.dev/learn/rendering-lists" }
    ],
    relatedSlugs: [
      "beginner-developer-debugging-hub",
      "nextjs-hydration-error-causes-and-fixes"
    ]
  },

  // ─── Article 13: Next.js "Module not found: Can't resolve 'fs'" ──
  {
    slug: "nextjs-module-not-found-cant-resolve-fs-fix",
    title: "“Module not found: Can’t resolve ‘fs’” in Next.js: Why It Happens and How to Fix It",
    description: "Fix the classic Next.js App Router error 'Module not found: Can't resolve fs'. Understand the boundary between Server Components and Client Components, and learn where file operations belong.",
    category: "Troubleshooting",
    categorySlug: "troubleshooting",
    tags: ["Next.js", "App Router", "Node.js", "fs", "Webpack", "Debugging"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "10 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Next.js developers who try to read files or use Node.js libraries and get 'Module not found: Can't resolve 'fs' (or 'path', 'crypto')'.",
    prerequisites: [
      "A Next.js 13, 14, or 15 application using App Router or Pages Router"
    ],
    whatYouWillLearn: [
      "Why Node.js modules like 'fs' cannot run inside the user's web browser",
      "The difference between Server Components and Client Components ('use client')",
      "How to move file operations to Route Handlers or Server Components safely"
    ],
    sections: [
      {
        id: "the-server-client-boundary",
        title: "Why Browsers Cannot Import 'fs'",
        level: 2,
        content: `Node.js's \`fs\` (file system) module interacts with physical hard drives. For obvious security and architectural reasons, **web browsers cannot access local file systems**.

In Next.js App Router:
- **Server Components (default):** Run only on the server. You can freely import \`fs\`, \`path\`, and server libraries.
- **Client Components (\`'use client'\`):** Are bundled by Webpack and sent to the browser.
If you import \`fs\` into a component marked with \`'use client'\`, Webpack fails with:
\`\`\`bash
./src/components/MyComponent.tsx
Module not found: Can't resolve 'fs'
\`\`\``
      },
      {
        id: "how-to-fix-fs-error",
        title: "The Correct Architectural Fix",
        level: 2,
        content: `### Fix 1: Keep 'fs' in a Server Component
Remove \`'use client'\` if your component does not use React hooks (\`useState\`, \`useEffect\`) or click listeners:
\`\`\`tsx
// app/blog/[slug]/page.tsx (Server Component by default)
import fs from "fs";
import path from "path";

export default function BlogPostPage() {
  const content = fs.readFileSync(path.join(process.cwd(), "content.txt"), "utf-8");
  return <div>{content}</div>;
}
\`\`\`

### Fix 2: Move File Logic to a Route Handler
If your client component needs file data, create a Server Route Handler:
\`\`\`typescript
// app/api/file/route.ts
import { NextResponse } from "next/server";
import fs from "fs";

export async function GET() {
  const data = fs.readFileSync("my-file.json", "utf-8");
  return NextResponse.json(JSON.parse(data));
}
\`\`\`
And fetch it from your client component with \`fetch('/api/file')\`.`
      }
    ],
    expectedOutput: "A cleanly decoupled Next.js application where server-only operations execute safely on Node.js without browser bundle errors.",
    testingSteps: [
      "Inspect the file throwing the error: check if it has 'use client' at the top",
      "Move all Node.js built-ins (fs, path, child_process) to server-only files",
      "Re-run 'npm run dev' and confirm build compiles without Webpack errors"
    ],
    commonErrors: [
      {
        error: "Adding webpack fallback: { fs: false } in next.config.js blindly",
        cause: "Masks the error by providing an empty stub, but calls to fs.readFile will still fail at runtime with 'fs.readFile is not a function'.",
        solution: "Do not mock fs. Move the logic to a Server Component or Route Handler."
      }
    ],
    securityConsiderations: [
      "Never allow user-supplied strings directly into fs.readFileSync to prevent Path Traversal vulnerabilities."
    ],
    faqs: [
      {
        question: "Can I use 'server-only' package to catch this earlier?",
        answer: "Yes! Run 'npm install server-only' and add 'import \"server-only\"' at the top of any file using 'fs'. Next.js will give you a clear build-time error if imported into a client component."
      }
    ],
    summary: "Node built-ins like 'fs' cannot execute in the browser. Move file system operations to Next.js Server Components or API Route Handlers.",
    references: [
      { title: "Next.js Server and Client Components", url: "https://nextjs.org/docs/app/building-your-application/rendering" }
    ],
    relatedSlugs: [
      "beginner-developer-debugging-hub",
      "nextjs-hydration-error-causes-and-fixes"
    ]
  },

  // ─── Article 14: Next.js Hydration Error Causes and Fixes ────────
  {
    slug: "nextjs-hydration-error-causes-and-fixes",
    title: "Next.js Hydration Error: Causes and Fixes for Beginners (2026 Guide)",
    description: "Understand and fix the confusing 'Hydration failed because the initial UI does not match what was rendered on the server' error in Next.js. Covers date formatting, localStorage, and suppressHydrationWarning.",
    category: "Troubleshooting",
    categorySlug: "troubleshooting",
    tags: ["Next.js", "Hydration Error", "React", "SSR", "App Router", "Debugging"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "11 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Developers whose Next.js app flashes with a red hydration mismatch error in local development or logs 'Text content did not match' in production.",
    prerequisites: [
      "A Next.js application using SSR (Server-Side Rendering) or SSG"
    ],
    whatYouWillLearn: [
      "What React 'Hydration' actually does under the hood",
      "Why browser-only values (Date, window, localStorage) trigger mismatches",
      "The 4 practical patterns to eliminate hydration errors permanently"
    ],
    sections: [
      {
        id: "what-is-hydration",
        title: "What is Hydration in Next.js?",
        level: 2,
        content: `When a user visits a Next.js page:
1. **Server Rendering:** Next.js renders the React tree into raw HTML on the server and sends it to the browser for instant loading.
2. **Hydration:** The browser loads JavaScript, walks the existing HTML DOM, and attaches event listeners (clicks, inputs).

If the HTML generated on the server differs from the initial render in the browser by even one character, React panics and throws:
\`\`\`bash
Error: Hydration failed because the initial UI does not match what was rendered on the server.
Warning: Expected server HTML to contain a matching text content...
\`\`\``
      },
      {
        id: "the-4-hydration-causes",
        title: "The 4 Main Causes and Solutions",
        level: 2,
        content: `### 1. Rendering Dates or Timestamps
Rendering \`new Date().toLocaleTimeString()\` produces one time on your server (UTC/NPT) and another time on the user's browser:
**Fix:** Format dates after mounting with \`useEffect\`, or use \`suppressHydrationWarning\`:
\`\`\`tsx
<span suppressHydrationWarning>{new Date(date).toLocaleDateString()}</span>
\`\`\`

### 2. Reading localStorage or window on First Render
Server has no \`window\` or \`localStorage\`, so reading them during render causes mismatches:
**Fix:** Use an \`isMounted\` state pattern:
\`\`\`tsx
const [theme, setTheme] = useState("dark");
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
}, []);

if (!mounted) return null; // or skeleton placeholder
return <div>Theme: {theme}</div>;
\`\`\`

### 3. Invalid HTML Tag Nesting
Writing a \`<div>\` inside a \`<p>\`, or a \`<tr>\` directly inside a \`<table>\` without \`<tbody>\`, causes browser HTML parsers to auto-correct the DOM, breaking React's matching:
**Fix:** Always ensure valid HTML semantic nesting (e.g. use \`<span>\` inside \`<p>\`, never \`<div>\`).`
      }
    ],
    expectedOutput: "Smooth, error-free React hydration without flashes of unstyled content or console error warnings.",
    testingSteps: [
      "Check terminal and browser console for the exact DOM diff printed by Next.js",
      "Look for invalid HTML nesting or un-synchronized dates",
      "Wrap browser-only features in useEffect with a mounted state flag"
    ],
    commonErrors: [
      {
        error: "Putting suppressHydrationWarning on every element",
        cause: "Using suppressHydrationWarning indiscriminately hides real state bugs instead of fixing the underlying mismatch.",
        solution: "Use suppressHydrationWarning only on dynamic timestamps or text where server and client time differences are unavoidable."
      }
    ],
    securityConsiderations: [
      "Avoid rendering unescaped user inputs when resolving hydration differences."
    ],
    faqs: [
      {
        question: "Do hydration errors break production websites?",
        answer: "In production, React attempts to recover by throwing away server HTML and re-rendering the whole tree on the client. While the page may still work, it damages performance and causes a jarring visual flicker."
      }
    ],
    summary: "Hydration errors occur when server-rendered HTML differs from the initial client render. Fix invalid HTML nesting, defer localStorage reads until mount, and use suppressHydrationWarning for dates.",
    references: [
      { title: "Next.js Docs: Text content does not match server-rendered HTML", url: "https://nextjs.org/docs/messages/react-hydration-error" }
    ],
    relatedSlugs: [
      "react-objects-are-not-valid-as-a-react-child-fix",
      "beginner-developer-debugging-hub"
    ]
  },

  // ─── Article 15: Full-Stack Roadmap for Nepali Students ──────────
  {
    slug: "bca-csit-full-stack-roadmap-nepal-students",
    title: "Full-Stack Roadmap for Nepali Students (BCA/BSc CSIT): Project-Based, Not Tutorial Hell",
    description: "A pragmatic, semester-by-semester project-based roadmap for BCA, BSc CSIT, and BIT students in Nepal. Which technologies to master each semester, what localized projects to build, and how to get internship-ready.",
    category: "Career & Projects",
    categorySlug: "career-projects",
    tags: ["Full Stack Roadmap", "BCA Nepal", "CSIT Nepal", "Web Development", "Student Guide"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "15 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Computer science and IT college students in Nepal who feel their college curriculum is too theoretical and want a realistic, project-driven roadmap to become employable software developers.",
    prerequisites: [
      "Access to a computer or laptop with internet access",
      "Enrolled in BCA, BSc CSIT, BE Computer, BIM, BIT, or learning independently"
    ],
    whatYouWillLearn: [
      "Semester 1 to Semester 8 milestones: what to learn and what projects to build",
      "How to escape 'tutorial hell' by building software that solves problems in your community",
      "Which local tech communities, meetups, and open-source opportunities to join in Nepal"
    ],
    sections: [
      {
        id: "the-4-stages",
        title: "The 4 Practical Stages of the Student Roadmap",
        level: 2,
        content: `### Stage 1 (Semesters 1 & 2): Foundations & Core Web
- **Core Focus:** Git, HTML5 semantic structure, CSS3 (Flexbox & Grid), modern JavaScript (ES6+, DOM manipulation, fetch API).
- **Milestone Project:** Build your personal portfolio and host it on a free \`.com.np\` domain on Vercel or GitHub Pages.

### Stage 2 (Semesters 3 & 4): Backend & Relational Databases
- **Core Focus:** Pick ONE primary backend: **PHP/Laravel** OR **Node.js/Express**. Master MySQL relational database design, foreign keys, migrations, authentication, and REST APIs.
- **Milestone Project:** Build a College Notice Board or Room Finder API with user roles (Admin, Student, Owner).

### Stage 3 (Semesters 5 & 6): Frontend Frameworks & Payment Gateways
- **Core Focus:** React / Next.js, state management, connecting frontend to backend APIs, and integrating **eSewa** or **Khalti** payment gateways.
- **Milestone Project:** Build a Tuition Fee Payment Tracker or Local Shop Inventory System with working online checkout.

### Stage 4 (Semesters 7 & 8): Deployment, Testing & Career
- **Core Focus:** Linux terminal basics, Nginx reverse proxy, Docker basics, CI/CD with GitHub Actions, technical interview preparation.
- **Milestone:** Land a paid 3-month software engineering internship in Kathmandu or remote contract role.`
      }
    ],
    expectedOutput: "A clear, actionable educational path with zero wasted time on dead-end tutorials.",
    testingSteps: [
      "Audit your current semester against the 4 stages above",
      "Commit to building at least 1 deployed full-stack project every semester",
      "Publish your project code on GitHub with clear documentation"
    ],
    commonErrors: [
      {
        error: "Jumping into React before understanding JavaScript Array methods and Promises",
        cause: "Struggling with React state and effects because foundational JavaScript concepts were skipped.",
        solution: "Spend 3 focused weeks on pure JavaScript: map, filter, reduce, async/await, and closures before touching React."
      }
    ],
    securityConsiderations: [
      "Practice good security from day one: never commit .env files or passwords to GitHub repositories."
    ],
    faqs: [
      {
        question: "Should I learn Python/Django or Laravel/Node in Nepal?",
        answer: "For web development jobs in Nepal, Laravel and Node.js have significantly higher job availability and internship openings compared to Django. Python is predominantly used in Nepal for Data Science and Machine Learning roles."
      }
    ],
    summary: "Stop watching endless video courses without building. Focus on 1 stack, build 1 deployed project per semester, and prove your capabilities with public code on GitHub.",
    references: [
      { title: "Tribhuvan University IOST Curriculum", url: "https://iost.tu.edu.np" }
    ],
    relatedSlugs: [
      "nepal-developer-career-and-student-guide-hub",
      "first-it-internship-interview-questions-nepal"
    ]
  },

  // ─── Article 16: Freelancing from Nepal Guide ────────────────────
  {
    slug: "freelancing-from-nepal-pan-foreign-payments-guide",
    title: "Freelancing from Nepal as a Beginner: PAN Registration, Foreign Payments, and Your First Client",
    description: "The complete legal and financial guide to freelancing from Nepal in 2026. How to get a personal PAN, receive foreign USD remittances legally, pay the 5% TDS, issue an NRB Dollar Card, and land your first client on Upwork or LinkedIn.",
    category: "Career & Projects",
    categorySlug: "career-projects",
    tags: ["Freelancing", "Nepal Tax", "PAN", "Dollar Card", "Upwork", "Remittance", "Career"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "14 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Developers and students in Nepal who want to earn in foreign currencies (USD, EUR, AUD) legally through freelancing, remote contracts, or digital services.",
    prerequisites: [
      "A valid Nepali Citizenship Certificate or Passport",
      "A bank account at any commercial bank in Nepal"
    ],
    whatYouWillLearn: [
      "How to register for a Permanent Account Number (PAN) in 10 minutes via Nagrik App",
      "The legal framework: understanding Nepal Rastra Bank's 5% final TDS on software export",
      "How to issue an NRB $500 Dollar Prepaid Card for international cloud services",
      "The best legal payment rails: Direct Bank SWIFT wire, Payoneer, and Wise to Nepal bank"
    ],
    sections: [
      {
        id: "legal-pan-and-tax",
        title: "1. The Legal Framework: PAN & 5% Final TDS in Nepal",
        level: 2,
        content: `Freelancing in Nepal is 100% legal provided you operate through formal banking channels:
1. **Personal PAN (Permanent Account Number):** By law, any individual earning taxable income in Nepal must possess a PAN. You can apply for free via the **Nagarik App** or the Inland Revenue Department (IRD) portal.
2. **The 5% Final Withholding Tax (TDS):** Under the current Income Tax Act and Nepal Rastra Bank monetary circulars, foreign currency income earned by individuals through IT services, programming, and software export received directly into a commercial bank account is taxed at **5% TDS as a final tax**. The commercial bank automatically withholds 5% upon currency conversion and deposits it to the government.`
      },
      {
        id: "receiving-foreign-payments",
        title: "2. The Best Channels to Receive Foreign Payments",
        level: 2,
        content: `Never use informal crypto or Hundi networks. Use these three verified banking channels:
- **Direct Bank SWIFT Wire Transfer:** Provide your client with your Bank Name, Account Name, Account Number, and the bank's **SWIFT Code** (e.g. \`NARBNPKK\` for Nabil Bank). Funds convert directly to NPR at official daily exchange rates.
- **Payoneer to Nepali Bank:** Ideal for Upwork and Fiverr withdrawals. Payoneer allows you to withdraw USD directly into your Nepali bank account in NPR within 24 to 48 hours.
- **Wise / Remitly Direct to Bank:** Clients can send payments via Wise or Remitly directly into your Nepali bank account in minutes.`
      }
    ],
    expectedOutput: "A fully legal, compliant freelancing business setup capable of receiving international foreign currency wires directly into Nepali bank accounts.",
    testingSteps: [
      "Install Nagarik App and verify your citizenship details",
      "Generate your personal PAN number instantly",
      "Provide your PAN to your commercial bank branch to ensure compliance"
    ],
    commonErrors: [
      {
        error: "Receiving foreign income through crypto/USDT wallets",
        cause: "Cryptocurrency trading and transactions are illegal under Nepal Rastra Bank regulations and risk account freezing.",
        solution: "Always receive funds via licensed banking and remittance channels directly to your commercial bank."
      }
    ],
    securityConsiderations: [
      "Always sign a written contract or statement of work (SOW) defining scope, milestones, and payment terms before beginning work."
    ],
    faqs: [
      {
        question: "Can I get an international dollar card with my personal PAN?",
        answer: "Yes. With a valid personal PAN and passport, any commercial bank in Nepal will issue a Dollar Prepaid Card (up to $500 per fiscal year) usable for GitHub, domain registration, and cloud servers."
      }
    ],
    summary: "Freelancing legally from Nepal requires a personal PAN, banking compliance, and paying 5% final TDS. Use official SWIFT, Payoneer, or Wise transfers for peace of mind.",
    references: [
      { title: "Nepal Rastra Bank", url: "https://www.nrb.org.np" },
      { title: "Nagarik App Government Portal", url: "https://nagarikapp.gov.np" }
    ],
    relatedSlugs: [
      "nepal-developer-career-and-student-guide-hub",
      "first-it-internship-interview-questions-nepal"
    ]
  },

  // ─── Article 17: MERN vs Laravel vs Next.js in 2026 ──────────────
  {
    slug: "mern-vs-laravel-vs-nextjs-nepal-2026",
    title: "MERN vs Laravel vs Next.js: What Should Nepali Students Learn First in 2026?",
    description: "A data-backed comparison of MERN Stack, Laravel, and Next.js for the job market in Nepal. Understand hiring trends in Kathmandu, salary expectations, learning curves, and recommendations based on your career goals.",
    category: "Career & Projects",
    categorySlug: "career-projects",
    tags: ["MERN Stack", "Laravel", "Next.js", "Web Development", "Nepal Tech Jobs", "Career"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "13 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Beginner developers and students in Nepal debating which programming stack to focus on to maximize internship and job opportunities in 2026.",
    prerequisites: [
      "Basic understanding of frontend and backend concepts"
    ],
    whatYouWillLearn: [
      "The job market breakdown in Kathmandu: which companies hire Laravel vs. MERN vs. Next.js",
      "Pros and cons of each stack for learning velocity and software architecture",
      "Clear recommendation based on your goals: local company job vs. freelance vs. international remote"
    ],
    sections: [
      {
        id: "stack-comparison-2026",
        title: "The State of Web Development Stacks in Nepal",
        level: 2,
        content: `When students ask *'Which stack has more jobs in Nepal?'*, the honest answer depends on the type of company:

### 1. Laravel (PHP): The Backbone of Nepali Business Systems
- **Where it dominates:** Local IT software houses, government contracts, banking portals, schools/colleges, enterprise ERPs, and small business agencies.
- **Why companies love it:** It has built-in authentication, ORM, migrations, queues, and mailers. Developers build features quickly without stitching 20 separate libraries together.
- **Hiring volume in Nepal:** **Extremely High.**

### 2. MERN Stack (React + Node.js): The Startup Standard
- **Where it dominates:** Tech startups, software export houses, and modern web applications.
- **Why companies love it:** One language (JavaScript/TypeScript) across frontend and backend. Huge npm ecosystem.
- **Hiring volume in Nepal:** **High.**

### 3. Next.js (Full Stack React): The Modern Frontier
- **Where it dominates:** Global remote companies hiring Nepali contractors, high-performance blogs, e-commerce, and modern SaaS.
- **Why developers love it:** Server Components, built-in SEO optimizations, and seamless Vercel edge deployment.
- **Hiring volume in Nepal:** **Fastest Growing (especially for international remote contracts).**`
      }
    ],
    expectedOutput: "Clarity on which tech stack to commit to for the next 6 months to avoid decision fatigue.",
    testingSteps: [
      "Review job listings on LinkedIn, MeroJob, and jobsnepal.com filtering by 'Laravel' vs 'React'",
      "Choose 1 stack and build 2 complete applications before switching"
    ],
    commonErrors: [
      {
        error: "Stack hopping every 3 weeks",
        cause: "Switching from Laravel to MERN, then to Django, then to Go because of social media hype.",
        solution: "Stick with 1 stack for at least 6 continuous months. Core software principles transfer easily once one stack is mastered."
      }
    ],
    securityConsiderations: [
      "Whichever framework you choose, master its built-in security features (CSRF, SQL Injection defenses, Password hashing)."
    ],
    faqs: [
      {
        question: "Can I learn Next.js without learning React first?",
        answer: "No. Next.js is built on React. You must understand React components, props, state, hooks, and JSX before understanding Next.js server-side rendering and Server Components."
      }
    ],
    summary: "If you want immediate local jobs in Nepal, Laravel has the highest volume. If you want startup or international remote roles, MERN and Next.js offer the highest flexibility.",
    references: [
      { title: "Laravel Official Documentation", url: "https://laravel.com" },
      { title: "Next.js Official Documentation", url: "https://nextjs.org" }
    ],
    relatedSlugs: [
      "bca-csit-full-stack-roadmap-nepal-students",
      "nepal-developer-career-and-student-guide-hub"
    ]
  }
];
