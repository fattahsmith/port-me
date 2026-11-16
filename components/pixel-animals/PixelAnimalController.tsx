"use client";

/**
 * PixelAnimalController — v2
 *
 * Upgraded pixel companion:
 *  – Fixed to bottom-right corner of the viewport
 *  – Cursor-look: rotates slightly toward the mouse when nearby (desktop)
 *  – Zzz bubble during sit state
 *  – Interaction counter with playful milestone messages
 *  – Mute toggle (no audio yet, placeholder for future sound effects)
 *  – Minimize / restore button
 *
 * State machine: walking ↔ idle / sitting / jumping / interacting
 * Movement: RAF + direct DOM style — zero per-frame React re-renders.
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

type CatState = "walking" | "idle" | "sitting" | "jumping" | "interacting";
type Direction = 1 | -1; // 1 = right, -1 = left

function getScale(width: number): number {
  if (width < cfg.breakpoints.mobile) return cfg.scale.mobile;
  if (width < cfg.breakpoints.tablet) return cfg.scale.tablet;
  return cfg.scale.desktop;
}

function getSpeed(width: number): number {
  if (width < cfg.breakpoints.mobile) return cfg.walkSpeedMobile;
  return cfg.walkSpeed;
}

function pickRandom<T>(arr: readonly T[], exclude?: T): T {
  const filtered = exclude !== undefined ? arr.filter((v) => v !== exclude) : arr;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

/** Milestone messages for interaction counter */
const MILESTONE_MESSAGES: Record<number, string> = {
  1: "First click! 🎉",
  5: "You clicked 5 times!",
  10: "10 times? You love me! 💕",
  25: "25 clicks... stalker? 👀",
  50: "50 clicks! I'm tired 😴",
  100: "100! You win! 🏆",
};

const SECTION_IDS = ["home", "about", "skills", "projects", "certificates", "github", "contact"];

/** How close (px) the cursor must be to trigger look behavior */
const LOOK_DISTANCE = 180;

