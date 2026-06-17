"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import manifest from "@/content/image-manifest.json";
import type { ImageName } from "@/components/ui/responsive-image";

type GalleryImage = {
  name: ImageName;
  alt: string;
};

type GymGalleryProps = {
  images: GalleryImage[];
};

const images = manifest as Record<string, { widths: number[]; intrinsicWidth: number; intrinsicHeight: number }>;

function srcSetFor(name: string) {
  const entry = images[name];
  return {
    srcSet: entry.widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", "),
    fallback: `/img/${name}-${entry.widths[entry.widths.length - 1]}.webp`,
    width: entry.intrinsicWidth,
    height: entry.intrinsicHeight
  };
}

export function GymGallery({ images: galleryImages }: GymGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? i : (i + 1) % galleryImages.length));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, galleryImages.length]);

  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % galleryImages.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {galleryImages.map((image, index) => {
          const meta = srcSetFor(image.name);
          return (
            <Reveal key={`${image.name}-${index}`} delay={(index % 4) * 70}>
              <button
                type="button"
                className="spotlight-card group block w-full overflow-hidden rounded-2xl"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open image: ${image.alt}`}
              >
                <span aria-hidden className="spotlight-card__border" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meta.fallback}
                  srcSet={meta.srcSet}
                  sizes="(min-width: 768px) 22vw, 45vw"
                  width={meta.width}
                  height={meta.height}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105 md:aspect-auto md:h-40"
                />
              </button>
            </Reveal>
          );
        })}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/95 p-3"
          onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
          onTouchEnd={(event) => {
            if (touchStartX === null) return;
            const endX = event.changedTouches[0]?.clientX ?? touchStartX;
            const deltaX = endX - touchStartX;
            if (deltaX <= -40) showNext();
            if (deltaX >= 40) showPrev();
            setTouchStartX(null);
          }}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-white/20 bg-black/80 px-3 text-xl font-bold text-white"
            aria-label="Close fullscreen gallery"
          >
            ×
          </button>

          <button
            type="button"
            onClick={showPrev}
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-lg border border-white/20 bg-black/70 px-3 py-2 text-white md:inline-flex"
            aria-label="Previous image"
          >
            ←
          </button>

          {(() => {
            const meta = srcSetFor(galleryImages[activeIndex].name);
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={meta.fallback}
                srcSet={meta.srcSet}
                sizes="90vw"
                width={meta.width}
                height={meta.height}
                alt={galleryImages[activeIndex].alt}
                decoding="async"
                className="max-h-[90vh] w-full max-w-5xl rounded-xl object-contain"
              />
            );
          })()}

          <button
            type="button"
            onClick={showNext}
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-lg border border-white/20 bg-black/70 px-3 py-2 text-white md:inline-flex"
            aria-label="Next image"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
