/**
 * Plan → pages → default section order. Seeded into a business's
 * `settings.sections` at creation, then editable within plan limits.
 * See WEBSITE-ENGINE.md §4.
 */
import type { Plan } from "@/types";
import type { PageSections, SectionType } from "./types";

export interface PageDef {
  path: string;
  title: string;
  sections: SectionType[];
}

export interface Template {
  id: string;
  multiPage: boolean;
  pages: PageDef[];
}

export const TEMPLATES: Record<Plan, Template> = {
  // Starter — a single scannable menu page, nothing else.
  starter: {
    id: "qr",
    multiPage: false,
    pages: [
      {
        path: "home",
        title: "Menu",
        sections: ["hero", "menu", "visit", "footer", "contact_bar"],
      },
    ],
  },

  // Business — the full single-page site (matches today's restaurant module).
  business: {
    id: "standard",
    multiPage: false,
    pages: [
      {
        path: "home",
        title: "Home",
        sections: [
          "hero",
          "story",
          "menu",
          "offers",
          "gallery",
          "visit",
          "footer",
          "contact_bar",
        ],
      },
    ],
  },

  // Pro — a multi-page premium website.
  pro: {
    id: "premium",
    multiPage: true,
    pages: [
      {
        path: "home",
        title: "Home",
        sections: [
          "hero_premium",
          "highlights",
          "story",
          "offers",
          "cta",
          "footer",
        ],
      },
      {
        path: "about",
        title: "About",
        sections: ["hero", "story", "testimonials", "cta", "footer"],
      },
      {
        path: "menu",
        title: "Menu",
        sections: ["hero", "menu", "footer"],
      },
      {
        path: "gallery",
        title: "Gallery",
        sections: ["hero", "gallery", "footer"],
      },
      {
        path: "offers",
        title: "Offers",
        sections: ["hero", "offers", "cta", "footer"],
      },
      {
        path: "contact",
        title: "Contact",
        sections: ["hero", "contact", "visit", "footer"],
      },
    ],
  },
};

export const templateForPlan = (plan: Plan): Template => TEMPLATES[plan];

/** Build the default `settings.sections` for a plan (all sections enabled). */
export function seedSections(plan: Plan): PageSections {
  const template = TEMPLATES[plan];
  const result: PageSections = {};
  for (const page of template.pages) {
    result[page.path] = page.sections.map((type) => ({ type, enabled: true }));
  }
  return result;
}
