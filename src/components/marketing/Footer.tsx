import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { site, footerNav } from "@/config/site";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import {
  InstagramIcon,
  XIcon,
  LinkedinIcon,
} from "@/components/ui/BrandIcons";

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "X", href: site.social.x, Icon: XIcon },
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedinIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas-2/50">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
              {site.tagline}
            </p>
            <ul className="mt-6 space-y-2.5 text-[0.9rem] text-muted">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-ink"
                >
                  <Mail className="size-4 text-subtle" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-ink"
                >
                  <Phone className="size-4 text-subtle" />
                  {site.contact.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <MapPin className="size-4 text-subtle" />
                {site.contact.location}
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-ink">{heading}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.92rem] text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-line pt-7 sm:flex-row">
          <p className="text-sm text-subtle">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="size-[1.05rem]" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
