import { Container } from "@/components/ui/Container";

const names = [
  "Cloud Café",
  "The Corner Roastery",
  "Saffron Kitchen",
  "Brew & Co.",
  "Marigold Bistro",
];

export function TrustBar() {
  return (
    <div className="border-y border-line bg-surface/50">
      <Container className="py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
          Loved by independent cafés &amp; restaurants
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {names.map((name) => (
            <span
              key={name}
              className="font-display text-lg font-medium text-muted/70 transition-colors hover:text-ink"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
