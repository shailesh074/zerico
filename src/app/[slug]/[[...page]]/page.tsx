import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWebsite } from "@/website-engine/getWebsite";
import { resolvePageSections } from "@/website-engine/resolveWebsite";
import { WebsiteRenderer } from "@/website-engine/WebsiteRenderer";

/**
 * The Website Engine route — one file generates every page of every business,
 * for every plan. `slug` picks the business; `page` (optional catch-all) picks
 * the page. Which pages exist and which sections they contain come entirely
 * from data. See WEBSITE-ENGINE.md §5.
 */
interface PageProps {
  params: Promise<{ slug: string; page?: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getWebsite(slug);
  if (!data || !data.business.isPublished) return { title: "Not found" };

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

export default async function SitePage({ params }: PageProps) {
  const { slug, page } = await params;
  const data = await getWebsite(slug);

  // Public visitors only ever see a published business.
  if (!data || !data.business.isPublished) notFound();

  const pagePath = page?.[0] ?? "home";
  const sections = resolvePageSections(data.settings, pagePath);

  // Plan structure is enforced by routing: a page the plan doesn't define 404s.
  if (!sections) notFound();

  return (
    <div data-theme={data.business.theme} className="min-h-svh bg-canvas">
      <WebsiteRenderer
        sections={sections}
        business={data.business}
        content={data.content}
      />
    </div>
  );
}
