"use client";

/**
 * PixelAnimalController
 *
 * Drives a pixel cat that walks along the bottom of the viewport.
 * State machine: WALKING ↔ IDLE / SITTING / JUMPING / INTERACTING
 *
 * Movement: requestAnimationFrame + direct DOM transform = no per-frame renders.
 * React state is only updated on state transitions and responsive breakpoints.
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

const SECTION_IDS = ["home", "about", "skills", "projects", "certificates", "github", "contact"];

export function PixelAnimalController() {
  const reduceMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [catState, setCatState] = useState<CatState>("walking");
  const [direction, setDirection] = useState<Direction>(1);
  const [bubble, setBubble] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  // RAF-driven mutable refs (no re-renders per frame)
  const charRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<number>(60);
  const dirRef = useRef<Direction>(1);
  const stateRef = useRef<CatState>("walking");
  const speedRef = useRef<number>(cfg.walkSpeed);
  const scaleRef = useRef<number>(cfg.scale.desktop);
  const rafRef = useRef<number>(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMsgRef = useRef<string | undefined>(undefined);
  const currentSectionRef = useRef<string>("home");

  // ── Responsive setup ────────────────────────────────────────────────────
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

  // ── Section observer ────────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          currentSectionRef.current = visible.target.id;
        }
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.3 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── Timer helpers (stable, no deps) ─────────────────────────────────────
  const clearTimers = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (stateTimerRef.current) clearTimeout(stateTimerRef.current);
    idleTimerRef.current = null;
    stateTimerRef.current = null;
  }, []);

  // ── scheduleIdle — defined before enterWalking so no forward reference ──
  // We use a ref to hold the schedule function to break the circular dep.
  const scheduleIdleRef = useRef<() => void>(() => {});

  const enterWalking = useCallback(() => {
    stateRef.current = "walking";
    setCatState("walking");
    scheduleIdleRef.current();
  }, []);

  // Set up the scheduleIdle function and store in ref
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
          stateTimerRef.current = setTimeout(enterWalking, cfg.sitDuration);
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

  // Bootstrap on mount
  useEffect(() => {
    scheduleIdleRef.current();
    return clearTimers;
  }, [clearTimers]);

  // ── RAF walk loop ────────────────────────────────────────────────────────
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

      if (stateRef.current !== "walking") return;

      const el = charRef.current;
      if (!el) return;

      const charW = cfg.gridSize * scaleRef.current;
      const maxX = window.innerWidth - charW - 8;

      let x = posRef.current + dirRef.current * speedRef.current * (dt / 16);

      if (x >= maxX) {
        x = maxX;
        dirRef.current = -1;
        setDirection(-1);
      } else if (x <= 8) {
        x = 8;
        dirRef.current = 1;
        setDirection(1);
      }

      posRef.current = x;
      el.style.transform = `translateX(${x}px) scaleX(${dirRef.current})`;
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, hidden]);

  // Sync direction state → ref (only needed for the initial transform)
  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  // ── Click / interact handler ─────────────────────────────────────────────
  const handleClick = useCallback(() => {
    if (!cfg.speechEnabled) return;
    if (bubble) return;

    clearTimers();
    stateRef.current = "interacting";
    setCatState("interacting");

    const sectionMsg =
      cfg.sectionMessages[currentSectionRef.current as keyof typeof cfg.sectionMessages];
    const allMessages = cfg.clickMessages as readonly string[];

    let msg: string;
    if (sectionMsg && lastMsgRef.current !== sectionMsg) {
      msg = sectionMsg;
    } else {
      msg = pickRandom(allMessages, lastMsgRef.current as (typeof allMessages)[number]);
    }
    lastMsgRef.current = msg;
    setBubble(msg);

    stateTimerRef.current = setTimeout(() => {
      stateRef.current = "walking";
      setCatState("walking");
      scheduleIdleRef.current();
    }, cfg.bubbleDuration + 300);
  }, [bubble, clearTimers]);

  const handleBubbleDismiss = useCallback(() => {
    setBubble(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  // ── Cleanup ──────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      clearTimers();
      cancelAnimationFrame(rafRef.current);
    };
  }, [clearTimers]);

  // ── Reduced motion: static render ────────────────────────────────────────
  if (reduceMotion) {
    if (hidden) return null;
    return (
      <div className="pixel-animal-root" aria-hidden="true">
        <div
          style={{ position: "absolute", bottom: 8, left: 60 }}
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
      <button
        className="pixel-hide-btn"
        onClick={() => setHidden((h) => !h)}
        aria-label={hidden ? "Show pixel cat companion" : "Hide pixel cat companion"}
        title={hidden ? "Show pixel cat" : "Hide pixel cat"}
      >
        {hidden ? "🐱" : "×"}
      </button>

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
            {bubble && (
              <PixelSpeechBubble
                message={bubble}
                onDismiss={handleBubbleDismiss}
                duration={cfg.bubbleDuration}
              />
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
