export const siteConfig = {
  name: 'Manoj Neupane',
  title: 'Production Software Engineer',
  tagline: 'Building Software That Solves Real Business Problems',
  email: 'maanojneupane111@gmail.com',
  phone: '+977 9862561269',
  location: 'Nepal',
  website: 'manoj-neupane.com.np',
  github: 'manojneupaneweb',
  linkedin: 'manoj-neupane-52162921a',
  availability: 'Available for freelance & SaaS projects',
  resumeUrl: '/resume.pdf',
}

export const heroStats = [
  { label: 'Projects Built', value: 15, suffix: '+' },
  { label: 'Technologies', value: 20, suffix: '+' },
  { label: 'Production Deployments', value: 8, suffix: '+' },
  { label: 'Years Learning', value: 4, suffix: '+' },
]

export const aboutTimeline = [
  {
    year: '2021',
    title: 'Started the Journey',
    description: 'Began learning web development with HTML, CSS, and JavaScript while pursuing IT studies.',
  },
  {
    year: '2022',
    title: 'Full Stack Foundations',
    description: 'Dived into React, Node.js, and databases. Built first real client projects and school websites.',
  },
  {
    year: '2023',
    title: 'Production Systems',
    description: 'Shifted focus to Laravel, business software, admin panels, and deployment on real servers.',
  },
  {
    year: '2024',
    title: 'SaaS & Business Software',
    description: 'Built inventory systems, authentication flows, college portals, and business management tools.',
  },
  {
    year: '2025',
    title: 'Engineering at Scale',
    description: 'Developing medical SaaS, Evergreen Byaparo, and production-grade systems with clean architecture.',
  },
]

export const skillCategories = [
  {
    name: 'Backend',
    color: '#3b82f6',
    skills: ['Laravel', 'PHP', 'Node.js', 'Express', 'REST API'],
  },
  {
    name: 'Frontend',
    color: '#8b5cf6',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS', 'Blade'],
  },
  {
    name: 'Database',
    color: '#22d3ee',
    skills: ['MySQL', 'SQLite', 'MongoDB'],
  },
  {
    name: 'Tools & Deploy',
    color: '#f59e0b',
    skills: ['Git', 'GitHub', 'Vite', 'Composer', 'npm', 'Cloudflare', 'cPanel'],
  },
]

export const softSkills = [
  'Problem Solving',
  'Clean Architecture',
  'UI/UX Thinking',
  'Client Communication',
  'Performance Focus',
  'Production Mindset',
]

