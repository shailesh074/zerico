import type { Diet } from "@/data/cloudcafe-menu";
import { cn } from "@/lib/utils";

const config: Record<Diet, { color: string; label: string }> = {
  veg: { color: "border-veg", label: "Vegetarian" },
  egg: { color: "border-egg", label: "Contains egg" },
  nonveg: { color: "border-nonveg", label: "Non-vegetarian" },
};

const dot: Record<Diet, string> = {
  veg: "bg-veg",
  egg: "bg-egg",
  nonveg: "bg-nonveg",
};

/** The bordered square diet marker (green veg / amber egg / red non-veg). */
export function DietMark({
  diet,
  className,
}: {
  diet: Diet;
  className?: string;
}) {
  const c = config[diet];
  return (
    <span
      role="img"
      aria-label={c.label}
      className={cn(
        "inline-flex size-[15px] shrink-0 items-center justify-center rounded-[3px] border",
        c.color,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dot[diet])} />
    </span>
  );
}
