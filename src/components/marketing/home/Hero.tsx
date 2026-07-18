"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  BrowserFrame,
  PhoneFrame,
} from "@/components/marketing/mockups/DeviceFrames";
import {
  CafePreviewDesktop,
  CafePreviewMobile,
} from "@/components/marketing/mockups/CafePreview";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden mesh-warm">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />

      <Container className="pb-16 pt-32 sm:pt-40 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={rise}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/70 px-3.5 py-1.5 text-[0.78rem] font-medium text-muted backdrop-blur">
                <Sparkles className="size-3.5 text-accent" />
                For cafés, restaurants &amp; local businesses
              </span>
            </motion.div>

            <motion.h1
              variants={rise}
              className="font-display mt-6 text-balance text-[2.75rem] font-medium leading-[1.03] tracking-[-0.025em] text-ink sm:text-6xl lg:text-[4.1rem]"
            >
              A premium{" "}
              <span className="text-gradient-brand">digital home</span> for your
              café.
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted"
            >
              Zerico turns your menu into a beautiful, mobile-first experience
              guests reach from a single QR code — no app, no setup headaches.
              Live in a day, managed end to end.
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button href={site.cta.href} size="lg">
                {site.cta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Button href={site.demo.href} variant="secondary" size="lg">
                {site.demo.label}
              </Button>
            </motion.div>

            <motion.p
              variants={rise}
              className="mt-6 text-sm text-subtle"
            >
              No app to install · No printing · Update anytime
            </motion.p>
          </motion.div>

          {/* Product visual */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <BrowserFrame url="zerico.app/cloudcafe">
              <CafePreviewDesktop />
            </BrowserFrame>

            <div className="absolute -bottom-10 -right-2 hidden sm:block">
              <PhoneFrame className="w-[200px]">
                <CafePreviewMobile />
              </PhoneFrame>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
