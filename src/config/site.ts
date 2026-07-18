/**
 * Central brand + navigation config for the Zerico marketing site.
 * One place to rename the brand, adjust nav, or update contact details.
 */

export const site = {
  name: "Zerico",
  domain: "zerico.app",
  tagline: "A premium digital home for cafés, restaurants & local businesses.",
  description:
    "Zerico gives cafés, restaurants, hotels and local businesses a beautiful, mobile-first digital presence — menu, gallery, offers and more — reachable from a single QR code.",

  // Primary CTA (sales-led) — "Talk to us" opens a WhatsApp chat.
  cta: { label: "Talk to us", href: "https://wa.me/919110619177" },

  // A real, live example customers can see.
  demo: { label: "See a live example", href: "/thecloudcafe" },

  contact: {
    email: "shailesh.consult.growth@gmail.com",
    phone: "+91 91106 19177",
    whatsapp: "919110619177",
    location: "Bengaluru, India",
  },

  social: {
    instagram: "https://instagram.com/zerico",
    x: "https://x.com/zerico",
    linkedin: "https://linkedin.com/company/zerico",
  },
} as const;

export const mainNav = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Live demo", href: "/thecloudcafe" },
    { label: "Login", href: "/login" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
} as const;

/**
 * Slugs the marketing site reserves — a business can never claim these as its
 * public URL. Static routes already win over `/[slug]`, but this makes the
 * rule explicit for business creation in later phases.
 */
export const reservedSlugs = [
  "features",
  "pricing",
  "about",
  "contact",
  "login",
  "thecloudcafe",
  "dashboard",
  "admin",
  "api",
  "auth",
  "signup",
  "app",
] as const;
