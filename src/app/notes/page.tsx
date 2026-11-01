import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Technical Notes",
  description:
    "Technical notes by Manoj Neupane on patterns such as multi-tenant SaaS and business systems. These are references, not client case studies.",
  path: "/notes",
});

export default function NotesPage() {
  const notes = projects.filter((project) => project.status === "concept");

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container">
        <span className="section-label">Technical Notes</span>
        <h1 className="section-title mt-4 mb-4">Patterns, not case studies</h1>
        <p className="section-subtitle mb-10">
          These write-ups describe how I approach a kind of system. They are not shipped client projects.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {notes.map((note) => (
            <article key={note.slug} className="card">
              <p className="font-mono text-[11px] text-[#0c6b74] mb-2">Note</p>
              <h2 className="text-lg font-semibold text-[#16181c]">
                <Link href={`/notes/${note.slug}`}>{note.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-[#4e5563]">{note.tagline}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
