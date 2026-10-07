import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { certificates } from "@/data/certificates";
import { CertificateCard } from "@/components/ui/CertificateCard";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "All Certificates | Fattah.dev",
  description: "Professional certifications, internships, and bootcamp credentials.",
};

export default function CertificatesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 border-b-[2.5px] border-border bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/70">
            CREDENTIALS
          </p>
          <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-6xl">
            ALL CERTIFICATES
          </h1>
          <p className="mt-4 max-w-2xl text-foreground/80">
            Full collection of certifications and training credentials. Replace
            placeholders in data/certificates.ts as you add verification links
            and images.
          </p>
          <div className="mt-8">
            <Button href="/#certificates" variant="lime">
              BACK TO PORTFOLIO ↖
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
