"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/stats";

function useCount(end: number, run: boolean) {
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

  return value;
}

function show(value: number, decimals: number) {
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
}

function Stat({
  value: end,
  decimals,
  suffix,
  label,
  run,
}: (typeof stats)[number] & { run: boolean }) {
  const value = useCount(end, run);
  return (
    <div className="text-center">
      <div className="stat-number">
        {show(value, decimals)}
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
