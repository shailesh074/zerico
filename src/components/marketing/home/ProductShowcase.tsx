import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import {
  BrowserFrame,
} from "@/components/marketing/mockups/DeviceFrames";
import { CafePreviewDesktop } from "@/components/marketing/mockups/CafePreview";
import { DashboardPreview } from "@/components/marketing/mockups/DashboardPreview";

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-[0.95rem] text-ink">
          <span className="grid size-5 place-items-center rounded-full bg-accent-soft text-accent">
            <Check className="size-3" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProductShowcase() {
  return (
    <div className="space-y-20 md:space-y-28">
      {/* Guest experience */}
      <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-3">The guest experience</p>
          <h3 className="font-display text-[1.9rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
            A menu that feels like your brand
          </h3>
          <p className="mt-4 text-pretty text-[1.02rem] leading-relaxed text-muted">
            Beautiful typography, your photos, your colours. Guests get a
            premium first impression before the food even arrives.
          </p>
          <Points
            items={[
              "Works on every phone",
              "Loads instantly — no app",
              "Veg, popular tags & live offers",
            ]}
          />
          <Link
            href="/thecloudcafe"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            See a live example
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <Reveal delay={100}>
          <BrowserFrame url="zerico.app/cloudcafe">
            <CafePreviewDesktop />
          </BrowserFrame>
        </Reveal>
      </div>

      {/* Owner experience */}
      <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <Reveal className="md:order-2">
          <p className="eyebrow mb-3">The owner experience</p>
          <h3 className="font-display text-[1.9rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
            Change anything in seconds
          </h3>
          <p className="mt-4 text-pretty text-[1.02rem] leading-relaxed text-muted">
            Ran out of a dish? Changing a price? Update it yourself from your
            phone — no calls, no waiting, no developer.
          </p>
          <Points
            items={[
              "Menu, gallery & offers in one place",
              "Live the moment you save",
              "See scans & most-loved dishes",
            ]}
          />
          <Link
            href="/features"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Explore features
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <Reveal delay={100} className="md:order-1">
          <BrowserFrame url="zerico.app/dashboard">
            <DashboardPreview />
          </BrowserFrame>
        </Reveal>
      </div>
    </div>
  );
}
