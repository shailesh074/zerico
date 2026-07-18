"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import type { OpeningHours } from "@/types";
import { getOpenState, type OpenState } from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * Live "Open now / Closed" pill. Computed on the client (in the café's
 * timezone) to avoid SSR/timezone hydration mismatches, and refreshed
 * every minute.
 */
export function OpenStatusBadge({
  hours,
  timezone,
  className,
  tone = "light",
}: {
  hours: OpeningHours;
  timezone: string;
  className?: string;
  /** "light" for dark backgrounds (hero), "solid" for light backgrounds. */
  tone?: "light" | "solid";
}) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState(hours, timezone));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [hours, timezone]);

  // Render a stable placeholder until mounted (keeps SSR markup neutral).
  const isOpen = state?.isOpen ?? false;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3.5 text-[0.8rem] font-medium backdrop-blur",
        tone === "light"
          ? "bg-white/12 text-white ring-1 ring-white/25"
          : "bg-surface text-ink ring-1 ring-line",
        className,
      )}
    >
      <span className="relative flex size-2">
        <span
          className={cn(
            "absolute inline-flex size-full rounded-full opacity-75",
            state
              ? isOpen
                ? "animate-ping bg-veg"
                : "bg-nonveg"
              : "bg-subtle",
          )}
        />
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            state ? (isOpen ? "bg-veg" : "bg-nonveg") : "bg-subtle",
          )}
        />
      </span>
      {state ? (
        <span className="flex items-center gap-1.5">
          <span className="font-semibold">{state.label}</span>
          {state.detail && (
            <>
              <span className="opacity-40">·</span>
              <span className="opacity-90">{state.detail}</span>
            </>
          )}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 opacity-80">
          <Clock className="size-3.5" /> Hours
        </span>
      )}
    </span>
  );
}
