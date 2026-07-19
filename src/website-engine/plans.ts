/**
 * Plan → capabilities matrix. Zerico's product rulebook, in code, once, for
 * every tenant. Changing a business's `plan` changes its generated website —
 * no per-customer code. See WEBSITE-ENGINE.md §2.
 */
import type { Plan } from "@/types";

export type TemplateId = "qr" | "standard" | "premium";

export interface PlanCapabilities {
  template: TemplateId;
  /** Pro is multi-page; Starter/Business are a single scroll page. */
  multiPage: boolean;
  /** Whether an owner account is provisioned (Starter has none). */
  ownerLogin: boolean;
  dashboard: boolean;
  /** Branding controls exposed to the owner. */
  branding: boolean;
  seo: "basic" | "full";
}

export const PLANS: Record<Plan, PlanCapabilities> = {
  starter: {
    template: "qr",
    multiPage: false,
    ownerLogin: false,
    dashboard: false,
    branding: false,
    seo: "basic",
  },
  business: {
    template: "standard",
    multiPage: false,
    ownerLogin: true,
    dashboard: true,
    branding: false,
    seo: "basic",
  },
  pro: {
    template: "premium",
    multiPage: true,
    ownerLogin: true,
    dashboard: true,
    branding: true,
    seo: "full",
  },
};

export const planCapabilities = (plan: Plan): PlanCapabilities => PLANS[plan];
