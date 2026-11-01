"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 120, decimals: 0, suffix: "+", label: "Students taught" },
  { end: 40, decimals: 0, suffix: "+", label: "Projects delivered" },
  { end: 2.5, decimals: 1, suffix: "+", label: "Years of professional experience" },
  { end: 2, decimals: 0, suffix: "", label: "Stacks taught, Laravel and MERN" },
];

function format(value: number, decimals: number, suffix: string) {
  const shown = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
  return `${shown}${suffix}`;
}

function useCount(end: number, decimals: number, run: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(end);
      return;
    }
    const start = performance.now();
    const duration = 900;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(end * progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, run]);

  return format(value, decimals, "");
}

function Stat({
  end,
  decimals,
  suffix,
  label,
  run,
}: (typeof stats)[number] & { run: boolean }) {
  const value = useCount(end, decimals, run);
  return (
    <div className="text-center">
      <div className="stat-number">
        {value}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-mono text-[#4e5563]">{label}</div>
    </div>
  );
}

export default function StatCounters() {
  const ref = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-8 border-y border-[#e3e5e0]" aria-label="Experience">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Stat key={stat.label} {...stat} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
