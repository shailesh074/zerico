import Image from "next/image";
import { Star } from "lucide-react";
import type { MenuItem } from "@/types";
import { VegIndicator } from "@/components/ui/VegIndicator";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function MenuItemCard({
  item,
  currencySymbol,
}: {
  item: MenuItem;
  currencySymbol: string;
}) {
  const unavailable = !item.isAvailable;

  return (
    <article
      className={cn(
        "group relative flex gap-4 rounded-2xl border border-line bg-surface p-3 transition-all duration-300 sm:p-4",
        unavailable
          ? "opacity-70"
          : "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-float",
      )}
    >
      {item.imageUrl && (
        <div className="relative size-[88px] shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:size-28">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="(min-width: 640px) 112px, 88px"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              unavailable && "grayscale",
            )}
          />
          {unavailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45">
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-ink">
                Sold out
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start gap-2">
          <VegIndicator isVeg={item.isVeg} className="mt-1" />
          <h3 className="font-display text-[1.05rem] font-medium leading-snug text-ink">
            {item.name}
          </h3>
          {item.isPopular && !unavailable && (
            <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[0.68rem] font-semibold text-accent">
              <Star className="size-3 fill-current" />
              Popular
            </span>
          )}
        </div>

        <p className="mt-1.5 line-clamp-2 text-pretty text-[0.9rem] leading-relaxed text-muted">
          {item.description}
        </p>

        <div className="mt-auto pt-2.5">
          <span className="font-display text-[1.05rem] font-semibold text-ink">
            {formatPrice(item.price, currencySymbol)}
          </span>
        </div>
      </div>
    </article>
  );
}
