import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "material-symbols/outlined.css";
import "./globals.css";
import MotionProvider from "@/components/motion/MotionProvider";
import ScrollProgress from "@/components/motion/ScrollProgress";
import RouteProgress from "@/components/motion/RouteProgress";
import CommandPalette from "@/components/motion/CommandPalette";
import { profile } from "@/content/portfolio";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "Backend engineer building production APIs and data platforms with ASP.NET Core, NestJS, and PostgreSQL.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dinvisel.github.io/Portfolio/"),
  title: "Arda Özcan — Backend Engineer",
  description,
  openGraph: {
    title: "Arda Özcan — Backend Engineer",
    description,
    siteName: "Arda Özcan",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Backend Engineer",
    email: profile.email,
    url: "https://dinvisel.github.io/Portfolio/",
    sameAs: [
      "https://github.com/DinVisel",
      "https://www.linkedin.com/in/arda-özcan-707671327",
    ],
  };

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>
          <ScrollProgress />
          <RouteProgress />
          <CommandPalette />
          <ViewTransition
            enter={{
              "nav-forward": "nav-forward",
              "nav-back": "nav-back",
              default: "none",
            }}
            exit={{
              "nav-forward": "nav-forward",
              "nav-back": "nav-back",
              default: "none",
            }}
            default="none"
          >
            {children}
          </ViewTransition>
        </MotionProvider>
      </body>
    </html>
  );
}
