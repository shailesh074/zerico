import type { Metadata } from "next";
import { Sparkles, Zap, Coffee, HeartHandshake } from "lucide-react";
import { site } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/marketing/PageHero";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { CTASection } from "@/components/marketing/CTASection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description:
    "Zerico gives every independent café and restaurant a premium digital presence — beautiful, effortless, and built for hospitality.",
};

const values = [
  {
    icon: Sparkles,
    title: "Beautiful by default",
    body: "Every café deserves to look premium online. No templates that scream 'template' — just pages you're proud to share.",
  },
  {
    icon: Zap,
    title: "Effortless for owners",
    body: "You run a kitchen, not a computer. Zerico is simple enough to update from your phone between orders.",
  },
  {
    icon: HeartHandshake,
    title: "Personal onboarding",
    body: "We set everything up for you and stay a message away. No forms, no fuss — just a quick chat and you're live.",
  },
  {
    icon: Coffee,
    title: "Built for hospitality",
    body: "We obsess over the little details so you can focus on the thing that matters: looking after your guests.",
  },
];

const stats = [
  { value: "< 1 day", label: "to go live" },
  { value: "0", label: "apps to install" },
  { value: "100%", label: "set up for you" },
  { value: "3", label: "plans to grow into" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Hospitality, meet{" "}
            <span className="text-gradient-brand">technology</span>
          </>
        }
        description="We believe every independent café and restaurant deserves a digital presence as warm and considered as the welcome inside."
      />

      <Section containerSize="narrow">
        <Reveal className="text-center">
          <p className="font-display text-pretty text-[1.5rem] font-medium leading-[1.4] tracking-[-0.01em] text-ink sm:text-[1.9rem] sm:leading-[1.4]">
            Most small food businesses are stuck with PDF menus, no real website
            and a weak presence online. Zerico exists to change that — to give
            them a home on the internet that feels as good as their food.
          </p>
        </Reveal>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="What we believe"
          title="The principles behind Zerico"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="flex h-full gap-4 rounded-2xl border border-line bg-surface p-6 shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <v.icon className="size-[1.35rem]" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-muted">
                    {v.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="grid grid-cols-2 gap-8 rounded-3xl border border-line bg-surface px-6 py-12 text-center shadow-soft md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-semibold text-accent sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
