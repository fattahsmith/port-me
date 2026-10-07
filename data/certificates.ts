export type Certificate = {
  id: string;
  title: string;
  organization: string;
  issueDate?: string;
  credentialId?: string;
  category: "PROFESSIONAL" | "INTERNSHIP" | "BOOTCAMP"  | "competition";
  image?: string;
  verificationUrl?: string;
};

export const certificates: Certificate[] = [
  {
    id: "sc-900",
    title: "Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)",
    organization: "Microsoft",
    issueDate: "13 August 2024",
    category: "PROFESSIONAL",
    image: "/images/sertif/microsoft.png",
    verificationUrl: undefined,
  },
  {
    id: "internship",
    title: "AI Fundamentals",
    organization: "Dicoding",
    issueDate: "06 october 2025",
    category: "BOOTCAMP",
    image: "/images/sertif/ai.png",
    verificationUrl: undefined,
  },
  {
    id: "bootcamp",
    title: "Bootcamp Certificate",
    organization: "Universitas Dinamika",
    issueDate: "2025",
    category: "BOOTCAMP",
    image: "/images/sertif/dina.jpg",
    verificationUrl: undefined,
  },
   {
    id: "bootcamp",
    title: "Gayatama Competition web development",
    organization: "GAYATAMA Universitas surabaya",
    issueDate: "06 oktober 2026",
    category: "competition",
    image: "/images/sertif/gayatama.svg",
  },
  {
    id: "bootcamp",
    title: "Bootcamp Certificate",
    organization: "Telkom University",
    issueDate: "30 november 2024",
    category: "BOOTCAMP",
    image: "/images/sertif/golang.png",
    verificationUrl: undefined,
  },
  {
    id: "bootcamp",
    title: "Bootcamp Certificate",
    organization: "Telkom University",
    issueDate: "1 desember 2024",
    category: "BOOTCAMP",
    image: "/images/sertif/react.png",
    verificationUrl: undefined,
  },
  {
    id: "bootcamp",
    title: "Participation Certificate",
    organization: "",
    issueDate: "February-August 2024",
    category: "BOOTCAMP",
    image: "/images/sertif/part.png",
  },

  {
    id: "bootcamp",
    title: "Bootcamp Certificate",
    organization: "RevoU",
    issueDate: "4 july 2025",
    category: "BOOTCAMP",
    image: "/images/sertif/sofwareen.png",
    verificationUrl: undefined,
  },
  {
    id: "bootcamp",
    title: "Ui/UX Certificate",
    organization: "MySkill",
    issueDate: "8 August 2025",
    category: "BOOTCAMP",
    image: "/images/sertif/ui.png",
    verificationUrl: undefined,
  },
    {
    id: "PROFESSIONAL",
    title: "Intership Certificate",
    organization: "Lab Akselerasi",
    issueDate: "18 september 2025",
    category: "PROFESSIONAL",
    image: "/images/sertif/psg.jpg",
    verificationUrl: undefined,
  },

 
];
