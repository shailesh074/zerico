import Link from "next/link";
import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import { cafe } from "@/data/cloudcafe-menu";
import { InstagramIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-canvas">
      <div className="container-px mx-auto max-w-3xl py-16 text-center">
        <p className="font-script text-6xl text-canvas sm:text-7xl">
          {cafe.script}
        </p>
        <p className="font-serif mx-auto mt-3 max-w-md text-[1.25rem] italic text-canvas/75">
          {cafe.tagline}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm text-canvas ring-1 ring-white/15">
            <Clock className="size-4" />
            {cafe.hoursLabel} · {cafe.hoursSub}
          </span>
          <a
            href={cafe.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm text-canvas ring-1 ring-white/15 transition hover:bg-white/20"
          >
            <MapPin className="size-4" />
            {cafe.location}
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/${cafe.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-5 text-[0.95rem] font-medium text-accent-ink transition hover:bg-accent-hover"
          >
            <MessageCircle className="size-[1.15rem]" /> WhatsApp us
          </a>
          <a
            href={`tel:${cafe.tel}`}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 text-[0.95rem] font-medium text-canvas transition hover:bg-white/15"
          >
            <Phone className="size-[1.15rem]" /> {cafe.phoneDisplay}
          </a>
          <a
            href={cafe.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 text-[0.95rem] font-medium text-canvas transition hover:bg-white/15"
          >
            <InstagramIcon className="size-[1.15rem]" /> {cafe.instagramHandle}
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-canvas/50 sm:flex-row">
          <p>
            © {year} {cafe.name}
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 transition hover:text-canvas"
          >
            Powered by{" "}
            <span className="font-display font-semibold text-canvas/80 group-hover:text-canvas">
              Zerico
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
