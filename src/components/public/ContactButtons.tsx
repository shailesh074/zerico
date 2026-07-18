import { MessageCircle, Phone, MapPin } from "lucide-react";
import type { Business } from "@/types";
import { whatsappUrl, telUrl, directionsUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

type Size = "lg" | "md" | "sm";

const sizeMap: Record<Size, string> = {
  lg: "h-12 px-5 text-[0.95rem] gap-2.5",
  md: "h-11 px-4 text-sm gap-2",
  sm: "h-10 px-3 text-sm gap-1.5",
};

const iconMap: Record<Size, string> = {
  lg: "size-[1.15rem]",
  md: "size-[1.05rem]",
  sm: "size-4",
};

function base(size: Size) {
  return cn(
    "inline-flex select-none items-center justify-center rounded-full font-medium",
    "transition-all duration-200 active:scale-[0.97]",
    sizeMap[size],
  );
}

/**
 * The core customer actions — WhatsApp (emphasised), Call, Directions.
 * Reused in the hero and the sticky action bar.
 */
export function ContactButtons({
  business,
  size = "md",
  className,
  compact = false,
}: {
  business: Business;
  size?: Size;
  className?: string;
  /** Icon-only (used in the sticky bar on small screens). */
  compact?: boolean;
}) {
  const icon = iconMap[size];
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <a
        href={whatsappUrl(business)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        className={cn(
          base(size),
          "bg-accent text-accent-ink shadow-soft hover:bg-accent-hover",
        )}
      >
        <MessageCircle className={icon} strokeWidth={2} />
        {!compact && <span>WhatsApp</span>}
      </a>
      <a
        href={telUrl(business)}
        aria-label="Call us"
        className={cn(
          base(size),
          "border border-line-strong bg-surface/80 text-ink backdrop-blur hover:border-accent hover:text-accent",
        )}
      >
        <Phone className={icon} strokeWidth={2} />
        {!compact && <span>Call</span>}
      </a>
      <a
        href={directionsUrl(business)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get directions"
        className={cn(
          base(size),
          "border border-line-strong bg-surface/80 text-ink backdrop-blur hover:border-accent hover:text-accent",
        )}
      >
        <MapPin className={icon} strokeWidth={2} />
        {!compact && <span>Directions</span>}
      </a>
    </div>
  );
}
