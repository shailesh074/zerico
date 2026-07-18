import { Container } from "./Container";
import { cn } from "@/lib/utils";

type Tone = "canvas" | "muted" | "surface" | "dark";

const tones: Record<Tone, string> = {
  canvas: "bg-canvas text-ink",
  muted: "bg-canvas-2/60 text-ink",
  surface: "bg-surface text-ink",
  dark: "bg-ink text-canvas",
};

/**
 * A vertical band with consistent rhythm and a background tone. Wraps its
 * children in a Container unless `bleed` is set (for full-width visuals).
 */
export function Section({
  children,
  id,
  tone = "canvas",
  bleed = false,
  containerSize = "default",
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  id?: string;
  tone?: Tone;
  bleed?: boolean;
  containerSize?: "default" | "narrow" | "wide";
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("section-y scroll-mt-20", tones[tone], className)}
    >
      {bleed ? (
        children
      ) : (
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      )}
    </section>
  );
}
