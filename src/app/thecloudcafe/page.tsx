import type { Metadata } from "next";
import { cafe } from "@/data/cloudcafe-menu";
import { Hero } from "@/components/cloudcafe/Hero";
import { Story } from "@/components/cloudcafe/Story";
import { Menu } from "@/components/cloudcafe/Menu";
import { Footer } from "@/components/cloudcafe/Footer";

export const metadata: Metadata = {
  title: `${cafe.name} — Menu`,
  description: `${cafe.tagline} Open ${cafe.hoursLabel}, all days. Order on WhatsApp ${cafe.phoneDisplay}.`,
  openGraph: {
    title: `${cafe.name} — Menu`,
    description: cafe.tagline,
    type: "website",
  },
};

export default function TheCloudCafePage() {
  return (
    <>
      <Hero />
      <Story />
      <Menu />
      <Footer />
    </>
  );
}
