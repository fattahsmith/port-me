"use client";

/**
 * SpiderManProfile
 *
 * Displays the original profile photo with a Spider-Man transformation on:
 *   – Desktop: mouse hover
 *   – Mobile: tap to toggle
 *   – Keyboard: Enter / Space to toggle
 *
 * Both images are preloaded. The spider image cross-fades over the original.
 * Falls back gracefully when profile-spiderman.jpg is not yet replaced.
 *
 * To replace the Spider-Man image:
 *   Copy your edited photo to: public/images/profile/profile-spiderman.jpg
 *   The component will automatically use it on the next build/reload.
 */

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const ORIGINAL_SRC = "/images/profile/profile-original.jpg";
const SPIDERMAN_SRC = "/images/profile/profile-spiderman.jpg";
const SPIDERMAN_FALLBACK = "/images/profile/profile-spiderman-placeholder.svg";

interface Props {
  /** aria-label for the interactive wrapper */
  alt?: string;
  sizes?: string;
}

export function SpiderManProfile({
  alt = "Profile photo — hover to reveal Spider-Man",
  sizes = "(max-width: 1024px) 80vw, 480px",
}: Props) {
  const [active, setActive] = useState(false);
  const [spiderError, setSpiderError] = useState(false);
  const isTouchRef = useRef(false);

  // ── Desktop hover ──────────────────────────────────────────────────────
  const handleMouseEnter = useCallback(() => {
    if (isTouchRef.current) return;
    setActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isTouchRef.current) return;
    setActive(false);
  }, []);

  // ── Mobile tap toggle ──────────────────────────────────────────────────
  const handleTouchStart = useCallback(() => {
    isTouchRef.current = true;
  }, []);

  const handleClick = useCallback(() => {
    if (!isTouchRef.current) return;
    setActive((v) => !v);
  }, []);

  // ── Keyboard toggle ────────────────────────────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive((v) => !v);
    }
    if (e.key === "Escape") {
      setActive(false);
    }
  }, []);

  const spiderSrc = spiderError ? SPIDERMAN_FALLBACK : SPIDERMAN_SRC;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={active ? "Showing Spider-Man — press Enter to restore" : alt}
      aria-pressed={active}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="relative aspect-square w-full cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      data-spiderman-profile=""
      style={{
        /* GPU layer for smooth crossfade */
        isolation: "isolate",
      }}
    >
      {/* Original photo — always present, fades out on active */}
      <Image
        src={ORIGINAL_SRC}
        alt="Profile photo"
        fill
        priority
        draggable={false}
        className="object-cover"
        style={{
          opacity: active ? 0 : 1,
          transform: active ? "scale(1.03)" : "scale(1)",
          transition:
            "opacity 400ms ease, transform 400ms ease",
          // respect prefers-reduced-motion via CSS media query override
        }}
        sizes={sizes}
      />

      {/* Spider-Man photo — sits on top, fades in on active */}
      <Image
        src={spiderSrc}
        alt="Spider-Man transformation"
        fill
        draggable={false}
        className="object-cover"
        onError={() => setSpiderError(true)}
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(1.03)",
          transition:
            "opacity 400ms ease, transform 400ms ease",
          pointerEvents: "none",
        }}
        sizes={sizes}
      />

      {/* Hint badge — fades out once activated */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-widest bg-background/80 border border-border px-1.5 py-0.5 backdrop-blur-sm"
        style={{
          opacity: active ? 0 : 0.75,
          transition: "opacity 300ms ease",
          pointerEvents: "none",
        }}
      >
        {/* Spider icon hint */}
        hover me
      </span>
    </div>
  );
}
