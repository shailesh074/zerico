import "server-only";
import type {
  Business,
  Category,
  DayHours,
  GalleryImage,
  MenuItem,
  Offer,
  OpeningHours,
  Weekday,
} from "@/types";
import type {
  BusinessRow,
  CategoryRow,
  GalleryRow,
  MenuItemRow,
  OfferRow,
  OpeningHoursRow,
  SettingsRow,
} from "@/types/database";
import type { PageSections, WebsiteData } from "@/website-engine/types";
import { seedSections } from "@/website-engine/templates";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function buildOpeningHours(rows: OpeningHoursRow[]): OpeningHours {
  const hours = {} as OpeningHours;
  for (const day of WEEKDAYS) {
    hours[day] = { open: "00:00", close: "00:00", closed: true } as DayHours;
  }
  for (const row of rows) {
    const day = WEEKDAYS[row.day_of_week];
    if (!day) continue;
    hours[day] = {
      open: (row.opens_at ?? "00:00").slice(0, 5),
      close: (row.closes_at ?? "00:00").slice(0, 5),
      closed: row.is_closed,
    };
  }
  return hours;
}

function mapBusiness(row: BusinessRow, hours: OpeningHoursRow[]): Business {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    businessType: row.business_type ?? "",
    plan: row.subscription_plan,
    theme: row.theme,
    primaryColor: row.primary_color ?? undefined,
    secondaryColor: row.secondary_color ?? undefined,
    logoUrl: row.logo_url ?? "",
    coverImageUrl: row.cover_image_url ?? "",
    currencySymbol: row.currency_symbol,
    timezone: row.timezone,
    phone: row.phone ?? "",
    whatsapp: row.whatsapp ?? "",
    email: row.email ?? "",
    address: row.address ?? "",
    googleMapsUrl: row.google_maps_url ?? "",
    location: {
      lat: Number(row.location_lat ?? 0),
      lng: Number(row.location_lng ?? 0),
    },
    social: {
      instagram: row.instagram ?? undefined,
      facebook: row.facebook ?? undefined,
      website: row.website ?? undefined,
    },
    openingHours: buildOpeningHours(hours),
    isPublished: row.is_published,
  };
}

const mapCategory = (r: CategoryRow): Category => ({
  id: r.id,
  name: r.name,
  displayOrder: r.sort_order,
});

const mapMenuItem = (r: MenuItemRow): MenuItem => ({
  id: r.id,
  categoryId: r.category_id ?? "",
  name: r.name,
  description: r.description ?? "",
  price: Number(r.price ?? 0),
  imageUrl: r.image_url ?? undefined,
  isVeg: r.diet === "veg",
  isAvailable: r.is_available,
  isPopular: r.is_popular,
  displayOrder: r.sort_order,
});

const mapGallery = (r: GalleryRow): GalleryImage => ({
  id: r.id,
  imageUrl: r.image_url,
  title: r.title ?? "",
  displayOrder: r.sort_order,
});

const mapOffer = (r: OfferRow): Offer => ({
  id: r.id,
  title: r.title,
  description: r.description ?? "",
  imageUrl: r.image_url ?? undefined,
  expiryDate: r.expiry_date ?? undefined,
  isActive: r.is_active,
});

/**
 * Resolve a published business's full website from Supabase. Runs as the anon
 * role, so RLS returns only published + publicly-visible rows. Returns null for
 * an unknown or unpublished slug. Throws if the schema isn't applied yet (the
 * caller falls back to mock during the migration window).
 */
export async function getWebsiteFromSupabase(
  slug: string,
): Promise<WebsiteData | null> {
  const supabase = await createSupabaseServerClient();

  const { data: biz, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .is("deleted_at", null)
    .maybeSingle<BusinessRow>();

  if (error) throw error;
  if (!biz) return null;

  const [categories, menuItems, gallery, offers, hours, settings] =
    await Promise.all([
      supabase
        .from("categories")
        .select("id,name,sort_order")
        .eq("business_id", biz.id)
        .is("deleted_at", null)
        .order("sort_order")
        .returns<CategoryRow[]>(),
      supabase
        .from("menu_items")
        .select(
          "id,category_id,name,description,price,image_url,diet,is_available,is_popular,sort_order",
        )
        .eq("business_id", biz.id)
        .is("deleted_at", null)
        .order("sort_order")
        .returns<MenuItemRow[]>(),
      supabase
        .from("gallery")
        .select("id,image_url,title,sort_order")
        .eq("business_id", biz.id)
        .is("deleted_at", null)
        .order("sort_order")
        .returns<GalleryRow[]>(),
      supabase
        .from("offers")
        .select("id,title,description,image_url,expiry_date,is_active")
        .eq("business_id", biz.id)
        .is("deleted_at", null)
        .returns<OfferRow[]>(),
      supabase
        .from("opening_hours")
        .select("day_of_week,opens_at,closes_at,is_closed")
        .eq("business_id", biz.id)
        .returns<OpeningHoursRow[]>(),
      supabase
        .from("settings")
        .select("sections")
        .eq("business_id", biz.id)
        .maybeSingle<SettingsRow>(),
    ]);

  const business = mapBusiness(biz, hours.data ?? []);

  // Sections come from settings.sections; if a business hasn't customised them,
  // fall back to the plan's default template.
  const storedSections = settings.data?.sections as PageSections | undefined;
  const sections =
    storedSections && Object.keys(storedSections).length > 0
      ? storedSections
      : seedSections(business.plan);

  return {
    business,
    settings: { sections },
    content: {
      categories: (categories.data ?? []).map(mapCategory),
      menuItems: (menuItems.data ?? []).map(mapMenuItem),
      gallery: (gallery.data ?? []).map(mapGallery),
      offers: (offers.data ?? []).map(mapOffer),
    },
  };
}
