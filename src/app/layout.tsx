import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "material-symbols/outlined.css";
import "./globals.css";
import MotionProvider from "@/components/motion/MotionProvider";
import ScrollProgress from "@/components/motion/ScrollProgress";
import RouteProgress from "@/components/motion/RouteProgress";
import CommandPalette from "@/components/motion/CommandPalette";
import CustomCursor from "@/components/motion/CustomCursor";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://dinvisel.github.io/Portfolio/"),
  title: "DevTerminal | Portfolio",
  description:
    "Next.js and TypeScript specialist building high-performance, scalable web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col pt-20">
        <MotionProvider>
          <ScrollProgress />
          <RouteProgress />
          <CommandPalette />
          <CustomCursor />
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
