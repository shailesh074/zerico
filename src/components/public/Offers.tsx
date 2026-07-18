import Image from "next/image";
import { Tag } from "lucide-react";
import type { Offer } from "@/types";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function isLive(offer: Offer): boolean {
  if (!offer.isActive) return false;
  if (!offer.expiryDate) return true;
  const today = new Date().toISOString().slice(0, 10);
  return offer.expiryDate >= today;
}

export function Offers({ offers }: { offers: Offer[] }) {
  const live = offers.filter(isLive);
  if (live.length === 0) return null;

  return (
    <section id="offers" className="section-y scroll-mt-20 bg-canvas-2/60">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Offers"
          title="A little something extra"
          description="Current deals worth planning a visit around."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {live.map((offer, i) => (
            <Reveal key={offer.id} delay={i * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-float">
                {offer.imageUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={offer.imageUrl}
                      alt={offer.title}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[0.72rem] font-semibold text-accent-ink shadow-soft">
                      <Tag className="size-3.5" />
                      Offer
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-medium text-ink">
                    {offer.title}
                  </h3>
                  <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-muted">
                    {offer.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