export interface Project {
  id: string
  title: string
  category: string
  tagline: string
  problem: string
  solution: string
  features: string[]
  tech: string[]
  challenges: string
  results: string
  github?: string
  live?: string
  status: 'live' | 'upcoming' | 'completed'
  accent: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 'evergreen',
    title: 'Evergreen Byaparo',
    category: 'Business Management',
    tagline: 'Complete business operations platform',
    problem: 'Local businesses needed a unified system to manage sales, inventory, and reporting without fragmented tools.',
    solution: 'Built a full business management system with role-based access, inventory tracking, and automated reporting.',
    features: ['Inventory Management', 'Sales Tracking', 'Admin Dashboard', 'Role-based Auth', 'Reports'],
    tech: ['Laravel', 'MySQL', 'Tailwind CSS', 'REST API'],
    challenges: 'Designing scalable data models for multi-branch business operations.',
    results: 'Streamlined daily operations and reduced manual record-keeping significantly.',
    status: 'live',
    accent: '#22c55e',
    image: '/img/project image/gym.png',
  },
  {
    id: 'medical-saas',
    title: 'Medical SaaS',
    category: 'Healthcare Platform',
    tagline: 'Upcoming healthcare management system',
    problem: 'Medical practices lack affordable, modern software tailored for local healthcare workflows.',
    solution: 'Designing a SaaS platform for patient records, appointments, and clinic management.',
    features: ['Patient Management', 'Appointments', 'Dashboard Analytics', 'Secure Auth', 'Multi-clinic'],
    tech: ['Laravel', 'React', 'MySQL', 'REST API'],
    challenges: 'Balancing HIPAA-like security requirements with usability for small clinics.',
    results: 'Currently in active development with production architecture planned.',
    status: 'upcoming',
    accent: '#06b6d4',
  },
  {
    id: 'lumbini-college',
    title: 'Lumbini Adarsha Degree College',
    category: 'Education Platform',
    tagline: 'College website & digital presence',
    problem: 'The college needed a professional web presence to attract students and share academic information.',
    solution: 'Designed and deployed a responsive college website with modern UI and content management.',
    features: ['Responsive Design', 'Course Info', 'Contact System', 'SEO Optimized'],
    tech: ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL'],
    challenges: 'Creating an accessible design for diverse user demographics.',
    results: 'Professional digital identity with improved student engagement.',
    live: '#',
    status: 'live',
    accent: '#8b5cf6',
    image: '/img/project image/techsphere.png',
  },
  {
    id: 'shiva-school',
    title: 'Shiva Ma Vi School',
    category: 'School System',
    tagline: 'School website & information portal',
    problem: 'School required an online platform for announcements, admissions, and institutional information.',
    solution: 'Built a clean school website with structured content sections and mobile-first design.',
    features: ['Announcements', 'Admissions Info', 'Gallery', 'Contact Forms'],
    tech: ['PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
    challenges: 'Delivering fast performance on low-bandwidth connections.',
    results: 'Improved communication between school and parents.',
    status: 'completed',
    accent: '#f59e0b',
  },
  {
    id: 'timeline-pdf',
    title: 'Timeline PDF Reporting',
    category: 'Business Automation',
    tagline: 'Automated PDF report generation',
    problem: 'Manual PDF report creation was time-consuming and error-prone for business teams.',
    solution: 'Developed an automated system that generates structured PDF reports from database records.',
    features: ['PDF Generation', 'Data Export', 'Template System', 'Scheduled Reports'],
    tech: ['Laravel', 'PHP', 'MySQL', 'DomPDF'],
    challenges: 'Handling complex report layouts with dynamic data.',
    results: 'Reduced report generation time from hours to minutes.',
    status: 'completed',
    accent: '#ef4444',
  },
  {
    id: 'student-portal',
    title: 'Student Result Portal',
    category: 'Education System',
    tagline: 'Secure result publishing platform',
    problem: 'Institutions needed a secure way to publish and verify student examination results.',
    solution: 'Built an authenticated portal with role-based result publishing and student lookup.',
    features: ['Result Publishing', 'Student Login', 'Admin Panel', 'PDF Export'],
    tech: ['Laravel', 'MySQL', 'Blade', 'Authentication'],
    challenges: 'Ensuring data integrity and preventing unauthorized access to results.',
    results: 'Reliable result distribution for hundreds of students.',
    status: 'live',
    accent: '#3b82f6',
    image: '/img/project image/newsapp.png',
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    category: 'Business Software',
    tagline: 'Stock tracking & warehouse system',
    problem: 'Businesses struggled with real-time inventory visibility and stock level alerts.',
    solution: 'Created an inventory system with stock alerts, supplier tracking, and transaction history.',
    features: ['Stock Alerts', 'Supplier Management', 'Transaction Logs', 'Dashboard'],
    tech: ['Laravel', 'MySQL', 'REST API', 'Tailwind CSS'],
    challenges: 'Handling concurrent stock updates across multiple users.',
    results: 'Real-time inventory visibility with reduced stock discrepancies.',
    status: 'completed',
    accent: '#10b981',
  },
  {
    id: 'auth-systems',
    title: 'Authentication Systems',
    category: 'Security Infrastructure',
    tagline: 'Production-grade auth implementations',
    problem: 'Applications needed secure, reusable authentication with OTP, JWT, and role management.',
    solution: 'Built modular auth systems with bcrypt hashing, JWT sessions, OTP verification, and RBAC.',
    features: ['JWT Auth', 'OTP Verification', 'Role-based Access', 'Secure Cookies'],
    tech: ['Node.js', 'Express', 'Laravel', 'MongoDB', 'MySQL'],
    challenges: 'Implementing secure token flows without compromising UX.',
    results: 'Reusable auth modules deployed across multiple projects.',
    status: 'completed',
    accent: '#a855f7',
  },
]

