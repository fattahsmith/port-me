import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import type { Project } from "@/data/projects";

type CaseStudyHeaderProps = {
  project: Project;
};

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  return (
    <header className="border-b-[2.5px] border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-foreground/60"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-foreground focus-brutal"
          >
            <Home className="h-3 w-3" />
            Home
          </Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-foreground focus-brutal">
            Projects
          </Link>
          <span>/</span>
          <span className="text-foreground">{project.title}</span>
        </nav>

        {/* Back link */}
        <Link
          href="/#projects"
          className="mb-6 inline-flex items-center gap-2 border-[2.5px] border-border bg-card px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider brutal-shadow-sm transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--shadow)] focus-brutal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Projects
        </Link>

        {/* Category */}
        <span className="inline-block bg-purple px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
          {project.category}
        </span>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
          {project.title}
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
          {project.description}
        </p>

        {/* Tags */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border-[2px] border-border px-2 py-0.5 font-mono text-[10px] uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Metadata grid */}
        {(project.role ||
          project.projectYear ||
          project.duration ||
          project.teamSize) && (
          <dl className="mt-6 grid grid-cols-2 gap-4 border-[2.5px] border-border bg-card p-5 brutal-shadow-sm sm:grid-cols-3 md:grid-cols-4">
            {project.role && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                  Role
                </dt>
                <dd className="mt-1 text-sm font-medium">{project.role}</dd>
              </div>
            )}
            {project.projectYear && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                  Year
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  {project.projectYear}
                </dd>
              </div>
            )}
            {project.duration && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                  Duration
                </dt>
                <dd className="mt-1 text-sm font-medium">{project.duration}</dd>
              </div>
            )}
            {project.teamSize && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                  Team
                </dt>
                <dd className="mt-1 text-sm font-medium">{project.teamSize}</dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </header>
  );
}
