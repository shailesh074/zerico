import "server-only";
import { isSupabaseConfigured } from "@/lib/env";
import { getWebsiteFromSupabase } from "@/lib/queries/website";
import { getWebsiteBySlug as getMockWebsite } from "./provider";
import type { WebsiteData } from "./types";

/**
 * Single entry point for resolving a business's website by slug.
 *
 * Prefers Supabase when configured. During the migration window (env set but
 * schema not applied yet) the DB read throws and we fall back to mock, so the
 * live site never breaks. Once the schema + seed are in place, Supabase becomes
 * the source of truth (including correctly 404-ing unpublished/unknown slugs).
 */
export async function getWebsite(slug: string): Promise<WebsiteData | null> {
  if (isSupabaseConfigured) {
    try {
      return await getWebsiteFromSupabase(slug);
    } catch (err) {
      console.warn(
        "[engine] Supabase read failed; falling back to mock data.",
        err instanceof Error ? err.message : err,
      );
    }
  }
  return getMockWebsite(slug);
}
