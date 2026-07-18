import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="mesh-warm relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <Container className="relative pb-14 pt-32 text-center sm:pb-16 sm:pt-40">
        <Reveal>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="font-display mx-auto max-w-3xl text-balance text-[2.6rem] font-medium leading-[1.05] tracking-[-0.025em] text-ink sm:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
