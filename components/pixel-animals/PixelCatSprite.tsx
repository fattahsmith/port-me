/**
 * PixelCatSprite — Pure-CSS box-shadow pixel art black cat.
 *
 * Renders different pixel layouts based on the `state` prop:
 *   default / idle / walking / jumping / sitting / sleeping / reacting → standard pose
 *   waving → right arm raised pixel variant
 *
 * No images, no interpolation, always crisp.
 * Scale: 3px per cell desktop, 2px mobile.
 */

import React from "react";

type SpriteState =
  | "idle"
  | "walking"
  | "sitting"
  | "sleeping"
  | "jumping"
  | "waving"
  | "reacting"
  | undefined;

const DESKTOP_SCALE = 3;
const MOBILE_SCALE = 2;

type RGB = string;

interface Pixel {
  x: number;
  y: number;
  color: RGB;
}

const C = {
  black: "17,17,17",
  white: "255,255,255",
  lime: "199,255,77",
  purple: "118,80,245",
  pink: "255,127,163",
  gray: "80,80,80",
  eyeWhite: "240,240,240",
} as const;

// ── Shared head + ears + eyes + nose ──────────────────────────────────────
const HEAD_PIXELS: Pixel[] = [
  // ears
  { x: 4, y: 1, color: C.black }, { x: 5, y: 1, color: C.black },
  { x: 12, y: 1, color: C.black }, { x: 13, y: 1, color: C.black },
  { x: 5, y: 2, color: C.black }, { x: 6, y: 2, color: C.black },
  { x: 11, y: 2, color: C.black }, { x: 12, y: 2, color: C.black },
  // head fill rows 3-7
  ...(() => {
    const rows: [number, number, number][] = [
      [3, 3, 14], [4, 2, 15], [5, 2, 15], [6, 2, 15], [7, 3, 14],
    ];
    const px: Pixel[] = [];
    for (const [y, x1, x2] of rows)
      for (let x = x1; x <= x2; x++) px.push({ x, y, color: C.black });
    return px;
  })(),
  // eyes
  { x: 5, y: 4, color: C.lime },   { x: 6, y: 4, color: C.eyeWhite },
  { x: 11, y: 4, color: C.lime },  { x: 12, y: 4, color: C.eyeWhite },
  { x: 5, y: 5, color: C.eyeWhite },{ x: 6, y: 5, color: C.black },
  { x: 11, y: 5, color: C.eyeWhite },{ x: 12, y: 5, color: C.black },
  // nose
  { x: 8, y: 6, color: C.pink }, { x: 9, y: 6, color: C.pink },
  // whiskers
  { x: 2, y: 5, color: C.gray }, { x: 1, y: 5, color: C.gray },
  { x: 15, y: 5, color: C.gray }, { x: 16, y: 5, color: C.gray },
];

// ── Standard body ──────────────────────────────────────────────────────────
const BODY_PIXELS: Pixel[] = [
  ...(() => {
    const rows: [number, number, number][] = [
      [8, 4, 13], [9, 3, 14], [10, 3, 14], [11, 4, 13], [12, 5, 12],
    ];
    const px: Pixel[] = [];
    for (const [y, x1, x2] of rows)
      for (let x = x1; x <= x2; x++) px.push({ x, y, color: C.black });
    return px;
  })(),
  // collar
  { x: 7, y: 8, color: C.lime },
  { x: 8, y: 8, color: C.lime },
  { x: 9, y: 8, color: C.lime },
  // legs
  { x: 5, y: 13, color: C.black }, { x: 6, y: 13, color: C.black }, { x: 7, y: 13, color: C.black },
  { x: 5, y: 14, color: C.black }, { x: 6, y: 14, color: C.black }, { x: 7, y: 14, color: C.black },
  { x: 5, y: 15, color: C.black }, { x: 6, y: 15, color: C.black },
  { x: 10, y: 13, color: C.black }, { x: 11, y: 13, color: C.black }, { x: 12, y: 13, color: C.black },
  { x: 10, y: 14, color: C.black }, { x: 11, y: 14, color: C.black }, { x: 12, y: 14, color: C.black },
  { x: 11, y: 15, color: C.black }, { x: 12, y: 15, color: C.black },
  // tail
  { x: 14, y: 12, color: C.black }, { x: 15, y: 11, color: C.black },
  { x: 16, y: 10, color: C.black }, { x: 16, y: 9, color: C.black },
  { x: 15, y: 9, color: C.black },  { x: 15, y: 10, color: C.black },
];

// ── Waving arm overlay (raises right arm up) ───────────────────────────────
const WAVE_ARM_PIXELS: Pixel[] = [
  // remove normal right-side arm from body and add raised arm
  { x: 13, y: 9, color: C.black },
  { x: 14, y: 8, color: C.black },
  { x: 14, y: 7, color: C.black },
  { x: 15, y: 7, color: C.black },
  { x: 15, y: 6, color: C.black },
  // paw at top
  { x: 15, y: 5, color: C.black },
  { x: 16, y: 6, color: C.black },
];

function buildPixels(state: SpriteState): Pixel[] {
  const base = [...HEAD_PIXELS, ...BODY_PIXELS];
  if (state === "waving") {
    return [...base, ...WAVE_ARM_PIXELS];
  }
  return base;
}

function buildBoxShadow(pixels: Pixel[], scale: number): string {
  const map = new Map<string, Pixel>();
  for (const p of pixels) map.set(`${p.x},${p.y}`, p); // last write wins
  const parts: string[] = [];
  for (const p of map.values()) {
    const ox = (p.x - 1) * scale;
    const oy = (p.y - 1) * scale;
    parts.push(`${ox}px ${oy}px 0 ${scale - 1}px rgb(${p.color})`);
  }
  return parts.join(",");
}

interface PixelCatSpriteProps {
  mobile?: boolean;
  state?: SpriteState;
}

export function PixelCatSprite({ mobile = false, state }: PixelCatSpriteProps) {
  const scale = mobile ? MOBILE_SCALE : DESKTOP_SCALE;
  const gridW = 16 * scale;
  const gridH = 16 * scale;
  const pixels = buildPixels(state);
  const boxShadow = buildBoxShadow(pixels, scale);

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
