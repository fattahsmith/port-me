import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/data/projects";

type CaseStudyNavigationFooterProps = {
  prev?: Project;
  next?: Project;
};

export function CaseStudyNavigationFooter({
  prev,
  next,
}: CaseStudyNavigationFooterProps) {
  if (!prev && !next) {
    return (
      <div className="border-b-[2.5px] border-border bg-background py-10">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
          <Button href="/#projects" variant="outline">
            BACK TO ALL PROJECTS
          </Button>
        </div>
      </div>
    );
  }

  return (
    <nav
      aria-label="Project navigation"
      className="border-b-[2.5px] border-border bg-background py-10"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Previous */}
          <div>
            {prev && (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex flex-col items-start border-[2.5px] border-border bg-card p-5 brutal-shadow-sm transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--shadow)] focus-brutal"
              >
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous Project
                </span>
                <span className="mt-2 text-lg font-bold uppercase tracking-tight transition-colors group-hover:text-purple">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>

          {/* Next */}
          <div className="sm:text-right">
            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex flex-col items-start border-[2.5px] border-border bg-card p-5 brutal-shadow-sm transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--shadow)] focus-brutal sm:items-end"
              >
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                  Next Project
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="mt-2 text-lg font-bold uppercase tracking-tight transition-colors group-hover:text-purple">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button href="/#projects" variant="outline">
            BACK TO ALL PROJECTS
          </Button>
        </div>
      </div>
    </nav>
  );
}
