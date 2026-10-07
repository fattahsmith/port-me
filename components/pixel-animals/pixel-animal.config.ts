/**
 * Pixel Animal Configuration
 * Central config — move to CMS/dashboard settings when available.
 */

export const pixelAnimalConfig = {
  /** Master enable/disable */
  enabled: true,

  /** Walking speed: pixels per frame at 60fps */
  walkSpeed: 1.2,

  /** Walking speed on mobile */
  walkSpeedMobile: 0.8,

  /** Character size in "grid pixels" (1 grid pixel = SCALE px) */
  gridSize: 16,

  /** Scale multiplier per platform */
  scale: {
    desktop: 3,
    tablet: 2,
    mobile: 2,
  },

  /** Breakpoints */
  breakpoints: {
    tablet: 768,
    mobile: 480,
  },

  /** Minimum idle interval (ms) before next idle event */
  idleMinInterval: 6000,
  /** Maximum idle interval (ms) */
  idleMaxInterval: 14000,

  /** Duration of sitting state (ms) */
  sitDuration: 2800,

  /** Duration of idle state (ms) */
  idleDuration: 2200,

  /** Duration of jump state (ms) */
  jumpDuration: 650,

  /** Speech bubble auto-dismiss (ms) */
  bubbleDuration: 3200,

  /** Enable speech bubbles */
  speechEnabled: true,

  /** Enable random idle behaviors */
  idleBehaviorEnabled: true,

  /** Section-aware messages */
  sectionMessages: {
    home: "Welcome to my portfolio! 👋",
    about: "A little about me!",
    skills: "Built with code & creativity!",
    projects: "Check out my work! ✨",
    certificates: "Always learning!",
    github: "Open source rocks!",
    contact: "Let's connect! 💬",
  } as Record<string, string>,

  /** Random messages for click interactions */
  clickMessages: [
    "Hey, welcome! 👋",
    "Keep exploring!",
    "Check out my projects!",
    "Thanks for visiting! ✨",
    "Let's build something cool!",
    "404? Not here!",
    "Meow~ 🐱",
    "Nice to meet you!",
    "You found me! 🎉",
    "Curiosity didn't kill this cat!",
  ] as const,
} as const;

export type PixelAnimalConfig = typeof pixelAnimalConfig;
