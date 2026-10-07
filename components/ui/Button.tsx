"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "lime" | "purple" | "pink" | "outline" | "dark" | "card";

const variants: Record<Variant, string> = {
  lime: "bg-lime text-foreground hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--shadow)]",
  purple: "bg-purple text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--shadow)]",
  pink: "bg-pink text-foreground hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--shadow)]",
  outline:
    "bg-background text-foreground hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--shadow)]",
  card:
    "bg-card text-foreground hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--shadow)]",
  dark: "bg-foreground text-background hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--shadow)]",
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
};

export function Button({
  children,
  variant = "outline",
  className,
  href,
  onClick,
  external,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const base = cn(
    "theme-transition inline-flex min-h-11 items-center justify-center gap-2 border-[2.5px] border-border px-5 py-2.5 text-xs font-bold uppercase tracking-wider brutal-shadow-sm transition-transform focus-brutal",
    variants[variant],
    className
  );

  const motionProps = reduceMotion ? {} : { whileTap: { scale: 0.98 } };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          aria-label={ariaLabel}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link
          href={href}
          className={base}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={base}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
