import { cn } from "@/lib/utils";

type Size = "default" | "narrow" | "wide";

const widths: Record<Size, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({
  children,
  size = "default",
  className,
}: {
  children: React.ReactNode;
  size?: Size;
  className?: string;
}) {
  return (
    <div className={cn("container-px mx-auto w-full", widths[size], className)}>
      {children}
    </div>
  );
}
