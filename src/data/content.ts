export const siteConfig = {
  name: 'Manoj Neupane',
  title: 'Full Stack Web Developer',
  tagline: 'Building Software That Solves Real Problems.',
  email: 'maanojneupane111@gmail.com',
  phone: '+977 9862561269',
  location: 'Nepal',
  website: 'manoj-neupane.com.np',
  github: 'manojneupaneweb',
  linkedin: 'manoj-neupane-52162921a',
  availability: 'Available for freelance & SaaS projects',
  resumeUrl: '/img/resume.png',
}

export const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const company = {
  name: 'Softworica',
  url: 'https://softworica.com',
  logo: '/img/softworica-logo.webp',
  role: 'Software Developer',
  period: 'Present',
  description:
    'Building and shipping production software — web applications, APIs, and business systems.',
}

export const philosophy = [
  'Build practical software',
  'Solve real problems',
  'Write maintainable code',
  'Ship reliable products',
  'Learn continuously',
  'Own frontend and backend',
]

export const engineeringSteps = [
  { id: 'idea', label: 'Idea', detail: 'Clarify the problem and who it serves.' },
  { id: 'architecture', label: 'Architecture', detail: 'Define structure before writing code.' },
  { id: 'database', label: 'Database', detail: 'Model data for real workloads.' },
  { id: 'api', label: 'API', detail: 'Clean contracts between systems.' },
  { id: 'frontend', label: 'Frontend', detail: 'Interfaces people can actually use.' },
  { id: 'testing', label: 'Testing', detail: 'Validate before production.' },
  { id: 'deploy', label: 'Deployment', detail: 'Ship, monitor, and iterate.' },
]

export const stackLayers = [
  {
    name: 'Frontend',
    items: [
      { name: 'React', use: 'Interactive product interfaces' },
      { name: 'JavaScript', use: 'Application logic and tooling' },
      { name: 'Tailwind CSS', use: 'Consistent UI systems' },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Laravel', use: 'Business logic, auth, APIs' },
      { name: 'PHP', use: 'Server-side application code' },
      { name: 'Node.js', use: 'Services and tooling' },
      { name: 'Express', use: 'Lightweight API layers' },
    ],
  },
  {
    name: 'Database',
    items: [
      { name: 'MySQL', use: 'Relational production data' },
      { name: 'SQLite', use: 'Lightweight local systems' },
      { name: 'MongoDB', use: 'Document-oriented data' },
    ],
  },
  {
    name: 'Tools & Deploy',
    items: [
      { name: 'Git / GitHub', use: 'Version control and collaboration' },
      { name: 'Vite', use: 'Fast frontend builds' },
      { name: 'REST APIs', use: 'System integration' },
      { name: 'Cloudflare / cPanel / Vercel', use: 'Production hosting' },
    ],
  },
]

export interface ComplexWork {
  title: string
  description: string
}

export const complexWork: ComplexWork[] = [
  {
    title: 'Multi-tenant Web Applications',
    description:
      'Tenant isolation, shared infrastructure, and role-aware access across organizations.',
  },
  {
    title: 'SaaS Product Architecture',
    description:
      'Subscription-ready platforms with modules, permissions, and scalable data models.',
  },
  {
    title: 'Authentication & Authorization Systems',
    description:
      'JWT, OTP, secure sessions, and fine-grained RBAC used across production apps.',
  },
  {
    title: 'Business Management Systems',
    description:
      'Inventory, sales, reporting, and operations tools for real business workflows.',
  },
  {
    title: 'Database Design at Scale',
    description:
      'Relational schemas, indexing strategy, and data integrity for multi-user systems.',
  },
  {
    title: 'REST API Engineering',
    description:
      'Clean API contracts between frontend, admin panels, and external services.',
  },
  {
    title: 'Automated Reporting Pipelines',
    description:
      'Dynamic PDF generation and structured exports from live database records.',
  },
  {
    title: 'Educational Portals',
    description:
      'College and school systems for results, admissions, and institutional content.',
  },
  {
    title: 'Admin Panels & Internal Tools',
    description:
      'Operational dashboards for managing users, data, and day-to-day processes.',
  },
  {
    title: 'Production Deployment',
    description:
      'Shipping Laravel and React apps with DNS, hosting, and live server setup.',
  },
]

export const systemNodes = [
  { id: 'frontend', label: 'Frontend', x: -2.4, y: 1.2 },
  { id: 'api', label: 'API', x: 0, y: 1.4 },
  { id: 'auth', label: 'Auth', x: 2.2, y: 1.1 },
  { id: 'server', label: 'Server', x: 0, y: 0 },
  { id: 'database', label: 'Database', x: -2.2, y: -1.2 },
  { id: 'admin', label: 'Admin', x: 2.2, y: -1.0 },
  { id: 'external', label: 'Services', x: 0, y: -1.6 },
]

export const journey = [
  {
    phase: 'Experience',
    period: '2+ Years',
    title: 'Software Development',
    description:
      '2+ years building and shipping production web applications, APIs, and business systems.',
  },
  {
    phase: 'Teaching',
    period: 'Ongoing',
    title: 'Programming Instructor',
    description:
      'Teach Programming, Laravel, and Node.js — helping others move from basics to real applications.',
  },
]

export const services = [
  { title: 'Web Applications', description: 'Custom apps for real business workflows.' },
  { title: 'SaaS Platforms', description: 'Multi-user products built to grow.' },
  { title: 'Business Systems', description: 'Inventory, reporting, and operations tools.' },
  { title: 'Admin Panels', description: 'Dashboards for users, data, and operations.' },
  { title: 'Educational Portals', description: 'School and college platforms that work.' },
  { title: 'REST APIs', description: 'Clean, maintainable service interfaces.' },
  { title: 'Database Systems', description: 'Schemas designed for production load.' },
  { title: 'Deployment', description: 'Reliable hosting, DNS, and go-live support.' },
]
