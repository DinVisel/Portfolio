import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { projects } from "@/content/portfolio";
import { accentTag } from "@/lib/accent";

export default function FeaturedProjectTile() {
  const project = projects[0];

  return (
    <div className="md:col-span-5 md:row-span-2 glass-card rounded-xl overflow-hidden flex flex-col">
      <div className="h-48 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent z-10"></div>
        {project.image ? (
          <Image
            className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            alt={project.imageAlt}
            src={project.image}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
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
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="bg-surface-container-highest/90 px-3 py-1 rounded-full font-label-sm text-label-sm text-secondary border border-outline-variant/20">
            {project.badge}
          </span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-headline-md text-headline-md mb-2 text-on-surface">
          {project.title}
        </h3>
        <p className="text-on-surface-variant font-body-md text-body-md mb-4 line-clamp-2">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.label}
              className={`px-2 py-0.5 rounded font-label-sm text-label-sm border ${accentTag[tag.accent]}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <Link
            className="text-secondary font-label-sm text-label-sm flex items-center gap-1 hover:underline"
            href={`/projects/${project.slug}`}
          >
            View Case Study <Icon name="north_east" className="text-sm" />
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="open_in_new" className="text-on-surface-variant" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
