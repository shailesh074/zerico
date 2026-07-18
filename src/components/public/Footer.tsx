import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import type { Business } from "@/types";
import { InstagramIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import { telUrl } from "@/lib/links";

export function Footer({ business }: { business: Business }) {
  const year = new Date().getFullYear();
  const socials = [
    business.social.instagram && {
      href: business.social.instagram,
      Icon: InstagramIcon,
      label: "Instagram",
    },
    business.social.facebook && {
      href: business.social.facebook,
      Icon: FacebookIcon,
      label: "Facebook",
    },
    business.social.website && {
      href: business.social.website,
      Icon: Globe,
      label: "Website",
    },
  ].filter(Boolean) as {
    href: string;
    Icon: ComponentType<{ className?: string }>;
    label: string;
  }[];

  return (
    <footer className="bg-ink text-canvas">
      <div className="container-px mx-auto max-w-5xl py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="relative size-11 overflow-hidden rounded-full ring-1 ring-white/25">
                <Image
                  src={business.logoUrl}
                  alt={`${business.name} logo`}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span className="font-display text-xl font-semibold">
                {business.name}
              </span>
            </div>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-canvas/70">
              {business.tagline}
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-canvas transition hover:bg-white/20"
                  >
                    <Icon className="size-[1.05rem]" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="space-y-3 text-[0.95rem] text-canvas/80">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-canvas/50">
              Get in touch
            </p>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 transition hover:text-canvas"
            >
              <MapPin className="mt-0.5 size-[1.05rem] shrink-0 text-canvas/50" />
              <span className="max-w-[15rem]">{business.address}</span>
            </a>
            <a
              href={telUrl(business)}
              className="flex items-center gap-3 transition hover:text-canvas"
            >
              <Phone className="size-[1.05rem] shrink-0 text-canvas/50" />
              {business.phone}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="flex items-center gap-3 transition hover:text-canvas"
            >
              <Mail className="size-[1.05rem] shrink-0 text-canvas/50" />
              {business.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-canvas/50 sm:flex-row">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 transition hover:text-canvas"
          >
            Powered by{" "}
            <span className="font-display font-semibold text-canvas/80 group-hover:text-canvas">
              Zerico
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
