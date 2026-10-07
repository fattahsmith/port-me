"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { RoleRotator } from "@/components/sections/RoleRotator";
import { AnimatedHeadline } from "@/components/sections/AnimatedHeadline";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="scroll-mt-[5.5rem] border-b-[2.5px] border-border grid-paper"
    >
      <div className="mx-auto flex min-h-[calc(100svh-3.25rem)] max-w-4xl flex-col items-center justify-center px-4 py-12 text-center md:px-6 md:py-16">
        <AnimatedHeadline />

        <div className="mt-8 w-full max-w-2xl">
          <RoleRotator roles={[...profile.roles]} centered />

          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.55, duration: 0.45 }}
          >
            <span className="rounded-full border-[2px] border-border bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide brutal-shadow-sm">
              {profile.locationBadge}
            </span>
            <span className="rounded-full border-[2px] border-border bg-lime px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide brutal-shadow-sm">
              {profile.roleBadge}
            </span>
          </motion.div>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/85 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.65, duration: 0.45 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.75, duration: 0.45 }}
          >
            <Button href="#projects" variant="dark">
              EXPLORE MY WORK ↘
            </Button>
            <Button href="#contact" variant="lime">
              LET&apos;S CONNECT ↗
            </Button>
            <Button href="https://drive.google.com/file/d/1CvcTlkst1APyTZYXZDSxc337S-ucOpwE/view?usp=drivesdk" variant="outline">
              VIEW RESUME
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
