# Manoj Neupane — Developer Portfolio & Technical Blog

A modern, high-performance developer portfolio and technical blog built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Styled with the bespoke **Midnight Electric** dark theme (`#0B1120`, `#111827`, `#1E293B`, `#3B82F6`, `#22D3EE`).

🌐 **Live Website**: [https://manoj-neupane.com.np](https://manoj-neupane.com.np)  
👨‍💻 **GitHub**: [@manojneupaneweb](https://github.com/manojneupaneweb)  
💼 **LinkedIn**: [Manoj Neupane](https://linkedin.com/in/manoj-neupane-52162921a)  
✉️ **Contact**: [manojneupaneweb@gmail.com](mailto:manojneupaneweb@gmail.com)

---

## 🚀 Key Features

- **Midnight Electric Theme**: Custom-crafted developer palette featuring deep midnight navy, electric blue primary accents, and technical cyan highlights.
- **Fast & Responsive**: Mobile-first architecture, fluid typography, zero layout shift, and smooth CSS transitions.
- **Full-Stack Project Showcase**: Detailed project highlights including architecture breakdown, live demo links, and source repositories (LinkToGovernment, OJAS, Softworica SaaS platforms, and more).
- **Comprehensive Tech Stack**: Detailed breakdowns of Frontend (React, Next.js, Tailwind), Backend (Laravel, PHP, Node.js, Express), Databases (MySQL, MongoDB, SQLite), and DevOps/APIs.
- **In-Depth Technical Blog**: 43+ articles across multiple tech clusters with dynamic search, tag filters, table of contents, and syntax-highlighted code blocks.
- **Dedicated Route Hierarchy**:
  - `/` — Homepage with Hero, Process, Capabilities, Featured Projects, Experience, and Contact
  - `/about` — Personal philosophy, journey, background, and approach
  - `/projects` & `/projects/[slug]` — Filterable portfolio showcase with project case studies
  - `/experience` — Professional track record, mentoring, and technical leadership
  - `/skills` — Detailed proficiency across modern web stacks
  - `/services` — Full-stack freelance development and consulting services
  - `/education` — Academic background, certifications, and milestones
  - `/blog` & `/blog/[slug]` — Technical publication engine
  - `/contact` — Client inquiry and project discussion form
  - `/admin` — Analytics and content overview
- **SEO & Accessibility**: Clean schema.org JSON-LD structured data (Person & WebSite entities), open graph cards, canonical tags, automated sitemap, and WCAG AA contrast compliance.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: Inter (Body), Space Grotesk (Headings), IBM Plex Mono (Code)
- **Analytics**: [@vercel/analytics](https://vercel.com/analytics)
- **Deployment Target**: Vercel

---

## 📂 Project Structure

```text
my-portfolio/
├── src/
│   ├── app/                    # Next.js 14 App Router routes & layouts
│   │   ├── (routes)/           # about, projects, experience, skills, services, etc.
│   │   ├── blog/               # Blog index and [slug] dynamic pages
│   │   ├── api/                # API routes (contact form, admin endpoints)
│   │   ├── globals.css         # Design tokens & core Midnight Electric styles
│   │   ├── layout.tsx          # Root layout, structured data & ambient lighting
│   │   └── page.tsx            # Main homepage
│   ├── components/             # Reusable UI & section components
│   │   ├── blog/               # Blog renderer, TOC, CodeBlock, Navigation
│   │   ├── Header.tsx          # Responsive navigation bar
│   │   └── Footer.tsx          # Site footer & verified social links
│   └── lib/                    # Content, metadata & configuration
│       ├── articles/           # Technical blog articles & topic clusters
│       ├── data.ts             # Site metadata, skills, experience, project list
│       └── metadata.ts         # Centralized SEO helpers
├── public/                     # Static assets, icons & imagery
├── tailwind.config.ts          # Custom color tokens & animation keyframes
├── tsconfig.json               # TypeScript configuration
└── package.json
```

---

## 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/manojneupaneweb/manojneupane.git
cd manojneupane
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm run start
```

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
