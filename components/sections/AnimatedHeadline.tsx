"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { profile } from "@/data/profile";

const helloText = "HELLO WORLD!";
const smithLine = `I'M ${profile.shortName.toUpperCase()}.`;

function StaggeredLine({
  text,
  className,
  delayOffset = 0,
}: {
  text: string;
  className?: string;
  delayOffset?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${text}-${i}-${char}`}
          className="inline-block"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delayOffset + i * 0.025,
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function AnimatedHeadline() {
  const reduceMotion = useReducedMotion();
  const smithDelay = reduceMotion ? 0 : helloText.length * 0.025 + 0.15;

  return (
    <div className="relative mx-auto max-w-5xl text-center">
      {!reduceMotion ? (
        <motion.div
          className="pointer-events-none absolute -right-2 top-0 hidden text-purple md:block lg:-right-6"
          animate={{ y: [0, 8, 0], x: [0, 4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <ArrowDownRight className="h-10 w-10 stroke-[2.5]" />
        </motion.div>
      ) : null}

      <h1 className="text-[clamp(2.75rem,11vw,7.75rem)] font-bold uppercase leading-[0.92] tracking-tight">
        <span className="block text-foreground">
          <StaggeredLine text={helloText} />
        </span>
        <span className="relative mt-1 inline-block text-purple">
          <StaggeredLine
            text={smithLine}
            className="relative z-10"
            delayOffset={smithDelay}
          />
          {!reduceMotion ? (
            <motion.span
              className="absolute -bottom-1 left-0 right-0 mx-auto h-[0.35em] max-w-[95%] bg-lime/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: smithDelay + 0.2,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ originX: 0.5 }}
              aria-hidden
            />
          ) : (
            <span
              className="absolute -bottom-1 left-0 right-0 mx-auto h-[0.35em] max-w-[95%] bg-lime/70"
              aria-hidden
            />
          )}
        </span>
      </h1>
    </div>
  );
}
