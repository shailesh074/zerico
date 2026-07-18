"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MessageCircle, Phone, ChevronDown, MapPin } from "lucide-react";
import { cafe } from "@/data/cloudcafe-menu";
import { InstagramIcon } from "@/components/ui/BrandIcons";

const HERO_IMG =
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1600&q=80";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <header className="relative isolate flex min-h-[93svh] flex-col items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMG}
          alt="A table of food at The Cloud Cafe"
          fill
          priority
          sizes="100vw"
          className="hero-zoom object-cover"
        />
        <div className="absolute inset-0 bg-[rgb(20_14_9/0.62)]" />
        <div className="hero-scrim absolute inset-0" />
      </div>

      <div className="container-px relative z-10 mx-auto max-w-3xl py-24">
        <motion.p
          custom={0}
          variants={rise}
          initial="hidden"
          animate="show"
          className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/75"
        >
          Comfort Kitchen · All Day
        </motion.p>

        <motion.h1
          custom={1}
          variants={rise}
          initial="hidden"
          animate="show"
          className="font-script mt-4 text-[4.5rem] leading-[0.95] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-[6.5rem]"
        >
          {cafe.script}
        </motion.h1>

        <motion.p
          custom={2}
          variants={rise}
          initial="hidden"
          animate="show"
          className="font-serif mx-auto mt-4 max-w-xl text-[1.3rem] italic leading-relaxed text-white/90 sm:text-[1.5rem]"
        >
          {cafe.tagline}
        </motion.p>

        <motion.div
          custom={3}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur"
        >
          <span className="size-2 rounded-full bg-veg" />
          {cafe.hoursLabel}
          <span className="opacity-50">·</span>
          <span className="opacity-90">{cafe.hoursSub}</span>
        </motion.div>

        <motion.div
          custom={4}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`https://wa.me/${cafe.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-5 text-[0.95rem] font-medium text-accent-ink shadow-float transition hover:bg-accent-hover"
          >
            <MessageCircle className="size-[1.15rem]" /> WhatsApp
          </a>
          <a
            href={`tel:${cafe.tel}`}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 text-[0.95rem] font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            <Phone className="size-[1.15rem]" /> {cafe.phoneDisplay}
          </a>
          <a
            href={cafe.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <InstagramIcon className="size-[1.2rem]" />
          </a>
        </motion.div>

        <motion.a
          custom={5}
          variants={rise}
          initial="hidden"
          animate="show"
          href={cafe.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-white"
        >
          <MapPin className="size-4" />
          {cafe.location}
        </motion.a>
      </div>

      <a
        href="#menu"
        aria-label="View the menu"
        className="absolute inset-x-0 bottom-5 z-10 mx-auto flex w-fit flex-col items-center gap-1 text-white/70 transition hover:text-white"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em]">
          Menu
        </span>
        <ChevronDown className="size-5 animate-bounce" />
      </a>
    </header>
  );
}
