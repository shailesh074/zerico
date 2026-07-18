import type { ComponentType } from "react";
import { MapPin, Phone, MessageCircle, Globe, Clock } from "lucide-react";
import type { Business } from "@/types";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { HoursTable } from "./HoursTable";
import { InstagramIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import { whatsappUrl, telUrl, directionsUrl } from "@/lib/links";

export function Visit({ business }: { business: Business }) {
  const mapSrc = `https://www.google.com/maps?q=${business.location.lat},${business.location.lng}&z=15&output=embed`;

  const socials = [
    business.social.instagram && {
      label: "Instagram",
      href: business.social.instagram,
      Icon: InstagramIcon,
    },
    business.social.facebook && {
      label: "Facebook",
      href: business.social.facebook,
      Icon: FacebookIcon,
    },
    business.social.website && {
      label: "Website",
      href: business.social.website,
      Icon: Globe,
    },
  ].filter(Boolean) as {
    label: string;
    href: string;
    Icon: ComponentType<{ className?: string }>;
  }[];

  return (
    <section id="visit" className="section-y scroll-mt-20 bg-canvas-2/60">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Visit Us"
          title="Come say hello"
          description="We're easy to find, and there's usually a table with your name on it."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Info */}
          <Reveal className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
            <div>
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-subtle">
                <Clock className="size-4" /> Opening hours
              </p>
              <HoursTable
                hours={business.openingHours}
                timezone={business.timezone}
              />
            </div>

            <div className="border-t border-line pt-6">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-subtle">
                <MapPin className="size-4" /> Find us
              </p>
              <p className="text-[0.98rem] leading-relaxed text-muted">
                {business.address}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={whatsappUrl(business)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-accent-ink transition hover:bg-accent-hover"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <a
                href={telUrl(business)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                <Phone className="size-4" /> Call
              </a>
              <a
                href={directionsUrl(business)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                <MapPin className="size-4" /> Directions
              </a>
            </div>

            {socials.length > 0 && (
              <div className="flex items-center gap-3 border-t border-line pt-6">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface-2 text-muted transition hover:border-accent hover:text-accent"
                  >
                    <Icon className="size-[1.15rem]" />
                  </a>
                ))}
              </div>
            )}
          </Reveal>

          {/* Map */}
          <Reveal
            delay={100}
            className="min-h-[340px] overflow-hidden rounded-2xl border border-line shadow-soft"
          >
            <iframe
              title={`Map to ${business.name}`}
              src={mapSrc}
              className="size-full min-h-[340px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
