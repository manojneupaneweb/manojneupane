import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import ContactClient from "./ContactClient";

export const metadata: Metadata = buildMetadata({
  title: "Contact Manoj Neupane",
  description:
    "Send a project inquiry to Manoj Neupane — Full Stack Web Developer from Nepal. Available for custom web applications, Laravel, Next.js, SaaS, and API development projects.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
