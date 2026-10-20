"use client";

import { useEffect, useRef, ReactNode } from "react";

interface RevealWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms, e.g. 100, 200
}

/**
 * Lightweight scroll-reveal wrapper.
 * Animates children from left (24px offset) to their natural position
 * using CSS transitions + Intersection Observer. SSR-safe.
 */
export default function RevealWrapper({
  children,
  className = "",
  delay = 0,
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Initial hidden state
    el.style.opacity = "0";
    el.style.transform = "translateX(-24px)";
    el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
