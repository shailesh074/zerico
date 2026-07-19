/**
 * Domain types — the shape of a business and its content.
 *
 * These are the contract between the data layer and the UI. In Phase 1 the data
 * comes from `src/data/mock`; in Phase 2 the same shapes are produced by
 * `lib/queries` from Supabase, so components never change when the source does.
 */

export type ThemeName = "cafe" | "modern";

/** Subscription tier — drives which website experience the engine generates. */
export type Plan = "starter" | "business" | "pro";

export interface DayHours {
  /** 24h "HH:MM"; ignored when `closed` is true. */
  open: string;
  close: string;
  closed?: boolean;
}

export type Weekday =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";

export type OpeningHours = Record<Weekday, DayHours>;

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  website?: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  businessType: string;
  /** Subscription plan — the engine reads this to choose the template. */
  plan: Plan;
  theme: ThemeName;
  /** Optional per-business brand overrides layered on top of the theme. */
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl: string;
  coverImageUrl: string;
  currencySymbol: string;
  /** IANA timezone, e.g. "Asia/Kolkata" — used to compute the open/closed badge. */
  timezone: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  /** lat,lng for the embedded map preview. */
  location: { lat: number; lng: number };
  social: SocialLinks;
  openingHours: OpeningHours;
  isPublished: boolean;
}

export interface Category {
  id: string;
  name: string;
  displayOrder: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isVeg: boolean;
  isAvailable: boolean;
  isPopular: boolean;
  displayOrder: number;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  displayOrder: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  /** ISO date "YYYY-MM-DD"; undefined = no expiry. */
  expiryDate?: string;
  isActive: boolean;
}

/** Everything the public `/[slug]` page needs, resolved for one business. */
export interface RestaurantData {
  business: Business;
  categories: Category[];
  menuItems: MenuItem[];
  gallery: GalleryImage[];
  offers: Offer[];
}
