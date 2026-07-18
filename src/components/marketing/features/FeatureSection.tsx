import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function FeatureSection({
  eyebrow,
  title,
  description,
  points,
  children,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
      <Reveal className={cn(reverse && "md:order-2")}>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h3 className="font-display text-[1.9rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
          {title}
        </h3>
        <p className="mt-4 text-pretty text-[1.02rem] leading-relaxed text-muted">
          {description}
        </p>
        <ul className="mt-6 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-[0.95rem] text-ink">
              <span className="grid size-5 place-items-center rounded-full bg-accent-soft text-accent">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={100} className={cn(reverse && "md:order-1")}>
        {children}
      </Reveal>
    </div>
  );
}
