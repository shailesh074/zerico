import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRestaurantBySlug, getAllSlugs } from "@/data/mock";
import { Hero } from "@/components/public/Hero";
import { About } from "@/components/public/About";
import { Menu } from "@/components/public/Menu";
import { Offers } from "@/components/public/Offers";
import { Gallery } from "@/components/public/Gallery";
import { Visit } from "@/components/public/Visit";
import { Footer } from "@/components/public/Footer";
import { StickyActionBar } from "@/components/public/StickyActionBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getRestaurantBySlug(slug);
  if (!data) return { title: "Not found" };

  const { business } = data;
  const title = `${business.name} — ${business.businessType}`;
  return {
    title,
    description: business.tagline,
    openGraph: {
      title,
      description: business.tagline,
      images: [{ url: business.coverImageUrl }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: business.tagline,
      images: [business.coverImageUrl],
    },
  };
}

export default async function RestaurantPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getRestaurantBySlug(slug);

  // Public visitors only ever see a published business.
  if (!data || !data.business.isPublished) notFound();

  const { business, categories, menuItems, gallery, offers } = data;

  return (
    <div data-theme={business.theme} className="min-h-svh bg-canvas">
      <Hero business={business} />
      <main>
        <About business={business} />
        <Menu
          categories={categories}
          items={menuItems}
          currencySymbol={business.currencySymbol}
        />
        <Offers offers={offers} />
        <Gallery images={gallery} />
        <Visit business={business} />
      </main>
      <Footer business={business} />
      <StickyActionBar business={business} />
    </div>
  );
}
