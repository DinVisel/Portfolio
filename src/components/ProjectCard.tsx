import { ViewTransition } from "react";
import Link from "next/link";
import Icon from "./Icon";
import ShimmerImage from "./motion/ShimmerImage";
import type { Project } from "@/content/portfolio";
import { accentTag } from "@/lib/accent";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="glass-card rounded-xl overflow-hidden flex flex-col group h-full"
    >
      <ViewTransition name={`project-${project.slug}`} share="morph">
        <div className="h-44 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent z-10"></div>
          {project.image ? (
            <ShimmerImage
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              alt={project.imageAlt}
              src={project.image}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, rgba(178,205,187,0.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(184,200,218,0.2), transparent 55%)",
              }}
              aria-label={project.imageAlt}
            />
          )}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="bg-surface-container-highest/90 px-3 py-1 rounded-full font-label-sm text-label-sm text-secondary border border-outline-variant/20 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary subtle-pulse"></span>
              {project.badge}
            </span>
          </div>
        </div>
      </ViewTransition>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-headline-md text-headline-md mb-2 text-on-surface group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        {project.context && (
          <p className="font-label-sm text-label-sm text-secondary mb-2">{project.context}</p>
        )}
        <p className="text-on-surface-variant font-body-md text-body-md mb-4 line-clamp-3">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag.label}
              className={`px-2 py-0.5 rounded font-label-sm text-label-sm border ${accentTag[tag.accent]}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-1 text-secondary font-label-sm text-label-sm">
          <span className="relative">
            View Case Study
            <span className="absolute left-0 -bottom-0.5 h-px w-full bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[220ms] ease-[var(--ease-out-expo)]" />
          </span>
          <Icon
            name="north_east"
            className="text-sm transition-transform duration-[220ms] ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
