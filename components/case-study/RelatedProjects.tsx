import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/data/projects";

type RelatedProjectsProps = {
  projects: Project[];
  currentSlug: string;
};

export function RelatedProjects({
  projects,
  currentSlug,
}: RelatedProjectsProps) {
  // Exclude current and limit to 3
  const related = projects
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-background py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold uppercase tracking-tight md:text-3xl">
            More Projects
          </h2>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-foreground/50">
            Other work you might like
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {related.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden brutal-border brutal-shadow bg-card transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--shadow)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b-[2.5px] border-border bg-lime/30">
                  <Image
                    src={project.cover}
                    alt={`${project.title} cover`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="bg-purple px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white self-start">
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-lg font-bold uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/85">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-purple">
                    Read Case Study →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
