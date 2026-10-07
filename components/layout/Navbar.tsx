"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Certificates", href: "/#certificates" },
  { label: "GitHub", href: "/#github" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const reduceMotion = useReducedMotion();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const ids = navLinks.map((l) => l.href.replace("/#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  const closeMenu = () => setOpen(false);

  const logoHref = onHome ? "#home" : "/#home";

  return (
    <header
      className={cn(
        "theme-transition sticky top-0 z-50 border-b-[2.5px] border-border bg-background",
        scrolled && "bg-background/95 nav-scroll-shadow"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-stretch justify-between gap-2 px-4 md:gap-4 md:px-6">
        <Link
          href={logoHref}
          onClick={closeMenu}
          className="flex min-h-[3.25rem] items-center bg-lime px-3 font-mono text-xs font-bold uppercase tracking-wide brutal-border border-y-0 border-l-0 text-foreground md:px-4 md:text-sm focus-brutal"
        >
          {profile.site.logo}
        </Link>

        <nav
          className="hidden items-stretch lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const hash = link.href.replace("/", "");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "theme-transition flex items-center border-l-[2.5px] border-border px-4 text-xs font-bold uppercase tracking-wide focus-brutal",
                  onHome && active === hash
                    ? "bg-pink/30"
                    : "hover:bg-lime/40"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-2 border-l-[2.5px] border-border px-3">
            <ThemeToggle />
            <Button href="/#contact" variant="purple" className="text-[11px]">
              LET&apos;S TALK ↗
            </Button>
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            href="/#contact"
            variant="purple"
            className="hidden text-[10px] sm:inline-flex"
          >
            TALK ↗
          </Button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center brutal-border bg-card focus-brutal"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="theme-transition overflow-hidden border-t-[2.5px] border-border bg-background lg:hidden"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link) => {
                const hash = link.href.replace("/", "");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "border-b-[2px] border-border py-3 text-sm font-bold uppercase tracking-wide focus-brutal",
                      onHome && active === hash && "text-purple"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="py-3 text-sm font-bold uppercase tracking-wide focus-brutal"
              >
                GitHub Profile ↗
              </Link>
              <Button
                href="/#contact"
                variant="purple"
                className="mt-4 w-full"
                onClick={closeMenu}
              >
                LET&apos;S TALK ↗
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
