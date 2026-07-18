import { cafe } from "@/data/cloudcafe-menu";
import { Reveal } from "@/components/ui/Reveal";

export function Story() {
  return (
    <section className="section-y">
      <div className="container-px mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-accent">
            Welcome
          </p>
          <p className="font-script mt-2 text-5xl text-ink sm:text-6xl">
            A little about us
          </p>
          <div className="rule-gold mx-auto mt-6 w-40" />

          <div className="mt-8 space-y-5">
            {cafe.story.map((para, i) => (
              <p
                key={i}
                className="font-serif text-pretty text-[1.28rem] leading-relaxed text-muted sm:text-[1.35rem]"
              >
                {para}
              </p>
            ))}
          </div>

          <div className="rule-gold mx-auto mt-8 w-24" />
        </Reveal>
      </div>
    </section>
  );
}
