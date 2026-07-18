"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
}

/**
 * Reveals its children with a soft fade-and-rise the first time they scroll
 * into view. Respects prefers-reduced-motion via the .reveal CSS.
 * Shared by the restaurant and marketing modules.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If the element already sits above the viewport (e.g. the page loaded
    // scrolled down, or a hash link jumped past it), reveal immediately —
    // it would otherwise never intersect and stay invisible.
    if (el.getBoundingClientRect().top < 0) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", visible && "in-view", className)}
    >
      {children}
    </div>
  );
}
