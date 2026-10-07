import { certificates } from "@/data/certificates";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertificateCard } from "@/components/ui/CertificateCard";
import { Button } from "@/components/ui/Button";

const PREVIEW_COUNT = 2;

export function Certificates() {
  const preview = certificates.slice(0, PREVIEW_COUNT);

  return (
    <section
      id="certificates"
      className="scroll-mt-[5.5rem] border-b-[2.5px] border-border bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading label="05 / CERTIFICATIONS" title="Credentials" />
        <div className="grid gap-6 md:grid-cols-2">
          {preview.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/certificates" variant="card" className="min-w-[min(100%,280px)]">
            SEE ALL CERTIFICATES ↗
          </Button>
        </div>
      </div>
    </section>
  );
}
