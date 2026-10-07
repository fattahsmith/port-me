export const profile = {
  name: "M. Fattah Rifqy Smith",
  shortName: "Smith",
  title: "UI/UX DESIGNER & WEB DEVELOPER",
  location: "Surabaya, Indonesia",
  locationBadge: "📍 SURABAYA, INDONESIA",
  roleBadge: "✳ UI/UX DESIGNER & WEB DEVELOPER",
  roles: ["UI/UX DESIGNER", "FRONTEND DEVELOPER", "CREATIVE DEVELOPER"] as const,
  tagline:
    "I design thoughtful digital experiences and build modern web applications that turn ideas into useful products.",
  about:
    "I am an Information Management (D4) student at the State University of Surabaya (UNESA) with a keen interest in UI/UX Design Web DevelopmentGraphic Design , I have internship experience as a Front-End Developer and am proficient in developing web applications using React, Next.js, Tailwind CSS, and Supabase.",
  email: "[fattahsmith@gmail.com]",
  github: "https://github.com/fattahsmith",
  githubUsername: "fattahsmith",
  social: {
    instagram: "https://www.instagram.com/fathr_smith",
    whatsapp: "https://wa.me/+62895385294235",
    linkedin: "https://www.linkedin.com/in/fattahsmith/",
    github: "https://github.com/fattahsmith",
  },
  stats: {
    projects: "20+ PROJECTS",
    experience: "3 YEARS EXPERIENCE",
  },
  site: {
    logo: "</> FATTAH.DEV",
    url: "https://fattah.dev",
  },
} as const;

export function isPlaceholderUrl(url: string): boolean {
  return url.startsWith("[") || url.includes("YOUR_EMAIL");
}

export function socialHref(url: string): string | null {
  if (isPlaceholderUrl(url)) return null;
  return url;
}

export function emailHref(email: string): string | null {
  if (isPlaceholderUrl(email)) return null;
  return `mailto:${email}`;
}
