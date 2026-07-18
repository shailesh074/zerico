"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/types";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const sorted = [...images].sort((a, b) => a.displayOrder - b.displayOrder);
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % sorted.length)),
    [sorted.length],
  );
  const prev = useCallback(
    () =>
      setOpen((i) =>
        i === null ? i : (i - 1 + sorted.length) % sorted.length,
      ),
    [sorted.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  if (sorted.length === 0) return null;

  return (
    <section id="gallery" className="section-y scroll-mt-20">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="The Space"
          title="A look inside"
          description="A calm room, good light, and the smell of fresh coffee."
        />

        <Reveal className="mt-10">
          <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-3">
            {sorted.map((image, i) => (
              <button
                key={image.id}
                onClick={() => setOpen(i)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-surface-2",
                  i === 0 && "col-span-2 row-span-2",
                )}
                aria-label={`View ${image.title}`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 translate-y-1 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {image.title}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            onClick={close}
            aria-label="Close"
          >
            <X className="size-6" />
          </button>
          <button
            className="absolute left-3 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="size-7" />
          </button>
          <button
            className="absolute right-3 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            <ChevronRight className="size-7" />
          </button>
          <div
            className="relative h-[78vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={sorted[open].imageUrl.replace(/w=\d+/, "w=1400")}
              alt={sorted[open].title}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <p className="absolute -bottom-9 left-0 right-0 text-center text-sm text-white/80">
              {sorted[open].title} · {open + 1} / {sorted.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
