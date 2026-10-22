import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function CaseStudyNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-background px-4">
        <div className="max-w-lg text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            404
          </p>
          <h1 className="mt-4 text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Project Not Found
          </h1>
          <p className="mt-4 text-sm text-foreground/70">
            The project you're looking for doesn't exist or may not have been
            published yet. Browse all projects to find what you're looking for.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/#projects" variant="lime">
              BACK TO PROJECTS
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
