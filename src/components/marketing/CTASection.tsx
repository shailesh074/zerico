import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection({
  title = "Ready to give your café a digital home?",
  description = "Tell us about your place and we'll have your premium Zerico page live in a day.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-y">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center sm:px-12 sm:py-20">
            {/* warm glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 0%, rgba(182,85,31,0.5), transparent 70%)",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-balance text-[2rem] font-medium leading-tight tracking-[-0.02em] text-canvas sm:text-[2.75rem]">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-canvas/70">
                {description}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button href={site.cta.href} size="lg">
                  {site.cta.label}
                  <ArrowRight className="size-4" />
                </Button>
                <Button href={site.demo.href} variant="onDark" size="lg">
                  {site.demo.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
