"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UtensilsCrossed } from "lucide-react";
import type { Business } from "@/types";
import { ContactButtons } from "./ContactButtons";

/**
 * Floating action bar that slides up once the customer scrolls past the hero,
 * keeping the key actions within thumb reach at all times.
 */
export function StickyActionBar({ business }: { business: Business }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-line bg-surface/95 p-1.5 pl-2 shadow-float backdrop-blur-md">
            <button
              onClick={goToMenu}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent-soft px-4 text-sm font-semibold text-accent transition hover:bg-accent hover:text-accent-ink"
            >
              <UtensilsCrossed className="size-[1.05rem]" />
              <span>Menu</span>
            </button>
            <ContactButtons business={business} size="sm" compact />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
