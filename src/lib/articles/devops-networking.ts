import { BlogPost } from "../blog-types";

export const devopsArticles: BlogPost[] = [
  // ─── Article 8: DNS Records & Troubleshooting ──────────────────────────────
  {
    slug: "how-to-configure-dns-records-fix-common-errors",
    title: "How to Configure DNS Records (A, CNAME, MX, TXT) and Fix Common DNS Errors",
    description: "Master domain name system (DNS) records. Learn what A, CNAME, MX, and TXT records do, how TTL works, and how to fix ERR_NAME_NOT_RESOLVED, DNS loops, and propagation delays.",
    category: "DevOps & Tools",
    categorySlug: "devops-and-tools",
    tags: ["DNS", "Networking", "DevOps", "Cloudflare", "Troubleshooting"],
    publishedAt: "2025-01-24",
    updatedAt: "2025-02-08",
    readingTime: "12 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Beginner developers struggling to connect domains to web hosts, VPS instances, or email services.",
    prerequisites: [
      "Access to a domain registrar or Cloudflare DNS management dashboard",
      "Terminal access to run dig or nslookup",
    ],
    whatYouWillLearn: [
      "The distinct roles of A, AAAA, CNAME, MX, and TXT records",
      "How Time to Live (TTL) influences DNS propagation",
      "Diagnosing DNS issues with terminal tools (dig, nslookup, ping)",
      "Resolving ERR_NAME_NOT_RESOLVED and circular CNAME loops",
    ],
    sections: [
      {
        id: "core-dns-types",
        title: "1. Core DNS Record Types Explained in Simple Terms",
        content: `DNS is the internet's phonebook, translating human-friendly names (\`manoj-neupane.com.np\`) into computer IP addresses (\`76.76.21.21\`).

Key Record Types:
- **A Record (Address):** Maps a hostname directly to an IPv4 address (e.g., \`@\` → \`159.89.12.34\`).
- **AAAA Record:** Maps a hostname to an IPv6 address.
- **CNAME (Canonical Name):** Maps one domain alias to another domain (e.g., \`www.yoursite.com\` → \`cname.vercel-dns.com\`). Note: CNAME cannot legally coexist on root apex (\`@\`) in standard DNS.
- **MX Record (Mail Exchange):** Dictates which mail server handles incoming emails for your domain.
- **TXT Record (Text):** Stores arbitrary text, used for domain ownership verification, Google Search Console, and email security (SPF, DKIM, DMARC).`,
      },
      {
        id: "diagnosing-dns-cli",
        title: "2. Diagnosing DNS Using Command Line Tools",
        content: `Don't guess whether your DNS has propagated. Use terminal commands to query authoritative servers directly:`,
        codeTabs: [
          {
            language: "bash",
            filename: "Terminal",
            label: "DNS Inspection Commands",
            code: `# Check A record of your domain
dig yourdomain.com A +short

# Query specific public DNS (e.g. Google 8.8.8.8 or Cloudflare 1.1.1.1) to bypass local ISP cache
dig @1.1.1.1 yourdomain.com A

# Check MX records
dig yourdomain.com MX +short

# Windows equivalent using nslookup
nslookup -type=A yourdomain.com 1.1.1.1`,
          },
        ],
      },
      {
        id: "fixing-common-dns-issues",
        title: "3. Fixing Common DNS Errors",
        content: `### 1. ERR_NAME_NOT_RESOLVED
- **Cause:** No active A or CNAME record exists for the requested subdomain.
- **Fix:** Add an A record pointing to your server's IP address or CNAME pointing to your host.

### 2. DNS_PROBE_FINISHED_NXDOMAIN
- **Cause:** Domain has expired or nameservers are unassigned/misconfigured.
- **Fix:** Verify active status in WHOIS and check that nameservers are assigned properly.

### 3. CNAME Flattening on Apex Domain
- **Problem:** Many registrars reject a CNAME on \`@\` (root).
- **Fix:** Use Cloudflare or modern DNS providers that support "CNAME Flattening" (ALIAS record).`,
      },
    ],
    expectedOutput: `Running 'dig yourdomain.com +short' returns your active server IP address with zero NXDOMAIN errors.`,
    testingSteps: [
      "Test global propagation using whatsmydns.net",
      "Clear local DNS cache: 'sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder' on macOS or 'ipconfig /flushdns' on Windows",
    ],
    commonErrors: [
      {
        error: "Multiple conflicting A records",
        cause: "Old hosting provider IP was not deleted when adding new IP.",
        solution: "Delete the old A record so traffic routes 100% to your new server.",
      },
    ],
    securityNotes: [
      "Never share administrative login credentials to your DNS provider.",
    ],
    faqs: [
      {
        question: "How long does DNS propagation take in Nepal?",
        answer: "Most modern DNS changes propagate in 2 to 15 minutes, but local Nepali ISPs with aggressive caching may take up to 24 hours.",
      },
    ],
    summary: [
      "A records point to IP addresses; CNAME points to domain names.",
      "Use 'dig' or 'nslookup' with public resolvers (1.1.1.1) to bypass ISP caching.",
    ],
    references: [
      {
        title: "Cloudflare DNS Learning Center",
        url: "https://www.cloudflare.com/learning/dns/what-is-dns/",
        description: "Comprehensive guide to DNS fundamentals.",
      },
    ],
    relatedSlugs: [
      "how-to-connect-custom-domain-to-vercel",
      "how-to-setup-domain-email-fix-spf-dkim",
    ],
  },

  // ─── Article 9: Domain Email & SPF/DKIM ─────────────────────────────────────
  {
    slug: "how-to-setup-domain-email-fix-spf-dkim",
    title: "How to Set Up a Professional Domain Email and Fix SPF/DKIM/DMARC Deliverability Issues",
    description: "Stop your business emails from landing in client Spam or Junk folders. Learn how to configure custom domain email with Zoho or Google Workspace and set up SPF, DKIM, and DMARC records.",
    category: "DevOps & Tools",
    categorySlug: "devops-and-tools",
    tags: ["Email", "DNS", "SPF", "DKIM", "DMARC", "Zoho"],
    publishedAt: "2025-01-26",
    updatedAt: "2025-02-12",
    readingTime: "13 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Developers and businesses setting up custom email addresses (e.g. contact@yourdomain.com) whose emails are landing in Gmail spam folders.",
    prerequisites: [
      "A registered domain name with access to DNS records",
      "Free Zoho Mail or Google Workspace account",
    ],
    whatYouWillLearn: [
      "Configuring MX records to route incoming emails",
      "What SPF is and how to create the correct TXT record",
      "Generating and publishing DKIM cryptographic keys",
      "Setting up a DMARC policy for email authentication",
    ],
    sections: [
      {
        id: "why-emails-go-to-spam",
        title: "1. Why Your Emails Land in the Spam Folder",
        content: `Major email providers (Google, Yahoo, Microsoft) enforce strict anti-spam rules. If an email claims to come from \`info@yourdomain.com\`, but your DNS does not have **SPF** and **DKIM** records authorizing the sending server, the recipient's mail server automatically flags it as spoofed / phishing and diverts it to Spam.`,
      },
      {
        id: "configuring-spf",
        title: "2. Setting up the SPF (Sender Policy Framework) Record",
        content: `SPF is a single TXT record listing all IP addresses and mail services permitted to send email on your domain's behalf.`,
        codeTabs: [
          {
            language: "dns",
            filename: "DNS TXT Record",
            label: "SPF Examples",
            code: `# For Zoho Mail users:
Type: TXT
Host / Name: @
Value: v=spf1 include:zoho.com ~all

# For Google Workspace (Gmail):
Type: TXT
Host / Name: @
Value: v=spf1 include:_spf.google.com ~all

# For shared cPanel server:
Type: TXT
Host / Name: @
Value: v=spf1 +a +mx ~all`,
          },
        ],
      },
      {
        id: "configuring-dkim",
        title: "3. Configuring DKIM (DomainKeys Identified Mail)",
        content: `DKIM adds a cryptographic signature to email headers. Your mail provider generates a public/private key pair. You publish the public key in your DNS as a TXT record.`,
        codeTabs: [
          {
            language: "dns",
            filename: "DNS TXT Record",
            label: "DKIM Record Example",
            code: `# Example DKIM for Zoho:
Type: TXT
Host / Name: zoho._domainkey
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQ...[publicKey]...DAQAB`,
          },
        ],
      },
      {
        id: "configuring-dmarc",
        title: "4. Setting up DMARC (Domain-based Message Authentication)",
        content: `DMARC tells receiving servers what to do if an incoming email fails SPF or DKIM checks:`,
        codeTabs: [
          {
            language: "dns",
            filename: "DNS TXT Record",
            label: "DMARC Record",
            code: `Type: TXT
Host / Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:admin@yourdomain.com; pct=100; sp=none`,
          },
        ],
      },
    ],
    expectedOutput: `Sending a test email to mail-tester.com scores 10/10 with SPF, DKIM, and DMARC passing with zero warnings.`,
    testingSteps: [
      "Send a test message to https://www.mail-tester.com",
      "Check headers in received Gmail: Click three dots → 'Show Original' and verify SPF, DKIM, DMARC all show 'PASS'",
    ],
    commonErrors: [
      {
        error: "Multiple SPF records found",
        cause: "Publishing two separate TXT records containing v=spf1.",
        solution: "Combine them into one: 'v=spf1 include:zoho.com include:_spf.google.com ~all'. A domain can only have ONE SPF record.",
      },
    ],
    securityNotes: [
      "Never publish private DKIM keys in public repositories or client files.",
    ],
    faqs: [
      {
        question: "Can I get free professional domain email in Nepal?",
        answer: "Yes, Zoho Mail offers a Forever Free plan supporting up to 5 users on your custom domain with 5GB storage per user.",
      },
    ],
    summary: [
      "MX handles inbound email; SPF and DKIM authenticate outbound email.",
      "Never create more than one SPF TXT record per domain.",
    ],
    references: [
      {
        title: "Google Workspace Email Deliverability Standards",
        url: "https://support.google.com/a/answer/81126",
        description: "Official deliverability guidelines for bulk and transactional email.",
      },
    ],
    relatedSlugs: [
      "how-to-configure-dns-records-fix-common-errors",
      "how-to-register-free-np-domain-nepal",
    ],
  },

  // ─── Article 16: HTTPS & SSL Errors ────────────────────────────────────────
  {
    slug: "how-to-setup-https-fix-ssl-certificate-errors",
    title: "How to Set Up HTTPS and Fix SSL Certificate Errors (ERR_SSL_PROTOCOL_ERROR & Mixed Content)",
    description: "Understand TLS/SSL certificates, automate Let's Encrypt with Certbot on Linux, fix the dreaded Cloudflare 'Too Many Redirects' loop, and resolve mixed content warnings.",
    category: "DevOps & Tools",
    categorySlug: "devops-and-tools",
    tags: ["SSL", "HTTPS", "Security", "Certbot", "Cloudflare", "Nginx"],
    publishedAt: "2025-01-28",
    updatedAt: "2025-02-14",
    readingTime: "11 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Developers experiencing browser SSL certificate errors, redirection loops, or warning padlocks on their websites.",
    prerequisites: [
      "Ubuntu VPS or web hosting with root/cPanel access",
      "Active domain pointed to the server",
    ],
    whatYouWillLearn: [
      "How TLS certificates secure web traffic",
      "Automating free certificates with Certbot",
      "Fixing Cloudflare 'Flexible' redirect loops",
      "Finding and fixing mixed content (HTTP resources on HTTPS page)",
    ],
    sections: [
      {
        id: "certbot-automation",
        title: "1. Generating SSL with Certbot for Nginx/Apache",
        content: `Run Certbot to automatically issue and install certificates:`,
        codeTabs: [
          {
            language: "bash",
            filename: "Terminal",
            label: "Certbot Commands",
            code: `# Install certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate and configure Nginx automatically
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Verify renewal timer
sudo systemctl status certbot.timer`,
          },
        ],
      },
      {
        id: "cloudflare-ssl-loop",
        title: "2. Fixing the Infamous 'ERR_TOO_MANY_REDIRECTS' Cloudflare Loop",
        content: `If your site goes into an infinite redirect loop when using Cloudflare:
- **Cause:** Cloudflare SSL setting is set to **Flexible**. Cloudflare talks to your server over unencrypted HTTP (port 80). Your server responds with an HTTP 301 redirect to HTTPS. Cloudflare gets the redirect, converts it, and asks your server over HTTP again in an infinite loop!
- **Fix:** Change your Cloudflare SSL/TLS encryption mode to **Full (Strict)**.`,
      },
    ],
    expectedOutput: `Visiting your website displays a secure lock icon in modern browsers with a valid certificate issued by Let's Encrypt or Cloudflare.`,
    testingSteps: [
      "Check certificate status via Qualys SSL Labs: https://www.ssllabs.com/ssltest/",
    ],
    commonErrors: [
      {
        error: "Mixed Content Warning",
        cause: "HTML page served via HTTPS, but loading images or scripts via http:// URLs.",
        solution: "Update all asset links to relative paths or https://.",
      },
    ],
    securityNotes: [
      "Enable HTTP Strict Transport Security (HSTS) headers to force browsers to always use HTTPS.",
    ],
    faqs: [
      {
        question: "Do Let's Encrypt certificates expire?",
        answer: "Yes, they expire every 90 days, but Certbot installs a systemd timer that renews them automatically before expiration.",
      },
    ],
    summary: [
      "Always set Cloudflare SSL mode to Full (Strict).",
      "Certbot automates free Let's Encrypt SSL on Linux.",
    ],
    references: [
      {
        title: "Certbot Official Instructions",
        url: "https://certbot.eff.org/",
        description: "Official EFF Certbot configuration wizard.",
      },
    ],
    relatedSlugs: [
      "how-to-deploy-mern-stack-on-vps",
      "how-to-configure-dns-records-fix-common-errors",
    ],
  },

  // ─── Article 17: Git, GitHub, SSH ──────────────────────────────────────────
  {
    slug: "how-to-configure-git-github-ssh-keys",
    title: "How to Configure Git, GitHub, and SSH Keys for a New Project (No Password Prompts)",
    description: "Generate and configure ed25519 SSH keys for GitHub, clone and push private repositories without typing passwords, and fix 'Permission denied (publickey)' errors.",
    category: "DevOps & Tools",
    categorySlug: "devops-and-tools",
    tags: ["Git", "GitHub", "SSH", "Linux", "DevOps"],
    publishedAt: "2025-01-30",
    updatedAt: "2025-02-15",
    readingTime: "10 min read",
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Developers frustrated by password deprecation on GitHub and wanting seamless, secure SSH-authenticated Git workflows.",
    prerequisites: [
      "Git installed locally",
      "A free GitHub account",
    ],
    whatYouWillLearn: [
      "Why GitHub deprecated account password authentication",
      "Generating modern, secure Ed25519 SSH keys",
      "Adding public keys to GitHub and configuring ssh-agent",
      "Fixing 'Permission denied (publickey)' errors",
    ],
    sections: [
      {
        id: "generating-ssh-key",
        title: "1. Generating an Ed25519 SSH Key Pair",
        content: `Run this in your terminal (macOS, Linux, or Git Bash on Windows):`,
        codeTabs: [
          {
            language: "bash",
            filename: "Terminal",
            label: "Generate Key",
            code: `# 1. Generate modern Ed25519 key (replace with your GitHub email)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter to save in default file (~/.ssh/id_ed25519)
# Optionally enter a passphrase

# 2. Start the ssh-agent in the background
eval "$(ssh-agent -s)"

# 3. Add private key to agent
ssh-add ~/.ssh/id_ed25519

# 4. Copy public key to clipboard
# On macOS:
pbcopy < ~/.ssh/id_ed25519.pub
# On Linux:
cat ~/.ssh/id_ed25519.pub
# On Windows Git Bash:
clip < ~/.ssh/id_ed25519.pub`,
          },
        ],
      },
      {
        id: "adding-key-to-github",
        title: "2. Adding Your Key to GitHub Settings",
        content: `1. In GitHub, click your profile icon in top-right → **Settings**.
2. In the left sidebar, click **SSH and GPG keys**.
3. Click **New SSH key**.
4. Give it a title (e.g. \`M1 MacBook\` or \`Work Laptop\`).
5. Paste your copied key starting with \`ssh-ed25519 ...\` and click **Add SSH key**.`,
      },
      {
        id: "testing-ssh-connection",
        title: "3. Testing Authentication",
        content: `Run this terminal command:
\`\`\`bash
ssh -T git@github.com
\`\`\`
If successful, GitHub will reply:
\`Hi username! You've successfully authenticated, but GitHub does not provide shell access.\``,
      },
    ],
    expectedOutput: `Running 'git push origin main' pushes your commits instantly without prompting for passwords or personal access tokens.`,
    testingSteps: [
      "Run `ssh -T git@github.com` and ensure it welcomes you by username",
      "Change remote URL from HTTPS to SSH: `git remote set-url origin git@github.com:username/repo.git`",
    ],
    commonErrors: [
      {
        error: "Permission denied (publickey)",
        cause: "Private key not added to ssh-agent, or uploaded the private key instead of the .pub public key.",
        solution: "Run `ssh-add ~/.ssh/id_ed25519` and verify you pasted the contents of `id_ed25519.pub` into GitHub.",
      },
    ],
    securityNotes: [
      "Never share or commit files named id_ed25519 (without .pub); that is your private key.",
    ],
    faqs: [
      {
        question: "Can I use the same SSH key on multiple computers?",
        answer: "No, best security practice is to generate a distinct SSH key pair on each computer and add each public key to GitHub individually.",
      },
    ],
    summary: [
      "Use Ed25519 keys for speed and modern security.",
      "Add public key to GitHub; keep private key secret.",
    ],
    references: [
      {
        title: "GitHub SSH Documentation",
        url: "https://docs.github.com/en/authentication/connecting-to-github-with-ssh",
        description: "Official GitHub SSH setup instructions.",
      },
    ],
    relatedSlugs: [
      "how-to-deploy-mern-stack-on-vps",
      "how-to-deploy-nextjs-on-vercel",
    ],
  },
];
