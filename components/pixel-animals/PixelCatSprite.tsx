/**
 * PixelCatSprite — Pure-CSS pixel art black cat, 16×16 grid scaled to 3x.
 *
 * Technique: a 1×1 element with a box-shadow painting — each pixel is a
 * "shadow" at an offset. No images, no interpolation, always crisp.
 * Scale with CSS transform for responsiveness.
 *
 * The cat uses the portfolio's color palette:
 *   Body:      #111111 (dark) / #1a1a1a (light mode shows same black)
 *   Eyes:      #ffffff with #c7ff4d (lime) highlight
 *   Accessory: #c7ff4d (lime) collar dot OR #7650f5 (purple) depending on theme
 *
 * 16×16 layout (1-indexed x,y):
 *   Ears:   (4,1),(5,1),(12,1),(13,1) — pointy
 *   Head:   rows 2–6
 *   Eyes:   (5,4),(6,4),(11,4),(12,4) — white, with lime glint
 *   Nose:   (8,5) — pink
 *   Body:   rows 7–12
 *   Collar: row 7 partial — lime or purple dot
 *   Legs:   rows 13–15
 *   Tail:   (15,8)(16,7)(16,6) curving right
 */

import React from "react";

/* pixel scale: 3px per "pixel cell" on desktop, 2px on mobile */
const DESKTOP_SCALE = 3;
const MOBILE_SCALE = 2;

type RGB = string; // "r,g,b"

interface Pixel {
  x: number;
  y: number;
  color: RGB;
}

/* Colors */
const C = {
  black: "17,17,17",
  blackSoft: "30,30,30",
  white: "255,255,255",
  lime: "199,255,77",
  purple: "118,80,245",
  pink: "255,127,163",
  gray: "80,80,80",
  eyeWhite: "240,240,240",
  blueGray: "150,160,180",
} as const;

