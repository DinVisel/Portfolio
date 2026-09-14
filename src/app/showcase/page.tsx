import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShowcaseBoot from "@/components/showcase/ShowcaseBoot";
import MetricsStrip from "@/components/showcase/MetricsStrip";
import ProjectStage from "@/components/showcase/ProjectStage";
import StackOrbit from "@/components/showcase/StackOrbit";
import ShowcaseCTA from "@/components/showcase/ShowcaseCTA";
import { projects } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Showcase | Arda Özcan",
  description:
    "An interactive walkthrough of shipped products — live metrics, project stages, and the stack behind them.",
};

export default function ShowcasePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow w-full">
        <ShowcaseBoot />
        <MetricsStrip />
        {projects.map((project, index) => (
          <ProjectStage key={project.slug} project={project} index={index} />
        ))}
        <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
          <header className="text-center mb-10">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
              {"// tech_arsenal"}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-3">
              The Stack
            </h2>
          </header>
          <StackOrbit />
        </section>
        <ShowcaseCTA />
      </main>
      <Footer />
    </>
  );
}
