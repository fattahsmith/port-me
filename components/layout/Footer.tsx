"use client";

import { Code2, Camera, Network, MessageCircle } from "lucide-react";
import { profile, socialHref } from "@/data/profile";
const socialItems = [
  {
    key: "instagram",
    icon: Camera,
    href: socialHref(profile.social.instagram),
    label: "Instagram",
  },
  {
    key: "whatsapp",
    icon: MessageCircle,
    href: socialHref(profile.social.whatsapp),
    label: "WhatsApp",
  },
  {
    key: "linkedin",
    icon: Network,
    href: socialHref(profile.social.linkedin),
    label: "LinkedIn",
  },
  {
    key: "github",
    icon: Code2,
    href: profile.social.github,
    label: "GitHub",
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-[2.5px] border-border bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-mono text-sm font-bold uppercase tracking-wide text-lime">
            {profile.site.logo}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-background/70">
            © {year} · DESIGNED & BUILT WITH CARE.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {socialItems.map(({ key, icon: Icon, href, label }) =>
            href ? (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center border-[2px] border-background/30 bg-background/5 transition-colors hover:bg-lime hover:text-foreground focus-brutal"
              >
                <Icon className="h-5 w-5" />
              </a>
            ) : (
              <span
                key={key}
                title={`Add ${label} URL in data/profile.ts`}
                className="flex h-11 w-11 cursor-not-allowed items-center justify-center border-[2px] border-dashed border-background/30 text-background/40"
                aria-hidden
              >
                <Icon className="h-5 w-5" />
              </span>
            )
          )}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="min-h-11 border-[2px] border-lime bg-lime px-4 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground focus-brutal"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
