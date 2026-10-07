"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      className={cn(
        "theme-transition brutal-border brutal-shadow group flex flex-col overflow-hidden bg-card",
        featured && "lg:grid lg:grid-cols-2"
      )}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden border-b-[2.5px] border-border bg-lime/30",
          featured && "lg:border-b-0 lg:border-r-[2.5px]"
        )}
      >
        <Image
          src={project.cover}
          alt={`${project.title} cover placeholder`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-purple px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
            {project.category}
          </span>
        </div>
        <h3
          className={cn(
            "mt-3 font-bold uppercase tracking-tight",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}
        >
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border-[2px] border-border px-2 py-0.5 font-mono text-[10px] uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.caseStudyUrl ? (
            <Button href={project.caseStudyUrl} external variant="dark">
              CASE STUDY ↗
            </Button>
          ) : (
            <span className="inline-flex min-h-11 items-center border-[2.5px] border-dashed border-border px-4 font-mono text-[10px] uppercase text-foreground/60">
              Case study coming soon
            </span>
          )}
          {project.liveDemoUrl ? (
            <Button href={project.liveDemoUrl} external variant="lime">
              LIVE DEMO ↗
            </Button>
          ) : (
            <span className="inline-flex min-h-11 items-center bg-pink/40 px-4 font-mono text-[10px] font-bold uppercase tracking-wide">
              DEMO COMING SOON
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
