import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-[5.5rem] border-b-[2.5px] border-border grid-paper py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading label="02 / MY TOOLKIT" title="Skills & Tools" />
        <div className="grid gap-5 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
