import { BlogPost } from "../blog-types";
import { siteConfig } from "../data";

const authorManoj = {
  name: siteConfig.name,
  role: "Software Developer & Programming Instructor",
  avatar: siteConfig.profileImage,
  url: siteConfig.url,
};

export const pillarHubArticles: BlogPost[] = [
  {
    slug: "nepal-payment-gateway-integration-hub",
    title: "Nepal Payment Gateway Integration Hub: eSewa, Khalti, ConnectIPS, and Fonepay (2026 Developer Guide)",
    description: "The complete architectural and practical hub for integrating online payments in Nepal. Compare transaction fees, sandbox testing, SDK support, HMAC signatures, and server-side verification across eSewa v2, Khalti v2, ConnectIPS, and Fonepay QR.",
    category: "Hubs & Guides",
    categorySlug: "hubs-guides",
    tags: ["eSewa", "Khalti", "ConnectIPS", "Fonepay", "Payment Gateway", "Nepal FinTech", "Laravel", "Node.js"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "16 min read",
    author: authorManoj,
    featured: true,
    whoIsThisFor: "Web developers, SaaS founders, freelance engineers, and computer science students in Nepal implementing digital payments in PHP, Laravel, Node.js, Next.js, or mobile applications.",
    prerequisites: [
      "Working knowledge of backend APIs (Node.js/Express, Laravel, or Python)",
      "Understanding of cryptographic hashing (HMAC-SHA256 and RSA)",
      "A test merchant account on eSewa Developer Portal or Khalti Merchant Portal",
      "Basic understanding of HTTP request-response lifecycles and webhooks"
    ],
    whatYouWillLearn: [
      "Direct feature-by-feature comparison of eSewa, Khalti, ConnectIPS, and Fonepay",
      "KYC documentation and merchant registration requirements for personal vs. registered business entities",
      "Security best practices: preventing client-side spoofing, replay attacks, and duplicate order fulfillment",
      "A structured decision tree: which gateway to pick for your startup, e-commerce store, or college project",
      "Direct links and learning pathways for step-by-step code implementations"
    ],
    sections: [
      {
        id: "payment-landscape-nepal",
        title: "The Digital Payment Ecosystem in Nepal: 2026 Overview",
        level: 2,
        content: `Nepal's digital payment ecosystem has matured rapidly under the regulatory oversight of Nepal Rastra Bank (NRB). Today, digital transactions represent billions of NPR monthly. For developers building software in Nepal, supporting digital checkout is no longer optional—it is a core requirement.

Four major payment providers dominate the Nepali market, each serving distinct use cases:
1. **eSewa:** The pioneer wallet in Nepal with the highest consumer user base. Uses **ePay v2** with HMAC-SHA256 signature verification.
2. **Khalti:** Modern, developer-centric wallet and payment aggregator. Offers **Khalti ePayment v2 API** with clean RESTful JSON endpoints and server-side status lookup.
3. **ConnectIPS (NCHL):** Bank-to-bank direct debit clearing service operated by Nepal Clearing House. Lower merchant fees for large transactions, but requires stricter RSA cryptographic signing.
4. **Fonepay:** Nepal's largest interoperable QR network. Perfect for in-person dynamic QR generation or web checkout using mobile banking apps.`,
        table: {
          headers: ["Gateway", "Primary Mechanism", "Integration Complexity", "Fee Structure (Approx.)", "Best Used For"],
          rows: [
            ["eSewa (ePay v2)", "Wallet redirect + HMAC-SHA256", "Beginner / Intermediate", "2.0% – 3.0%", "General retail e-commerce, consumer subscriptions"],
            ["Khalti (ePayment v2)", "REST JSON API (`pidx`) + redirect", "Beginner Friendly", "2.0% – 2.5%", "Modern web apps, MERN stack, developer-first startups"],
            ["ConnectIPS", "Direct bank debit + RSA SHA256", "Advanced (Cryptographic keys)", "Flat NPR 2 – 8 per txn", "High-value B2B transactions, tuition, official fees"],
            ["Fonepay QR", "Dynamic Interoperable EMV QR", "Intermediate (Next.js/APIs)", "1.5% – 2.0%", "Mobile banking users across 50+ commercial banks"]
          ]
        }
      },
      {
        id: "start-here-decision-tree",
        title: "Which Payment Gateway Should You Integrate First?",
        level: 2,
        content: `If you are starting a new project in Nepal, choose your gateway based on your current project phase and entity status:

- **For College Projects, Portfolios, and Learning:**
  Start with **Khalti ePayment v2**. Khalti offers immediate sandbox key generation without business registration documents, has comprehensive REST documentation, and returns clear JSON error messages.
- **For High-Volume Consumer E-Commerce in Nepal:**
  Integrate **eSewa** first. Because eSewa has over 7 million registered wallets, it is the payment method Nepali consumers search for on checkout pages.
- **For Large Ticket Transactions (Tuition, Vehicles, Real Estate):**
  Integrate **ConnectIPS**. High percentage transaction fees (2.5%) on a NPR 100,000 transaction cost NPR 2,500 on wallets, whereas ConnectIPS charges a flat micro-fee of around NPR 5 to NPR 10.
- **For Multi-Bank Mobile App Checkouts:**
  Integrate **Fonepay Dynamic QR**. This allows customers to scan using Global IME, Nabil, NIC Asia, or any banking app directly.`,
        callout: {
          type: "tip",
          title: "Multi-Gateway Architecture Pattern",
          text: "Never tightly couple your checkout controller to one provider. Create an abstract PaymentGatewayInterface in your application with initiate(), verify(), and refund() methods. This enables you to toggle eSewa, Khalti, or ConnectIPS without rewriting order fulfillment logic."
        }
      },
      {
        id: "core-security-rules",
        title: "Non-Negotiable Payment Security Rules",
        level: 2,
        content: `Regardless of which gateway you choose, beginner developers routinely commit catastrophic security mistakes that allow malicious actors to spoof transactions. Memorize these golden rules:

1. **Client-side redirects are NOT proof of payment:** When a user returns to your \`success_url\`, your server MUST NOT mark the order as paid immediately. Users can copy the success URL with forged query parameters.
2. **Server-to-Server Verification is mandatory:** Your backend server must make an independent HTTPS request to the gateway's verification endpoint (e.g. eSewa status API or Khalti \`/epayment/lookup/\`) using your secret key.
3. **Verify the Amount and Currency:** Compare the amount returned by the gateway with the exact amount recorded in your database before fulfillment. Attackers will attempt to change a NPR 10,000 cart to NPR 10.
4. **Enforce Idempotency:** Payment gateways may send duplicate callbacks due to network retries. Ensure your payment handler checks if the transaction has already been fulfilled to prevent duplicate credits.`,
        codeTabs: [
          {
            language: "typescript",
            label: "Node.js Idempotent Verification",
            filename: "services/paymentVerification.ts",
            code: `// Example of safe, idempotent order fulfillment logic
export async function fulfillOrderSafely(transactionUuid: string, paidAmount: number) {
  const order = await db.orders.findOne({ transactionUuid });
  if (!order) {
    throw new Error("Order not found");
  }

  // Check state machine: Prevent duplicate fulfillment
  if (order.status === "PAID") {
    console.warn(\`Duplicate callback ignored for order: \${transactionUuid}\`);
    return { success: true, message: "Already fulfilled" };
  }

  // Strict verification: Verify amount match
  if (order.totalAmount !== paidAmount) {
    await db.orders.updateOne({ transactionUuid }, { status: "SUSPICIOUS_AMOUNT_MISMATCH" });
    throw new Error("Fraud alert: Paid amount does not match recorded order amount");
  }

  // Update status atomically
  await db.orders.updateOne(
    { transactionUuid },
    { 
      status: "PAID",
      paidAt: new Date(),
      paymentVerifiedVia: "SERVER_API"
    }
  );

  return { success: true, message: "Order fulfilled securely" };
}`
          }
        ]
      },
      {
        id: "curated-cluster-tutorials",
        title: "Comprehensive Cluster Tutorials & Code Guides",
        level: 2,
        content: `Explore our detailed, step-by-step guides for implementing each provider in production:

- [eSewa Payment Integration in Laravel 12](/blog/esewa-payment-integration-laravel-12-complete-guide): Complete controller, routes, CSRF bypass, and HMAC-SHA256 verification.
- [Khalti ePayment v2 in Node.js/Express](/blog/khalti-epayment-v2-api-nodejs-express-guide): REST client, \`pidx\` session handling, and lookup verification.
- [Solving the 'Invalid Signature' Error in eSewa](/blog/esewa-invalid-signature-error-causes-and-fixes): 5 root causes, encoding bugs, and exact fixes.
- [ConnectIPS Integration in PHP from Scratch](/blog/connectips-integration-php-rsa-key-signing-guide): RSA-SHA256 private/public key generation and settlement.
- [Dynamic Fonepay QR in Next.js](/blog/dynamic-fonepay-qr-integration-nextjs-guide): Real-time merchant QR code rendering on the web.
- [Stop Spoofed Payment Verification](/blog/stop-spoofed-payment-verification-esewa-khalti-nepal): Advanced anti-spoofing and replay attack prevention.`
      }
    ],
    expectedOutput: "A robust conceptual and architectural roadmap that allows any developer in Nepal to select, design, and securely integrate payment systems without common amateur vulnerabilities.",
    testingSteps: [
      "Review the gateway comparison matrix against your company's or project's entity status",
      "Register a developer account on developer.esewa.com.np and admin.khalti.com",
      "Bookmark the cluster tutorials matching your chosen tech stack (Laravel, Node.js, Next.js)",
      "Set up test environment variables in your local .env file before writing code"
    ],
    commonErrors: [
      {
        error: "Hardcoding Secret Keys in Client-Side JavaScript",
        cause: "Placing merchant credentials in React, Vue, or frontend HTML where any visitor can inspect source code.",
        solution: "Move all secret keys to server-side .env files. Only public merchant codes belong in frontend forms."
      },
      {
        error: "Allowing Decimal Precision Mismatches",
        cause: "Sending 100.5 to gateway while database has 100.50, causing signature validation or verification failure.",
        solution: "Normalize all amounts using number_format($amt, 2, '.', '') or Number(amt).toFixed(2)."
      }
    ],
    securityConsiderations: [
      "Never trust client redirects without server-to-server transaction status queries.",
      "Store payment callback logs with raw payloads in a separate audit table for financial reconciliation.",
      "Use HTTPS on all environments except local development to prevent man-in-the-middle payload tampering."
    ],
    faqs: [
      {
        question: "Can I accept payments with eSewa or Khalti without a registered company in Nepal?",
        answer: "For production live credentials, eSewa and ConnectIPS legally require a registered business (PAN/VAT certificate, company registration, and bank account). However, Khalti allows personal developer sandboxes for testing, and recently introduced personal merchant onboarding for registered individual taxpayers."
      },
      {
        question: "How long does merchant settlement take into my Nepali bank account?",
        answer: "Wallets like eSewa and Khalti typically settle funds on a T+1 business day basis into your linked commercial bank account. ConnectIPS settles directly into your designated bank account according to NCHL clearing sessions."
      }
    ],
    summary: "Nepal's digital payment ecosystem offers world-class wallet and banking infrastructure. Success comes down to selecting the right provider for your audience, adhering strictly to server-side cryptographic verification, and enforcing idempotency.",
    references: [
      { title: "eSewa Official Developer Documentation", url: "https://developer.esewa.com.np/" },
      { title: "Khalti ePayment API Documentation", url: "https://docs.khalti.com/" },
      { title: "Nepal Clearing House (ConnectIPS)", url: "https://nchl.com.np/" }
    ],
    relatedSlugs: [
      "esewa-payment-integration-laravel-12-complete-guide",
      "khalti-epayment-v2-api-nodejs-express-guide",
      "esewa-invalid-signature-error-causes-and-fixes",
      "stop-spoofed-payment-verification-esewa-khalti-nepal"
    ]
  },
  {
    slug: "nepal-developer-hosting-and-domain-hub",
    title: "Nepal Developer Hosting & Domain Hub: Free .np Domains, cPanel, Cloudflare, and VPS (2026 Guide)",
    description: "The complete technical deployment guide for developers in Nepal. How to register a free .com.np domain, configure Cloudflare DNS, deploy Laravel on budget cPanel hosting, and run full-stack MERN apps on Ubuntu VPS.",
    category: "Hubs & Guides",
    categorySlug: "hubs-guides",
    tags: [".com.np", "DNS", "cPanel", "Vercel", "VPS", "Cloudflare", "Hosting Nepal"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "15 min read",
    author: authorManoj,
    featured: true,
    whoIsThisFor: "Nepali developers, college students, and tech agencies looking for the most cost-effective and reliable deployment strategies for personal portfolios, client websites, and scalable SaaS platforms.",
    prerequisites: [
      "Basic terminal knowledge (SSH commands)",
      "A registered domain name (or eligible Nepali citizenship for a free .np domain)",
      "A Git repository hosted on GitHub or GitLab",
      "Basic understanding of DNS record types (A, CNAME, Nameservers)"
    ],
    whatYouWillLearn: [
      "Complete roadmap from zero to live production domain in Nepal",
      "Comparison: Free cloud hosting (Vercel/Render) vs. Shared cPanel vs. Self-managed VPS",
      "How to connect a free .com.np domain to global edge platforms with Cloudflare DNS",
      "Eliminating the '/public' folder security blunder in shared cPanel Laravel deployments",
      "Curated links to troubleshooting checklists and DNS propagation guides"
    ],
    sections: [
      {
        id: "nepal-hosting-options",
        title: "Deployment Architectures Compared for Nepali Developers",
        level: 2,
        content: `Developers in Nepal often struggle when choosing hosting. Cheap shared hosting is heavily marketed locally, but modern frameworks like Next.js or Docker require different deployment strategies.

Here is how the three primary hosting tiers compare in 2026:
1. **Free Edge Platforms (Vercel, Netlify):** Best for Next.js, static sites, and student portfolios. Unlimited build pipelines and global CDNs.
2. **Nepali Shared Hosting (cPanel):** Best for traditional PHP/Laravel or WordPress sites. Requires local NPR payment via eSewa/Khalti, but has limited SSH and memory constraints.
3. **Cloud VPS (Himalayan Host, Prabhu Host, DigitalOcean, Hetzner):** Best for production MERN stacks, custom background workers, and PostgreSQL/MySQL databases under full root control.`,
        table: {
          headers: ["Platform Type", "Cost (NPR/Month)", "Tech Supported", "Maintenance Overhead", "Ideal Use Case"],
          rows: [
            ["Vercel / Netlify", "Free (Hobby)", "Next.js, React, Astro, Static", "Zero (Serverless)", "Developer portfolios, technical blogs, frontend MVPs"],
            ["Shared cPanel Hosting", "NPR 200 – 600", "PHP 8.2+, Laravel, MySQL", "Low (cPanel GUI)", "Local business websites, college PHP projects"],
            ["Unmanaged VPS (Ubuntu)", "NPR 700 – 2,000", "Node.js, Docker, MongoDB, Python", "High (Linux, Nginx, SSL, PM2)", "Production MERN apps, multi-tenant SaaS, production APIs"]
          ]
        }
      },
      {
        id: "the-dot-np-advantage",
        title: "The Free .com.np Domain Opportunity",
        level: 2,
        content: `Nepal is one of the few nations where country-code top-level domains (ccTLDs) are **completely free of cost for lifetime renewal** for citizens and registered businesses through Mercantile Communication ([register.com.np](https://register.com.np)).

**Key Eligibility Rules:**
- The domain name must be an exact match or clear derivative of your legal name on your Nepali Citizenship or Passport (e.g., Manoj Neupane can register \`manojneupane.com.np\` or \`mneupane.com.np\`).
- Requires a scanned copy of your Nepali citizenship certificate (front and back) or passport.
- Requires an administrative cover letter stating the personal non-commercial purpose of the website.
- Does not provide DNS management on the portal itself—you must delegate primary and secondary nameservers to Cloudflare or your hosting provider.`,
        callout: {
          type: "tip",
          title: "Pro Tip: Always Delegate to Cloudflare",
          text: "Never point your .np domain directly to cheap shared hosting nameservers. Point it to Cloudflare's free nameservers. Cloudflare provides instant DNS record updates (1-minute TTL), free SSL certificates, DDoS protection, and edge caching."
        }
      },
      {
        id: "cluster-guides-and-tutorials",
        title: "Step-by-Step Deployment Tutorials in This Cluster",
        level: 2,
        content: `Read our comprehensive step-by-step guides for mastering domains and deployment:

- [Free .com.np Domain Registration Guide](/blog/how-to-register-free-np-domain-nepal): Documents, citizenship scans, and downloadable cover letter.
- [Point .com.np to Vercel via Cloudflare DNS](/blog/point-com-np-domain-to-vercel-cloudflare-dns): Exact A & CNAME records, resolving SSL redirect loops.
- [Deploy Laravel to cPanel Without /public](/blog/how-to-deploy-laravel-project-on-cpanel): Safe file separation, preventing .env credential exposure.
- [Deploy MERN Stack on a Budget VPS](/blog/how-to-deploy-mern-stack-on-vps): Ubuntu 24.04, Nginx reverse proxy, PM2, and Let's Encrypt SSL.
- [Configure DNS Records & Fix Errors](/blog/how-to-configure-dns-records-fix-common-errors): Deep dive into A, CNAME, MX, TXT, and nameserver delegation.`
      }
    ],
    expectedOutput: "A high-performance hosting setup with a verified domain and SSL security that costs little to no money for students and startups in Nepal.",
    testingSteps: [
      "Submit personal .np domain application at register.com.np with citizenship scan and cover letter",
      "Create a free Cloudflare account and add your domain to obtain your nameservers",
      "Deploy your frontend to Vercel and your backend to VPS or cPanel",
      "Verify global propagation using 'dig yourdomain.com.np +short' in terminal"
    ],
    commonErrors: [
      {
        error: "ERR_TOO_MANY_REDIRECTS with Cloudflare and Vercel/cPanel",
        cause: "Cloudflare SSL set to 'Flexible' while origin server enforces HTTPS, creating an infinite redirect loop.",
        solution: "In Cloudflare dashboard, go to SSL/TLS and change encryption mode from 'Flexible' to 'Full' or 'Full (strict)'."
      },
      {
        error: "Exposing .env and vendor directories in public_html",
        cause: "Extracting the entire Laravel project directly into public_html without changing the document root.",
        solution: "Place the core Laravel application in the home directory, and place ONLY the contents of public/ inside public_html."
      }
    ],
    securityConsiderations: [
      "Disable password authentication on VPS and use Ed25519 SSH keys only.",
      "Enable UFW firewall on Ubuntu: allow only ports 22 (SSH), 80 (HTTP), and 443 (HTTPS).",
      "Never commit production .env credentials or database passwords to public GitHub repositories."
    ],
    faqs: [
      {
        question: "How long does it take for Mercantile to approve a .com.np domain?",
        answer: "Approval typically takes 1 to 3 business days during working hours (Sunday through Thursday). If rejected, Mercantile sends an email stating the exact reason (e.g., name mismatch or illegible document scan)."
      },
      {
        question: "Can I pay for international hosting like Vercel or DigitalOcean with a Nepali bank card?",
        answer: "Yes, you can issue a USD Dollar Prepaid Card (up to $500 per year) from any commercial bank in Nepal (e.g. Nabil, Global IME, NIC Asia) using your valid PAN and passport."
      }
    ],
    summary: "By combining free .com.np domains, Cloudflare DNS, Vercel serverless edge hosting, and budget VPS infrastructure, developers in Nepal can run enterprise-grade applications at near-zero starting cost.",
    references: [
      { title: "Official .np Domain Registrar", url: "https://register.com.np/" },
      { title: "Cloudflare Free Tier Documentation", url: "https://developers.cloudflare.com/" },
      { title: "Vercel Custom Domains Documentation", url: "https://vercel.com/docs/projects/domains" }
    ],
    relatedSlugs: [
      "how-to-register-free-np-domain-nepal",
      "point-com-np-domain-to-vercel-cloudflare-dns",
      "how-to-deploy-laravel-project-on-cpanel",
      "how-to-deploy-mern-stack-on-vps"
    ]
  },
  {
    slug: "beginner-developer-debugging-hub",
    title: "Beginner Developer Debugging Hub: Exact Solutions for MERN, Laravel, Git, and XAMPP Errors",
    description: "The definitive error-resolution index for junior developers in Nepal. Fast, copyable fixes for CORS errors, MongoDB Atlas IP timeouts, Laravel 419 Page Expired, Git non-fast-forward push rejections, and npm ERESOLVE conflicts.",
    category: "Hubs & Guides",
    categorySlug: "hubs-guides",
    tags: ["Debugging", "CORS", "Laravel 419", "MongoDB Atlas", "Git", "npm ERESOLVE", "Next.js Errors"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "18 min read",
    author: authorManoj,
    featured: true,
    whoIsThisFor: "Developers who are stuck right now with an opaque error screen, build failure, or database connection timeout and need the exact diagnostic steps and fix.",
    prerequisites: [
      "Access to your application terminal and error log files",
      "Basic understanding of your framework stack (React, Next.js, Express, Laravel)",
      "Permission to edit local project configuration files (.env, package.json, config files)"
    ],
    whatYouWillLearn: [
      "How to diagnose errors systematically using error strings rather than guessing",
      "Exact root cause explanations for the top 10 error strings encountered by beginners",
      "The safe fix vs. dangerous shortcuts (e.g. why 'git push --force' or '0.0.0.0/0 without auth' will hurt you)",
      "How to read stack traces, inspection logs, and browser network response headers"
    ],
    sections: [
      {
        id: "how-to-debug-like-a-senior",
        title: "How to Debug Like a Senior Developer: The 3-Step Mental Model",
        level: 2,
        content: `Junior developers often react to errors by randomly changing code until something works. This introduces new bugs and destroys working configuration. Senior developers follow a 3-step discipline:

1. **Isolate the Boundary:** Is this a network error (CORS / DNS), a database handshake error (Authentication / IP whitelist), or an application runtime error (Syntax / Null pointer)?
2. **Inspect the Raw Log, Not Just the Summary:** Look at the browser Network tab headers for HTTP status codes, or inspect \`storage/logs/laravel.log\` and terminal output for the full stack trace.
3. **Reproduce and Verify:** Apply a single isolated change, re-test the exact reproduction steps, and verify that the root cause—not just the symptom—is resolved.`,
        callout: {
          type: "tip",
          title: "The Golden Rule of Error Searching",
          text: "Always search using the exact literal error string enclosed in quotation marks (e.g. \"SQLSTATE[HY000] [1045]\" or \"ERESOLVE unable to resolve dependency tree\"). This filters out generic articles and surfaces the exact forum threads and tutorials."
        }
      },
      {
        id: "master-error-resolution-matrix",
        title: "The Master Beginner Error Matrix: Quick Diagnoses & Fixes",
        level: 2,
        content: `Find your exact error message in the reference table below for immediate triage:`,
        table: {
          headers: ["Exact Error Message / Symptom", "Stack / Tool", "Root Cause", "Immediate Fix Link"],
          rows: [
            ["Access to XMLHttpRequest blocked by CORS policy", "React + Express", "Browser Same-Origin Policy blocked missing CORS response headers", "Configure cors({ origin: 'http://localhost:3000', credentials: true })"],
            ["MongoServerSelectionError: connection timed out", "MongoDB Atlas", "Nepali ISP (WorldLink/Vianet) dynamic IP is not whitelisted in Network Access", "Add IP in Atlas Network Access or configure 0.0.0.0/0 with strong password"],
            ["419 Page Expired", "Laravel Blade / API", "Missing @csrf token in form or session cookie expired on POST request", "Add @csrf to form or exclude payment webhook routes in bootstrap/app.php"],
            ["npm ERR! ERESOLVE unable to resolve dependency tree", "Node.js / npm", "Conflicting peer dependencies between packages (e.g. React 19 vs React 18 library)", "Run with --legacy-peer-deps or align package versions in package.json"],
            ["error: failed to push some refs to remote", "Git / GitHub", "Remote repository contains commits not present in local branch", "Run 'git pull --rebase origin main', resolve conflicts, then push"],
            ["Objects are not valid as a React child", "React / Next.js", "Attempting to render a raw Javascript object inside JSX {item} instead of {item.name}", "Render specific primitive property {item.title} or JSON.stringify(item)"],
            ["Module not found: Can't resolve 'fs'", "Next.js App Router", "Attempting to import Node standard library in a Client Component ('use client')", "Move file system operations to a Server Component or Route Handler"],
            ["SQLSTATE[HY000] [1045] Access denied for user", "Laravel + MySQL", "Wrong DB_USERNAME, DB_PASSWORD, or missing user privileges in cPanel MySQL", "Check .env credentials, run 'php artisan config:clear', verify MySQL user grants"]
          ]
        }
      },
      {
        id: "curated-debugging-guides",
        title: "In-Depth Troubleshooting Guides",
        level: 2,
        content: `Click through to read our comprehensive step-by-step resolution guides:

- [Fixing 'CORS Policy' in React + Express](/blog/how-to-fix-cors-errors-react-nodejs): Preflight requests, credentials, and proxy setups.
- [MongoDB Atlas IP Not Whitelisted for Nepali Dynamic IPs](/blog/mongodb-atlas-ip-not-whitelisted-nepal-dynamic-ip-fix): Resolving ISP IP changes.
- [Laravel 419 Page Expired Fix](/blog/laravel-419-page-expired-csrf-token-fix): CSRF token lifecycle, session domains, and webhook bypasses.
- [npm ERESOLVE Dependency Tree Fix Without --force](/blog/how-to-fix-npm-install-errors-node-version-conflicts): Resolving React peer dependency conflicts safely.
- [Git 'failed to push some refs' Safe Recovery](/blog/git-failed-to-push-some-refs-non-fast-forward-fix): Recovering cleanly without destructive force-pushing.
- [Next.js Hydration Error Causes & Fixes](/blog/nextjs-hydration-error-causes-and-fixes): Eliminating server/client HTML mismatches.`
      }
    ],
    expectedOutput: "Rapid diagnostic capability to unblock stalled development workflows and deploy robust, self-healing code.",
    testingSteps: [
      "Identify the exact literal error string from your terminal or console output",
      "Look up the error in the master matrix above to understand the architectural cause",
      "Apply the verified fix and clear configuration caches (e.g. 'php artisan config:clear' or clearing browser cookies)",
      "Re-run the request to verify complete resolution"
    ],
    commonErrors: [
      {
        error: "Running 'npm audit fix --force' blindly",
        cause: "Attempts to upgrade packages across major breaking version boundaries automatically, breaking your codebase.",
        solution: "Inspect vulnerabilities individually. Upgrade only the specific package requiring a patch."
      },
      {
        error: "Using 'git push --force' on shared branches",
        cause: "Overwrites remote history and destroys commits made by teammates.",
        solution: "Always use 'git pull --rebase' to merge remote changes cleanly on top of your local branch."
      }
    ],
    securityConsiderations: [
      "Never disable CORS globally in production with Access-Control-Allow-Origin: * when credentials/cookies are active.",
      "Never commit database connection strings containing raw passwords to version control.",
      "Keep APP_DEBUG=false in production Laravel environments to prevent leaking environment variables on error screens."
    ],
    faqs: [
      {
        question: "Why do I get MongoDB Atlas timeouts when my code worked yesterday?",
        answer: "Most home internet service providers in Nepal (WorldLink, Vianet, NTC) assign dynamic IP addresses via CGNAT that change every time your router restarts or daily lease expires. If your Atlas whitelist only contained yesterday's IP, today's connections will timeout."
      },
      {
        question: "What is the difference between npm install --force and --legacy-peer-deps?",
        answer: "--force bypasses all safety checks and installs conflicting packages anyway, often leaving broken dependencies. --legacy-peer-deps ignores peer dependencies entirely, which is safer when libraries haven't updated their metadata for newer React versions."
      }
    ],
    summary: "Debugging is a core developer skill. By identifying the exact error string, understanding the underlying protocol (HTTP, DNS, or SQL), and applying systematic fixes, you can resolve blockers with confidence.",
    references: [
      { title: "MDN Web Docs: CORS", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" },
      { title: "Laravel Official CSRF Protection", url: "https://laravel.com/docs/csrf" },
      { title: "MongoDB Atlas Network Access Guide", url: "https://www.mongodb.com/docs/atlas/security-whitelist/" }
    ],
    relatedSlugs: [
      "how-to-fix-cors-errors-react-nodejs",
      "laravel-419-page-expired-csrf-token-fix",
      "mongodb-atlas-ip-not-whitelisted-nepal-dynamic-ip-fix",
      "git-failed-to-push-some-refs-non-fast-forward-fix"
    ]
  },
  {
    slug: "nepal-developer-career-and-student-guide-hub",
    title: "Nepal Developer Career Hub: Roadmap, Internships, Freelancing, and College Projects (2026)",
    description: "The complete career accelerator for IT students (BCA, BSc CSIT, BIT) and self-taught developers in Nepal. How to break out of tutorial hell, land your first software internship in Kathmandu, build standout final year projects, and start freelancing with PAN & legal foreign remittance.",
    category: "Hubs & Guides",
    categorySlug: "hubs-guides",
    tags: ["Developer Roadmap", "Internships Nepal", "BCA Projects", "Freelancing Nepal", "Career Guide", "Tech Jobs Kathmandu"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "17 min read",
    author: authorManoj,
    featured: true,
    whoIsThisFor: "Nepali college students (BCA, BSc CSIT, BE Computer, BIM, BIT) and self-taught programmers seeking internships, high-paying remote roles, freelance clients, and high-scoring final year project topics.",
    prerequisites: [
      "Basic knowledge of HTML, CSS, and at least one programming language (JavaScript, PHP, or Python)",
      "An active GitHub account",
      "Ambition to build real-world software solving actual problems in Nepal"
    ],
    whatYouWillLearn: [
      "Semester-by-semester project-first roadmap: how to avoid 'tutorial hell' and build a proof-of-work portfolio",
      "Top 25 technical and behavioral interview questions asked by software companies in Nepal",
      "Realistic, high-impact final year project ideas that solve genuine problems in Kathmandu and Nepal",
      "Legal guide to freelancing: obtaining a personal PAN, invoicing international clients, and receiving USD wire transfers into Nepali banks",
      "MERN vs. Laravel vs. Next.js: which tech stack offers the highest job availability in Nepal in 2026"
    ],
    sections: [
      {
        id: "the-reality-of-nepal-tech-market",
        title: "The Reality of the Tech Job Market in Nepal (2026)",
        level: 2,
        content: `Many students graduate from universities in Nepal having memorized theoretical algorithms, but struggle to land their first junior developer job. Employers in Kathmandu frequently complain: *'We receive hundreds of CVs, but applicants cannot build a simple authenticated CRUD application or explain how Git branches work.'*

To stand out in Nepal, you do not need 10 certificates from online video courses. **You need proof of work.**

A junior developer who has:
1. A live custom domain portfolio (\`yourname.com.np\`)
2. Three deployed full-stack web applications with working login and database records
3. Clean Git commit histories and comprehensive README files

will immediately rank in the **top 5% of all applicants** for software internships in Nepal.`,
        table: {
          headers: ["Framework / Stack", "Job Availability in Nepal", "Learning Curve", "Average Junior Salary (NPR/Mo)", "Best Suited For"],
          rows: [
            ["Laravel + MySQL", "Very High", "Moderate / Structured", "NPR 25,000 – 45,000", "Local software houses, business management systems, enterprise apps"],
            ["MERN Stack (React + Node)", "High", "Moderate", "NPR 25,000 – 50,000", "Startups, export-oriented IT service companies, modern web apps"],
            ["Next.js + TypeScript", "Rapidly Growing", "Moderate / Advanced", "NPR 35,000 – 65,000", "Remote US/European contract roles, modern product companies"],
            ["WordPress (Custom Theme/Plugin)", "High (Agency/Freelance)", "Gentle", "NPR 20,000 – 35,000", "Digital agencies, freelance client websites, e-commerce stores"]
          ]
        }
      },
      {
        id: "internship-preparation-checklist",
        title: "First IT Internship Preparation Checklist",
        level: 2,
        content: `Before applying to software companies in Lalitpur, Kathmandu, or remote agencies:

- **Git Proficiency:** Understand \`git clone\`, \`git checkout -b feature\`, \`git commit\`, and how to resolve a merge conflict.
- **REST API Fundamentals:** Understand HTTP verbs (GET, POST, PUT, DELETE) and status codes (200, 201, 400, 401, 404, 500).
- **Relational Database Design:** Understand primary keys, foreign keys, 1-to-many relationships, and SQL JOINs.
- **Authentication Basics:** Explain the difference between session cookies and JWT bearer tokens.
- **Deployment Experience:** Ensure at least two of your projects are live on the internet with public URLs.`,
        callout: {
          type: "tip",
          title: "Cold Emailing Startups in Kathmandu",
          text: "Do not send generic 'Respected Sir, Please find attached my CV' emails. Find the engineering lead or founder on LinkedIn. Send a short 4-sentence email: 'Hi [Name], I noticed you build [Product]. I built a project with [Stack] solving [Problem] live at [URL]. I would love to contribute as an intern.'"
        }
      },
      {
        id: "freelancing-and-pan-nepal",
        title: "Freelancing from Nepal: Legal Setup & Payments",
        level: 2,
        content: `If you freelance on Upwork, Fiverr, or directly for international clients while living in Nepal:

1. **Obtain a PAN (Permanent Account Number):** Visit your local Inland Revenue Office (Nagrik App makes application easy). It takes 10 minutes and is free.
2. **Open a USD / NPR Bank Account:** Open an account at a commercial bank (Nabil, Global IME, Everest, etc.). International wire transfers via SWIFT require your bank's SWIFT code and IBAN/Account Number.
3. **Inland Revenue 5% TDS for Foreign Remittance:** Under current Nepali tax regulations, foreign currency earnings from software export and freelancing received directly into your commercial bank account are subject to a **5% final withholding tax (TDS)** deducted at source by the bank.
4. **Issue an NRB Dollar Card:** With your PAN and valid passport, apply for a $500 prepaid travel/dollar card to pay for domain registrations, GitHub Copilot, and cloud servers legally.`,
        callout: {
          type: "warning",
          title: "Avoid Hundi / Informal Transfer Channels",
          text: "Never use cryptocurrency, USDT, or informal Hundi channels to receive freelance payments in Nepal. These channels are illegal under Nepal Rastra Bank regulations. Always receive bank SWIFT remittances or official remittance services (Wise / Payoneer to Nepali bank)."
        }
      },
      {
        id: "curated-career-guides",
        title: "Cluster Guides & Career Resources",
        level: 2,
        content: `Explore our detailed career walkthroughs:

- [First IT Internship Interview: 25 Real Questions & Answers](/blog/first-it-internship-interview-questions-nepal): JavaScript, SQL, and behavioral questions.
- [BCA/CSIT Full-Stack Developer Roadmap](/blog/bca-csit-full-stack-roadmap-nepal-students): Step-by-step semester milestones.
- [Freelancing from Nepal: PAN, Taxes & Foreign Payments](/blog/freelancing-from-nepal-pan-foreign-payments-guide): The complete legal and banking guide.
- [MERN vs. Laravel vs. Next.js in 2026](/blog/mern-vs-laravel-vs-nextjs-nepal-2026): In-depth comparison of local job market demand.`
      }
    ],
    expectedOutput: "A realistic, high-confidence career roadmap that empowers students in Nepal to land lucrative jobs or build sustainable freelance careers.",
    testingSteps: [
      "Audit your current GitHub repositories: add descriptive README files and screenshots",
      "Deploy your portfolio to a free .com.np domain on Vercel",
      "Apply for a Permanent Account Number (PAN) via Nagrik App",
      "Practice answering the 25 core technical interview questions aloud"
    ],
    commonErrors: [
      {
        error: "Listing 15 programming languages on your CV",
        cause: "Junior resumes claiming proficiency in C, C++, Java, Python, PHP, JS, Rust, and Go look unrealistic.",
        solution: "Focus your resume on 1 cohesive stack (e.g. Laravel + MySQL OR React + Node.js) and demonstrate depth."
      },
      {
        error: "Putting clone tutorials as your primary portfolio projects",
        cause: "Building a Netflix or Spotify clone following a YouTube tutorial shows no independent problem-solving.",
        solution: "Build localized tools: a tuition payment tracker with Khalti, a local blood bank directory, or an e-commerce inventory tool."
      }
    ],
    securityConsiderations: [
      "Never share your citizenship number, PAN certificate scan, or bank details publicly on GitHub.",
      "Review contracts carefully when freelancing: specify milestones, payment terms, and copyright transfer upon full payment."
    ],
    faqs: [
      {
        question: "Do software companies in Nepal care about college degrees or marks?",
        answer: "Most software startups, private tech companies, and remote agencies prioritize your portfolio, GitHub code quality, and technical interview performance far above your college percentage. However, public sector, banking, and government IT positions still strictly enforce minimum degree criteria."
      },
      {
        question: "Can I earn a good salary as a software engineer living in Nepal?",
        answer: "Yes. Mid-level developers working for established software companies in Kathmandu earn NPR 60,000 to NPR 120,000 monthly, while senior developers earn NPR 150,000 to NPR 300,000+. Developers working remotely for US, European, or Australian companies earn $1,500 to $4,000+ monthly."
      }
    ],
    summary: "Success in Nepal's tech market requires transitioning from passive consumer of tutorials to active builder of solutions. With a cohesive stack, deployed projects, and clean Git habits, rewarding opportunities are within your reach.",
    references: [
      { title: "Nepal Rastra Bank Foreign Exchange Circulars", url: "https://www.nrb.org.np/" },
      { title: "Inland Revenue Department of Nepal", url: "https://ird.gov.np/" },
      { title: "Nagrik App Government Services", url: "https://nagarikapp.gov.np/" }
    ],
    relatedSlugs: [
      "first-it-internship-interview-questions-nepal",
      "bca-csit-full-stack-roadmap-nepal-students",
      "freelancing-from-nepal-pan-foreign-payments-guide",
      "mern-vs-laravel-vs-nextjs-nepal-2026"
    ]
  }
];
