import type { Metadata } from "next";
import { DM_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PixelAnimalController } from "@/components/pixel-animals";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${profile.name} | UI/UX Designer & Web Developer`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} | Portfolio`,
    description: profile.tagline,
    type: "website",
    locale: "en_US",
    siteName: profile.site.logo,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Portfolio`,
    description: profile.tagline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmMono.variable} h-full scroll-smooth`}
    >
      <body className="theme-transition min-h-full flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          {children}
          <PixelAnimalController />
        </ThemeProvider>
      </body>
    </html>
  );
}
