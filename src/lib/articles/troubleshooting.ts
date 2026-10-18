import { BlogPost } from "../blog-types";

export const troubleshootingArticles: BlogPost[] = [
  // ─── Article 12: Fix CORS Errors ───────────────────────────────────────────
  {
    slug: "how-to-fix-cors-errors-react-nodejs",
    title: "How to Fix CORS Errors in React and Node.js (Access-Control-Allow-Origin Explained)",
    description: "Understand what Cross-Origin Resource Sharing (CORS) actually is, why the browser blocks requests, and how to configure Express cors middleware and Laravel cors.php properly.",
    category: "Troubleshooting",
    categorySlug: "troubleshooting",
    tags: ["CORS", "React", "Node.js", "Express", "Laravel", "APIs"],
    publishedAt: "2025-02-05",
    updatedAt: "2025-02-14",
    readingTime: "11 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Frontend and full-stack developers whose fetch() or axios requests fail with 'No Access-Control-Allow-Origin header is present'.",
    prerequisites: [
      "Basic experience calling REST APIs with fetch or axios",
      "Express.js backend or Laravel API",
    ],
    whatYouWillLearn: [
      "Why CORS is a browser security mechanism, NOT a server error",
      "The role of preflight OPTIONS requests",
      "Configuring Express cors middleware correctly for development and production",
      "Configuring Laravel config/cors.php",
    ],
    sections: [
      {
        id: "what-is-cors",
        title: "1. What CORS Actually Is (And What It Isn't)",
        content: `CORS stands for **Cross-Origin Resource Sharing**. An origin is defined by \`protocol + domain + port\` (e.g. \`http://localhost:3000\`).

When your React app running on \`http://localhost:3000\` attempts to fetch data from an API running on \`http://localhost:5000\`, the browser sees different ports and considers this a **cross-origin** request.

By default, the browser blocks JavaScript from reading the response unless the backend explicitly includes the header:
\`Access-Control-Allow-Origin: http://localhost:3000\`

**Crucial Point:** The server actually processes the request and sends the response, but **your browser refuses to let your JavaScript read it!**`,
        callout: {
          type: "note",
          title: "Browser-Only Policy",
          text: "Tools like Postman and curl do NOT enforce CORS because they are not web browsers. If an API works in Postman but fails in React, it is a CORS configuration issue on your server.",
        },
      },
      {
        id: "fixing-in-express",
        title: "2. The Proper Fix in Express.js",
        content: `Install the official \`cors\` package:
\`\`\`bash
npm install cors
\`\`\`
Configure it before registering your API routes:`,
        codeTabs: [
          {
            language: "javascript",
            filename: "server.js",
            label: "Express CORS Configuration",
            code: `const express = require('express');
const cors = require('cors');
const app = express();

// Option A: Quick development allow-all (Never use in production)
// app.use(cors());

// Option B: Production whitelist (Recommended)
const allowedOrigins = [
  'http://localhost:3000',
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true, // Allow cookies / authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());`,
          },
        ],
      },
      {
        id: "fixing-in-laravel",
        title: "3. The Proper Fix in Laravel",
        content: `Laravel includes built-in CORS middleware configured in \`config/cors.php\`:`,
        codeTabs: [
          {
            language: "php",
            filename: "config/cors.php",
            label: "Laravel config/cors.php",
            code: `<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000',
        'https://yourdomain.com',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];`,
          },
        ],
      },
    ],
    expectedOutput: `Inspect the response headers in Chrome DevTools Network Tab:
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
HTTP 200 OK without console red error flags.`,
    testingSteps: [
      "Trigger fetch request from React frontend and inspect browser console",
      "Check Network tab for the preflight OPTIONS request returning 204 or 200",
    ],
    commonErrors: [
      {
        error: "Wildcard '*' cannot be used when credentials is true",
        cause: "Setting origin: '*' while simultaneously setting credentials: true.",
        solution: "Specify exact origins (e.g. 'http://localhost:3000') instead of '*' when sending cookies or Bearer tokens.",
      },
    ],
    securityNotes: [
      "Never leave Access-Control-Allow-Origin: * on production endpoints handling sensitive authenticated user data.",
    ],
    faqs: [
      {
        question: "Can I fix CORS by modifying my React code?",
        answer: "No. CORS headers must be sent by the server responding to the request. In development, you can use a Vite/Next.js proxy, but production requires backend headers.",
      },
    ],
    summary: [
      "CORS is enforced by browsers to prevent malicious scripts from reading third-party data.",
      "Fix it on the server by sending Access-Control-Allow-Origin headers.",
    ],
    references: [
      {
        title: "MDN Web Docs: Cross-Origin Resource Sharing (CORS)",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
        description: "Authoritative explanation of preflight requests and CORS headers.",
      },
    ],
    relatedSlugs: [
      "how-to-deploy-mern-stack-on-vps",
      "how-to-configure-environment-variables-securely",
    ],
  },

  // ─── Article 13: Laravel 500 Internal Server Error ─────────────────────────
  {
    slug: "how-to-fix-laravel-500-internal-server-error",
    title: "How to Fix the Laravel 500 Internal Server Error (Step-by-Step Debugging Guide)",
    description: "Troubleshoot and fix generic HTTP 500 errors in Laravel. Learn how to inspect storage/logs/laravel.log, fix folder permissions, generate missing APP_KEY, and check PHP extensions.",
    category: "Troubleshooting",
    categorySlug: "troubleshooting",
    tags: ["Laravel", "PHP", "Debugging", "cPanel", "Troubleshooting"],
    publishedAt: "2025-02-07",
    updatedAt: "2025-02-15",
    readingTime: "10 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Developers whose newly deployed or local Laravel project displays a blank white screen with '500 Server Error'.",
    prerequisites: [
      "Access to terminal or cPanel File Manager",
    ],
    whatYouWillLearn: [
      "Locating the exact error message inside storage/logs/laravel.log",
      "Fixing storage and bootstrap/cache permissions (chmod 775)",
      "Generating missing application encryption keys (APP_KEY)",
      "Verifying required PHP extension availability",
    ],
    sections: [
      {
        id: "checking-the-log",
        title: "1. The Golden Rule: Read storage/logs/laravel.log",
        content: `A 500 error is a generic status code meaning "something crashed on the server". Laravel logs the exact line number and stack trace to \`storage/logs/laravel.log\`.

Open this file via terminal:
\`\`\`bash
tail -n 50 storage/logs/laravel.log
\`\`\`
Or view it in cPanel File Manager. 95% of the time, the exact cause is written right at the bottom!`,
      },
      {
        id: "fixing-permissions",
        title: "2. The #1 Cause on Hosting: Unwritable Storage Permissions",
        content: `Laravel needs write access to \`storage/\` and \`bootstrap/cache/\`. If the web server cannot write session files, logs, or compiled views, it crashes with a 500 error:`,
        codeTabs: [
          {
            language: "bash",
            filename: "Terminal",
            label: "Fix Permissions",
            code: `# On Ubuntu / VPS:
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# On shared cPanel:
# In File Manager, right-click storage/ and set permissions to 755 (or 775).
# Right-click bootstrap/cache/ and set permissions to 755 (or 775).`,
          },
        ],
      },
      {
        id: "missing-app-key",
        title: "3. The #2 Cause: Missing or Unset APP_KEY",
        content: `If your \`.env\` file has an empty \`APP_KEY=\`, Laravel will throw:
\`No application encryption key has been specified.\`

Fix:
\`\`\`bash
php artisan key:generate
php artisan config:clear
\`\`\``,
      },
    ],
    expectedOutput: `The site loads cleanly with HTTP 200, or (in local dev with APP_DEBUG=true) displays Laravel's informative Ignition error screen.`,
    testingSteps: [
      "Run `php artisan about` in terminal to verify environment, cache, and driver status",
      "Inspect web server error log at /var/log/nginx/error.log or cPanel Errors tool",
    ],
    commonErrors: [
      {
        error: "Call to undefined function mb_detect_encoding() or pdo_mysql",
        cause: "PHP extension missing from hosting server.",
        solution: "In cPanel 'Select PHP Version', check the boxes for mbstring, pdo_mysql, and bcmath.",
      },
    ],
    securityNotes: [
      "Never leave APP_DEBUG=true in production; it reveals environment variables to visitors when a 500 error occurs.",
    ],
    faqs: [
      {
        question: "Why does my homepage work but sub-pages return 500 or 404?",
        answer: "Missing or disabled mod_rewrite in Apache. Ensure public_html contains the official Laravel .htaccess file.",
      },
    ],
    summary: [
      "Always check storage/logs/laravel.log first.",
      "Ensure storage and bootstrap/cache are writable.",
      "Generate APP_KEY and clear config cache.",
    ],
    references: [
      {
        title: "Laravel Error Handling Docs",
        url: "https://laravel.com/docs/errors",
        description: "Official guide to exception handling and logging.",
      },
    ],
    relatedSlugs: [
      "how-to-deploy-laravel-project-on-cpanel",
      "how-to-connect-mysql-to-laravel-fix-connection-errors",
    ],
  },

  // ─── Article 14: npm Errors & Node Versions ────────────────────────────────
  {
    slug: "how-to-fix-npm-install-errors-node-version-conflicts",
    title: "How to Fix npm Install Errors (ERESOLVE, EACCES) and Manage Node.js Versions with NVM",
    description: "Solve dependency tree conflicts (ERESOLVE unable to resolve dependency tree), permission errors (EACCES), and seamlessly switch Node versions on macOS, Linux, and Windows using NVM.",
    category: "Troubleshooting",
    categorySlug: "troubleshooting",
    tags: ["npm", "Node.js", "NVM", "JavaScript", "DevOps"],
    publishedAt: "2025-02-09",
    updatedAt: "2025-02-15",
    readingTime: "11 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Developers facing npm install crashes when cloning existing repositories or upgrading packages.",
    prerequisites: [
      "Terminal access on macOS, Linux, or Windows",
    ],
    whatYouWillLearn: [
      "Resolving 'ERESOLVE unable to resolve dependency tree'",
      "When to use --legacy-peer-deps safely",
      "Fixing EACCES permission errors without using sudo npm",
      "Installing and managing multiple Node.js versions with NVM",
    ],
    sections: [
      {
        id: "fixing-eresolve",
        title: "1. Fixing 'ERESOLVE unable to resolve dependency tree'",
        content: `In npm v7+, npm strictly verifies peer dependencies. If library A requires React 17 while library B requires React 18, npm halts installation with \`ERESOLVE\`.

**Solution 1: Use --legacy-peer-deps**
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`
This tells npm to ignore conflicting peer dependencies (reverting to npm v6 behavior).

**Solution 2: Clean node_modules and reinstall**
\`\`\`bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
\`\`\``,
      },
      {
        id: "managing-node-versions-nvm",
        title: "2. Managing Node.js Versions with NVM (Node Version Manager)",
        content: `Different projects require different Node.js versions (e.g. an older app needs Node 16, while Next.js 14 requires Node 18+).

Never install Node directly from nodejs.org installers. Use **NVM**:`,
        codeTabs: [
          {
            language: "bash",
            filename: "Terminal",
            label: "NVM Commands",
            code: `# Install NVM on macOS / Linux:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart your terminal, then:
# Install Node.js LTS v20
nvm install 20

# Install Node.js v18
nvm install 18

# Switch between versions instantly
nvm use 20

# Set default Node version
nvm alias default 20`,
          },
        ],
      },
    ],
    expectedOutput: `npm install completes with "added X packages in Ys" with 0 audit vulnerabilities.`,
    testingSteps: [
      "Run `node -v` to ensure you are running the expected runtime",
      "Run `npm test` or `npm run dev` to verify clean startup",
    ],
    commonErrors: [
      {
        error: "npm ERR! Error: EACCES: permission denied",
        cause: "Installing packages with 'sudo npm', which corrupts ownership of ~/.npm folder.",
        solution: "Fix ownership: sudo chown -R $(whoami) ~/.npm. Never use sudo with npm install -g; use NVM instead.",
      },
    ],
    securityNotes: [
      "Review npm audit output before pushing dependencies to production.",
    ],
    faqs: [
      {
        question: "What is nvm-windows?",
        answer: "On Windows, use 'nvm-windows' by coreybutler (downloadable from GitHub releases), which provides identical functionality.",
      },
    ],
    summary: [
      "Use --legacy-peer-deps for stubborn peer dependency mismatches.",
      "Use NVM to switch Node versions seamlessly.",
    ],
    references: [
      {
        title: "NVM Official GitHub Repository",
        url: "https://github.com/nvm-sh/nvm",
        description: "Official Node Version Manager documentation and release scripts.",
      },
    ],
    relatedSlugs: [
      "how-to-deploy-mern-stack-on-vps",
      "how-to-configure-environment-variables-securely",
    ],
  },

  // ─── Article 15: Secure Environment Variables ──────────────────────────────
  {
    slug: "how-to-configure-environment-variables-securely",
    title: "How to Configure Environment Variables (.env) Without Exposing Secrets to GitHub or Client Browsers",
    description: "Protect your database passwords, Stripe/eSewa/Khalti keys, and JWT secrets. Learn the differences between server and client environment variables in Next.js, React, Node, and Laravel.",
    category: "Troubleshooting",
    categorySlug: "troubleshooting",
    tags: ["Security", ".env", "Next.js", "Node.js", "Git", "DevOps"],
    publishedAt: "2025-02-11",
    updatedAt: "2025-02-16",
    readingTime: "11 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "All web developers wanting to avoid accidentally leaking private database passwords or API keys to GitHub or client browsers.",
    prerequisites: [
      "Understanding of Git commits and client vs server architectures",
    ],
    whatYouWillLearn: [
      "Why .env files must ALWAYS be added to .gitignore",
      "The role and structure of .env.example",
      "Client-side prefixes (NEXT_PUBLIC_, VITE_, REACT_APP_) and their security risks",
      "Removing accidentally committed secrets from Git history",
    ],
    sections: [
      {
        id: "env-in-gitignore",
        title: "1. The #1 Rule: .env Belongs in .gitignore",
        content: `Before creating your first Git commit, verify that \`.gitignore\` contains:
\`\`\`
.env
.env.local
.env.*.local
\`\`\`
Never commit \`.env\` files to version control. Anyone who views your GitHub repository (or clones it) will have direct access to your live database, payment gateways, and email credentials.`,
      },
      {
        id: "env-example-pattern",
        title: "2. The .env.example Documentation Pattern",
        content: `Instead of committing \`.env\`, commit a safe template named \`.env.example\` with dummy placeholder values so team members know what variables are required:`,
        codeTabs: [
          {
            language: "bash",
            filename: ".env.example",
            label: "Safe .env.example",
            code: `# App Configuration
APP_NAME="Nepali Developer Guide"
APP_ENV=local
APP_URL=http://localhost:3000

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password_here

# Payment Gateway Keys (Never put live secrets here!)
ESEWA_PRODUCT_CODE=EPAYTEST
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
KHALTI_SECRET_KEY=your_khalti_test_key_here`,
          },
        ],
      },
      {
        id: "client-vs-server-env",
        title: "3. Understanding Client-Side Prefixes (NEXT_PUBLIC_)",
        content: `In frameworks like Next.js:
- **Variables without prefix:** (\`DATABASE_URL\`, \`ESEWA_SECRET_KEY\`) are ONLY accessible in Node.js server environments.
- **Variables with prefix:** (\`NEXT_PUBLIC_ANALYTICS_ID\`) are compiled directly into frontend JavaScript strings. Any visitor can open Developer Tools and view them!

**Rule:** Never prefix payment secret keys, JWT secret keys, or database passwords with \`NEXT_PUBLIC_\` or \`VITE_\`!`,
      },
    ],
    expectedOutput: `Git status reports .env as untracked/ignored, and building the project bundles zero secret keys into public JS chunks.`,
    testingSteps: [
      "Run `git status` and verify .env does NOT appear in untracked files list",
      "Inspect browser bundle via View Source and confirm no secret keys are present",
    ],
    commonErrors: [
      {
        error: "Committed .env to GitHub accidentally",
        cause: "Added .gitignore after running 'git add .'.",
        solution: "Remove from Git tracking without deleting file: 'git rm --cached .env'. Commit the change and rotate any leaked API keys immediately!",
      },
    ],
    securityNotes: [
      "If you ever accidentally commit a secret key to a public GitHub repo, assume it has been compromised by automated bots within seconds. Regenerate the key immediately.",
    ],
    faqs: [
      {
        question: "How do I deploy environment variables to production?",
        answer: "On Vercel/Netlify, enter them in the platform's Environment Variables dashboard. On a VPS/cPanel, create the .env file directly on the server via SSH or File Manager.",
      },
    ],
    summary: [
      "Never commit .env files to GitHub.",
      "Provide a clean .env.example for other developers.",
      "Keep secrets out of NEXT_PUBLIC_ client variables.",
    ],
    references: [
      {
        title: "12-Factor App: Config",
        url: "https://12factor.net/config",
        description: "Industry standard principles for environment configuration.",
      },
    ],
    relatedSlugs: [
      "how-to-deploy-nextjs-on-vercel",
      "how-to-deploy-mern-stack-on-vps",
      "how-to-integrate-esewa-payment-gateway",
    ],
  },
];
