/**
 * Website data provider (Engine Phase 1 — mock).
 *
 * Adapts existing mock content into the engine's WebsiteData shape. In a later
 * phase this is replaced by `lib/queries` reading Supabase — the engine, route
 * and sections stay identical because they only depend on WebsiteData.
 */
import type { RestaurantData } from "@/types";
import { cloudCafe } from "@/data/mock/cloudcafe";
import { seedSections } from "./templates";
import type { WebsiteData } from "./types";

function toWebsiteData(data: RestaurantData): WebsiteData {
  return {
    business: data.business,
    // Sections are seeded from the business's plan template. Once owner editing
    // ships, this comes from the DB `settings.sections` column instead.
    settings: { sections: seedSections(data.business.plan) },
    content: {
      categories: data.categories,
      menuItems: data.menuItems,
      gallery: data.gallery,
      offers: data.offers,
    },
  };
}

const registry: Record<string, WebsiteData> = {
  [cloudCafe.business.slug]: toWebsiteData(cloudCafe),
};

export function getWebsiteBySlug(slug: string): WebsiteData | null {
  return registry[slug] ?? null;
}

export function getAllWebsiteSlugs(): string[] {
  return Object.keys(registry);
}
