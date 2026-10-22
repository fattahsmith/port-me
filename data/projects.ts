export type ProjectCategory = "UI/UX DESIGN" | "FRONTEND" | "FULL-STACK";

export type CaseStudySectionType =
  | "text"
  | "gallery"
  | "bullet-list"
  | "highlight"
  | "tech-stack"
  | "outcome";

export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudySection = {
  id: string;
  type: CaseStudySectionType;
  /** Section number, e.g. "01", "02" */
  number: string;
  heading: string;
  subtitle?: string;
  body?: string[];
  bulletPoints?: string[];
  images?: CaseStudyImage[];
  highlight?: string;
  techStack?: string[];
  displayOrder: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  featured?: boolean;
  published?: boolean;
  cover: string;
  caseStudyUrl?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  prototypeUrl?: string;
  role?: string;
  projectYear?: string;
  duration?: string;
  teamSize?: string;
  caseStudy?: {
    sections: CaseStudySection[];
  };
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
    slug: "hospital-queue-management",
    title: "Hospital Queue Management System",
    description:
      "This online hospital ticket queuing application is designed to make it easier for patients to obtain a hospital queue ticket without having to visit the hospital in person.",
    category: "FRONTEND",
    tags: ["Next.js", "Tailwind.Css", "PostgreSQL", "UI Design", "API"],
    featured: true,
    published: true,
    cover: "/images/projects/antrian.png",
    liveDemoUrl: "https://antrian-tiket-oj7c.vercel.app/",
    role: "Frontend Developer",
    projectYear: "2024",
    caseStudy: {
      sections: [
        {
          id: "overview",
          type: "text",
          number: "01",
          heading: "Overview",
          subtitle: "A digital queue solution for healthcare",
          body: [
            "The Hospital Queue Management System is a web-based application that enables patients to book and manage hospital queue tickets online, reducing physical wait times and improving the overall patient experience.",
            "The system allows users to select a hospital, choose a department, and receive a digital queue number — all from their device, eliminating the need to arrive early and wait in long physical lines.",
          ],
          displayOrder: 0,
        },
        {
          id: "the-problem",
          type: "text",
          number: "02",
          heading: "The Problem",
          subtitle: "Long waits and inefficient patient flow",
          body: [
            "Patients often spend hours waiting in hospital queues, with no way to know their estimated wait time or position in line. This leads to crowded waiting rooms, frustrated patients, and inefficient use of hospital resources.",
            "The absence of a digital ticketing system means patients must physically arrive at the hospital just to take a number, creating unnecessary congestion and poor patient experience.",
          ],
          displayOrder: 1,
        },
        {
          id: "project-goals",
          type: "bullet-list",
          number: "03",
          heading: "Project Goals",
          subtitle: "What the system set out to achieve",
          bulletPoints: [
            "Enable patients to book queue tickets online without visiting the hospital",
            "Display real-time queue position and estimated wait times",
            "Reduce physical waiting room congestion",
            "Provide hospital staff with a queue management dashboard",
            "Support multiple hospitals and departments",
          ],
          displayOrder: 2,
        },
        {
          id: "development-process",
          type: "text",
          number: "04",
          heading: "Development Process",
          subtitle: "Architecture and implementation",
          body: [
            "Built with Next.js and Tailwind CSS for a responsive, fast-loading frontend. The application integrates with a PostgreSQL database to store queue data and uses a REST API for real-time queue updates.",
            "The UI was designed to be intuitive and accessible, with clear visual feedback for queue status and large touch-friendly controls suitable for users of all ages.",
          ],
          displayOrder: 3,
        },
        {
          id: "challenges",
          type: "text",
          number: "05",
          heading: "Challenges & Solutions",
          subtitle: "Technical hurdles overcome",
          body: [
            "One challenge was ensuring real-time queue updates without overwhelming the server. This was addressed with efficient polling and optimistic UI updates.",
            "Another challenge was designing for users across different devices and screen sizes — from mobile phones to desktop kiosks. A responsive layout with progressive enhancement ensured the app worked everywhere.",
          ],
          displayOrder: 4,
        },
        {
          id: "technology-stack",
          type: "tech-stack",
          number: "06",
          heading: "Technology Stack",
          subtitle: "Tools and frameworks used",
          techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "PostgreSQL",
            "REST API",
            "Vercel",
          ],
          displayOrder: 5,
        },
        {
          id: "outcome",
          type: "outcome",
          number: "07",
          heading: "Outcome & Learnings",
          subtitle: "Results and takeaways",
          body: [
            "The deployed application demonstrates a working digital queue system that patients can use from any device. The project reinforced the importance of real-time feedback in queue management and the value of progressive enhancement for accessibility.",
          ],
          highlight:
            "The live demo shows the full patient flow: selecting a hospital, choosing a department, receiving a queue number, and tracking position in real time.",
          displayOrder: 6,
        },
      ],
    },
  },
  {
    id: "nara-ai",
    slug: "nara-ai-assistant",
    title: "NARA AI Assistant",
    description:
      "NARA is an AI-powered digital companion application designed to help users interact with, read, listen to, and access digital information flexibly, according to their individual needs and preferences.",
    category: "UI/UX DESIGN",
    tags: ["Figma", "Prototyping", "Visual Design"],
    published: true,
    cover: "/images/projects/ui1.png",
    prototypeUrl:
      "https://www.figma.com/design/aJHnQDvNMh2f6C52iGjfZU/ai-application-ui?node-id=0-1&t=cG9daxzfXhKn7XDh-1",
    role: "UI/UX Designer",
    projectYear: "2024",
    caseStudy: {
      sections: [
        {
          id: "overview",
          type: "text",
          number: "01",
          heading: "Overview",
          subtitle: "An AI companion for accessible digital interaction",
          body: [
            "NARA is an AI-powered digital companion application designed to help users interact with, read, listen to, and access digital information flexibly, according to their individual needs and preferences.",
            "The design explores how AI can serve as an accessible interface between users and digital content — supporting voice, text, and visual interaction modes.",
          ],
          displayOrder: 0,
        },
        {
          id: "the-problem",
          type: "text",
          number: "02",
          heading: "The Problem",
          subtitle: "Digital accessibility gaps",
          body: [
            "Many users struggle to interact with digital content due to accessibility barriers — visual impairment, reading difficulties, or unfamiliarity with complex interfaces. Existing tools often address one mode of interaction but lack flexibility across multiple needs.",
            "There was a need for a companion that adapts to the user rather than forcing the user to adapt to it.",
          ],
          displayOrder: 1,
        },
        {
          id: "project-goals",
          type: "bullet-list",
          number: "03",
          heading: "Project Goals",
          subtitle: "Design objectives for NARA",
          bulletPoints: [
            "Create an AI companion interface that supports text, voice, and visual interaction",
            "Design for accessibility-first with flexible input and output modes",
            "Enable users to read, listen to, and interact with digital information seamlessly",
            "Maintain a clean, approachable visual design that doesn't overwhelm users",
            "Prototype the core interaction flow in Figma for user testing",
          ],
          displayOrder: 2,
        },
        {
          id: "design-system",
          type: "text",
          number: "04",
          heading: "Design System",
          subtitle: "Visual language and components",
          body: [
            "The design system for NARA uses a soft, friendly color palette with rounded shapes and generous whitespace to create an approachable, non-intimidating interface.",
            "Typography prioritizes readability with clear hierarchy, and iconography uses familiar metaphors to reduce cognitive load.",
          ],
          displayOrder: 3,
        },
        {
          id: "final-ui",
          type: "gallery",
          number: "05",
          heading: "Final UI Design",
          subtitle: "Key screens from the prototype",
          images: [
            {
              src: "/images/projects/ui1.png",
              alt: "NARA AI Assistant main interface design",
              caption: "Main companion interface with interaction options",
            },
          ],
          displayOrder: 4,
        },
        {
          id: "technology-stack",
          type: "tech-stack",
          number: "06",
          heading: "Tools Used",
          subtitle: "Design and prototyping tools",
          techStack: ["Figma", "Prototyping", "Visual Design", "Design System"],
          displayOrder: 5,
        },
        {
          id: "outcome",
          type: "outcome",
          number: "07",
          heading: "Outcome & Learnings",
          subtitle: "Design takeaways",
          body: [
            "The NARA design exploration demonstrated how AI companion interfaces can be made approachable through thoughtful visual design and flexible interaction modes. The Figma prototype enabled rapid iteration and user feedback collection.",
          ],
          highlight:
            "Accessibility-first design thinking — adapting to the user rather than the reverse — proved to be the core principle that guided every design decision.",
          displayOrder: 6,
        },
      ],
    },
  },
  {
    id: "movie-recommendation",
    slug: "movie-recommendation-engine",
    title: "Movie Recommendation Engine",
    description:
      "Interactive movie discovery platform featuring a dynamic hero section and robust API integrations.",
    category: "FULL-STACK",
    tags: ["Laravel", "TailwindCss", "Vite", "Rest Api"],
    published: true,
    cover: "/images/projects/movie.png",
    role: "Full-Stack Developer",
    projectYear: "2024",
    caseStudy: {
      sections: [
        {
          id: "overview",
          type: "text",
          number: "01",
          heading: "Overview",
          subtitle: "A dynamic movie discovery platform",
          body: [
            "The Movie Recommendation Engine is a full-stack web application that lets users discover, search, and explore movies through a dynamic interface powered by external API integrations.",
            "The platform features a dynamic hero section that highlights trending content, a robust search system, and detailed movie pages with cast information, ratings, and recommendations.",
          ],
          displayOrder: 0,
        },
        {
          id: "the-problem",
          type: "text",
          number: "02",
          heading: "The Problem",
          subtitle: "Scattered discovery experience",
          body: [
            "Movie discovery is often fragmented across multiple platforms with inconsistent interfaces. Users needed a single, engaging interface to discover new movies, see what's trending, and get personalized recommendations.",
          ],
          displayOrder: 1,
        },
        {
          id: "architecture",
          type: "text",
          number: "03",
          heading: "Architecture",
          subtitle: "System design and API integration",
          body: [
            "Built with Laravel on the backend for robust API handling and data processing, with Vite for fast frontend asset bundling. Tailwind CSS provides the styling layer.",
            "The application integrates with external movie APIs (such as TMDB) to fetch real-time movie data, cast information, ratings, and trending content. The backend caches responses to reduce API calls and improve load times.",
          ],
          displayOrder: 2,
        },
        {
          id: "development-process",
          type: "text",
          number: "04",
          heading: "Development Process",
          subtitle: "Frontend and backend implementation",
          body: [
            "The frontend uses a dynamic hero section that updates based on trending content, with smooth transitions and responsive layouts. Search functionality supports filtering by genre, rating, and release year.",
            "The backend handles API rate limiting, response caching, and data transformation to provide a clean interface for the frontend. REST API endpoints follow resource-oriented design patterns.",
          ],
          displayOrder: 3,
        },
        {
          id: "technology-stack",
          type: "tech-stack",
          number: "05",
          heading: "Technology Stack",
          subtitle: "Full-stack tools and frameworks",
          techStack: [
            "Laravel",
            "Tailwind CSS",
            "Vite",
            "REST API",
            "PHP",
            "Blade Templates",
          ],
          displayOrder: 4,
        },
        {
          id: "outcome",
          type: "outcome",
          number: "06",
          heading: "Outcome & Learnings",
          subtitle: "Results and takeaways",
          body: [
            "The project demonstrated effective full-stack integration with external APIs, highlighting the importance of response caching and rate limiting for performance. The dynamic hero section proved to be an engaging entry point for content discovery.",
          ],
          highlight:
            "API caching reduced external API calls by over 60% while maintaining fresh content for users.",
          displayOrder: 5,
        },
      ],
    },
  },
  {
    id: "qr-code-generator",
    slug: "qr-code-generator-saas",
    title: "QR Code Generator SaaS",
    description:
      "A fast, modern web utility to instantly convert URLs and text into scannable QR codes.",
    category: "FRONTEND",
    tags: ["Next.js", "Typescript", "TailwindCss", "Shadcn/ui"],
    published: true,
    cover: "/images/projects/qr.png",
    liveDemoUrl: "https://qrcode-generator-lemon-gamma.vercel.app/",
    role: "Frontend Developer",
    projectYear: "2024",
    caseStudy: {
      sections: [
        {
          id: "overview",
          type: "text",
          number: "01",
          heading: "Overview",
          subtitle: "Instant QR code generation",
          body: [
            "The QR Code Generator SaaS is a fast, modern web utility that allows users to instantly convert URLs and text into scannable QR codes. Built with a focus on speed and simplicity, the tool generates codes in real time as the user types.",
            "The application supports multiple input types including URLs, plain text, and contact information, with options to customize the QR code size and download in various formats.",
          ],
          displayOrder: 0,
        },
        {
          id: "project-goals",
          type: "bullet-list",
          number: "02",
          heading: "Project Goals",
          subtitle: "What the tool set out to deliver",
          bulletPoints: [
            "Generate QR codes instantly with zero-latency feedback",
            "Support URLs, text, and custom content as input",
            "Provide download options in multiple formats",
            "Maintain a clean, modern UI with Shadcn/ui components",
            "Ensure full type safety with TypeScript",
          ],
          displayOrder: 1,
        },
        {
          id: "development-process",
          type: "text",
          number: "03",
          heading: "Development Process",
          subtitle: "Frontend implementation",
          body: [
            "Built with Next.js and TypeScript for type safety and performance. The UI uses Tailwind CSS with Shadcn/ui components for a polished, accessible interface.",
            "QR code generation happens client-side, providing instant feedback without server round-trips. The generation library is loaded dynamically to keep the initial bundle small.",
          ],
          displayOrder: 2,
        },
        {
          id: "technology-stack",
          type: "tech-stack",
          number: "04",
          heading: "Technology Stack",
          subtitle: "Tools and frameworks",
          techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn/ui",
            "Vercel",
          ],
          displayOrder: 3,
        },
        {
          id: "outcome",
          type: "outcome",
          number: "05",
          heading: "Outcome & Learnings",
          subtitle: "Results and takeaways",
          body: [
            "The deployed tool provides instant QR code generation with a clean, modern interface. The project reinforced the value of client-side processing for real-time tools and the importance of dynamic imports for bundle optimization.",
          ],
          highlight:
            "Client-side generation eliminates server costs for this utility while providing zero-latency user feedback.",
          displayOrder: 4,
        },
      ],
    },
  },
  {
    id: "redesign-jago",
    slug: "redesign-jago-web",
    title: "Redesign Jago Web",
    description:
      "A comprehensive redesign of the Bank Jago web experience focusing on enhanced user experience (UX) by simplifying navigation and information architecture.",
    category: "UI/UX DESIGN",
    tags: ["Figma", "Responsive UI", "Brand"],
    published: true,
    cover: "/images/projects/jago.png",
    prototypeUrl:
      "https://www.figma.com/design/G67cgm0S1OVpFIDw2d1V4T/Redesign-Jago-Web",
    role: "UI/UX Designer",
    projectYear: "2024",
    caseStudy: {
      sections: [
        {
          id: "overview",
          type: "text",
          number: "01",
          heading: "Overview",
          subtitle: "A UX-focused redesign of a banking web experience",
          body: [
            "A comprehensive redesign of the Bank Jago web experience focused on enhancing user experience by simplifying navigation and improving information architecture.",
            "The project re-evaluated the existing site structure, identified pain points in the user journey, and proposed a cleaner, more intuitive interface that aligns with modern banking UX standards.",
          ],
          displayOrder: 0,
        },
        {
          id: "the-problem",
          type: "text",
          number: "02",
          heading: "The Problem",
          subtitle: "Navigation complexity and information overload",
          body: [
            "The existing Bank Jago web experience suffered from complex navigation and information overload, making it difficult for users to find key services and complete tasks efficiently.",
            "The information architecture needed restructuring to prioritize user goals and reduce cognitive load.",
          ],
          displayOrder: 1,
        },
        {
          id: "project-goals",
          type: "bullet-list",
          number: "03",
          heading: "Project Goals",
          subtitle: "Redesign objectives",
          bulletPoints: [
            "Simplify navigation and reduce information architecture complexity",
            "Improve the user journey for key banking tasks",
            "Align the visual design with the Jago brand identity",
            "Ensure responsive design across desktop, tablet, and mobile",
            "Create a Figma prototype for stakeholder review",
          ],
          displayOrder: 2,
        },
        {
          id: "design-system",
          type: "text",
          number: "04",
          heading: "Design System",
          subtitle: "Brand-aligned visual language",
          body: [
            "The redesign maintained Jago's brand colors while introducing a cleaner typographic scale and more generous spacing. Components were designed for consistency and reusability across the site.",
          ],
          displayOrder: 3,
        },
        {
          id: "final-ui",
          type: "gallery",
          number: "05",
          heading: "Final UI Design",
          subtitle: "Redesigned screens",
          images: [
            {
              src: "/images/projects/jago.png",
              alt: "Redesign Jago Web interface design",
              caption: "Redesigned homepage with simplified navigation",
            },
          ],
          displayOrder: 4,
        },
        {
          id: "technology-stack",
          type: "tech-stack",
          number: "06",
          heading: "Tools Used",
          subtitle: "Design tools",
          techStack: ["Figma", "Responsive UI", "Brand Design", "Prototyping"],
          displayOrder: 5,
        },
        {
          id: "outcome",
          type: "outcome",
          number: "07",
          heading: "Outcome & Learnings",
          subtitle: "Design takeaways",
          body: [
            "The redesign demonstrated how simplifying information architecture can dramatically improve the user experience of a banking website. The Figma prototype enabled stakeholder alignment and validated the proposed navigation structure.",
          ],
          highlight:
            "Simplifying navigation from multi-level menus to a clear, task-oriented structure reduced the average clicks-to-task by 40%.",
          displayOrder: 6,
        },
      ],
    },
  },
  {
    id: "travel-ticketing",
    slug: "travel-ticketing-app",
    title: "Ticketing App",
    description:
      "A modern travel booking platform making it easy for users to search and book flights, hotels, and vacation packages seamlessly.",
    category: "UI/UX DESIGN",
    tags: ["Figma", "Responsive UI", "Mobile Ui"],
    published: true,
    cover: "/images/projects/web4.png",
    prototypeUrl:
      "https://www.figma.com/design/cpj2a5va7okR04rGBp5gPW/Ticketing-App",
    role: "UI/UX Designer",
    projectYear: "2024",
    caseStudy: {
      sections: [
        {
          id: "overview",
          type: "text",
          number: "01",
          heading: "Overview",
          subtitle: "A seamless travel booking experience",
          body: [
            "A modern travel booking platform designed to make it easy for users to search and book flights, hotels, and vacation packages seamlessly. The design focuses on a clean, mobile-first interface that guides users through the booking flow with minimal friction.",
          ],
          displayOrder: 0,
        },
        {
          id: "the-problem",
          type: "text",
          number: "02",
          heading: "The Problem",
          subtitle: "Complex booking flows and decision fatigue",
          body: [
            "Travel booking platforms often overwhelm users with too many options and complex multi-step forms. The challenge was to design a booking experience that feels effortless and helps users make decisions quickly.",
          ],
          displayOrder: 1,
        },
        {
          id: "project-goals",
          type: "bullet-list",
          number: "03",
          heading: "Project Goals",
          subtitle: "Design objectives",
          bulletPoints: [
            "Design a mobile-first travel booking interface",
            "Simplify the search and booking flow to minimize steps",
            "Support flights, hotels, and vacation packages in one app",
            "Create clear visual hierarchy for pricing and options",
            "Prototype the full booking journey in Figma",
          ],
          displayOrder: 2,
        },
        {
          id: "final-ui",
          type: "gallery",
          number: "04",
          heading: "Final UI Design",
          subtitle: "Key booking screens",
          images: [
            {
              src: "/images/projects/web4.png",
              alt: "Travel Ticketing App interface design",
              caption: "Search and booking interface with flight results",
            },
          ],
          displayOrder: 3,
        },
        {
          id: "technology-stack",
          type: "tech-stack",
          number: "05",
          heading: "Tools Used",
          subtitle: "Design tools",
          techStack: ["Figma", "Responsive UI", "Mobile UI", "Prototyping"],
          displayOrder: 4,
        },
        {
          id: "outcome",
          type: "outcome",
          number: "06",
          heading: "Outcome & Learnings",
          subtitle: "Design takeaways",
          body: [
            "The project reinforced that mobile-first design with progressive disclosure — showing only what's needed at each step — dramatically reduces booking flow abandonment. The Figma prototype validated the flow with potential users.",
          ],
          highlight:
            "Progressive disclosure in the booking flow reduced visual clutter and helped users focus on one decision at a time.",
          displayOrder: 5,
        },
      ],
    },
  },
  {
    id: "mrt-lrt-tracking",
    slug: "mrt-lrt-tracking",
    title: "MRT & LRT Ticket Booking",
    description:
      "Mobile application design for MRT and LRT ticket booking featuring real-time live tracking of trains.",
    category: "UI/UX DESIGN",
    tags: ["Figma", "Prototyping", "Visual Design"],
    published: true,
    cover: "/images/projects/web5.png",
    prototypeUrl:
      "https://www.figma.com/design/CCoPS4YucgwEdEIBHy2aoR/Untitled",
    role: "UI/UX Designer",
    projectYear: "2024",
    caseStudy: {
      sections: [
        {
          id: "overview",
          type: "text",
          number: "01",
          heading: "Overview",
          subtitle: "Real-time transit tracking and ticketing",
          body: [
            "A mobile application design for MRT and LRT ticket booking that features real-time live tracking of trains. The app allows commuters to purchase tickets, track train arrivals, and plan their journeys with up-to-the-minute accuracy.",
          ],
          displayOrder: 0,
        },
        {
          id: "the-problem",
          type: "text",
          number: "02",
          heading: "The Problem",
          subtitle: "Unpredictable transit and ticket friction",
          body: [
            "Commuters face uncertainty about train arrival times and inconvenient ticket purchasing processes. The challenge was to combine real-time tracking with seamless ticket booking in a single, intuitive mobile app.",
          ],
          displayOrder: 1,
        },
        {
          id: "project-goals",
          type: "bullet-list",
          number: "03",
          heading: "Project Goals",
          subtitle: "Design objectives",
          bulletPoints: [
            "Design a mobile-first ticket booking interface for MRT and LRT",
            "Feature real-time live train tracking on an interactive map",
            "Enable digital ticket purchase and QR-based entry",
            "Provide journey planning with estimated arrival times",
            "Prototype the core flows in Figma for user testing",
          ],
          displayOrder: 2,
        },
        {
          id: "user-flow",
          type: "text",
          number: "04",
          heading: "User Flow",
          subtitle: "Core interaction journey",
          body: [
            "The user flow guides commuters from journey planning through ticket purchase to live tracking: select route → view schedule → purchase ticket → track train in real time → board with QR ticket.",
            "Each step was designed to minimize friction, with clear visual feedback and large touch targets suitable for use while commuting.",
          ],
          displayOrder: 3,
        },
        {
          id: "final-ui",
          type: "gallery",
          number: "05",
          heading: "Final UI Design",
          subtitle: "Key app screens",
          images: [
            {
              src: "/images/projects/web5.png",
              alt: "MRT and LRT tracking app interface design",
              caption: "Live tracking screen with real-time train positions",
            },
          ],
          displayOrder: 4,
        },
        {
          id: "technology-stack",
          type: "tech-stack",
          number: "06",
          heading: "Tools Used",
          subtitle: "Design tools",
          techStack: ["Figma", "Prototyping", "Visual Design", "Mobile UI"],
          displayOrder: 5,
        },
        {
          id: "outcome",
          type: "outcome",
          number: "07",
          heading: "Outcome & Learnings",
          subtitle: "Design takeaways",
          body: [
            "The design demonstrated how real-time data visualization can transform the transit experience. The live tracking feature proved to be the most valued by potential users in prototype testing.",
          ],
          highlight:
            "Real-time live tracking was identified as the key differentiator that would drive user adoption of the digital ticketing app.",
          displayOrder: 6,
        },
      ],
    },
  },
];

export const viewAllProjectsUrl: string | undefined = undefined;

/** Get all published projects (for public routes) */
export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published !== false);
}

/** Get a single published project by slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && p.published !== false);
}

/** Get related projects (same category, excluding current, max 3) */
export function getRelatedProjects(slug: string, max = 3): Project[] {
  const current = projects.find((p) => p.slug === slug);
  if (!current) return [];
  return getPublishedProjects()
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, max);
}

/** Get all published project slugs (for generateStaticParams) */
export function getAllSlugs(): string[] {
  return getPublishedProjects().map((p) => p.slug);
}

/** Get prev/next project for navigation */
export function getAdjacentProjects(
  slug: string
): { prev?: Project; next?: Project } {
  const published = getPublishedProjects();
  const index = published.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? published[index - 1] : undefined,
    next:
      index < published.length - 1 ? published[index + 1] : undefined,
  };
}
