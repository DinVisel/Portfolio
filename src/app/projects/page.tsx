import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Projects | Arda Özcan",
  description:
    "Live, production-grade products built by Arda Özcan — scheduling SaaS, B2B CRM, and an AI-powered iOS app.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
        <header className="mb-10">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
            {"// selected_work"}
          </span>
          <h1 className="font-headline-lg text-headline-lg md:text-headline-xl md:font-headline-xl text-on-surface mt-3">
            Projects
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4">
            A curated set of live, production-grade products — from full-stack
            SaaS to a native, AI-powered mobile app.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
