import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="grid size-8 place-items-center rounded-[10px] bg-accent font-display text-lg font-semibold text-accent-ink shadow-soft transition-transform duration-200 group-hover:-rotate-6">
        Z
      </span>
      <span
        className={cn(
          "font-display text-xl font-semibold tracking-tight",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {site.name}
      </span>
    </Link>
  );
}
