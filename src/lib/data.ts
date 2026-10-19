// ============================================================
// Content Data — Manoj Neupane Portfolio
// Edit this file to update all site content.
// ============================================================

export const siteConfig = {
  name: "Manoj Neupane",
  title: "Full Stack Web Developer · Node.js · Laravel · Next.js",
  description:
    "Manoj Neupane is a Full Stack Web Developer from Nepal specializing in Node.js, Laravel, and Next.js. Building high-performance SaaS platforms, REST APIs, and scalable web applications.",
  url: "https://manoj-neupane.com.np",
  email: "manojneupaneweb@gmail.com",
  github: "https://github.com/manojneupaneweb",
  linkedin: "https://www.linkedin.com/in/manoj-neupane-52162921a",
  country: "Nepal",
  profileImage: "/images/manoj-neupane.png",
  tagline: "I build software that solves real problems.",
  subTagline:
    "Specialized in Node.js, Laravel, and Next.js — building web applications, SaaS platforms, and business systems designed around real workflows, maintainable architecture, and reliable production use.",
};

// ─── Projects ────────────────────────────────────────────────

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "SaaS" | "Web Application" | "Business System" | "Educational Portal" | "API" | "Admin Panel" | "Directory";
  stack: string[];
  contribution: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  status: "live" | "in-progress" | "concept";
  thumbnail?: string;
  problem?: string;
  audience?: string;
  features?: string[];
  challenges?: string;
  outcome?: string;
};

