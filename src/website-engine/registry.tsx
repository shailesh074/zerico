/**
 * The Section Registry — the engine's single lookup table.
 * `section_type` (data) → React component. This is the only place a section
 * name is bound to code. See WEBSITE-ENGINE.md §3.
 *
 * Premium-only sections (hero_premium, highlights, testimonials, contact, cta)
 * are added in the Pro phase; until then the renderer safely skips them.
 */
import type { SectionComponent, SectionType } from "./types";
import {
  HeroSection,
  StorySection,
  MenuSection,
  OffersSection,
  GallerySection,
  VisitSection,
  FooterSection,
  ContactBarSection,
} from "./sections";

export const SECTIONS: Partial<Record<SectionType, SectionComponent>> = {
  hero: HeroSection,
  story: StorySection,
  menu: MenuSection,
  offers: OffersSection,
  gallery: GallerySection,
  visit: VisitSection,
  footer: FooterSection,
  contact_bar: ContactBarSection,
};
