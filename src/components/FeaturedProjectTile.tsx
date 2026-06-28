import Image from "next/image";
import Icon from "./Icon";

const tags = [
  { label: "Next.js 14", className: "bg-primary/10 text-primary border-primary/20" },
  { label: "PostgreSQL", className: "bg-secondary/10 text-secondary border-secondary/20" },
  { label: "Tailwind", className: "bg-tertiary/10 text-tertiary border-tertiary/20" },
];

export default function FeaturedProjectTile() {
  return (
    <div className="md:col-span-5 md:row-span-2 glass-card rounded-xl overflow-hidden flex flex-col">
      <div className="h-48 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent z-10"></div>
        <Image
          className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          alt="A sleek web application dashboard with complex data visualizations, glowing neon blue charts, and a clean dark interface."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAe146QWTZhwlly2USrGeMJ4DEp1EsvFGfl4F-uIT4HYALPcbZ3T1Kc_ND_5l9eqZI0GlNuuN_pXdH2aVrUPg9L-ru-naMP65d1M0vKuN-0aMLX7bcBNisqNVp4Ua4LK_YwOWoowI-C2MmdVJPZIP3sCcQG-IiVeDIbOv2vHqSGRB3Q6Te44fCeLOzTK0ygRlqpVNUSTbCCRfsovJM4TPC7th6rGW-JPZ2LItE4LaYI2tPDXs_mnRIZg"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="bg-surface-container-highest/90 px-3 py-1 rounded-full font-label-sm text-label-sm text-secondary border border-outline-variant/20">
            Case Study
          </span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-headline-md text-headline-md mb-2 text-on-surface">
          Project: NovaFlow
        </h3>
        <p className="text-on-surface-variant font-body-md text-body-md mb-4 line-clamp-2">
          Enterprise-grade CI/CD orchestration platform built with Next.js 14 and
          tRPC.
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={`px-2 py-0.5 rounded font-label-sm text-label-sm border ${tag.className}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <a
            className="text-secondary font-label-sm text-label-sm flex items-center gap-1 hover:underline"
            href="#"
          >
            View Case Study{" "}
            <Icon name="north_east" className="text-sm" />
          </a>
          <Icon name="open_in_new" className="text-on-surface-variant" />
        </div>
      </div>
    </div>
  );
}
