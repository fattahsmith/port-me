"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RoleRotatorProps = {
  roles: string[];
  centered?: boolean;
};

export function RoleRotator({ roles, centered }: RoleRotatorProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const longestRole = useMemo(
    () => roles.reduce((a, b) => (a.length >= b.length ? a : b), roles[0] ?? ""),
    [roles]
  );

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [roles.length, reduceMotion]);

  const baseClass = cn(
    "font-mono text-sm uppercase tracking-[0.12em] text-foreground/80 md:text-base",
    centered && "text-center"
  );

  if (reduceMotion) {
    return (
      <p className={`${baseClass} mt-6`}>
        {roles.join(" · ")}
      </p>
    );
  }

  return (
    <div className={`relative mt-6 ${centered ? "mx-auto" : ""}`}>
      <p
        className={`${baseClass} pointer-events-none invisible select-none`}
        aria-hidden
      >
        {longestRole}
      </p>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={roles[index]}
            className={`${baseClass} w-full px-2`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              animate={{ opacity: [1, 0.85, 1] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {roles[index]}
            </motion.span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
