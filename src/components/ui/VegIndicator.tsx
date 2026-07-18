import { cn } from "@/lib/utils";

/**
 * The square veg / non-veg marker familiar from Indian menus:
 * a bordered box with a centered dot. Small, but a premium detail.
 */
export function VegIndicator({
  isVeg,
  className,
}: {
  isVeg: boolean;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-[4px] border",
        isVeg ? "border-veg" : "border-nonveg",
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          isVeg ? "bg-veg" : "bg-nonveg",
        )}
      />
    </span>
  );
}