/* Full 16×16 cat pixel map */
const CAT_PIXELS: Pixel[] = [
  // ── ears ──
  { x: 4, y: 1, color: C.black },
  { x: 5, y: 1, color: C.black },
  { x: 6, y: 2, color: C.black },
  { x: 11, y: 2, color: C.black },
  { x: 12, y: 1, color: C.black },
  { x: 13, y: 1, color: C.black },
  { x: 5, y: 2, color: C.black },
  { x: 12, y: 2, color: C.black },

  // ── head outline ──
  { x: 4, y: 2, color: C.black },
  { x: 3, y: 3, color: C.black },
  { x: 2, y: 4, color: C.black },
  { x: 2, y: 5, color: C.black },
  { x: 2, y: 6, color: C.black },
  { x: 3, y: 7, color: C.black },
  { x: 14, y: 2, color: C.black },
  { x: 15, y: 3, color: C.black },
  { x: 15, y: 4, color: C.black },
  { x: 15, y: 5, color: C.black },
  { x: 15, y: 6, color: C.black },
  { x: 14, y: 7, color: C.black },

  // ── head fill ──
  ...((): Pixel[] => {
    const rows: [number, number, number][] = [
      [3, 3, 14],
      [2, 4, 15],
      [2, 5, 15],
      [2, 6, 15],
      [3, 7, 14],
    ];
    const pixels: Pixel[] = [];
    for (const [y, x1, x2] of rows) {
      for (let x = x1; x <= x2; x++) {
        pixels.push({ x, y: y, color: C.black });
      }
    }
    return pixels;
  })(),

  // ── eyes (white sclera) ──
  { x: 5, y: 4, color: C.eyeWhite },
  { x: 6, y: 4, color: C.eyeWhite },
  { x: 11, y: 4, color: C.eyeWhite },
  { x: 12, y: 4, color: C.eyeWhite },
  { x: 5, y: 5, color: C.eyeWhite },
  { x: 6, y: 5, color: C.eyeWhite },
  { x: 11, y: 5, color: C.eyeWhite },
  { x: 12, y: 5, color: C.eyeWhite },

  // ── pupils (black) ──
  { x: 6, y: 5, color: C.black },
  { x: 11, y: 5, color: C.black },

  // ── lime glint ──
  { x: 5, y: 4, color: C.lime },
  { x: 11, y: 4, color: C.lime },

  // ── nose ──
  { x: 8, y: 6, color: C.pink },
  { x: 9, y: 6, color: C.pink },

  // ── whiskers (gray) ──
  { x: 2, y: 5, color: C.gray },
  { x: 1, y: 5, color: C.gray },
  { x: 15, y: 5, color: C.gray },
  { x: 16, y: 5, color: C.gray },

  // ── body ──
  ...((): Pixel[] => {
    const rows: [number, number, number][] = [
      [8, 4, 13],
      [9, 3, 14],
      [10, 3, 14],
      [11, 4, 13],
      [12, 5, 12],
    ];
    const pixels: Pixel[] = [];
    for (const [y, x1, x2] of rows) {
      for (let x = x1; x <= x2; x++) {
        pixels.push({ x, y, color: C.black });
      }
    }
    return pixels;
  })(),

  // ── lime collar dot ──
  { x: 7, y: 8, color: C.lime },
  { x: 8, y: 8, color: C.lime },
  { x: 9, y: 8, color: C.lime },

  // ── legs ──
  { x: 5, y: 13, color: C.black },
  { x: 6, y: 13, color: C.black },
  { x: 7, y: 13, color: C.black },
  { x: 5, y: 14, color: C.black },
  { x: 6, y: 14, color: C.black },
  { x: 7, y: 14, color: C.black },
  { x: 5, y: 15, color: C.black },
  { x: 6, y: 15, color: C.black },
  { x: 10, y: 13, color: C.black },
  { x: 11, y: 13, color: C.black },
  { x: 12, y: 13, color: C.black },
  { x: 10, y: 14, color: C.black },
  { x: 11, y: 14, color: C.black },
  { x: 12, y: 14, color: C.black },
  { x: 11, y: 15, color: C.black },
  { x: 12, y: 15, color: C.black },

  // ── tail (curls right) ──
  { x: 14, y: 12, color: C.black },
  { x: 15, y: 11, color: C.black },
  { x: 16, y: 10, color: C.black },
  { x: 16, y: 9, color: C.black },
  { x: 15, y: 9, color: C.black },
  { x: 15, y: 10, color: C.black },
];

/* Build the box-shadow string */
function buildBoxShadow(pixels: Pixel[], scale: number): string {
  const seen = new Set<string>();
  const parts: string[] = [];
  for (const p of pixels) {
    const key = `${p.x},${p.y}`;
    if (seen.has(key)) continue; // last write wins via order — just skip dups
    seen.add(key);
    const ox = (p.x - 1) * scale;
    const oy = (p.y - 1) * scale;
    parts.push(`${ox}px ${oy}px 0 ${scale - 1}px rgb(${p.color})`);
  }
  return parts.join(",");
}

interface PixelCatSpriteProps {
  mobile?: boolean;
  /** blink = momentarily squish eyes */
  blinking?: boolean;
}

export function PixelCatSprite({ mobile = false }: PixelCatSpriteProps) {
  const scale = mobile ? MOBILE_SCALE : DESKTOP_SCALE;
  const gridW = 16 * scale;
  const gridH = 16 * scale;

  /* Filter out duplicate-keyed pixels keeping last occurrence */
  const pixelMap = new Map<string, Pixel>();
  for (const p of CAT_PIXELS) {
    pixelMap.set(`${p.x},${p.y}`, p);
  }
  const deduped = Array.from(pixelMap.values());

  const boxShadow = buildBoxShadow(deduped, scale);

  return (
    <span
      aria-hidden="true"
      style={{
        display: "block",
        width: gridW,
        height: gridH,
        position: "relative",
        imageRendering: "pixelated",
      }}
    >
      {/* Single 1×1 element painted by box-shadow */}
      <span
        style={{
          display: "block",
          width: scale,
          height: scale,
          position: "absolute",
          top: 0,
          left: 0,
          boxShadow,
          imageRendering: "pixelated",
        }}
      />
    </span>
  );
}
