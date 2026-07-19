/**
 * Website Engine — shared types.
 *
 * The engine is pure: (business, settings, content) → website. No component or
 * type here ever names a specific business. See WEBSITE-ENGINE.md.
 */
import type {
  Business,
  Category,
  MenuItem,
  GalleryImage,
  Offer,
} from "@/types";

/** Every kind of section the engine knows how to render. */
export type SectionType =
  | "hero"
  | "hero_premium"
  | "highlights"
  | "story"
  | "menu"
  | "gallery"
  | "offers"
  | "visit"
  | "testimonials"
  | "contact"
  | "cta"
  | "contact_bar"
  | "footer";

/** Per-section options (mirrors a JSONB blob in `settings.sections`). */
export interface SectionConfig {
  heading?: string;
  description?: string;
  [key: string]: unknown;
}

/** All public content for one business, already RLS-filtered in production. */
export interface WebsiteContent {
  categories: Category[];
  menuItems: MenuItem[];
  gallery: GalleryImage[];
  offers: Offer[];
}

/** The uniform contract every section component receives. */
export interface SectionProps {
  business: Business;
  content: WebsiteContent;
  config: SectionConfig;
}

export type SectionComponent = React.ComponentType<SectionProps>;

/** One placed section within a page (ordered, toggleable, configurable). */
export interface SectionInstance {
  type: SectionType;
  enabled?: boolean;
  config?: SectionConfig;
}

/** Sections keyed by page path ("home", "about", …) — the shape of settings.sections. */
export type PageSections = Record<string, SectionInstance[]>;

export interface WebsiteSettings {
  sections: PageSections;
}

/** Everything the engine needs to render a business's website. */
export interface WebsiteData {
  business: Business;
  settings: WebsiteSettings;
  content: WebsiteContent;
}
