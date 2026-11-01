"use client";

import { useEffect, useRef } from "react";

export default function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let dx = x;
    let dy = y;
    let raf = 0;
    let active = false;

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!active) {
        active = true;
        ring.dataset.on = "1";
        dot.dataset.on = "1";
      }
    };

    const onLeave = () => {
      active = false;
      delete ring.dataset.on;
      delete dot.dataset.on;
    };

    const tick = () => {
      dx += (x - dx) * 0.18;
      dy += (y - dy) * 0.18;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
