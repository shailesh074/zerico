import type { Metadata } from "next";
import { site } from "@/config/site";
import { faqs } from "@/data/marketing/faqs";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/marketing/PageHero";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { PricingTiers } from "@/components/marketing/pricing/PricingTiers";
import { PricingComparison } from "@/components/marketing/pricing/PricingComparison";
import { CTASection } from "@/components/marketing/CTASection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Pricing — ${site.name}`,
  description:
    "Simple monthly plans for cafés and restaurants — Starter ₹299, Business ₹599, Pro ₹899. Set up for you, no lock-in.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Simple plans that{" "}
            <span className="text-gradient-brand">grow with you</span>
          </>
        }
        description="Start fully managed, add a dashboard, or graduate to a premium website. Every plan is set up for you — no setup fees, no lock-in."
      />

      <Section>
        <PricingTiers />
        <p className="mt-8 text-center text-sm text-subtle">
          Prices are per month. We onboard you personally — billing is arranged
          directly, no online checkout.
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Compare"
          title="Everything, side by side"
        />
        <div className="mt-12">
          <PricingComparison />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="Anything else? Message us on WhatsApp — we're happy to help."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-9 md:grid-cols-2">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 60}>
              <h3 className="font-display text-lg font-medium text-ink">
                {faq.q}
              </h3>
              <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-muted">
                {faq.a}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Found your plan?"
        description="Message us and we'll have your café online in a day — on whichever plan fits."
      />
    </>
  );
}
