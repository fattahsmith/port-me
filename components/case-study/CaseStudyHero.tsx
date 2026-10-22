"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/data/projects";

type CaseStudyHeroProps = {
  project: Project;
};

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b-[2.5px] border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16/9] overflow-hidden brutal-border brutal-shadow-lg bg-lime/20"
        >
          <Image
            src={project.cover}
            alt={`${project.title} project screenshot`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </motion.div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveDemoUrl && (
            <Button href={project.liveDemoUrl} external variant="lime">
              LIVE DEMO ↗
            </Button>
          )}
          {project.githubUrl && (
            <Button href={project.githubUrl} external variant="dark">
              GITHUB ↗
            </Button>
          )}
          {project.prototypeUrl && (
            <Button href={project.prototypeUrl} external variant="purple">
              PROTOTYPE ↗
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
