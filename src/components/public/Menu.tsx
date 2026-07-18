"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Category, MenuItem } from "@/types";
import { MenuItemCard } from "./MenuItemCard";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function Menu({
  categories,
  items,
  currencySymbol,
}: {
  categories: Category[];
  items: MenuItem[];
  currencySymbol: string;
}) {
  const sorted = useMemo(
    () => [...categories].sort((a, b) => a.displayOrder - b.displayOrder),
    [categories],
  );

  const grouped = useMemo(() => {
    const map: Record<string, MenuItem[]> = {};
    for (const cat of sorted) {
      map[cat.id] = items
        .filter((i) => i.categoryId === cat.id)
        .sort((a, b) => a.displayOrder - b.displayOrder);
    }
    return map;
  }, [sorted, items]);

  const [active, setActive] = useState(sorted[0]?.id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const railRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Scroll-spy: the active category is the last section whose top has
  // scrolled up past the sticky rail. Deterministic and lag-free.
  useEffect(() => {
    const onScroll = () => {
      const threshold = 150; // ~ sticky rail height + breathing room
      let current = sorted[0]?.id;
      for (const cat of sorted) {
        const el = sectionRefs.current[cat.id];
        if (el && el.getBoundingClientRect().top <= threshold) current = cat.id;
      }
      if (current) setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sorted]);

  // Keep the active chip centered — scrolling the rail *horizontally* only,
  // never the window (scrollIntoView would yank the whole page on mount).
  useEffect(() => {
    if (!active) return;
    const chip = chipRefs.current[active];
    const rail = railRef.current;
    if (!chip || !rail) return;
    const target =
      chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="menu" className="section-y scroll-mt-4">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="The Menu"
          title="What we're serving"
          description="Small-batch coffee and fresh food, made through the day."
        />
      </div>

      {/* Sticky category rail */}
      <div className="sticky top-0 z-30 mt-8 border-y border-line bg-canvas/85 backdrop-blur-md">
        <div
          ref={railRef}
          className="no-scrollbar container-px mx-auto flex max-w-5xl gap-2 overflow-x-auto py-3"
        >
          {sorted.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  chipRefs.current[cat.id] = el;
                }}
                onClick={() => scrollTo(cat.id)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent text-accent-ink shadow-soft"
                    : "bg-surface-2 text-muted hover:bg-surface hover:text-ink",
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections */}
      <div className="container-px mx-auto mt-10 max-w-5xl space-y-16">
        {sorted.map((cat) => (
          <section
            key={cat.id}
            id={`cat-${cat.id}`}
            ref={(el) => {
              sectionRefs.current[cat.id] = el;
            }}
            className="scroll-mt-24"
          >
            <div className="mb-6 flex items-baseline gap-4">
              <h3 className="font-display text-2xl font-medium tracking-[-0.01em] text-ink">
                {cat.name}
              </h3>
              <span className="h-px flex-1 bg-line" />
              <span className="text-sm text-subtle">
                {grouped[cat.id]?.length ?? 0}
              </span>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
              {grouped[cat.id]?.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  currencySymbol={currencySymbol}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
