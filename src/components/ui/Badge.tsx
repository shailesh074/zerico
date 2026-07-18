import { cn } from "@/lib/utils";

type BadgeVariant = "soft" | "outline" | "solid" | "onDark";

const variants: Record<BadgeVariant, string> = {
  soft: "bg-accent-soft text-accent",
  outline: "border border-line-strong text-muted",
  solid: "bg-accent text-accent-ink",
  onDark: "bg-white/10 text-white ring-1 ring-white/20",
};

export function Badge({
  children,
  variant = "soft",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
