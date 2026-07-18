import type { Business } from "@/types";

/** wa.me deep link with an optional prefilled message. */
export function whatsappUrl(business: Business, message?: string): string {
  const text =
    message ?? `Hi ${business.name}! I found you through your menu page.`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function telUrl(business: Business): string {
  return `tel:${business.phone.replace(/\s+/g, "")}`;
}

export function directionsUrl(business: Business): string {
  return business.googleMapsUrl;
}
