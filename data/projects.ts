export type ProjectCategory = "UI/UX DESIGN" | "FRONTEND" | "FULL-STACK";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  featured?: boolean;
  cover: string;
  caseStudyUrl?: string;
  liveDemoUrl?: string;
};

export const projectFilters = [
  "ALL PROJECTS",
  "UI/UX DESIGN",
  "FRONTEND",
  "FULL-STACK",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export const projects: Project[] = [
  {
    id: "hospital-queue",
    title: "Hospital Queue Management System",
    description:
      "This online hospital ticket queuing application is designed to make it easier for patients to obtain a hospital queue ticket without having to visit the hospital in person.",
    category: "FRONTEND",
    tags: ["Next.js", "Tailwind.Css", "PostgreSQL", "UI Design","API"],
    featured: true,
    cover: "/images/projects/antrian.png",
    caseStudyUrl: undefined,
    liveDemoUrl: "https://antrian-tiket-oj7c.vercel.app/",
  },
  {
    id: "NARA",
    title: "NARA AI Assistent",
    description:
      "NARA is an AI-powered digital companion application designed to help users interact with, read, listen to, and access digital information flexibly, according to their individual needs and preferences.",
    category: "UI/UX DESIGN",
    tags: ["Figma", "Prototyping", "Visual Design"],
    cover: "/images/projects/ui1.png",
    liveDemoUrl: "https://www.figma.com/design/aJHnQDvNMh2f6C52iGjfZU/ai-application-ui?node-id=0-1&t=cG9daxzfXhKn7XDh-1",
  },
  {
    id: "Movie",
    title: "Movie Recommendation Engine ",
    description:
      "Interactive movie discovery platform featuring a dynamic hero section and robust API integrations.",
    category: "FULL-STACK",
    tags: ["Laravel", "TailwindCss", "Vite","Rest Api"],
    cover: "/images/projects/movie.png",
  },
  {
    id: "qr-code",
    title: "QR Code Generator SaaS",
    description:
      "A fast, modern web utility to instantly convert URLs and text into scannable QR codes.",
    category: "FRONTEND",
    tags: ["Next.js", "Typescript", "TailwindCss","Shadcn/ui"],
    cover: "/images/projects/qr.png",
    liveDemoUrl: "https://qrcode-generator-lemon-gamma.vercel.app/"
    
  },
 
   {
    id: "coffee-shop",
    title: "Redesign Jago Web",
    description:
      "A comprehensive redesign of the Bank Jago web experience focusing on enhanced user experience (UX) by simplifying navigation and information architecture.",
    category: "UI/UX DESIGN",
    tags: ["Figma", "Responsive UI", "Brand"],
    cover: "/images/projects/jago.png",
    liveDemoUrl: "https://www.figma.com/design/G67cgm0S1OVpFIDw2d1V4T/Redesign-Jago-Web"
  },
  {
     id: "coffee-shop",
    title: "Ticketing App",
    description:
      "A modern travel booking platform making it easy for users to search and book flights, hotels, and vacation packages seamlessly.",
    category: "UI/UX DESIGN",
    tags: ["Figma", "Responsive UI", "Mobile Ui"],
    cover: "/images/projects/web4.png",
    liveDemoUrl: "https://www.figma.com/design/cpj2a5va7okR04rGBp5gPW/Ticketing-App"
  },
  {
    id: "NARA",
    title: "NARA AI Assistent",
    description:
      "Mobile application design for MRT and LRT ticket booking featuring real-time live tracking of trains.",
    category: "UI/UX DESIGN",
    tags: ["Figma", "Prototyping", "Visual Design"],
    cover: "/images/projects/web5.png",
    liveDemoUrl: "https://www.figma.com/design/CCoPS4YucgwEdEIBHy2aoR/Untitled",
  },
  
];

export const viewAllProjectsUrl: string | undefined = undefined;
