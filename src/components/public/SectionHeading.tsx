import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        align === "center" && "mx-auto text-center",
        align === "center" ? "max-w-2xl" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-[2rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-pretty text-[1.02rem] leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
