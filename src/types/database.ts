/**
 * Database row shapes (hand-written to match supabase/migrations).
 * Later this file can be replaced by `supabase gen types typescript`.
 * snake_case here; the query layer maps these to the camelCase domain types.
 */
import type { Plan, ThemeName } from "@/types";

export interface BusinessRow {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  business_type: string | null;
  subscription_plan: Plan;
  theme: ThemeName;
  primary_color: string | null;
  secondary_color: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  currency_symbol: string;
  timezone: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  google_maps_url: string | null;
  location_lat: number | null;
  location_lng: number | null;
  instagram: string | null;
  facebook: string | null;
  website: string | null;
  is_published: boolean;
}

export interface CategoryRow {
  id: string;
  name: string;
  sort_order: number;
}

export interface MenuItemRow {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  diet: "veg" | "egg" | "nonveg";
  is_available: boolean;
  is_popular: boolean;
  sort_order: number;
}

export interface GalleryRow {
  id: string;
  image_url: string;
  title: string | null;
  sort_order: number;
}

export interface OfferRow {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  expiry_date: string | null;
  is_active: boolean;
}

export interface OpeningHoursRow {
  day_of_week: number; // 0=Mon .. 6=Sun
  opens_at: string | null; // "HH:MM:SS"
  closes_at: string | null;
  is_closed: boolean;
}

export interface SettingsRow {
  sections: Record<string, unknown> | null;
}
