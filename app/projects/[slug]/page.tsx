import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyNavigation,
  CaseStudySection,
  ReadingProgress,
  CaseStudyNavigationFooter,
  RelatedProjects,
} from "@/components/case-study";
import {
  getAllSlugs,
  getProjectBySlug,
  getAdjacentProjects,
  getRelatedProjects,
  getPublishedProjects,
} from "@/data/projects";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} | Case Study`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: project.cover,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);
  const related = getRelatedProjects(slug);
  const allPublished = getPublishedProjects();
  const sections = project.caseStudy?.sections ?? [];

  return (
    <>
      <Navbar />
      <ReadingProgress />

      <main className="flex-1">
        {/* Header */}
        <CaseStudyHeader project={project} />

        {/* Hero */}
        <CaseStudyHero project={project} />

        {/* Table of contents */}
        {sections.length > 0 && <CaseStudyNavigation sections={sections} />}

        {/* Content sections */}
        {sections.length > 0 ? (
          <div className="bg-background">
            {sections
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((section) => (
                <CaseStudySection key={section.id} section={section} />
              ))}
          </div>
        ) : (
          <div className="bg-background py-20">
            <div className="cs-content px-4 text-center md:px-6">
              <p className="font-mono text-sm uppercase tracking-widest text-foreground/60">
                Case study content coming soon.
              </p>
            </div>
          </div>
        )}

        {/* Prev / Next navigation */}
        <CaseStudyNavigationFooter prev={prev} next={next} />

        {/* Related projects */}
        <RelatedProjects
          projects={related.length > 0 ? related : allPublished}
          currentSlug={slug}
        />
      </main>

      <Footer />
    </>
  );
}
