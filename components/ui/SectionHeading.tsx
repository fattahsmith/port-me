"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label: string;
  title?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  className,
  align = "left",
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/70">
        {label}
      </p>
      {title ? (
        <h2 className="mt-3 text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
      ) : null}
    </motion.div>
  );
}
