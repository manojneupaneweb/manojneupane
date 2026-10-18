import { BlogPost } from "../blog-types";

export const deploymentArticles: BlogPost[] = [
  // ─── Article 4: Deploy Laravel on cPanel ──────────────────────────────────
  {
    slug: "how-to-deploy-laravel-project-on-cpanel",
    title: "How to Deploy a Laravel Project on cPanel Safely (No Security Flaws or Exposed .env)",
    description: "Learn the proper, secure way to deploy Laravel applications on shared cPanel hosting. Avoid the rookie mistake of dumping your whole project into public_html and exposing sensitive .env files.",
    category: "Deployment",
    categorySlug: "deployment",
    tags: ["Laravel", "cPanel", "PHP", "MySQL", "Deployment", "Nepal"],
    publishedAt: "2025-01-16",
    updatedAt: "2025-02-12",
    readingTime: "13 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Laravel developers and students hosting applications on shared cPanel hosting commonly purchased in Nepal (Himalayan Host, Prabhu Host, Nest Nepal, etc.).",
    prerequisites: [
      "A working Laravel 10 or 11 project",
      "Access to a cPanel hosting account with File Manager and MySQL Database Wizard",
      "PHP 8.2 or 8.3 enabled on cPanel",
    ],
    whatYouWillLearn: [
      "The critical security risks of incorrect cPanel directory structure",
      "Separating core application code from public document root",
      "Configuring the index.php entry point and storage symlink",
      "Creating MySQL databases and setting up the production .env file",
      "Fixing common 500 errors and permission problems",
    ],
    sections: [
      {
        id: "the-security-risk",
        title: "1. The Critical cPanel Security Trap: Never Dump Everything into public_html",
        content: `Most shared cPanel tutorials tell beginners to copy their entire Laravel project folder directly into \`public_html\`. 

**This is a critical security vulnerability!** When your entire project lives inside \`public_html\`:
- Visitors can download your private database credentials and API keys by browsing directly to \`https://yourdomain.com/.env\`!
- Attackers can view proprietary business logic, logs, and vendor code.

The correct, professional architecture places all core Laravel code **outside** of \`public_html\`, and copies **only the contents of Laravel's \`public/\` directory** into \`public_html\`.`,
        callout: {
          type: "security",
          title: "Public Document Root Isolation",
          text: "In standard Laravel, only the public/ directory is meant to be web-accessible. Your app/, config/, storage/, and .env files must remain outside public_html.",
        },
      },
      {
        id: "step-by-step-cpanel",
        title: "2. Step-by-Step Secure Deployment Process",
        content: `### Step A: Prepare Your Project Archive Locally
1. Run \`npm run build\` locally to compile production assets (Vite/Tailwind).
2. Clean temporary caches:
\`\`\`bash
php artisan config:clear
php artisan route:clear
php artisan view:clear
\`\`\`
3. Create a ZIP archive of your project **excluding** the \`node_modules\` folder and the local \`.env\` file.

### Step B: Upload Core Files Outside public_html
1. Log into your cPanel and open **File Manager**.
2. Navigate to your home directory (e.g., \`/home/username/\`, one level above \`public_html\`).
3. Create a new folder named \`laravel_app\`.
4. Upload your project ZIP file inside \`/home/username/laravel_app/\` and extract it.

### Step C: Move Public Assets into public_html
1. Move the contents of \`/home/username/laravel_app/public/\` into your \`public_html/\` directory (including \`.htaccess\` and \`index.php\`).
2. Delete the empty \`public/\` folder inside \`laravel_app\` or leave it.`,
      },
      {
        id: "modifying-index-php",
        title: "3. Updating index.php Paths",
        content: `Since your core Laravel files are now located in \`../laravel_app/\`, you need to edit \`public_html/index.php\` so it can find the autoloader and bootstrap file:`,
        codeTabs: [
          {
            language: "php",
            filename: "public_html/index.php",
            label: "Updated index.php",
            code: `<?php

use Illuminate\\Http\\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../laravel_app/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../laravel_app/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once __DIR__.'/../laravel_app/bootstrap/app.php')
    ->handleRequest(Request::capture());`,
          },
        ],
      },
      {
        id: "cpanel-database-setup",
        title: "4. Database Creation & Production .env Setup",
        content: `1. In cPanel, open **MySQL Database Wizard**.
2. Create a database (e.g., \`username_laraveldb\`).
3. Create a user (e.g., \`username_dbuser\`) with a strong password.
4. Assign the user to the database with **ALL PRIVILEGES**.
5. In File Manager, navigate to \`/home/username/laravel_app/\` and create or edit the \`.env\` file:`,
        codeTabs: [
          {
            language: "bash",
            filename: "laravel_app/.env",
            label: "Production .env",
            code: `APP_NAME="My App"
APP_ENV=production
APP_KEY=base64:yourGeneratedKeyHere...
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=username_laraveldb
DB_USERNAME=username_dbuser
DB_PASSWORD=YourStrongDatabasePassword123!`,
          },
        ],
      },
      {
        id: "storage-symlink-cpanel",
        title: "5. Creating the Storage Symlink on cPanel",
        content: `If you do not have SSH terminal access in your shared hosting plan, create a temporary route in \`routes/web.php\` to link storage:`,
        codeTabs: [
          {
            language: "php",
            filename: "routes/web.php",
            label: "Temporary Symlink Route",
            code: `// Visit https://yourdomain.com/create-storage-link once, then remove this route!
Route::get('/create-storage-link', function () {
    Artisan::call('storage:link');
    return 'Storage symbolic link created successfully!';
});`,
          },
        ],
      },
    ],
    expectedOutput: `Visiting https://yourdomain.com loads your Laravel home page smoothly with all CSS, images, and database queries executing without any 500 error.
Visiting https://yourdomain.com/.env returns an HTTP 404 (file does not exist in public_html).`,
    testingSteps: [
      "Open https://yourdomain.com in browser and check homepage rendering",
      "Test database operations like login or registration",
      "Verify https://yourdomain.com/.env returns 404 Not Found to ensure sensitive keys are protected",
      "Check storage/logs/laravel.log in File Manager if any error occurs",
    ],
    commonErrors: [
      {
        error: "HTTP 500 Internal Server Error",
        cause: "Permissions on storage or bootstrap/cache folders are not writable (need 775 or 755), or PHP version mismatch.",
        solution: "Set permissions on storage and bootstrap/cache to 755 (or 775). In cPanel 'Select PHP Version', ensure PHP 8.2+ with required extensions (pdo_mysql, mbstring, openssl, xml) is active.",
      },
      {
        error: "Vite manifest not found at: public/build/manifest.json",
        cause: "Forgot to run 'npm run build' before uploading to cPanel.",
        solution: "Run npm run build locally, then upload the resulting public/build directory into public_html/build.",
      },
    ],
    securityNotes: [
      "Never leave APP_DEBUG=true in production; it reveals stack traces and environment variables on error.",
      "Delete any temporary setup routes (like /create-storage-link or migration routes) immediately after use.",
    ],
    faqs: [
      {
        question: "Can I run 'php artisan migrate' without SSH terminal?",
        answer: "Yes, you can either export your database schema locally with phpMyAdmin and import the .sql file into cPanel phpMyAdmin, or temporarily add Route::get('/run-migrations', fn() => Artisan::call('migrate')) and delete it immediately.",
      },
      {
        question: "What PHP extensions are mandatory for Laravel?",
        answer: "OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath, and Fileinfo.",
      },
    ],
    summary: [
      "Keep core Laravel code outside public_html.",
      "Point public_html/index.php to ../laravel_app/vendor/autoload.php.",
      "Set APP_DEBUG=false and secure file permissions.",
    ],
    references: [
      {
        title: "Official Laravel Deployment Guide",
        url: "https://laravel.com/docs/deployment",
        description: "Official production deployment recommendations and optimization commands.",
      },
    ],
    relatedSlugs: [
      "how-to-fix-laravel-500-internal-server-error",
      "how-to-connect-mysql-to-laravel-fix-connection-errors",
    ],
  },

  // ─── Article 5: Deploy MERN on VPS ─────────────────────────────────────────
  {
    slug: "how-to-deploy-mern-stack-on-vps",
    title: "How to Deploy a MERN Stack Application on an Ubuntu VPS with Nginx, PM2, and SSL",
    description: "Complete production deployment guide for MERN stack (MongoDB, Express, React, Node.js) applications on an Ubuntu VPS (DigitalOcean, Linode, AWS, or local VPS).",
    category: "Deployment",
    categorySlug: "deployment",
    tags: ["MERN", "Node.js", "React", "Nginx", "PM2", "VPS", "Ubuntu"],
    publishedAt: "2025-01-18",
    updatedAt: "2025-02-14",
    readingTime: "16 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Developers wanting full control over their server infrastructure, running Node.js backends and React frontends on affordable Cloud VPS instances.",
    prerequisites: [
      "A clean Ubuntu 22.04 or 24.04 LTS VPS instance",
      "A domain name pointing to the VPS IP address",
      "Basic terminal and SSH knowledge",
    ],
    whatYouWillLearn: [
      "Setting up a non-root sudo user and UFW firewall",
      "Installing Node.js LTS via NodeSource and PM2 process manager",
      "Building and serving React frontend static files with Nginx",
      "Reverse-proxying /api requests to Express running on localhost:5000",
      "Securing the server with a free Let's Encrypt SSL certificate",
    ],
    sections: [
      {
        id: "server-initial-setup",
        title: "1. Initial Server Security and Node.js Installation",
        content: `Connect to your VPS via SSH and update package repositories:`,
        codeTabs: [
          {
            language: "bash",
            filename: "Terminal",
            label: "Ubuntu Server Setup",
            code: `# 1. Update server packages
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js LTS (v20) via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git build-essential

# 3. Verify versions
node -v
npm -v

# 4. Install PM2 globally to keep your Express server running 24/7
sudo npm install -g pm2`,
          },
        ],
      },
      {
        id: "pm2-setup",
        title: "2. Running the Express Backend with PM2",
        content: `Clone your repository into \`/var/www/my-app\` or your user home directory, install dependencies, and launch with PM2:`,
        codeTabs: [
          {
            language: "bash",
            filename: "Terminal",
            label: "PM2 Deployment",
            code: `# Clone backend
cd /var/www
sudo git clone https://github.com/yourusername/mern-backend.git backend
cd backend
npm install --production

# Create production .env
nano .env

# Start with PM2
pm2 start server.js --name "mern-api"

# Configure PM2 to restart automatically on server reboot
pm2 startup
# Copy and run the command printed by pm2 startup, then:
pm2 save`,
          },
        ],
      },
      {
        id: "nginx-reverse-proxy",
        title: "3. Configuring Nginx as Reverse Proxy and Static Server",
        content: `Nginx acts as your front-facing web server on port 80/443. It directly serves the compiled React build for high speed and proxies \`/api\` requests to Express on port 5000.`,
        codeTabs: [
          {
            language: "nginx",
            filename: "/etc/nginx/sites-available/myapp",
            label: "Nginx Config",
            code: `server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # React compiled frontend build files
    root /var/www/frontend/dist;
    index index.html;

    # Handle client-side routing in React (React Router)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to Node.js backend
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}`,
          },
          {
            language: "bash",
            filename: "Terminal",
            label: "Enable Site & Test Nginx",
            code: `# Link site to sites-enabled
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

# Test Nginx syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx`,
          },
        ],
      },
      {
        id: "certbot-ssl",
        title: "4. Enabling Free SSL Certificate with Certbot",
        content: `Install Certbot and obtain an automated Let's Encrypt certificate:`,
        codeTabs: [
          {
            language: "bash",
            filename: "Terminal",
            label: "Certbot SSL",
            code: `sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`,
          },
        ],
      },
    ],
    expectedOutput: `Visiting https://yourdomain.com loads your React single-page app over HTTPS.
API requests to https://yourdomain.com/api/posts resolve seamlessly to Express on port 5000 without any CORS errors.`,
    testingSteps: [
      "Run `pm2 status` to verify mern-api is online and consuming healthy memory (< 150MB)",
      "Test client-side navigation (e.g. refresh /dashboard directly to verify try_files works)",
      "Check `sudo certbot renew --dry-run` to ensure SSL renewal is configured correctly",
    ],
    commonErrors: [
      {
        error: "404 Not Found on Page Refresh in React",
        cause: "Nginx trying to find actual file matching the URL path instead of falling back to index.html.",
        solution: "Add 'try_files $uri $uri/ /index.html;' inside location / in your Nginx config.",
      },
      {
        error: "502 Bad Gateway",
        cause: "Express server is crashed or not listening on port 5000.",
        solution: "Run 'pm2 logs mern-api' to inspect Node.js crash errors and ensure PORT matches proxy_pass.",
      },
    ],
    securityNotes: [
      "Configure UFW firewall: sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable.",
      "Never bind MongoDB to 0.0.0.0 without authentication enabled.",
    ],
    faqs: [
      {
        question: "Why should I use PM2 instead of 'node server.js'?",
        answer: "If server.js encounters an unhandled exception or the VPS reboots, plain 'node' crashes and stays down. PM2 automatically restarts the process instantly.",
      },
    ],
    summary: [
      "Use PM2 for zero-downtime Node.js process management.",
      "Use Nginx to serve static React builds and reverse-proxy /api traffic.",
      "Secure with Certbot Let's Encrypt SSL.",
    ],
    references: [
      {
        title: "Nginx Official Documentation",
        url: "https://nginx.org/en/docs/",
        description: "Official guide on reverse proxying and try_files directives.",
      },
    ],
    relatedSlugs: [
      "how-to-fix-cors-errors-react-nodejs",
      "how-to-connect-mongodb-to-nodejs",
      "how-to-setup-https-fix-ssl-certificate-errors",
    ],
  },

  // ─── Article 6: Deploy Next.js on Vercel ───────────────────────────────────
  {
    slug: "how-to-deploy-nextjs-on-vercel",
    title: "How to Deploy a Next.js Application on Vercel (Production Checklist & Zero-Downtime Builds)",
    description: "Learn how to deploy your Next.js App Router application to Vercel for free. Configure Git CI/CD, production environment variables, image optimization, and fix build failures.",
    category: "Deployment",
    categorySlug: "deployment",
    tags: ["Next.js", "Vercel", "React", "Deployment", "CI/CD"],
    publishedAt: "2025-01-20",
    updatedAt: "2025-02-10",
    readingTime: "11 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Frontend and full-stack developers in Nepal building web applications with Next.js looking for the most reliable, zero-maintenance global deployment platform.",
    prerequisites: [
      "A Next.js 14 or 15 project",
      "GitHub, GitLab, or Bitbucket account",
      "Free Vercel account at vercel.com",
    ],
    whatYouWillLearn: [
      "Importing a GitHub repository into Vercel",
      "Configuring build settings and environment variables",
      "Understanding preview branches vs production branch deployments",
      "Diagnosing and fixing common Next.js build errors",
    ],
    sections: [
      {
        id: "vercel-connection",
        title: "1. Connecting GitHub to Vercel",
        content: `1. Push your Next.js project to a private or public GitHub repository.
2. Sign into [Vercel.com](https://vercel.com/) with GitHub.
3. Click **Add New** → **Project**.
4. Select your repository from the list and click **Import**.`,
      },
      {
        id: "vercel-env-vars",
        title: "2. Setting Environment Variables",
        content: `Under **Environment Variables**, enter any server or public keys required by your application (e.g. \`NEXT_PUBLIC_SITE_URL\`, database connection strings, API secrets).

Remember:
- Keys prefixed with \`NEXT_PUBLIC_\` are bundled into frontend JavaScript.
- Keys without the prefix are kept securely in Node.js serverless functions.`,
      },
      {
        id: "build-troubleshooting",
        title: "3. Diagnosing Build Failures",
        content: `Before pushing to production, always run \`npm run build\` locally in your terminal. If the local build fails, Vercel will fail as well.`,
        codeTabs: [
          {
            language: "bash",
            filename: "Terminal",
            label: "Local Pre-deployment Check",
            code: `# 1. Lint code for syntax and React hook rules
npm run lint

# 2. Test production compilation locally
npm run build`,
          },
        ],
      },
    ],
    expectedOutput: `Vercel builds your application and assigns a production URL like https://your-project.vercel.app with instant global edge caching and free SSL.`,
    testingSteps: [
      "Verify that all dynamic and static pages load with HTTP 200",
      "Inspect network tab to ensure client bundles and CSS chunks load from Vercel Edge Network",
    ],
    commonErrors: [
      {
        error: "Type error: Property does not exist on type",
        cause: "TypeScript errors caught during next build strict checking.",
        solution: "Fix the type annotations or run 'npx tsc --noEmit' to inspect all type errors locally.",
      },
    ],
    securityNotes: [
      "Never put sensitive API keys in NEXT_PUBLIC_ variables.",
    ],
    faqs: [
      {
        question: "Is Vercel free for personal projects?",
        answer: "Yes, Vercel's Hobby plan is completely free for personal portfolios, open-source projects, and non-commercial websites.",
      },
    ],
    summary: [
      "Vercel offers automatic Git CI/CD deployments for Next.js.",
      "Test 'npm run build' locally to avoid failed deployments.",
    ],
    references: [
      {
        title: "Official Vercel Next.js Guide",
        url: "https://vercel.com/docs/frameworks/nextjs",
        description: "Official Vercel platform documentation.",
      },
    ],
    relatedSlugs: [
      "how-to-connect-custom-domain-to-vercel",
      "how-to-configure-dns-records-fix-common-errors",
    ],
  },

  // ─── Article 7: Connect Custom Domain to Vercel ────────────────────────────
  {
    slug: "how-to-connect-custom-domain-to-vercel",
    title: "How to Connect a Custom Domain (.np or .com) to Vercel (Apex vs CNAME Configuration)",
    description: "Step-by-step tutorial on connecting a custom domain to your Vercel project. Includes instructions for free .np domains via Cloudflare, A records, CNAMEs, and automatic SSL issuance.",
    category: "Deployment",
    categorySlug: "deployment",
    tags: ["Vercel", "Domain", "DNS", "Cloudflare", ".np Domain", "SSL"],
    publishedAt: "2025-01-22",
    updatedAt: "2025-02-11",
    readingTime: "10 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Developers wanting to attach their custom brand domain (including free Nepali .com.np domains) to their Vercel deployment.",
    prerequisites: [
      "A deployed Next.js or React app on Vercel",
      "A registered domain name (from Namecheap, Cloudflare, or register.com.np)",
      "Access to your DNS management console",
    ],
    whatYouWillLearn: [
      "Configuring root (Apex) vs subdomain records for Vercel",
      "Vercel's official IP address (76.76.21.21) and CNAME (cname.vercel-dns.com)",
      "Bridging a Nepali .com.np domain through Cloudflare DNS to Vercel",
      "Setting up automatic canonical redirects (e.g. non-www to www)",
    ],
    sections: [
      {
        id: "add-domain-vercel",
        title: "1. Adding the Domain in Vercel Project Settings",
        content: `1. Open your project on [Vercel](https://vercel.com/).
2. Navigate to **Settings** → **Domains**.
3. Enter your domain (e.g., \`yourdomain.com\` or \`yourname.com.np\`) and click **Add**.
4. Vercel will recommend adding both \`yourdomain.com\` and \`www.yourdomain.com\` with automatic redirect.`,
      },
      {
        id: "dns-configuration",
        title: "2. Required DNS Records for Vercel",
        content: `In your DNS manager (e.g., Cloudflare, Namecheap):`,
        table: {
          headers: ["Type", "Name / Host", "Value / Target", "TTL"],
          rows: [
            ["A", "@ (root)", "76.76.21.21", "Auto / 3600"],
            ["CNAME", "www", "cname.vercel-dns.com", "Auto / 3600"],
          ],
        },
      },
      {
        id: "cloudflare-proxy-warning",
        title: "3. Special Note for Cloudflare Users",
        content: `If your DNS is managed via Cloudflare:
- During initial domain verification and SSL generation, change the Cloudflare proxy status to **DNS Only (Grey Cloud)**.
- Once Vercel issues the SSL certificate and shows "Valid Configuration", you can re-enable the **Orange Cloud (Proxied)** if desired, ensuring your Cloudflare SSL mode is set to **Full (Strict)**.`,
      },
    ],
    expectedOutput: `Vercel dashboard displays a green checkmark: "Valid Configuration". Visiting https://yourname.com.np serves your application with a valid TLS certificate.`,
    testingSteps: [
      "Run `dig +short A yourdomain.com` in terminal to confirm it returns 76.76.21.21",
      "Run `curl -I https://yourdomain.com` to verify HTTP 200 and server header 'Vercel'",
    ],
    commonErrors: [
      {
        error: "Invalid Configuration / Verification Pending",
        cause: "DNS records have not propagated yet, or conflicting old A records exist.",
        solution: "Remove any old hosting IP addresses and wait 5 to 15 minutes for DNS caches to update.",
      },
    ],
    securityNotes: [
      "Always configure an automatic redirect from non-www to www (or vice versa) to prevent duplicate SEO penalties.",
    ],
    faqs: [
      {
        question: "Can I connect my free Nepali .com.np domain to Vercel?",
        answer: "Yes! Because register.com.np requires nameservers, first point your .com.np domain to Cloudflare nameservers, then add Vercel's DNS records inside Cloudflare.",
      },
    ],
    summary: [
      "Point root domain to 76.76.21.21 and www to cname.vercel-dns.com.",
      "Vercel manages SSL certificates automatically.",
    ],
    references: [
      {
        title: "Vercel Custom Domains Documentation",
        url: "https://vercel.com/docs/projects/domains/add-a-domain",
        description: "Official step-by-step custom domain guide from Vercel.",
      },
    ],
    relatedSlugs: [
      "how-to-register-free-np-domain-nepal",
      "how-to-configure-dns-records-fix-common-errors",
    ],
  },
];
