import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudySection } from "@/data/projects";

type CaseStudyOutcomeProps = {
  section: CaseStudySection;
};

export function CaseStudyOutcome({ section }: CaseStudyOutcomeProps) {
  return (
    <div className="mt-5">
      {section.body && section.body.length > 0 && (
        <Reveal delay={0.1}>
          <div className="space-y-4">
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

      {section.highlight && (
        <Reveal delay={0.15}>
          <blockquote className="cs-highlight mt-6 p-5">
            <p className="text-sm font-medium leading-relaxed md:text-base">
              {section.highlight}
            </p>
          </blockquote>
        </Reveal>
      )}
    </div>
  );
}
