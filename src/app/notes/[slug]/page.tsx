import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, siteConfig } from "@/lib/data";

interface Props {
  params: { slug: string };
}

function notes() {
  return projects.filter((project) => project.status === "concept");
}

export function generateStaticParams() {
  return notes().map((note) => ({ slug: note.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const note = notes().find((item) => item.slug === params.slug);
  if (!note) return { title: "Note not found", robots: { index: false } };
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `${siteConfig.url}/notes/${note.slug}` },
  };
}

export default function NotePage({ params }: Props) {
  const note = notes().find((item) => item.slug === params.slug);
  if (!note) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Technical Notes", item: `${siteConfig.url}/notes` },
      { "@type": "ListItem", position: 3, name: note.title, item: `${siteConfig.url}/notes/${note.slug}` },
    ],
  };

  return (
    <main className="min-h-screen pt-28 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="container max-w-3xl">
        <p className="text-sm text-[#4e5563] mb-4">
          <Link href="/notes" className="text-[#0c6b74]">Technical Notes</Link>
        </p>
        <p className="font-mono text-[11px] text-[#0c6b74] mb-2">Reference, not a client case study</p>
        <h1 className="section-title mb-3">{note.title}</h1>
        <p className="text-[#4e5563] mb-6">{note.description}</p>
        <ul className="space-y-2 text-sm text-[#2a3038]">
          {(note.features ?? []).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
