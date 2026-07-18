/** Icon keys resolve to lucide components in the rendering component. */
export type FeatureIcon =
  | "qr"
  | "dashboard"
  | "gallery"
  | "offers"
  | "analytics"
  | "website";

export interface Feature {
  id: string;
  icon: FeatureIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: "qr-menu",
    icon: "qr",
    title: "QR menu",
    description:
      "Guests scan a code and browse your full menu instantly — no app, no download, no waiting.",
  },
  {
    id: "dashboard",
    icon: "dashboard",
    title: "Owner dashboard",
    description:
      "Update dishes, prices and photos yourself in seconds. Changes go live immediately.",
  },
  {
    id: "gallery",
    icon: "gallery",
    title: "Gallery",
    description:
      "Show off your space, your plating and your atmosphere in a beautiful editorial grid.",
  },
  {
    id: "offers",
    icon: "offers",
    title: "Offers",
    description:
      "Run happy hours and weekend deals that give guests a reason to come back this week.",
  },
  {
    id: "analytics",
    icon: "analytics",
    title: "Analytics",
    description:
      "See how many people scan, which dishes they love, and how often they return.",
  },
  {
    id: "website",
    icon: "website",
    title: "Premium website",
    description:
      "Graduate to a full official website with your own branding and SEO built in.",
  },
];
