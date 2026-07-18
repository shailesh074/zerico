"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { menu, cafe } from "@/data/cloudcafe-menu";
import { MenuItemRow } from "./MenuItemRow";
import { DietMark } from "./Diet";
import { cn } from "@/lib/utils";

export function Menu() {
  const [active, setActive] = useState(menu[0]?.id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const railRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Deterministic scroll-spy: last section whose top passed the sticky rail.
  useEffect(() => {
    const onScroll = () => {
      const threshold = 150;
      let current = menu[0]?.id;
      for (const cat of menu) {
        const el = sectionRefs.current[cat.id];
        if (el && el.getBoundingClientRect().top <= threshold) current = cat.id;
      }
      if (current) setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the active chip centered — horizontal rail scroll only.
  useEffect(() => {
    const chip = chipRefs.current[active];
    const rail = railRef.current;
    if (!chip || !rail) return;
    const target = chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  const jump = (id: string) =>
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="menu" className="scroll-mt-2 bg-canvas-2/40 pt-16 sm:pt-24">
      {/* Title */}
      <div className="container-px mx-auto max-w-3xl text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-accent">
          All Day · {cafe.hoursLabel}
        </p>
        <h2 className="font-script mt-2 text-6xl text-ink sm:text-7xl">
          The Menu
        </h2>
        <p className="font-serif mx-auto mt-3 max-w-lg text-[1.25rem] italic text-muted">
          Everything made fresh to order — spice levels, your call.
        </p>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.82rem] text-muted">
          <span className="inline-flex items-center gap-2">
            <DietMark diet="veg" /> Veg
          </span>
          <span className="inline-flex items-center gap-2">
            <DietMark diet="egg" /> Egg
          </span>
          <span className="inline-flex items-center gap-2">
            <DietMark diet="nonveg" /> Non-veg
          </span>
          <span className="inline-flex items-center gap-2">
            <Star className="size-3.5 fill-gold text-gold" /> House favourite
          </span>
        </div>
      </div>

      {/* Sticky category rail */}
      <div className="sticky top-0 z-30 mt-8 border-y border-line-strong bg-canvas/90 backdrop-blur-md">
        <div
          ref={railRef}
          className="no-scrollbar container-px mx-auto flex max-w-5xl gap-1.5 overflow-x-auto py-3"
        >
          {menu.map((cat) => (
            <button
              key={cat.id}
              ref={(el) => {
                chipRefs.current[cat.id] = el;
              }}
              onClick={() => jump(cat.id)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 font-serif text-[1.02rem] font-medium transition-all duration-200",
                active === cat.id
                  ? "bg-accent text-accent-ink shadow-soft"
                  : "text-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="container-px mx-auto max-w-5xl pb-20 pt-14">
        <div className="space-y-16">
          {menu.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              ref={(el) => {
                sectionRefs.current[cat.id] = el;
              }}
              className="scroll-mt-24"
            >
              <div className="mb-8 text-center">
                {cat.kicker && (
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-accent/80">
                    {cat.kicker}
                  </p>
                )}
                <h3 className="font-serif mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {cat.name}
                </h3>
                <div className="rule-gold mx-auto mt-4 w-24" />
              </div>

              <div className="grid gap-x-12 gap-y-4 md:grid-cols-2">
                {cat.items.map((item) => (
                  <MenuItemRow
                    key={item.name}
                    item={item}
                    defaultDiet={cat.defaultDiet}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 text-center font-serif text-[1.05rem] italic text-subtle">
          Taxes as applicable. Prepared fresh — a little patience makes it
          better.
        </p>
      </div>
    </section>
  );
}
