"use client";

/**
 * PixelAnimalController — v3
 *
 * Full-featured interactive pixel companion.
 *
 * States: idle | walking | sitting | sleeping | jumping | waving | reacting
 *
 * Features:
 *  - Walks horizontally along the bottom, bounces at viewport edges
 *  - Idle breathing + blink; random idle variations
 *  - Sits → sleeps (Zzz bubble) → wakes → walks
 *  - Jumps + lands on click
 *  - Waves on random events
 *  - Looks toward cursor when nearby (desktop)
 *  - Speech bubbles on click / random events
 *  - Interaction counter with milestone messages
 *  - Random event scheduler (wave, jump, message, sit)
 *  - Pauses when browser tab is hidden (Page Visibility API)
 *  - Minimize/restore button
 *  - Respects prefers-reduced-motion
 *  - Zero per-frame React re-renders (RAF + direct DOM style)
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import { pixelAnimalConfig as cfg } from "./pixel-animal.config";
import { PixelCatSprite } from "./PixelCatSprite";
import { PixelSpeechBubble } from "./PixelSpeechBubble";
import "./pixel-animal.css";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type CatState =
  | "idle"
  | "walking"
  | "sitting"
  | "sleeping"
  | "jumping"
  | "waving"
  | "reacting";

type Direction = 1 | -1; // 1 = right, -1 = left

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pickRandom<T>(arr: readonly T[], exclude?: T): T {
  const pool = exclude !== undefined ? arr.filter((v) => v !== exclude) : [...arr];
  return pool[Math.floor(Math.random() * pool.length)];
}

function getScale(w: number): number {
  if (w < cfg.breakpoints.mobile) return cfg.scale.mobile;
  if (w < cfg.breakpoints.tablet) return cfg.scale.tablet;
  return cfg.scale.desktop;
}

function getSpeed(w: number): number {
  return w < cfg.breakpoints.mobile ? cfg.walkSpeedMobile : cfg.walkSpeed;
}

// ─────────────────────────────────────────────────────────────────────────────
// Messages
// ─────────────────────────────────────────────────────────────────────────────

const CLICK_MESSAGES = [
  "Hey there! 👋",
  "Welcome to my portfolio!",
  "Keep exploring!",
  "Need some help?",
  "Let's build something cool!",
  "Have a nice day! ☀️",
  "Thanks for visiting! ✨",
  "You found me! 🎉",
  "Meow~ 🐱",
  "Curiosity didn't kill this cat!",
  "404? Not here!",
] as const;

const RANDOM_MESSAGES = [
  "Still here! 👀",
  "Nice portfolio, right?",
  "Check out my projects!",
  "Scroll down for more!",
  "Built with ❤️ and ☕",
  "Open to collaborations!",
] as const;

const MILESTONE_MESSAGES: Record<number, string> = {
  3: "You love clicking! 😸",
  10: "10 times! You really like me!",
  25: "25 clicks... 👀",
  50: "50! You win a pixel cookie 🍪",
};

const SECTION_IDS = [
  "home", "about", "skills", "projects",
  "certificates", "github", "contact",
];

const SECTION_MESSAGES: Record<string, string> = {
  home: "Welcome to my portfolio! 👋",
  about: "A little about me!",
  skills: "Built with code & creativity!",
  projects: "Check out my work! ✨",
  certificates: "Always learning!",
  github: "Open source rocks!",
  contact: "Let's connect! 💬",
};

/** How close (px) the cursor must be to trigger look-toward behavior */
const LOOK_RADIUS = 200;
/** Max walk offset from the right edge of the viewport */
const MAX_WALK_RIGHT_OFFSET = 24;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function PixelAnimalController() {
  const reduceMotion = useReducedMotion();

  // ── React state (only updated on transitions, not per-frame) ─────────────
  const [hidden, setHidden] = useState(false);
  const [catState, setCatState] = useState<CatState>("walking");
  const [isMobile, setIsMobile] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [showZzz, setShowZzz] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  // ── RAF / DOM refs (mutated without triggering re-renders) ────────────────
  const charRef = useRef<HTMLDivElement>(null);

  /** X position from left edge (px) */
  const posXRef = useRef<number>(120);
  /** Current walk direction */
  const dirRef = useRef<Direction>(1);
  const stateRef = useRef<CatState>("walking");
  const speedRef = useRef<number>(cfg.walkSpeed);
  const scaleRef = useRef<number>(cfg.scale.desktop);
  const rafRef = useRef<number>(0);
  const pageVisibleRef = useRef<boolean>(true);

  /** Smooth look-toward angle (deg), interpolated each frame */
  const lookAngleRef = useRef<number>(0);
  const cursorXRef = useRef<number>(-9999);
  const cursorYRef = useRef<number>(-9999);

  /** Counts clicks for milestone messages */
  const clickCountRef = useRef<number>(0);
  const lastMsgRef = useRef<string | undefined>(undefined);
  const currentSectionRef = useRef<string>("home");

  // All timers in one registry for safe cleanup
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function addTimer(fn: () => void, delay: number) {
    const t = setTimeout(fn, delay);
    timers.current.push(t);
    return t;
  }

  function clearAllTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  // ── Responsive ────────────────────────────────────────────────────────────
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      scaleRef.current = getScale(w);
      speedRef.current = getSpeed(w);
      setIsMobile(w < cfg.breakpoints.tablet);
    }
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Page visibility — pause when tab is hidden ────────────────────────────
  useEffect(() => {
    function onVisibility() {
      pageVisibleRef.current = document.visibilityState === "visible";
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // ── Cursor tracking (desktop only) ───────────────────────────────────────
  useEffect(() => {
    function onMove(e: MouseEvent) {
      cursorXRef.current = e.clientX;
      cursorYRef.current = e.clientY;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Section intersection observer ─────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best?.target.id) currentSectionRef.current = best.target.id;
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.3 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // State machine — forward declarations via refs to avoid circular deps
  // ─────────────────────────────────────────────────────────────────────────

  const enterWalkingRef = useRef<() => void>(() => {});
  const scheduleIdleRef = useRef<() => void>(() => {});
  const scheduleRandomEventRef = useRef<() => void>(() => {});
  const showBubbleRef = useRef<(msg: string, returnDelay?: number) => void>(() => {});

  // ── show bubble, then return to walking after returnDelay ─────────────────
  useEffect(() => {
    showBubbleRef.current = (msg: string, returnDelay = cfg.bubbleDuration + 400) => {
      lastMsgRef.current = msg;
      setBubble(msg);
      addTimer(() => {
        enterWalkingRef.current();
      }, returnDelay);
    };
  });

  // ── Enter walking ─────────────────────────────────────────────────────────
  useEffect(() => {
    enterWalkingRef.current = () => {
      clearAllTimers();
      stateRef.current = "walking";
      setCatState("walking");
      setShowZzz(false);
      setBubble(null);
      scheduleIdleRef.current();
      scheduleRandomEventRef.current();
    };
  });

  // ── Schedule next random idle event ──────────────────────────────────────
  useEffect(() => {
    scheduleIdleRef.current = () => {
      if (!cfg.idleBehaviorEnabled) return;
      const delay = rand(cfg.idleMinInterval, cfg.idleMaxInterval);
      addTimer(() => {
        if (stateRef.current !== "walking") return;
        const roll = Math.random();

        if (roll < 0.25) {
          // Sit → sleep → wake
          stateRef.current = "sitting";
          setCatState("sitting");
          addTimer(() => {
            if (stateRef.current !== "sitting") return;
            stateRef.current = "sleeping";
            setCatState("sleeping");
            setShowZzz(true);
            addTimer(() => {
              setShowZzz(false);
              enterWalkingRef.current();
            }, cfg.sitDuration);
          }, 600);
        } else if (roll < 0.5) {
          // Plain idle
          stateRef.current = "idle";
          setCatState("idle");
          addTimer(() => enterWalkingRef.current(), cfg.idleDuration);
        } else if (roll < 0.7) {
          // Wave
          stateRef.current = "waving";
          setCatState("waving");
          addTimer(() => enterWalkingRef.current(), 1800);
        } else {
          // Jump
          stateRef.current = "jumping";
          setCatState("jumping");
          addTimer(() => enterWalkingRef.current(), cfg.jumpDuration);
        }
      }, delay);
    };
  });

  // ── Schedule random unprompted events (separate cadence) ─────────────────
  useEffect(() => {
    scheduleRandomEventRef.current = () => {
      const delay = rand(18000, 35000); // every 18–35s
      addTimer(() => {
        if (stateRef.current !== "walking") {
          scheduleRandomEventRef.current();
          return;
        }
        const roll = Math.random();
        if (roll < 0.4) {
          // Random message
          stateRef.current = "reacting";
          setCatState("reacting");
          const msg = pickRandom(RANDOM_MESSAGES, lastMsgRef.current as (typeof RANDOM_MESSAGES)[number]);
          showBubbleRef.current(msg);
        } else if (roll < 0.65) {
          // Spontaneous wave
          stateRef.current = "waving";
          setCatState("waving");
          addTimer(() => {
            enterWalkingRef.current();
            scheduleRandomEventRef.current();
          }, 1800);
        } else {
          // Spontaneous jump
          stateRef.current = "jumping";
          setCatState("jumping");
          addTimer(() => {
            enterWalkingRef.current();
            scheduleRandomEventRef.current();
          }, cfg.jumpDuration);
        }
      }, delay);
    };
  });

  // ── Bootstrap on mount ────────────────────────────────────────────────────
  useEffect(() => {
    scheduleIdleRef.current();
    scheduleRandomEventRef.current();
    return clearAllTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── RAF walk + cursor-look loop ───────────────────────────────────────────
  useEffect(() => {
    if (reduceMotion || hidden) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    let lastT = 0;

    function frame(t: number) {
      rafRef.current = requestAnimationFrame(frame);
      if (!pageVisibleRef.current) { lastT = 0; return; }
      if (lastT === 0) { lastT = t; return; }
      const dt = Math.min(t - lastT, 50);
      lastT = t;

      const el = charRef.current;
      if (!el) return;

      const charW = cfg.gridSize * scaleRef.current;
      const vw = window.innerWidth;
      const maxX = vw - charW - MAX_WALK_RIGHT_OFFSET;

      // ── Walk movement ───────────────────────────────────────────────────
      if (stateRef.current === "walking") {
        let x = posXRef.current + dirRef.current * speedRef.current * (dt / 16);
        if (x >= maxX) { x = maxX; dirRef.current = -1; }
        else if (x <= 8) { x = 8; dirRef.current = 1; }
        posXRef.current = x;
      }

      // ── Cursor look (desktop) ───────────────────────────────────────────
      let targetAngle = 0;
      const isLookableState = stateRef.current === "walking" || stateRef.current === "idle";
      if (!isMobile && isLookableState) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cursorXRef.current - cx;
        const dy = cursorYRef.current - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LOOK_RADIUS) {
          const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          targetAngle = Math.max(-18, Math.min(18, rawAngle * 0.3));
        }
      }
      lookAngleRef.current += (targetAngle - lookAngleRef.current) * 0.07;

      // ── Apply transform ─────────────────────────────────────────────────
      const flipX = dirRef.current; // 1 = face right, -1 = face left
      el.style.transform =
        `translateX(${posXRef.current}px) scaleX(${flipX}) rotate(${lookAngleRef.current}deg)`;
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, hidden, isMobile]);

  // ── Click / interact handler ───────────────────────────────────────────────
  const handleClick = useCallback(() => {
    if (!cfg.speechEnabled) return;
    clearAllTimers();

    const count = clickCountRef.current + 1;
    clickCountRef.current = count;
    setInteractionCount(count);

    // Pick a reaction
    const roll = Math.random();
    let newState: CatState = "reacting";
    if (roll < 0.3) newState = "jumping";
    else if (roll < 0.55) newState = "waving";

    stateRef.current = newState;
    setCatState(newState);
    setShowZzz(false);

    // Pick message: milestone > section-aware > click pool
    let msg: string;
    if (MILESTONE_MESSAGES[count]) {
      msg = MILESTONE_MESSAGES[count];
    } else {
      const sectionMsg = SECTION_MESSAGES[currentSectionRef.current];
      const pool = CLICK_MESSAGES as readonly string[];
      if (sectionMsg && lastMsgRef.current !== sectionMsg) {
        msg = sectionMsg;
      } else {
        msg = pickRandom(pool, lastMsgRef.current);
      }
    }

    showBubbleRef.current(msg, cfg.bubbleDuration + 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBubbleDismiss = useCallback(() => setBubble(null), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  // ── Cleanup ────────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      clearAllTimers();
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  if (!cfg.enabled) return null;

  // Reduced-motion: static character, no movement
  if (reduceMotion) {
    return hidden ? null : (
      <div className="pixel-animal-root" aria-hidden="true">
        <div
          className="pixel-char"
          style={{ position: "absolute", bottom: 8, right: 24 }}
          role="img"
          aria-label="Pixel cat companion"
        >
          <PixelCatSprite mobile={isMobile} state="idle" />
        </div>
      </div>
    );
  }

  const stateClass = `cat-${catState}`;

  return (
    <>
      {/* Controls */}
      <div className="pixel-controls">
        {!hidden && interactionCount > 0 && (
          <span className="pixel-counter" aria-label={`Clicked ${interactionCount} times`}>
            ×{interactionCount}
          </span>
        )}
        <button
          className="pixel-hide-btn"
          onClick={() => setHidden((h) => !h)}
          aria-label={hidden ? "Show pixel companion" : "Hide pixel companion"}
        >
          {hidden ? "🐱" : "×"}
        </button>
      </div>

      {!hidden && (
        <div className="pixel-animal-root" aria-hidden="true">
          <div
            ref={charRef}
            className={`pixel-char ${stateClass}`}
            role="button"
            tabIndex={0}
            aria-label="Pixel cat – click to interact"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            {/* Speech bubble */}
            {bubble && (
              <PixelSpeechBubble
                message={bubble}
                onDismiss={handleBubbleDismiss}
                duration={cfg.bubbleDuration}
              />
            )}

            {/* Zzz sleeping bubble */}
            {showZzz && !bubble && (
              <div className="pixel-zzz" aria-hidden="true">
                <span>z</span><span>z</span><span>Z</span>
              </div>
            )}

            <div className="cat-body-wrap">
              <PixelCatSprite mobile={isMobile} state={catState} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