export const experience = [
  {
    phase: 'Student',
    period: '2021 — Present',
    title: 'IT Student & Self-Directed Engineer',
    description: 'Pursuing Bachelor of Information Technology while building production software alongside studies.',
  },
  {
    phase: 'Learning',
    period: '2021 — 2022',
    title: 'Foundation Building',
    description: 'Mastered web fundamentals, React ecosystem, and backend development through hands-on projects.',
  },
  {
    phase: 'Freelance',
    period: '2022 — 2023',
    title: 'Client Projects',
    description: 'Delivered websites and business systems for schools, colleges, and local businesses in Nepal.',
  },
  {
    phase: 'Production',
    period: '2023 — 2024',
    title: 'Production Software',
    description: 'Built and deployed admin panels, inventory systems, result portals, and business management tools.',
  },
  {
    phase: 'SaaS',
    period: '2024 — Present',
    title: 'SaaS Development',
    description: 'Engineering scalable SaaS products with Laravel, React, and cloud deployment strategies.',
  },
  {
    phase: 'Future',
    period: '2026+',
    title: 'Product Engineer',
    description: 'Goal: Build and scale software products that solve real problems for businesses globally.',
  },
]

export const services = [
  { icon: 'globe', title: 'Business Websites', description: 'Professional, conversion-focused websites for businesses and institutions.' },
  { icon: 'school', title: 'School & College Systems', description: 'Education portals, result systems, and institutional websites.' },
  { icon: 'saas', title: 'SaaS Products', description: 'Scalable software-as-a-service platforms with subscription models.' },
  { icon: 'panel', title: 'Admin Panels', description: 'Powerful dashboards for managing users, data, and operations.' },
  { icon: 'inventory', title: 'Inventory Systems', description: 'Real-time stock management with alerts and reporting.' },
  { icon: 'auth', title: 'Authentication Systems', description: 'Secure login, OTP, JWT, and role-based access control.' },
  { icon: 'api', title: 'API Development', description: 'RESTful APIs designed for performance and maintainability.' },
  { icon: 'database', title: 'Database Design', description: 'Optimized schemas for MySQL, SQLite, and MongoDB.' },
  { icon: 'deploy', title: 'Deployment & DevOps', description: 'Production deployment via cPanel, Cloudflare, and Vercel.' },
]

export const processSteps = [
  { step: '01', title: 'Discover', description: 'Understand the business problem, users, and success metrics.' },
  { step: '02', title: 'Research', description: 'Analyze requirements, competitors, and technical constraints.' },
  { step: '03', title: 'Plan', description: 'Define architecture, tech stack, timelines, and milestones.' },
  { step: '04', title: 'Design', description: 'Craft UI/UX flows, wireframes, and visual systems.' },
  { step: '05', title: 'Develop', description: 'Build with clean code, reusable components, and best practices.' },
  { step: '06', title: 'Test', description: 'Validate functionality, performance, security, and responsiveness.' },
  { step: '07', title: 'Deploy', description: 'Ship to production with monitoring and optimization.' },
  { step: '08', title: 'Maintain', description: 'Iterate, fix issues, and scale as the product grows.' },
]

export const stats = [
  { label: 'Projects Completed', value: 15, suffix: '+' },
  { label: 'Technologies Mastered', value: 20, suffix: '+' },
  { label: 'GitHub Repositories', value: 25, suffix: '+' },
  { label: 'Production Deployments', value: 8, suffix: '+' },
  { label: 'Learning Hours', value: 3000, suffix: '+' },
  { label: 'Commits This Year', value: 500, suffix: '+' },
]

export const testimonials = [
  {
    name: 'Client — Education Sector',
    role: 'School Administrator',
    content: 'Manoj delivered a professional school website that improved our communication with parents. Fast, responsive, and exactly what we needed.',
    avatar: 'S',
  },
  {
    name: 'Client — Business',
    role: 'Business Owner',
    content: 'The inventory management system transformed how we track stock. Clean interface, reliable performance, and great support throughout.',
    avatar: 'B',
  },
  {
    name: 'Collaborator',
    role: 'Fellow Developer',
    content: 'Manoj writes clean, maintainable code and thinks about production from day one. A reliable engineer who delivers real results.',
    avatar: 'D',
  },
]

export const blogPosts = [
  {
    title: 'Building Production Laravel Apps',
    excerpt: 'Lessons learned from deploying business systems with clean architecture and real users.',
    date: 'Coming Soon',
    tag: 'Laravel',
  },
  {
    title: 'From Student to SaaS Engineer',
    excerpt: 'My journey learning to build software that businesses actually use and depend on.',
    date: 'Coming Soon',
    tag: 'Career',
  },
  {
    title: 'Deploying on cPanel & Cloudflare',
    excerpt: 'A practical guide to getting Laravel and React apps live on production servers.',
    date: 'Coming Soon',
    tag: 'DevOps',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]
