export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  accent: "lime" | "pink" | "purple" | "neutral";
  tags: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "FRONTEND DEVELOPMENT",
    description: "Interfaces, components, and responsive experiences in the browser.",
    accent: "lime",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Responsive Web Design",
    ],
  },
  {
    id: "backend",
    title: "BACKEND DEVELOPMENT",
    description: "APIs, services, and data layers that power web products.",
    accent: "purple",
    tags: [
      "Node.js",
      "Laravel",
      "PHP",
      "REST APIs",
      "Supabase",
      "Firebase",
      "PostgreSQL",
    ],
  },
  {
    id: "uiux",
    title: "UI/UX & PRODUCT DESIGN",
    description: "Research, flows, and systems that keep products usable.",
    accent: "pink",
    tags: [
      "Figma",
      "Wireframing",
      "Prototyping",
      "User Flows",
      "Design Systems",
      "Responsive UI",
      "UX Research Fundamentals",
    ],
  },
  {
    id: "creative",
    title: "CREATIVE TOOLS",
    description: "Visual craft for brand, layout, and communication.",
    accent: "neutral",
    tags: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva",
      "Graphic Design",
      "Visual Communication",
    ],
  },
];
