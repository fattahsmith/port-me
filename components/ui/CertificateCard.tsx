"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { Certificate } from "@/data/certificates";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function isPlaceholder(value?: string): boolean {
  return !value || value.startsWith("[");
}

type CertificateCardProps = {
  certificate: Certificate;
  index: number;
};

export function CertificateCard({ certificate, index }: CertificateCardProps) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const hasImage = Boolean(certificate.image);
  const hasVerify = Boolean(
    certificate.verificationUrl && !isPlaceholder(certificate.verificationUrl)
  );

  return (
    <>
      <motion.article
        className="theme-transition brutal-border brutal-shadow flex h-full flex-col bg-card"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07, duration: 0.45 }}
        whileHover={reduceMotion ? undefined : { y: -3 }}
      >
        <button
          type="button"
          onClick={() => hasImage && setOpen(true)}
          className={cn(
            "relative aspect-[4/3] w-full border-b-[2.5px] border-border bg-lime/20 text-left focus-brutal",
            !hasImage && "cursor-default"
          )}
          disabled={!hasImage}
          aria-label={
            hasImage
              ? `View larger preview of ${certificate.title}`
              : undefined
          }
        >
          {hasImage ? (
            <Image
              src={certificate.image!}
              alt={certificate.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">
                Certificate preview
              </span>
              <p className="text-sm font-bold uppercase">
                Replace image in data/certificates.ts
              </p>
            </div>
          )}
        </button>
        <div className="flex flex-1 flex-col p-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-purple">
            {certificate.category}
          </span>
          <h3 className="mt-2 text-base font-bold leading-snug md:text-lg">
            {certificate.title}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase text-foreground/70">
            {certificate.organization}
          </p>
          {!isPlaceholder(certificate.issueDate) && (
            <p className="mt-1 font-mono text-[10px] text-foreground/60">
              Issued {certificate.issueDate}
            </p>
          )}
          {!isPlaceholder(certificate.credentialId) && (
            <p className="mt-1 font-mono text-[10px] text-foreground/60">
              ID: {certificate.credentialId}
            </p>
          )}
          <div className="mt-auto pt-5">
            {hasVerify ? (
              <Button href={certificate.verificationUrl!} external variant="purple">
                VIEW CERTIFICATE ↗
              </Button>
            ) : (
              <span className="font-mono text-[10px] uppercase text-foreground/50">
               
              </span>
            )}
          </div>
        </div>
      </motion.article>

      {open && hasImage ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${certificate.title}`}
          onClick={close}
        >
          <div
            className="theme-transition relative max-h-[90vh] w-full max-w-3xl brutal-border brutal-shadow-lg bg-card p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center brutal-border bg-lime focus-brutal"
              aria-label="Close certificate preview"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={certificate.image!}
                alt={certificate.title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
