import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { experiences } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Experience | Arda Özcan",
  description:
    "Selected engineering work, including a large-scale MSSQL to PostgreSQL database migration and legacy Delphi application modernization.",
};

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
        <header className="mb-12">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
            {"// work_history"}
          </span>
          <h1 className="font-headline-lg text-headline-lg md:text-headline-xl md:font-headline-xl text-on-surface mt-3">
            Experience
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4">
            Engineering work focused on real outcomes — modernizing legacy
            systems and moving data safely at scale.
          </p>
        </header>

        <div className="relative border-l border-outline-variant/20 ml-2 md:ml-3 flex flex-col gap-10">
          {experiences.map((exp) => (
            <article
              key={`${exp.role}-${exp.organization}`}
              className="relative pl-8 md:pl-10"
            >
              {/* Timeline node */}
              <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-primary border-4 border-background"></span>

              <div className="glass-card rounded-xl p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      {exp.role}
                    </h2>
                    <p className="font-body-md text-body-md text-secondary mt-1">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary border border-tertiary/20 font-label-sm text-label-sm">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  {exp.summary}
                </p>

                <ul className="flex flex-col gap-3 mb-6">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <Icon
                        name="chevron_right"
                        className="text-primary text-base mt-0.5"
                      />
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant border border-outline-variant/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
