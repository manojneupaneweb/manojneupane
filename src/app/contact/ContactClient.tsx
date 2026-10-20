"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

// ─── Constants ────────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  "Select a project type",
  "Custom Web Application",
  "Laravel Development",
  "Next.js / React Frontend",
  "SaaS Platform",
  "API Development",
  "Database Design",
  "Admin Panel / CMS",
  "Deployment & Maintenance",
  "Other",
] as const;

const BUDGET_RANGES = [
  "Not specified",
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Discuss after requirements review",
] as const;

const TIMELINES = [
  "Not specified",
  "ASAP (flexible on quality)",
  "1 – 2 months",
  "2 – 4 months",
  "4+ months",
  "Ongoing / retainer",
  "Not sure yet",
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  organization: string;
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  description?: string;
  consent?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputBase =
  "w-full bg-[#1E293B] border border-[#334155] rounded-xl px-4 py-3 text-[#F8FAFC] placeholder:text-[#94A3B8]/50 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:border-[#3B82F6] transition-colors";
const inputError = "border-red-500 focus-visible:ring-red-500";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-red-400 text-xs mt-1.5">
      {message}
    </p>
  );
}

// ─── Inner form component (uses useSearchParams) ──────────────────────────────

function ContactForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    organization: "",
    projectType: "Select a project type",
    description: "",
    budget: "Not specified",
    timeline: "Not specified",
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Pre-fill project type from URL query param (?service=...)
  useEffect(() => {
    const service = searchParams.get("service");
    if (service) {
      const match = PROJECT_TYPES.find((t) => t === service);
      if (match && match !== "Select a project type") {
        setForm((prev) => ({ ...prev, projectType: match }));
      }
    }
  }, [searchParams]);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (!form.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (form.projectType === "Select a project type") {
      errs.projectType = "Please select a project type.";
    }
    if (!form.description.trim()) {
      errs.description = "Please describe your project or inquiry.";
    } else if (form.description.trim().length < 20) {
      errs.description = "Please provide at least 20 characters of description.";
    }
    if (!form.consent) {
      errs.consent = "You must agree to the privacy policy to submit this form.";
    }
    return errs;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrKey = Object.keys(errs)[0];
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstErrKey}"]`);
      el?.focus();
      return;
    }

    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim() || undefined,
          projectType: form.projectType,
          description: form.description.trim(),
          budget: form.budget !== "Not specified" ? form.budget : undefined,
          timeline: form.timeline !== "Not specified" ? form.timeline : undefined,
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setForm({
          name: "",
          email: "",
          organization: "",
          projectType: "Select a project type",
          description: "",
          budget: "Not specified",
          timeline: "Not specified",
          consent: false,
        });
        setErrors({});
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.message ?? "Something went wrong. Please try again.");
        setSubmitStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setSubmitStatus("error");
    }
  }

  if (submitStatus === "success") {
    return (
      <div
        role="alert"
        className="bg-[#111827] border border-[#22D3EE]/40 rounded-2xl p-10 text-center"
      >
        <div className="text-4xl mb-4" aria-hidden="true">✅</div>
        <h2
          className="text-xl font-bold text-[#F8FAFC] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Message Sent
        </h2>
        <p className="text-[#94A3B8] mb-6 leading-relaxed">
          Thank you for reaching out. I&apos;ve received your message and will
          get back to you within a few business days.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="px-6 py-2.5 rounded-xl bg-[#3B82F6] text-white text-sm font-semibold hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="form-heading"
      className="space-y-6"
    >
      <h2
        id="form-heading"
        className="text-xl font-bold text-[#F8FAFC]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Send a Message
      </h2>

      {/* Error summary */}
      {submitStatus === "error" && (
        <div
          role="alert"
          className="bg-red-900/20 border border-red-500/40 rounded-xl p-4 text-sm text-red-400"
        >
          <strong>Submission failed:</strong>{" "}
          {errorMessage || "An unexpected error occurred. Please try again."}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#94A3B8] mb-2">
          Full Name{" "}
          <span className="text-red-400" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          className={`${inputBase} ${errors.name ? inputError : ""}`}
        />
        <FieldError message={errors.name} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#94A3B8] mb-2">
          Email Address{" "}
          <span className="text-red-400" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          className={`${inputBase} ${errors.email ? inputError : ""}`}
        />
        <FieldError message={errors.email} />
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-[#94A3B8] mb-2">
          Project Type{" "}
          <span className="text-red-400" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="projectType"
          name="projectType"
          value={form.projectType}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.projectType}
          className={`${inputBase} ${errors.projectType ? inputError : ""}`}
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type} disabled={type === "Select a project type"}>
              {type}
            </option>
          ))}
        </select>
        <FieldError message={errors.projectType} />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[#94A3B8] mb-2">
          Project Description{" "}
          <span className="text-red-400" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={6}
          placeholder="Describe your project, the problem you're solving, and what you're looking for..."
          aria-required="true"
          aria-invalid={!!errors.description}
          className={`${inputBase} resize-y min-h-[140px] ${errors.description ? inputError : ""}`}
        />
        <FieldError message={errors.description} />
      </div>

      {/* Privacy consent */}
      <div>
        <label
          className={`flex gap-3 items-start cursor-pointer ${
            errors.consent ? "text-red-400" : ""
          }`}
        >
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.consent}
            className="mt-0.5 w-4 h-4 rounded border-[#334155] bg-[#1E293B] text-[#3B82F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-[#94A3B8]">
            I agree that the information I&apos;ve submitted may be used to respond to my
            inquiry, in accordance with the{" "}
            <Link
              href="/privacy-policy"
              className="text-[#3B82F6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
              target="_blank"
            >
              Privacy Policy
            </Link>
            .{" "}
            <span className="text-red-400" aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError message={errors.consent} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitStatus === "loading"}
        className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
      >
        {submitStatus === "loading" ? (
          <span className="flex items-center gap-2">
            <span
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
              aria-hidden="true"
            />
            Sending…
          </span>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="text-xs text-[#94A3B8]">
        <span className="text-red-400">*</span> Required fields
      </p>
    </form>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function ContactClient() {
  return (
    <main className="min-h-screen text-[#F8FAFC] ">
      {/* Header */}
      <section
        aria-labelledby="contact-heading"
        className="border-b border-[#334155] py-20 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-3">
            Contact
          </p>
          <h1
            id="contact-heading"
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get in Touch
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            If you have a project inquiry, want to collaborate, or just want to ask
            something, fill out the form below. I read every message and respond to
            genuine inquiries within a few business days.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Sidebar */}
          <aside aria-label="Contact information">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div>
                <h2
                  className="text-lg font-bold text-[#F8FAFC] mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Direct Contact
                </h2>
                <div className="space-y-4">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-start gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#111827] border border-[#334155] flex items-center justify-center flex-shrink-0 group-hover:border-[#3B82F6] transition-colors">
                      <span className="text-lg" aria-hidden="true">✉️</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8] mb-0.5">Email</p>
                      <p className="text-[#3B82F6] text-sm font-medium group-hover:underline break-all">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#111827] border border-[#334155] flex items-center justify-center flex-shrink-0 group-hover:border-[#3B82F6] transition-colors">
                      <span className="text-lg" aria-hidden="true">💻</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8] mb-0.5">GitHub</p>
                      <p className="text-[#3B82F6] text-sm font-medium group-hover:underline">
                        manojneupaneweb
                      </p>
                    </div>
                  </a>

                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#111827] border border-[#334155] flex items-center justify-center flex-shrink-0 group-hover:border-[#3B82F6] transition-colors">
                      <span className="text-lg" aria-hidden="true">🔗</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8] mb-0.5">LinkedIn</p>
                      <p className="text-[#3B82F6] text-sm font-medium group-hover:underline">
                        Manoj Neupane
                      </p>
                    </div>
                  </a>

                  <a
                    href={siteConfig.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#111827] border border-[#334155] flex items-center justify-center flex-shrink-0 group-hover:border-[#3B82F6] transition-colors">
                      <svg className="w-5 h-5 text-[#3B82F6]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8] mb-0.5">Facebook</p>
                      <p className="text-[#3B82F6] text-sm font-medium group-hover:underline">
                        Manoj Neupane
                      </p>
                    </div>
                  </a>

                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#111827] border border-[#334155] flex items-center justify-center flex-shrink-0 group-hover:border-[#3B82F6] transition-colors">
                      <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8] mb-0.5">Instagram</p>
                      <p className="text-[#3B82F6] text-sm font-medium group-hover:underline">
                        @manojneupaneweb
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#111827] border border-[#334155] flex items-center justify-center flex-shrink-0">
                      <span className="text-lg" aria-hidden="true">🌐</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8] mb-0.5">Location</p>
                      <p className="text-[#F8FAFC] text-sm">{siteConfig.country}</p>
                      <p className="text-[#94A3B8] text-xs mt-0.5">Remote-friendly</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#111827] border border-[#334155] rounded-xl p-5">
                <p className="text-[#F8FAFC] font-semibold text-sm mb-2">Response Time</p>
                <p className="text-[#94A3B8] text-xs leading-relaxed">
                  I respond to genuine inquiries within a few business days. Project
                  timelines are not committed before reviewing requirements.
                </p>
              </div>
            </div>
          </aside>

          {/* Form — wrapped in Suspense for useSearchParams */}
          <div className="lg:col-span-2">
            <Suspense
              fallback={
                <div className="animate-pulse space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-[#111827] rounded-xl" />
                  ))}
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
