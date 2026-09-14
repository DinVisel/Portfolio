import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import Typewriter from "@/components/motion/Typewriter";
import { navLinks, profile } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "404 | Arda Özcan",
  description: "Route not found.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-[720px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full flex flex-col items-center text-center justify-center min-h-[60vh]">
        <div className="glass-card rounded-xl p-8 w-full text-left font-code-md text-code-md">
          <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
            <Icon name="terminal" className="text-tertiary" />
            {profile.brand}
          </div>
          <div className="text-tertiary">
            <Typewriter text="ERROR 404: route not found" />
          </div>
          <div className="text-on-surface-variant mt-2">
            {"> the requested path does not exist on this system."}
          </div>
          <div className="text-on-surface-variant">
            {"> available routes:"}
          </div>
          <ul className="mt-2 flex flex-col gap-1">
            <li>
              <Link href="/" className="text-secondary hover:underline">
                {"$ cd /"}
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-secondary hover:underline">
                  {`$ cd ${link.href}`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
