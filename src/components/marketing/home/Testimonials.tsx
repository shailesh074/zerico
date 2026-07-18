import { Quote } from "lucide-react";
import { testimonials } from "@/data/marketing/testimonials";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <Reveal key={t.author} delay={i * 90}>
          <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-soft">
            <Quote className="size-7 text-accent/30" />
            <blockquote className="mt-4 flex-1 text-pretty text-[1rem] leading-relaxed text-ink">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <span className="grid size-10 place-items-center rounded-full bg-accent-soft font-display text-sm font-semibold text-accent">
                {t.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">
                  {t.author}
                </span>
                <span className="block text-[0.82rem] text-muted">
                  {t.role}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
