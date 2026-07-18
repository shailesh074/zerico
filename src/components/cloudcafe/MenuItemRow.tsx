import { Star } from "lucide-react";
import type { MenuLine, Diet } from "@/data/cloudcafe-menu";
import { DietMark } from "./Diet";

export function MenuItemRow({
  item,
  defaultDiet,
}: {
  item: MenuLine;
  defaultDiet: Diet;
}) {
  const diet = item.diet ?? defaultDiet;
  return (
    <div className="flex items-baseline">
      <DietMark diet={diet} className="relative top-0.5 mr-2.5 self-start" />

      <span className="font-serif text-[1.18rem] font-medium leading-snug text-ink">
        {item.name}
        {item.popular && (
          <Star className="ml-1.5 inline size-3.5 -translate-y-0.5 fill-gold text-gold" />
        )}
        {item.note && (
          <span className="ml-2 align-middle text-[0.68rem] font-semibold uppercase tracking-wide text-accent">
            {item.note}
          </span>
        )}
      </span>

      <span className="leader" />

      {item.price != null && (
        <span className="font-serif text-[1.18rem] font-semibold text-ink">
          ₹{item.price}
        </span>
      )}
    </div>
  );
}
