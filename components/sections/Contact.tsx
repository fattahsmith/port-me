import { ArrowUpRight } from "lucide-react";
import { profile, emailHref, socialHref } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const mail = emailHref(profile.email);
  const whatsapp = socialHref(profile.social.whatsapp);
  const linkedin = socialHref(profile.social.linkedin);

  return (
    <section
      id="contact"
      className="scroll-mt-[5.5rem] border-b-[2.5px] border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden brutal-border brutal-shadow-lg grid-paper-dark p-8 text-white md:p-14">
          <div className="absolute -right-8 top-8 hidden h-32 w-32 rotate-12 border-[2.5px] border-white/30 bg-pink/80 md:block" />
          <div className="absolute bottom-6 left-6 hidden h-24 w-24 border-[2.5px] border-white/30 bg-lime md:block" />

          <SectionHeading
            label="06 / LET'S CONNECT"
            align="left"
            className="relative z-10 [&_p]:text-white/80 [&_h2]:text-white"
          />

          <Reveal className="relative z-10 max-w-3xl">
            <h2 className="text-[clamp(1.75rem,5vw,3.25rem)] font-bold uppercase leading-tight tracking-tight">
              LET&apos;S BUILD SOMETHING AMAZING TOGETHER.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/90 md:text-lg">
              Have a project, an opportunity, or just want to talk about design and
              development? Let&apos;s connect.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative z-10 mt-10">
            <div className="flex flex-wrap gap-3">
              {mail ? (
                <Button href={mail} variant="lime">
                  EMAIL ME ↗
                </Button>
              ) : (
                <span className="inline-flex min-h-11 items-center border-[2.5px] border-dashed border-white/50 px-4 font-mono text-[10px] uppercase">
                  Email: {profile.email}
                </span>
              )}
              {whatsapp ? (
                <Button href={whatsapp} external variant="card">
                  WHATSAPP ↗
                </Button>
              ) : (
                <span className="inline-flex min-h-11 items-center border-[2.5px] border-dashed border-white/50 px-4 font-mono text-[10px] uppercase text-white/70">
                  WhatsApp [ADD URL]
                </span>
              )}
              {linkedin ? (
                <Button href={linkedin} external variant="pink">
                  LINKEDIN ↗
                </Button>
              ) : (
                <span className="inline-flex min-h-11 items-center border-[2.5px] border-dashed border-white/50 px-4 font-mono text-[10px] uppercase text-white/70">
                  LinkedIn [ADD URL]
                </span>
              )}
              <Button href={profile.github} external variant="dark" className="bg-foreground text-lime">
                GITHUB ↗
              </Button>
            </div>
          </Reveal>

          <div className="pointer-events-none absolute bottom-4 right-4 opacity-20 md:bottom-8 md:right-8">
            <ArrowUpRight className="h-24 w-24 md:h-40 md:w-40" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  );
}
