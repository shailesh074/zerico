import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { ContactForm } from "@/components/marketing/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: `Talk to Zerico on WhatsApp, email ${site.contact.email}, or reach us in ${site.contact.location}.`,
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.contact.location,
)}`;

const cards = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.contact.phone,
    href: `https://wa.me/${site.contact.whatsapp}`,
    hint: "Fastest way to reach us",
  },
  {
    icon: Mail,
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    hint: "We reply within a day",
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.contact.location,
    href: mapsUrl,
    hint: "Serving cafés across the city",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s get your café{" "}
            <span className="text-gradient-brand">online</span>
          </>
        }
        description="Tell us about your place and we'll have a beautiful page live in a day. The quickest way is a quick WhatsApp — we're friendly."
      />

      <section className="section-y">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Info */}
            <Reveal className="flex flex-col gap-4">
              {cards.map(({ icon: Icon, label, value, href, hint }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-float"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-[1.3rem]" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <p className="mt-0.5 truncate text-[0.98rem] text-accent">
                      {value}
                    </p>
                    <p className="mt-0.5 text-[0.82rem] text-subtle">{hint}</p>
                  </div>
                </a>
              ))}
            </Reveal>

            {/* Form */}
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
