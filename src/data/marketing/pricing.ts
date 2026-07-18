import { site } from "@/config/site";

export interface PricingPlan {
  id: "starter" | "business" | "pro";
  name: string;
  price: number;
  period: string;
  tagline: string;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 299,
    period: "/month",
    tagline: "A beautiful QR menu, fully managed for you.",
    features: [
      "QR menu",
      "Mobile-friendly menu",
      "Fully managed by Zerico",
      "No owner dashboard",
    ],
    ctaLabel: site.cta.label,
    ctaHref: site.cta.href,
  },
  {
    id: "business",
    name: "Business",
    price: 599,
    period: "/month",
    tagline: "Take control with your own dashboard.",
    popular: true,
    features: [
      "Owner dashboard",
      "Secure login",
      "Menu management",
      "Gallery",
      "Offers",
      "Analytics",
    ],
    ctaLabel: site.cta.label,
    ctaHref: site.cta.href,
  },
  {
    id: "pro",
    name: "Pro",
    price: 899,
    period: "/month",
    tagline: "A premium official website for your brand.",
    features: [
      "Everything in Business",
      "Premium official website",
      "Advanced branding",
      "SEO",
      "Priority support",
    ],
    ctaLabel: site.cta.label,
    ctaHref: site.cta.href,
  },
];

/** Feature comparison matrix for the Pricing page (built later this module). */
export interface ComparisonRow {
  label: string;
  starter: boolean | string;
  business: boolean | string;
  pro: boolean | string;
}

export const comparisonGroups: { group: string; rows: ComparisonRow[] }[] = [
  {
    group: "Menu & presence",
    rows: [
      { label: "QR menu", starter: true, business: true, pro: true },
      {
        label: "Mobile-friendly menu",
        starter: true,
        business: true,
        pro: true,
      },
      {
        label: "Fully managed by Zerico",
        starter: true,
        business: "Optional",
        pro: "Optional",
      },
      { label: "Gallery", starter: false, business: true, pro: true },
      { label: "Offers", starter: false, business: true, pro: true },
    ],
  },
  {
    group: "Control & insight",
    rows: [
      { label: "Owner dashboard", starter: false, business: true, pro: true },
      { label: "Secure login", starter: false, business: true, pro: true },
      { label: "Menu management", starter: false, business: true, pro: true },
      { label: "Analytics", starter: false, business: true, pro: true },
    ],
  },
  {
    group: "Brand & growth",
    rows: [
      {
        label: "Premium official website",
        starter: false,
        business: false,
        pro: true,
      },
      { label: "Advanced branding", starter: false, business: false, pro: true },
      { label: "SEO", starter: false, business: false, pro: true },
      {
        label: "Support",
        starter: "Standard",
        business: "Standard",
        pro: "Priority",
      },
    ],
  },
];
