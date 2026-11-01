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
  "w-full bg-white border border-[#d7dbd4] rounded-md px-3.5 py-2.5 text-[#16181c] placeholder:text-[#8b9188] text-sm outline-none transition-colors focus:border-[#0c6b74] focus-visible:ring-2 focus-visible:ring-[#0c6b74]";
const inputError = "border-[#b42318] focus:border-[#b42318] focus-visible:ring-[#b42318]";

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
        className="card border border-[#0c6b74] p-10 text-center"
      >
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#0c6b74] mb-3">
          Inquiry received
        </p>
        <h2 className="text-xl font-bold text-[#16181c] mb-3">
          Message Sent
        </h2>
        <p className="text-[#94A3B8] mb-6 leading-relaxed">
          Thank you for reaching out. I&apos;ve received your message and will
          get back to you within a few business days.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="btn-primary mx-auto"
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
      className="border border-[#d7dbd4] bg-white rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-[#e3e5e0] bg-[#f7f8f5]">
        <h2 id="form-heading" className="font-mono text-xs tracking-wide text-[#16181c]">
          inquiry.form
        </h2>
        <p className="font-mono text-[11px] text-[#4e5563] truncate">
          {form.name.trim() || "your name"} · {form.projectType === "Select a project type" ? "pick a type" : form.projectType}
        </p>
      </div>

      <div className="p-5 sm:p-6 space-y-6">

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
        <label htmlFor="name" className="block text-sm font-medium text-[#16181c] mb-2">
          <span className="font-mono text-[11px] text-[#0c6b74] mr-2">01</span>
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
        <label htmlFor="email" className="block text-sm font-medium text-[#16181c] mb-2">
          <span className="font-mono text-[11px] text-[#0c6b74] mr-2">02</span>
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
      <fieldset>
        <legend className="block text-sm font-medium text-[#16181c] mb-2">
          <span className="font-mono text-[11px] text-[#0c6b74] mr-2">03</span>
          Project Type{" "}
          <span className="text-red-400" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.filter((type) => type !== "Select a project type").map((type) => {
            const selected = form.projectType === type;
            return (
              <label
                key={type}
                className={`cursor-pointer rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  selected
                    ? "border-[#0c6b74] bg-[#0c6b74] text-white"
                    : "border-[#d7dbd4] bg-white text-[#2a3038] hover:border-[#0c6b74]"
                }`}
              >
                <input
                  type="radio"
                  name="projectType"
                  value={type}
                  checked={selected}
                  onChange={handleChange}
                  className="sr-only"
                />
                {type}
              </label>
            );
          })}
        </div>
        <FieldError message={errors.projectType} />
      </fieldset>

      {/* Description */}
      <div>
        <label htmlFor="description" className="flex items-baseline justify-between gap-3 text-sm font-medium text-[#16181c] mb-2">
          <span>
            <span className="font-mono text-[11px] text-[#0c6b74] mr-2">04</span>
            Project Description{" "}
            <span className="text-red-400" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </span>
          <span className="font-mono text-[11px] font-normal text-[#4e5563]">
            {form.description.trim().length} chars
          </span>
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
            className="mt-0.5 w-4 h-4 rounded border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] text-[#22D3EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-[#94A3B8]">
            I agree that the information I&apos;ve submitted may be used to respond to my
            inquiry, in accordance with the{" "}
            <Link
              href="/privacy-policy"
              className="text-[#22D3EE] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded"
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
        className="w-full sm:w-auto btn-primary disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-offset-[#080D1A]"
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

      <p className="text-xs text-[#4e5563]">
        <span className="text-red-400">*</span> Required fields
      </p>
      </div>
    </form>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function ContactClient() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <section
        aria-labelledby="contact-heading"
        className="pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.08)] to-transparent" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)" }} />
        </div>
        <div className="container relative">
          <span className="section-label">Contact</span>
          <h1 id="contact-heading" className="section-title mt-4 mb-5">
            Get in Touch
          </h1>
          <p className="section-subtitle">
            If you have a project inquiry, want to collaborate, or just want to ask
            something, fill out the form below. I read every message and respond to
            genuine inquiries within a few business days.
          </p>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Sidebar */}
          <aside aria-label="Contact information">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div>
                <h2 className="text-lg font-bold text-[#F1F5F9] mb-4">
                  Direct Contact
                </h2>
                <div className="space-y-4">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-start gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.15)] flex items-center justify-center flex-shrink-0 group-hover:border-[rgba(34,211,238,0.35)] transition-colors">
                      <span className="text-lg" aria-hidden="true">✉️</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8] mb-0.5 font-mono">Email</p>
                      <p className="text-[#22D3EE] text-sm font-medium group-hover:text-[#67E8F9] transition-colors break-all">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>

                  {[
                    { href: siteConfig.github, icon: "💻", label: "GitHub", value: "manojneupaneweb" },
                    { href: siteConfig.linkedin, icon: "🔗", label: "LinkedIn", value: "Manoj Neupane" },
                    { href: siteConfig.facebook, icon: "📘", label: "Facebook", value: "Manoj Neupane" },
                    { href: siteConfig.instagram, icon: "📷", label: "Instagram", value: "@manojneupaneweb" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center flex-shrink-0 group-hover:border-[rgba(34,211,238,0.25)] transition-colors">
                        <span className="text-base" aria-hidden="true">{social.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs text-[#94A3B8] mb-0.5 font-mono">{social.label}</p>
                        <p className="text-[#22D3EE] text-sm font-medium group-hover:text-[#67E8F9] transition-colors">
                          {social.value}
                        </p>
                      </div>
                    </a>
                  ))}

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center flex-shrink-0">
                      <span className="text-base" aria-hidden="true">🌐</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8] mb-0.5 font-mono">Location</p>
                      <p className="text-[#F1F5F9] text-sm">{siteConfig.country}</p>
                      <p className="text-[#94A3B8] text-xs mt-0.5">Remote-friendly</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border border-[rgba(34,211,238,0.1)]">
                <p className="text-[#F1F5F9] font-semibold text-sm mb-2">Response Time</p>
                <p className="text-[#94A3B8] text-xs leading-relaxed">
                  I respond to genuine inquiries within a few business days. Project
                  timelines are not committed before reviewing requirements.
                </p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            <Suspense
              fallback={
                <div className="animate-pulse space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-[rgba(255,255,255,0.04)] rounded-xl" />
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
