import Link from "next/link";
import { Code2, Camera, Network, MessageCircle, ExternalLink } from "lucide-react";
import { profile, socialHref } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpiderManProfile } from "@/components/sections/SpiderManProfile";

const socials = [
  { label: "Instagram", icon: Camera, href: socialHref(profile.social.instagram) },
  { label: "WhatsApp", icon: MessageCircle, href: socialHref(profile.social.whatsapp) },
  { label: "LinkedIn", icon: Network, href: socialHref(profile.social.linkedin) },
  { label: "GitHub", icon: Code2, href: profile.social.github },
];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-[5.5rem] border-b-[2.5px] border-border bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading label="01 / ABOUT ME" />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="group relative mx-auto max-w-md lg:mx-0">
              <div className="absolute -right-3 -top-3 h-full w-full bg-purple brutal-border" />
              <div className="relative brutal-border brutal-shadow overflow-hidden bg-lime/30 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                <SpiderManProfile sizes="(max-width: 1024px) 80vw, 480px" />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.05}>
              <h3 className="text-2xl font-bold uppercase md:text-3xl">
                {profile.name}
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-purple">
                {profile.title}
              </p>
              <p className="mt-2 font-mono text-xs uppercase text-foreground/70">
                {profile.location}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
                {profile.about}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                {socials.map(({ label, icon: Icon, href }) =>
                  href ? (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 border-[2.5px] border-border bg-background px-4 font-mono text-[10px] font-bold uppercase tracking-wide brutal-shadow-sm transition-transform hover:-translate-y-0.5 focus-brutal"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {label}
                    </Link>
                  ) : (
                    <span
                      key={label}
                      className="inline-flex min-h-11 items-center gap-2 border-[2.5px] border-dashed border-border px-4 font-mono text-[10px] uppercase text-foreground/50"
                      title={`Add ${label} URL in data/profile.ts`}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {label} [URL]
                    </span>
                  )
                )}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="brutal-border brutal-shadow bg-lime p-5">
                  <p className="text-xl font-bold uppercase leading-tight md:text-2xl">
                    {profile.stats.projects}
                  </p>
                </div>
                <div className="brutal-border brutal-shadow bg-pink p-5">
                  <p className="text-xl font-bold uppercase leading-tight md:text-2xl">
                    {profile.stats.experience}
                  </p>
                </div>
              </div>  
            </Reveal>
          </div>
        </div>

        {/* Spotify playlist */}
        <Reveal delay={0.25}>
          <div className="mt-14 brutal-border brutal-shadow bg-background">
            <div className="border-b-[2.5px] border-border px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                {/* Spotify wordmark icon */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 fill-[#1DB954]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.311a.748.748 0 0 1-1.03.25c-2.819-1.723-6.365-2.112-10.542-1.158a.749.749 0 1 1-.334-1.459c4.571-1.045 8.492-.595 11.656 1.338a.75.75 0 0 1 .25 1.029zm1.47-3.27a.937.937 0 0 1-1.287.308C14.956 12.56 11.012 12 7.5 13.047a.937.937 0 1 1-.542-1.794c4.062-1.228 8.509-.633 11.72 1.481a.936.936 0 0 1 .308 1.307zm.126-3.405C15.553 8.565 10.014 8.38 6.787 9.388a1.124 1.124 0 1 1-.653-2.151c3.737-1.134 9.942-.915 13.86 1.606a1.125 1.125 0 0 1-1.882 1.233z" />
                </svg>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
                    Now Playing
                  </p>
                  <p className="font-bold uppercase text-sm leading-tight">
                    A Little Soundtrack of My Life
                  </p>
                </div>
              </div>
              <Link
                href="https://open.spotify.com/playlist/0FQkXaTYjIipukXBgWH33A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border-[2.5px] border-border bg-background px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide brutal-shadow-sm transition-transform hover:-translate-y-0.5 focus-brutal shrink-0"
              >
                Open in Spotify
                <ExternalLink className="h-3 w-3" aria-hidden />
              </Link>
            </div>

            <div className="px-6 py-4">
              <p className="mb-4 font-mono text-xs text-foreground/60">
                Some songs I enjoy while coding, designing, and working.
              </p>
              <iframe
                title="Spotify playlist — A Little Soundtrack of My Life"
                src="https://open.spotify.com/embed/playlist/0FQkXaTYjIipukXBgWH33A?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full rounded-sm"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
