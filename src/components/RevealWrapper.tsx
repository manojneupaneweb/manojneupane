"use client";

import { ReactNode, useEffect, useRef } from "react";

interface RevealWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms, e.g. 100, 200
  direction?: "up" | "left" | "none";
}

/**
 * Scroll-reveal wrapper using IntersectionObserver.
 * Animates children from offset to natural position once they enter the viewport.
 */
export default function RevealWrapper({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const className = direction === "left" ? "reveal-left" : direction === "none" ? "" : "reveal";
    if (className) el.classList.add(className);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add("in-view");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
