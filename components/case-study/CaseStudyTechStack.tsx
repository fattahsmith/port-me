type CaseStudyTechStackProps = {
  stack: string[];
};

export function CaseStudyTechStack({ stack }: CaseStudyTechStackProps) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span
          key={tech}
          className="border-[2px] border-border bg-card px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider brutal-shadow-sm"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
