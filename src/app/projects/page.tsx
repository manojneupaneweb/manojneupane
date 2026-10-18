import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = buildMetadata({
  title: "Software Projects & Case Studies",
  description:
    "Software projects and case studies by Manoj Neupane: SaaS platforms, web applications, business systems, REST APIs, and admin panels built with Laravel, Next.js, and React.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}