export function PixelAnimalController() {
  const reduceMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [catState, setCatState] = useState<CatState>("walking");
  const [bubble, setBubble] = useState<string | null>(null);
  const [showZzz, setShowZzz] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [mobile, setMobile] = useState(false);
  // walkX: position from right edge (not left), so companion stays in corner
  const [walkX, setWalkX] = useState(16);

  // RAF-driven mutable refs
  const charRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<number>(16); // px from right edge
  const dirRef = useRef<Direction>(-1); // start walking left
  const stateRef = useRef<CatState>("walking");
  const speedRef = useRef<number>(cfg.walkSpeed);
  const scaleRef = useRef<number>(cfg.scale.desktop);
  const rafRef = useRef<number>(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zzzTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMsgRef = useRef<string | undefined>(undefined);
  const currentSectionRef = useRef<string>("home");
  const interactionCountRef = useRef<number>(0);
  // Cursor tracking
  const cursorXRef = useRef<number>(-9999);
  const cursorYRef = useRef<number>(-9999);
  const lookAngleRef = useRef<number>(0);

  // ── Responsive setup ─────────────────────────────────────────────────────
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      scaleRef.current = getScale(w);
      speedRef.current = getSpeed(w);
      setMobile(w < cfg.breakpoints.tablet);
    }
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Cursor tracking (desktop only) ───────────────────────────────────────
  useEffect(() => {
    if (mobile) return;
    function onMove(e: MouseEvent) {
      cursorXRef.current = e.clientX;
      cursorYRef.current = e.clientY;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mobile]);

  // ── Section observer ─────────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) currentSectionRef.current = visible.target.id;
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.3 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── Timer helpers ─────────────────────────────────────────────────────────
  const clearTimers = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (stateTimerRef.current) clearTimeout(stateTimerRef.current);
    if (zzzTimerRef.current) clearTimeout(zzzTimerRef.current);
    idleTimerRef.current = null;
    stateTimerRef.current = null;
    zzzTimerRef.current = null;
  }, []);

  const scheduleIdleRef = useRef<() => void>(() => {});

  const enterWalking = useCallback(() => {
    stateRef.current = "walking";
    setCatState("walking");
    setShowZzz(false);
    scheduleIdleRef.current();
  }, []);

  useEffect(() => {
    scheduleIdleRef.current = function scheduleIdle() {
      if (!cfg.idleBehaviorEnabled) return;
      clearTimers();
      const delay =
        cfg.idleMinInterval +
        Math.random() * (cfg.idleMaxInterval - cfg.idleMinInterval);
      idleTimerRef.current = setTimeout(() => {
        if (stateRef.current !== "walking") return;
        const roll = Math.random();
        if (roll < 0.4) {
          stateRef.current = "sitting";
          setCatState("sitting");
          // Show Zzz after a short settle time
          zzzTimerRef.current = setTimeout(() => {
            if (stateRef.current === "sitting") setShowZzz(true);
          }, 800);
          stateTimerRef.current = setTimeout(() => {
            setShowZzz(false);
            enterWalking();
          }, cfg.sitDuration);
        } else if (roll < 0.7) {
          stateRef.current = "idle";
          setCatState("idle");
          stateTimerRef.current = setTimeout(enterWalking, cfg.idleDuration);
        } else {
          stateRef.current = "jumping";
          setCatState("jumping");
          stateTimerRef.current = setTimeout(enterWalking, cfg.jumpDuration);
        }
      }, delay);
    };
  }, [clearTimers, enterWalking]);

  useEffect(() => {
    scheduleIdleRef.current();
    return clearTimers;
  }, [clearTimers]);

  // ── RAF walk + cursor-look loop ───────────────────────────────────────────
  useEffect(() => {
    if (reduceMotion || hidden) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    let lastT = 0;

    function frame(t: number) {
      rafRef.current = requestAnimationFrame(frame);
      if (lastT === 0) { lastT = t; return; }
      const dt = Math.min(t - lastT, 50);
      lastT = t;

      const el = charRef.current;
      if (!el) return;

      const charW = cfg.gridSize * scaleRef.current;
      // max walk distance from right: half the viewport so it stays in corner area
      const maxOffset = Math.min(window.innerWidth * 0.45, 320);

      // ── Movement ──────────────────────────────────────────────────────
      if (stateRef.current === "walking") {
        let x = posRef.current + dirRef.current * speedRef.current * (dt / 16);

        if (x >= maxOffset) {
          x = maxOffset;
          dirRef.current = 1; // turn back toward right
        } else if (x <= 8) {
          x = 8;
          dirRef.current = -1; // walk further left
        }

        posRef.current = x;
      }

      // ── Cursor look (only when idle/walking, desktop) ─────────────────
      let lookTilt = 0;
      if (!mobile) {
        const rect = el.getBoundingClientRect();
        const catCX = rect.left + rect.width / 2;
        const catCY = rect.top + rect.height / 2;
        const dx = cursorXRef.current - catCX;
        const dy = cursorYRef.current - catCY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LOOK_DISTANCE && (stateRef.current === "walking" || stateRef.current === "idle")) {
          // Tilt toward cursor, capped at ±15deg
          const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          lookTilt = Math.max(-15, Math.min(15, rawAngle * 0.3));
        }
        // Smooth toward target
        lookAngleRef.current += (lookTilt - lookAngleRef.current) * 0.08;
      }

      // Apply: position is "right edge offset" so we negate for left anchor
      const rightPx = posRef.current;
      const flipX = dirRef.current === 1 ? -1 : 1; // face direction
      const totalW = window.innerWidth;

      // Position: right-anchored. We place at `right: rightPx`
      // Translate using left-based: left = totalW - rightPx - charW
      const leftPx = totalW - rightPx - charW;
      el.style.transform = `translateX(${leftPx}px) scaleX(${flipX}) rotate(${lookAngleRef.current}deg)`;
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, hidden, mobile]);

  // ── Click / interact handler ───────────────────────────────────────────────
  const handleClick = useCallback(() => {
    if (!cfg.speechEnabled) return;
    if (bubble) return;

    clearTimers();
    stateRef.current = "interacting";
    setCatState("interacting");
    setShowZzz(false);

    const newCount = interactionCountRef.current + 1;
    interactionCountRef.current = newCount;
    setInteractionCount(newCount);

    // Pick message: milestone > section-aware > random
    let msg: string;
    if (MILESTONE_MESSAGES[newCount]) {
      msg = MILESTONE_MESSAGES[newCount];
    } else {
      const sectionMsg =
        cfg.sectionMessages[currentSectionRef.current as keyof typeof cfg.sectionMessages];
      const allMessages = cfg.clickMessages as readonly string[];
      if (sectionMsg && lastMsgRef.current !== sectionMsg) {
        msg = sectionMsg;
      } else {
        msg = pickRandom(allMessages, lastMsgRef.current as (typeof allMessages)[number]);
      }
    }
    lastMsgRef.current = msg;
    setBubble(msg);

    stateTimerRef.current = setTimeout(() => {
      stateRef.current = "walking";
      setCatState("walking");
      scheduleIdleRef.current();
    }, cfg.bubbleDuration + 300);
  }, [bubble, clearTimers]);

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
      clearTimers();
      cancelAnimationFrame(rafRef.current);
    };
  }, [clearTimers]);

  // ── Reduced-motion: static render ─────────────────────────────────────────
  if (reduceMotion) {
    if (hidden) return null;
    return (
      <div className="pixel-animal-root" aria-hidden="true">
        <div
          className="pixel-char"
          style={{ position: "absolute", bottom: 8, right: 16 }}
          role="img"
          aria-label="Pixel cat companion"
        >
          <PixelCatSprite mobile={mobile} />
        </div>
      </div>
    );
  }

  if (!cfg.enabled) return null;

  const stateClass = `cat-${catState}`;

  return (
    <>
      {/* Controls: minimize + interaction counter */}
      <div className="pixel-controls" aria-label="Pixel companion controls">
        {!hidden && interactionCount > 0 && (
          <span
            className="pixel-counter"
            aria-label={`Clicked ${interactionCount} times`}
            title={`You've clicked the cat ${interactionCount} times`}
          >
            ×{interactionCount}
          </span>
        )}
        <button
          className="pixel-hide-btn"
          onClick={() => setHidden((h) => !h)}
          aria-label={hidden ? "Show pixel cat companion" : "Hide pixel cat companion"}
          title={hidden ? "Show pixel cat" : "Hide pixel cat"}
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
            aria-label="Pixel cat companion – click to interact"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            {/* Regular speech bubble */}
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

            <div className="cat-body-wrap" style={{ display: "inline-block" }}>
              <PixelCatSprite mobile={mobile} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
