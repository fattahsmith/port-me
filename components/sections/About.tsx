import Image from "next/image";
import Link from "next/link";
import { Code2, Camera, Network, MessageCircle } from "lucide-react";
import { profile, socialHref } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

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
                <div className="relative aspect-square">
                  <Image
                    src="/images/foto1.jpeg"
                    alt="About section profile placeholder"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 80vw, 480px"
                  />
                </div>
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
      </div>
    </section>
  );
}
