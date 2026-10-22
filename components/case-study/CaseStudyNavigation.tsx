"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudySection } from "@/data/projects";

type CaseStudyNavigationProps = {
  sections: CaseStudySection[];
};

export function CaseStudyNavigation({ sections }: CaseStudyNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setDropdownOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Case study table of contents"
      className="sticky top-[3.25rem] z-30 border-b-[2.5px] border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Desktop TOC */}
        <div className="hidden items-stretch gap-0 md:flex">
          <span className="flex items-center border-r-[2.5px] border-border px-4 font-mono text-[10px] uppercase tracking-wider text-foreground/50">
            Contents
          </span>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              className={cn(
                "cs-toc-link flex items-center px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground/60 hover:text-foreground focus-brutal",
                activeSection === s.id && "active"
              )}
            >
              <span className="mr-1.5 text-foreground/30">{s.number}</span>
              {s.heading}
            </a>
          ))}
        </div>

        {/* Mobile TOC dropdown */}
        <button
          type="button"
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex w-full items-center justify-between py-3 font-mono text-[10px] font-bold uppercase tracking-wider md:hidden"
          aria-expanded={dropdownOpen}
        >
          <span>
            {activeSection
              ? sections.find((s) => s.id === activeSection)?.heading ||
                "Contents"
              : "Contents"}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              dropdownOpen && "rotate-180"
            )}
          />
        </button>
        <div
          className={cn(
            "cs-toc-dropdown md:hidden",
            dropdownOpen && "open"
          )}
        >
          <div className="flex flex-col pb-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={cn(
                  "flex items-center px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground/60 hover:text-foreground focus-brutal",
                  activeSection === s.id && "text-purple"
                )}
              >
                <span className="mr-2 text-foreground/30">{s.number}</span>
                {s.heading}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