export const projects: Project[] = [
  {
    slug: "linktogovernment",
    title: "LinkToGovernment",
    tagline: "Find official Nepal government websites — fast.",
    description:
      "An independent bilingual directory that helps citizens, researchers, and businesses find official Nepal government websites, including ministries, municipalities, citizen services, notices, and government contacts.",
    category: "Directory",
    stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    contribution:
      "Designed and built the full application — database architecture, backend API, search system, content organization, and deployment.",
    liveUrl: "https://linktogovernment.com",
    featured: true,
    status: "live",
    problem:
      "Nepal has hundreds of official government websites across federal, provincial, and local levels. Finding the correct official URL for a ministry, municipality, or citizen service is time-consuming and error-prone. Unofficial aggregators often link to outdated or incorrect URLs.",
    audience:
      "Nepalese citizens, diaspora, researchers, journalists, and businesses that need quick access to official government information.",
    features: [
      "Bilingual search in English and Nepali",
      "Ministry and department directory",
      "Citizen services portal (passport, PAN, NID, driving license, citizenship)",
      "Local government directory covering municipalities and rural units",
      "All seven provincial government portals",
      "Government contact directory (phone, email, address)",
      "Source verification with last-verified dates",
      "Independent disclaimer — not affiliated with any government body",
    ],
    challenges:
      "Keeping government URLs current is an ongoing challenge since Nepal's government websites frequently move, restructure, or go offline. The verification system tracks when each URL was last confirmed working.",
    outcome:
      "A verified, production-deployed application serving citizens who need reliable access to Nepal's official online presence.",
  },
  {
    slug: "saas-multi-tenant",
    title: "Multi-Tenant SaaS Platform",
    tagline: "One codebase. Many organizations. Full data isolation.",
    description:
      "A documented technical capability: designing and implementing multi-tenant SaaS applications where multiple client organizations share infrastructure while maintaining complete data isolation through role-based access control and tenant-scoped queries.",
    category: "SaaS",
    stack: ["Laravel", "MySQL", "JWT", "RBAC", "REST API", "Tailwind CSS"],
    contribution: "Architecture design, implementation, and documentation of multi-tenant patterns.",
    featured: false,
    status: "concept",
    problem:
      "Many businesses need software that serves multiple client organizations from a single deployment — reducing infrastructure cost while preserving data privacy and per-tenant customization.",
    features: [
      "Tenant isolation at the database query level",
      "Role-based access control per tenant",
      "Shared authentication infrastructure with tenant-scoped sessions",
      "Configurable per-tenant settings",
      "Admin panel for tenant management",
      "API design with tenant context headers",
    ],
  },
  {
    slug: "business-management-system",
    title: "Business Management System",
    tagline: "Operational software designed around real workflows.",
    description:
      "Backend-focused business management applications including inventory tracking, order management, reporting dashboards, and user administration built for real organizational use.",
    category: "Business System",
    stack: ["Laravel", "PHP", "MySQL", "REST API", "Tailwind CSS", "JavaScript"],
    contribution: "Full-stack development from database design through deployment.",
    featured: false,
    status: "concept",
    features: [
      "Inventory and stock tracking",
      "Order lifecycle management",
      "Role-based staff access",
      "Reporting and export",
      "Audit logging",
      "REST API for external integrations",
    ],
  },
  {
    slug: "educational-portal",
    title: "Educational Portal",
    tagline: "Learning management built for real institutions.",
    description:
      "Web-based educational portals and learning management systems supporting course delivery, student progress tracking, and administrative workflows for educational organizations.",
    category: "Educational Portal",
    stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    contribution: "Backend architecture, database design, and full-stack implementation.",
    featured: false,
    status: "concept",
    features: [
      "Course and curriculum management",
      "Student enrollment and progress tracking",
      "Assignment submission and grading",
      "Administrative dashboard",
      "Role-based access for students, instructors, and administrators",
      "Notification system",
    ],
  },
  {
    slug: "rest-api-development",
    title: "REST API Development",
    tagline: "Clean contracts. Predictable behavior. Secure by design.",
    description:
      "Design and implementation of RESTful APIs for web and mobile applications, including authentication flows, data validation, rate limiting, and documentation.",
    category: "API",
    stack: ["Laravel", "Node.js", "Express.js", "JWT", "MySQL", "MongoDB"],
    contribution: "API design, implementation, documentation, and integration support.",
    featured: false,
    status: "concept",
    features: [
      "RESTful resource design",
      "JWT and OTP authentication",
      "Request validation and error handling",
      "Rate limiting and security middleware",
      "API documentation",
      "Mobile and third-party client support",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

// ─── Skills ──────────────────────────────────────────────────

export type SkillCategory = {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
};

export type Skill = {
  name: string;
  description: string;
  useCase: string;
  relatedProject?: string;
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: "🖥️",
    skills: [
      { name: "React", description: "Component-based UI library for interactive interfaces.", useCase: "Building reusable, stateful frontend components." },
      { name: "Next.js", description: "React framework with SSR, SSG, and App Router.", useCase: "Production web applications with server-side rendering and static generation." },
      { name: "JavaScript", description: "Core language for browser and Node.js environments.", useCase: "Application logic, DOM manipulation, async operations." },
      { name: "TypeScript", description: "Typed superset of JavaScript for safer, more maintainable code.", useCase: "Large-scale frontend and backend codebases." },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid, consistent styling.", useCase: "Responsive layouts, design systems, component styling." },
      { name: "HTML5", description: "Semantic markup for accessible, well-structured web pages.", useCase: "Accessible, SEO-friendly document structure." },
      { name: "CSS3", description: "Styling language with modern layout and animation capabilities.", useCase: "Animations, custom components, responsive design." },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Laravel", description: "PHP framework with elegant syntax and a rich ecosystem.", useCase: "Web applications, APIs, SaaS backends, business systems.", relatedProject: "linktogovernment" },
      { name: "PHP", description: "Server-side scripting language widely used for web development.", useCase: "Backend logic, form handling, server-side rendering." },
      { name: "Node.js", description: "JavaScript runtime for server-side application development.", useCase: "APIs, real-time features, microservices." },
      { name: "Express.js", description: "Minimal Node.js web framework.", useCase: "REST APIs, middleware pipelines, lightweight backends." },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    icon: "🗄️",
    skills: [
      { name: "MySQL", description: "Relational database with strong ACID guarantees.", useCase: "Structured application data, reporting, complex queries.", relatedProject: "linktogovernment" },
      { name: "SQLite", description: "Embedded relational database ideal for development and small deployments.", useCase: "Local development, simple self-contained applications." },
      { name: "MongoDB", description: "Document-oriented NoSQL database.", useCase: "Flexible schemas, content stores, log data." },
    ],
  },
  {
    id: "auth",
    name: "Auth & Security",
    icon: "🔐",
    skills: [
      { name: "JWT", description: "JSON Web Token standard for stateless API authentication.", useCase: "Secure API access for mobile and web clients." },
      { name: "OTP Authentication", description: "One-time password flows for multi-factor authentication.", useCase: "Account verification, password reset, secure login flows." },
      { name: "RBAC", description: "Role-based access control for permission management.", useCase: "Multi-role applications where different users need different access." },
      { name: "Multi-tenant Architecture", description: "Shared infrastructure with isolated tenant data.", useCase: "SaaS platforms serving multiple organizations." },
    ],
  },
  {
    id: "deployment",
    name: "Deployment",
    icon: "🚀",
    skills: [
      { name: "Git & GitHub", description: "Version control and collaborative development.", useCase: "All projects — source control, branching, pull requests." },
      { name: "Vercel", description: "Platform optimized for Next.js and frontend deployments.", useCase: "React and Next.js application hosting." },
      { name: "cPanel", description: "Web hosting control panel for PHP and database management.", useCase: "Shared hosting environments for Laravel applications." },
      { name: "Cloudflare", description: "CDN, DNS, and security layer for production websites.", useCase: "DNS management, CDN, DDoS protection, SSL." },
      { name: "Vite", description: "Fast frontend build tool and dev server.", useCase: "Modern JavaScript application bundling and development." },
    ],
  },
];

// ─── Experience ───────────────────────────────────────────────

export type Experience = {
  id: string;
  role: string;
  organization: string;
  organizationUrl?: string;
  type: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  technologies: string[];
  projects?: string[];
};

export const experiences: Experience[] = [
  {
    id: "softworica",
    role: "Software Developer & Programming Instructor",
    organization: "Softworica",
    organizationUrl: "https://softworica.com",
    type: "Software Company",
    period: "2+ years of experience",
    current: true,
    responsibilities: [
      "Developing web applications, SaaS platforms, and business systems",
      "Designing and implementing scalable REST APIs with Laravel and Node.js",
      "Programming instruction & teaching: Training and mentoring students in Laravel, Node.js, PHP, and modern web development",
      "Building and managing MySQL relational databases, schema design, and query optimization",
      "Implementing authentication and authorization systems including JWT and RBAC",
      "Deploying applications to production environments",
    ],
    technologies: ["Laravel", "PHP", "Node.js", "MySQL", "React", "Next.js", "Tailwind CSS", "REST APIs"],
    projects: ["linktogovernment"],
  },
];

// ─── Services ────────────────────────────────────────────────

export type Service = {
  id: string;
  name: string;
  problem: string;
  deliverables: string[];
  technologies: string[];
  example?: string;
  icon: string;
  active: boolean;
};

export const services: Service[] = [
  {
    id: "web-application",
    name: "Custom Web Application Development",
    problem: "You need a web application built around your specific business logic — not a generic template.",
    deliverables: ["Full-stack web application", "Database design", "Backend API", "Frontend interface", "Deployment"],
    technologies: ["Laravel", "Next.js", "React", "MySQL", "Tailwind CSS"],
    icon: "🌐",
    active: true,
  },
  {
    id: "laravel",
    name: "Laravel Development",
    problem: "Your PHP backend needs a robust framework with clean architecture and maintainable code.",
    deliverables: ["Laravel application", "Eloquent models and migrations", "REST API", "Authentication", "Admin panel"],
    technologies: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS"],
    example: "LinkToGovernment",
    icon: "⚡",
    active: true,
  },
  {
    id: "nextjs-react",
    name: "Next.js & React Frontend Development",
    problem: "Your product needs a modern, performant frontend with server-side rendering and a great developer experience.",
    deliverables: ["Next.js application", "React components", "Static and server-rendered pages", "SEO setup", "Responsive design"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    icon: "⚛️",
    active: true,
  },
  {
    id: "saas",
    name: "SaaS Platform Development",
    problem: "You want to deliver your software as a service to multiple customers from a single, maintainable codebase.",
    deliverables: ["Multi-tenant architecture", "Tenant management", "Subscription-ready structure", "Role-based access", "Admin dashboard"],
    technologies: ["Laravel", "MySQL", "JWT", "RBAC", "Tailwind CSS"],
    icon: "☁️",
    active: true,
  },
  {
    id: "api",
    name: "API Development & Integration",
    problem: "Your application needs a clean, documented API that mobile apps, third-party tools, or other services can reliably consume.",
    deliverables: ["REST API design", "Authentication system", "Request validation", "API documentation", "Integration support"],
    technologies: ["Laravel", "Node.js", "JWT", "Express.js"],
    icon: "🔌",
    active: true,
  },
  {
    id: "database",
    name: "Database Design",
    problem: "Your application's data model needs to be carefully designed for integrity, performance, and future extensibility.",
    deliverables: ["Schema design", "Migrations", "Indexing strategy", "Relationship modeling", "Query optimization"],
    technologies: ["MySQL", "SQLite", "MongoDB", "Eloquent ORM"],
    icon: "🗄️",
    active: true,
  },
  {
    id: "admin-panel",
    name: "Admin Panel & CMS",
    problem: "Your team needs an internal interface to manage content, users, settings, and data without writing SQL.",
    deliverables: ["Admin dashboard", "CRUD interfaces", "User management", "Role permissions", "Export tools"],
    technologies: ["Laravel", "Tailwind CSS", "React", "MySQL"],
    icon: "🎛️",
    active: true,
  },
  {
    id: "deployment",
    name: "Deployment & Maintenance",
    problem: "Your application is built but needs proper production hosting, DNS, SSL, and ongoing technical maintenance.",
    deliverables: ["Production deployment", "DNS and SSL configuration", "Cloudflare setup", "Monitoring guidance", "Technical handover"],
    technologies: ["Vercel", "cPanel", "Cloudflare", "GitHub Actions"],
    icon: "🚀",
    active: true,
  },
];

// ─── Education & Certifications ──────────────────────────────

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  period: string;
  status: "completed" | "ongoing" | "unverified";
  description?: string;
};

export type Certification = {
  id: string;
  name: string;
  provider: string;
  issueDate?: string;
  credentialUrl?: string;
  description?: string;
};

// Populated only with what can be confirmed from public sources.
// Edit this file to add verified education and certification details.
export const education: Education[] = [
  {
    id: "placeholder",
    institution: "Institution details to be verified",
    degree: "Degree / Program details to be confirmed",
    period: "To be verified",
    status: "unverified",
    description: "Education details will be published once verified. Please check back or contact Manoj directly.",
  },
];

export const certifications: Certification[] = [];

// ─── Philosophy & Process ─────────────────────────────────────

export const developmentProcess = [
  {
    step: 1,
    title: "Understand the Problem",
    description: "Before writing code, I need to understand the actual problem being solved — who uses the system, what they need to do, and what success looks like.",
    icon: "🔍",
  },
  {
    step: 2,
    title: "Clarify the Requirements",
    description: "Ambiguous requirements produce ambiguous software. I work through edge cases, data flows, and user scenarios before committing to a design.",
    icon: "📋",
  },
  {
    step: 3,
    title: "Design the Architecture",
    description: "Application structure, data flow, component boundaries, and technology choices — defined before building, not discovered during debugging.",
    icon: "🏗️",
  },
  {
    step: 4,
    title: "Model the Database",
    description: "The data model determines what the application can and cannot do. I design schemas for correctness, integrity, and future flexibility.",
    icon: "🗄️",
  },
  {
    step: 5,
    title: "Build the API & Interface",
    description: "Implementation follows the plan — clean API contracts, reusable components, meaningful naming, and defensible security boundaries.",
    icon: "⚙️",
  },
  {
    step: 6,
    title: "Test the Application",
    description: "Manual and automated testing across user flows, edge cases, and error conditions — before the code reaches production.",
    icon: "🧪",
  },
  {
    step: 7,
    title: "Deploy, Maintain & Improve",
    description: "Production deployment with proper hosting, DNS, SSL, and monitoring — followed by iteration based on real usage and feedback.",
    icon: "🚀",
  },
];

export const whatIBuild = [
  {
    id: "web-apps",
    title: "Web Applications",
    description: "Full-stack web applications built around real user workflows — from requirement to production deployment.",
    icon: "🌐",
    color: "accent",
  },
  {
    id: "saas",
    title: "SaaS Platforms",
    description: "Multi-tenant software platforms where multiple organizations share infrastructure with full data isolation.",
    icon: "☁️",
    color: "accent2",
  },
  {
    id: "business-systems",
    title: "Business Systems",
    description: "Inventory management, order tracking, reporting dashboards, and operational software for real organizations.",
    icon: "📊",
    color: "highlight",
  },
  {
    id: "apis",
    title: "REST APIs",
    description: "Clean, documented API backends that mobile apps, third-party tools, and other services can reliably consume.",
    icon: "🔌",
    color: "accent",
  },
  {
    id: "admin-panels",
    title: "Admin Panels",
    description: "Internal dashboards and content management tools that give teams control over their data without SQL.",
    icon: "🎛️",
    color: "accent2",
  },
  {
    id: "educational-portals",
    title: "Educational Portals",
    description: "Learning management systems and educational platforms for course delivery, enrollment, and student tracking.",
    icon: "📚",
    color: "highlight",
  },
];
