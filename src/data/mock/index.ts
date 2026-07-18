import type { RestaurantData } from "@/types";
import { cloudCafe } from "./cloudcafe";

/**
 * Mock data registry (Phase 1).
 *
 * In Phase 2 these functions are replaced by `lib/queries` backed by Supabase,
 * with identical signatures — so `/[slug]` and its components stay untouched.
 */
const registry: Record<string, RestaurantData> = {
  [cloudCafe.business.slug]: cloudCafe,
};

export function getRestaurantBySlug(slug: string): RestaurantData | null {
  return registry[slug] ?? null;
}

export function getAllSlugs(): string[] {
  return Object.keys(registry);
}
