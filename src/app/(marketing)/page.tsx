import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Hero } from "@/components/marketing/home/Hero";
import { TrustBar } from "@/components/marketing/home/TrustBar";
import { FeatureBento } from "@/components/marketing/home/FeatureBento";
import { HowItWorks } from "@/components/marketing/home/HowItWorks";
import { ProductShowcase } from "@/components/marketing/home/ProductShowcase";
import { Testimonials } from "@/components/marketing/home/Testimonials";
import { PricingTiers } from "@/components/marketing/pricing/PricingTiers";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: `${site.name} — A premium digital home for cafés & restaurants`,
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      <Section>
        <SectionHeading
          eyebrow="Everything you need"
          title={
            <>
              One platform for your{" "}
              <span className="text-gradient-brand">whole presence</span>
            </>
          }
          description="From a simple QR menu to a full branded website — start where you are and grow at your own pace."
        />
        <FeatureBento />
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How it works"
          title="Live in a day, not a project"
          description="No lengthy build, no technical setup. You focus on hospitality — we handle the rest."
        />
        <HowItWorks />
      </Section>

      <Section>
        <ProductShowcase />
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans that grow with you"
          description="Start fully managed, add a dashboard, or graduate to a premium website. Every plan is set up for you."
        />
        <div className="mt-14">
          <PricingTiers />
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Compare all plans
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Loved by owners"
          title="Hospitality people, happier"
          description="Independent cafés and restaurants use Zerico to look their best and stay effortless."
        />
        <Testimonials />
      </Section>

      <CTASection />
    </>
  );
}
