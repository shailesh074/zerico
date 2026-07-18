"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { Business } from "@/types";
import { ContactButtons } from "./ContactButtons";
import { OpenStatusBadge } from "./OpenStatusBadge";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero({ business }: { business: Business }) {
  return (
    <header className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden">
      {/* Cover */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={business.coverImageUrl}
          alt={`${business.name} interior`}
          fill
          priority
          sizes="100vw"
          className="hero-zoom object-cover"
        />
        <div className="hero-scrim absolute inset-0" />
      </div>

      {/* Logo + open badge, top */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container-px absolute inset-x-0 top-0 flex items-center justify-between pt-6"
      >
        <div className="flex items-center gap-3">
          <span className="relative size-11 overflow-hidden rounded-full ring-2 ring-white/70 shadow-float sm:size-12">
            <Image
              src={business.logoUrl}
              alt={`${business.name} logo`}
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
          <span className="font-display text-lg font-semibold text-white drop-shadow-sm sm:text-xl">
            {business.name}
          </span>
        </div>
        <OpenStatusBadge
          hours={business.openingHours}
          timezone={business.timezone}
          tone="light"
          className="hidden sm:inline-flex"
        />
      </motion.div>

      {/* Headline block */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-px relative z-10 mx-auto w-full max-w-5xl pb-10 pt-28 sm:pb-16"
      >
        <motion.p
          variants={rise}
          className="eyebrow mb-4 text-white/85"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          {business.businessType}
        </motion.p>

        <motion.h1
          variants={rise}
          className="font-display max-w-3xl text-balance text-[2.6rem] font-medium leading-[1.05] tracking-[-0.02em] text-white drop-shadow-sm sm:text-6xl lg:text-[4.25rem]"
        >
          {business.name}
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-5 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-white/85 sm:text-lg"
        >
          {business.tagline}
        </motion.p>

        <motion.div variants={rise} className="mt-8">
          <ContactButtons business={business} size="lg" />
        </motion.div>

        <motion.div variants={rise} className="mt-6 sm:hidden">
          <OpenStatusBadge
            hours={business.openingHours}
            timezone={business.timezone}
            tone="light"
          />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center"
      >
        <ChevronDown className="size-5 animate-bounce text-white/70" />
      </motion.div>
    </header>
  );
}
