"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudyImage } from "@/data/projects";

type CaseStudyGalleryProps = {
  images: CaseStudyImage[];
};

export function CaseStudyGallery({ images }: CaseStudyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  // Single image layout
  if (images.length === 1) {
    const img = images[0];
    return (
      <>
        <figure
          className={cn(
            "group relative aspect-[16/10] overflow-hidden brutal-border bg-lime/20",
            "cs-gallery-img"
          )}
          onClick={() => setLightboxIndex(0)}
          role="button"
          tabIndex={0}
          aria-label="Click to expand image"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setLightboxIndex(0);
            }
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 780px"
          />
        </figure>
        {img.caption && (
          <figcaption className="mt-2 text-center font-mono text-[11px] text-foreground/50">
            {img.caption}
          </figcaption>
        )}

        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={showPrev}
            onNext={showNext}
          />
        )}
      </>
    );
  }

  // Multiple images: two-column grid
  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <figure
            key={i}
            className={cn(
              "group relative aspect-[16/10] overflow-hidden brutal-border bg-lime/20",
              "cs-gallery-img"
            )}
            onClick={() => setLightboxIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`Expand image: ${img.alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxIndex(i);
              }
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </figure>
        ))}
      </div>
      {/* Captions for multi-image grid */}
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {images.map((img, i) =>
          img.caption ? (
            <figcaption
              key={i}
              className="text-center font-mono text-[11px] text-foreground/50"
            >
              {img.caption}
            </figcaption>
          ) : null
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: CaseStudyImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];

  return (
    <div
      className="cs-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image: ${img.alt}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center border-[2.5px] border-background bg-background/10 text-background hover:bg-lime hover:text-foreground"
        aria-label="Close image"
      >
        <X className="h-6 w-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border-[2.5px] border-background bg-background/10 text-background hover:bg-lime hover:text-foreground"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border-[2.5px] border-background bg-background/10 text-background hover:bg-lime hover:text-foreground"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div
        className="relative h-full w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="cs-lightbox-img"
          sizes="90vw"
        />
      </div>

      {img.caption && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[80%] text-center font-mono text-xs text-white/80">
          {img.caption}
        </p>
      )}
    </div>
  );
}
