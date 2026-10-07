"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillCategory } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Code2, Database, Layout, Palette, type LucideIcon } from "lucide-react";

const iconByCategory: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Database,
  uiux: Layout,
  creative: Palette,
};

const accentMap: Record<SkillCategory["accent"], string> = {
  lime: "bg-lime",
  pink: "bg-pink",
  purple: "bg-purple text-white",
  neutral: "bg-surface",
};

type SkillCardProps = {
  category: SkillCategory;
  index: number;
};

export function SkillCard({ category, index }: SkillCardProps) {
  const reduceMotion = useReducedMotion();
  const Icon = iconByCategory[category.id] ?? Code2;

  return (
    <motion.article
      className="theme-transition brutal-border brutal-shadow flex h-full flex-col bg-card p-5 md:p-6"
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center brutal-border",
            accentMap[category.accent]
          )}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold uppercase tracking-tight md:text-xl">
        {category.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
        {category.description}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {category.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border-[2px] border-border bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-wide"
          >
            {tag}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
