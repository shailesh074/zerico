import type { Business } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function About({ business }: { business: Business }) {
  return (
    <section className="section-y">
      <div className="container-px mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow mb-5">Our Story</p>
          <p className="font-display text-pretty text-[1.6rem] font-medium leading-[1.35] tracking-[-0.01em] text-ink sm:text-[2rem] sm:leading-[1.35]">
            {business.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
