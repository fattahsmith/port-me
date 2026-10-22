import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudySection as CaseStudySectionType } from "@/data/projects";
import { CaseStudyGallery } from "./CaseStudyGallery";
import { CaseStudyTechStack } from "./CaseStudyTechStack";
import { CaseStudyOutcome } from "./CaseStudyOutcome";

type CaseStudySectionProps = {
  section: CaseStudySectionType;
};

export function CaseStudySection({ section }: CaseStudySectionProps) {
  return (
    <section
      id={section.id}
      className="cs-section-anchor scroll-mt-[5.5rem] border-b-[2px] border-border/30 py-10 md:py-14"
    >
      <div className="cs-content px-4 md:px-6">
        {/* Section number + heading */}
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xl font-bold text-lime drop-shadow-[2px_2px_0_var(--border)] md:text-3xl">
              {section.number}
            </span>
            <h2 className="text-xl font-bold uppercase tracking-tight md:text-2xl lg:text-3xl">
              {section.heading}
            </h2>
          </div>
        </Reveal>

        {/* Subtitle */}
        {section.subtitle && (
          <Reveal delay={0.05}>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-foreground/50">
              {section.subtitle}
            </p>
          </Reveal>
        )}

        {/* Body paragraphs */}
        {section.body && section.body.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-5 space-y-4">
              {section.body.map((para, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-foreground/85 md:text-base"
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        )}

        {/* Bullet list */}
        {section.bulletPoints && section.bulletPoints.length > 0 && (
          <Reveal delay={0.1}>
            <ul className="mt-5 space-y-3">
              {section.bulletPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 md:text-base"
                >
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 border-[2px] border-border bg-lime" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Gallery */}
        {section.type === "gallery" && section.images && (
          <Reveal delay={0.1}>
            <CaseStudyGallery images={section.images} />
          </Reveal>
        )}

        {/* Tech stack */}
        {section.type === "tech-stack" && section.techStack && (
          <Reveal delay={0.1}>
            <CaseStudyTechStack stack={section.techStack} />
          </Reveal>
        )}

        {/* Outcome */}
        {section.type === "outcome" && (
          <CaseStudyOutcome section={section} />
        )}

        {/* Highlight (standalone, if not in an outcome section) */}
        {section.highlight && section.type !== "outcome" && (
          <Reveal delay={0.15}>
            <blockquote className="cs-highlight mt-6 p-5">
              <p className="text-sm font-medium leading-relaxed md:text-base">
                {section.highlight}
              </p>
            </blockquote>
          </Reveal>
        )}
      </div>
    </section>
  );
}
