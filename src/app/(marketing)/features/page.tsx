import type { Metadata } from "next";
import { site } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/marketing/PageHero";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { FeatureBento } from "@/components/marketing/home/FeatureBento";
import { FeatureSection } from "@/components/marketing/features/FeatureSection";
import { CTASection } from "@/components/marketing/CTASection";
import { BrowserFrame, PhoneFrame } from "@/components/marketing/mockups/DeviceFrames";
import {
  CafePreviewDesktop,
  CafePreviewMobile,
} from "@/components/marketing/mockups/CafePreview";
import { DashboardPreview } from "@/components/marketing/mockups/DashboardPreview";

export const metadata: Metadata = {
  title: `Features — ${site.name}`,
  description:
    "QR menus, an owner dashboard, gallery, offers, analytics and a premium website — everything a café needs to shine online.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={
          <>
            Everything your café needs to{" "}
            <span className="text-gradient-brand">shine online</span>
          </>
        }
        description="From a scannable menu to a full branded website — one platform that grows with you, without the technical headaches."
      />

      <Section>
        <SectionHeading
          eyebrow="The essentials"
          title="A complete digital presence"
          description="Start with a beautiful menu and add more as you grow."
        />
        <FeatureBento />
      </Section>

      <Section tone="muted">
        <div className="space-y-20 md:space-y-28">
          <FeatureSection
            eyebrow="For your guests"
            title="A menu that feels like your brand"
            description="Beautiful typography, your photos and colours. Guests scan a QR code and browse instantly — no app, no waiting."
            points={[
              "Works on every phone",
              "Loads instantly, no download",
              "Veg, popular tags & live offers",
            ]}
          >
            <BrowserFrame url="zerico.app/thecloudcafe">
              <CafePreviewDesktop />
            </BrowserFrame>
          </FeatureSection>

          <FeatureSection
            reverse
            eyebrow="For you"
            title="Manage it all from one dashboard"
            description="Update dishes, prices and photos yourself in seconds. Run offers, add gallery photos, and see what's working — all in one place."
            points={[
              "Menu, gallery & offers in one place",
              "Changes go live the moment you save",
              "Analytics: scans, page views & favourites",
            ]}
          >
            <BrowserFrame url="zerico.app/dashboard">
              <DashboardPreview />
            </BrowserFrame>
          </FeatureSection>

          <FeatureSection
            eyebrow="Grow with Pro"
            title="A premium website, made yours"
            description="Graduate to a full official website with advanced branding and SEO built in, so new guests find you on Google and love what they see."
            points={[
              "Your own premium website",
              "Advanced branding & custom colours",
              "SEO so guests discover you",
            ]}
          >
            <div className="flex justify-center">
              <PhoneFrame className="w-[220px]">
                <CafePreviewMobile />
              </PhoneFrame>
            </div>
          </FeatureSection>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
