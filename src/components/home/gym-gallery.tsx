"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  src: string | StaticImageData;
  alt: string;
};

type GymGalleryProps = {
  images: GalleryImage[];
};

export function GymGallery({ images }: GymGalleryProps) {
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

  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {images.map((image, index) => (
          <button
            key={`${image.alt}-${index}`}
            type="button"
            className="overflow-hidden rounded-2xl border border-border bg-surface"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={900}
              className="aspect-square w-full object-cover md:aspect-auto md:h-40"
            />
          </button>
        ))}
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

          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            width={1600}
            height={1200}
            className="max-h-[90vh] w-full max-w-5xl rounded-xl object-contain"
            priority
          />

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
