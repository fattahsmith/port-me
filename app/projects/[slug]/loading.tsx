import Link from "next/link";

export default function CaseStudyLoading() {
  return (
    <div className="flex flex-1 animate-pulse">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex gap-2">
          <div className="h-4 w-12 rounded bg-foreground/10" />
          <div className="h-4 w-4 rounded bg-foreground/10" />
          <div className="h-4 w-16 rounded bg-foreground/10" />
          <div className="h-4 w-4 rounded bg-foreground/10" />
          <div className="h-4 w-32 rounded bg-foreground/10" />
        </div>

        {/* Back link skeleton */}
        <div className="mb-6 h-10 w-40 rounded bg-foreground/10" />

        {/* Category badge */}
        <div className="h-6 w-24 rounded bg-foreground/10" />

        {/* Title skeleton */}
        <div className="mt-4 h-12 w-3/4 rounded bg-foreground/10" />
        <div className="mt-4 h-4 w-2/3 rounded bg-foreground/10" />

        {/* Tags skeleton */}
        <div className="mt-5 flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 w-20 rounded bg-foreground/10" />
          ))}
        </div>

        {/* Hero image skeleton */}
        <div className="mt-8 aspect-[16/9] w-full rounded bg-foreground/10" />

        {/* TOC skeleton */}
        <div className="mt-8 h-10 w-full rounded bg-foreground/10" />

        {/* Content skeleton */}
        <div className="mt-8 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 w-48 rounded bg-foreground/10" />
              <div className="h-4 w-full rounded bg-foreground/10" />
              <div className="h-4 w-5/6 rounded bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
