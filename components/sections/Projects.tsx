"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  projectFilters,
  projects,
  viewAllProjectsUrl,
  type ProjectFilter,
} from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("ALL PROJECTS");

  const featured = projects.find((p) => p.featured);

  const filtered = useMemo(() => {
    const rest = projects.filter((p) => !p.featured);
    if (filter === "ALL PROJECTS") return rest;
    return rest.filter((p) => p.category === filter);
  }, [filter]);

  const showFeatured = filter === "ALL PROJECTS" && featured;

  return (
    <section
      id="projects"
      className="scroll-mt-[5.5rem] border-b-[2.5px] border-border bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading label="03 / SELECTED WORK" title="Projects" />

        <div className="mb-10 flex flex-wrap gap-2">
          {projectFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cn(
                "min-h-11 border-[2.5px] border-border px-4 font-mono text-[10px] font-bold uppercase tracking-wide transition-all focus-brutal",
                filter === item
                  ? "bg-purple text-white brutal-shadow-sm"
                  : "bg-background hover:bg-lime/50"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {showFeatured && featured ? (
              <ProjectCard key={featured.id} project={featured} featured />
            ) : null}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key={filter}
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="brutal-border brutal-shadow bg-lime/20 p-10 text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-mono text-sm uppercase tracking-widest">
                  No projects in this category yet.
                </p>
                <p className="mt-2 text-sm text-foreground/70">
                  Add entries in data/projects.ts or switch filters.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {viewAllProjectsUrl ? (
          <div className="mt-10">
            <Button href={viewAllProjectsUrl} external variant="outline">
              VIEW ALL PROJECTS ↗
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
