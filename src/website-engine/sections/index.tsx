/**
 * Section library — thin, generic adapters from the uniform SectionProps to our
 * existing polished components. These contain NO business-specific content; they
 * only forward data from props. New section *types* are the only reason to add a
 * file here, and they then work for every business automatically.
 */
import type { SectionProps } from "../types";

import { Hero } from "@/components/public/Hero";
import { About } from "@/components/public/About";
import { Menu } from "@/components/public/Menu";
import { Offers } from "@/components/public/Offers";
import { Gallery } from "@/components/public/Gallery";
import { Visit } from "@/components/public/Visit";
import { Footer } from "@/components/public/Footer";
import { StickyActionBar } from "@/components/public/StickyActionBar";

export function HeroSection({ business }: SectionProps) {
  return <Hero business={business} />;
}

export function StorySection({ business }: SectionProps) {
  return <About business={business} />;
}

export function MenuSection({ business, content }: SectionProps) {
  return (
    <Menu
      categories={content.categories}
      items={content.menuItems}
      currencySymbol={business.currencySymbol}
    />
  );
}

export function OffersSection({ content }: SectionProps) {
  return <Offers offers={content.offers} />;
}

export function GallerySection({ content }: SectionProps) {
  return <Gallery images={content.gallery} />;
}

export function VisitSection({ business }: SectionProps) {
  return <Visit business={business} />;
}

export function FooterSection({ business }: SectionProps) {
  return <Footer business={business} />;
}

export function ContactBarSection({ business }: SectionProps) {
  return <StickyActionBar business={business} />;
}
