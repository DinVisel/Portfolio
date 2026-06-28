import Link from "next/link";
import Icon from "./Icon";
import { navLinks, profile } from "@/content/portfolio";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm">
      <div className="flex justify-between items-center px-margin-desktop py-4 max-w-[1280px] mx-auto w-full">
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="font-code-md text-code-md font-bold text-secondary">
            {profile.brand}
          </span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              className="text-on-surface-variant font-body-md text-body-md hover:text-secondary transition-colors duration-200"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Home"
            className="p-2 rounded-lg hover:bg-surface-variant transition-colors active:scale-95"
          >
            <Icon name="terminal" className="text-primary" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
