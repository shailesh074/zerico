/**
 * Resolve which sections render for a given page of a business's website.
 * Reads the business's stored `settings.sections` (seeded from its plan's
 * template, then editable). See WEBSITE-ENGINE.md §4–5.
 */
import type { SectionInstance, WebsiteSettings } from "./types";

/**
 * Return the ordered, enabled sections for a page path, or `null` if the page
 * doesn't exist for this business (e.g. a Starter site hitting `/about`).
 */
export function resolvePageSections(
  settings: WebsiteSettings,
  pagePath: string,
): SectionInstance[] | null {
  const page = settings.sections[pagePath];
  if (!page) return null;
  return page.filter((s) => s.enabled !== false);
}

/** All valid page paths for a business (used for nav + static params). */
export function websitePagePaths(settings: WebsiteSettings): string[] {
  return Object.keys(settings.sections);
}
