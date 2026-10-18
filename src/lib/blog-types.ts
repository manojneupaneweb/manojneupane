export type BlogCategory = 
  | "Payments"
  | "Deployment"
  | "Databases"
  | "Troubleshooting"
  | "DevOps & Tools"
  | "SEO & Web"
  | "Career & Projects"
  | "Hubs & Guides";

export interface CodeSnippet {
  language: string;
  label?: string; // e.g. "Node.js (Express)", "Laravel (PHP)", "Bash", ".env"
  filename?: string; // e.g. "routes/payment.js", ".env.local"
  code: string;
}

export interface BlogSection {
  id: string;
  title: string;
  level?: 2 | 3;
  content: string; // Markdown / HTML text
  callout?: {
    type: "note" | "warning" | "tip" | "security";
    title?: string;
    text: string;
  };
  codeTabs?: CodeSnippet[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  checklist?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReferenceItem {
  title: string;
  url: string;
  description?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  categorySlug: string;
  tags: string[];
  publishedAt: string; // ISO format: YYYY-MM-DD
  updatedAt: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
    url: string;
  };
  featured?: boolean;
  whoThisIsFor?: string;
  whoIsThisFor?: string;
  prerequisites: string[];
  whatYouWillLearn: string[];
  expectedOutput: string;
  testingSteps: string[];
  commonErrors: {
    error: string;
    cause: string;
    solution: string;
  }[];
  securityNotes?: string[] | string;
  securityConsiderations?: string[] | string;
  sections: BlogSection[];
  faqs: FaqItem[];
  summary: string[] | string;
  references: ReferenceItem[];
  relatedSlugs: string[];
}
