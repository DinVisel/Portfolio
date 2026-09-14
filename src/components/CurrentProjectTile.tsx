import Icon from "./Icon";
import CountUp from "./motion/CountUp";
import ProgressBar from "./motion/ProgressBar";
import { currentProject } from "@/content/portfolio";
import { accentTag } from "@/lib/accent";

export default function CurrentProjectTile() {
  const project = currentProject;

  return (
    <div className="md:col-span-4 md:row-span-2 glass-card rounded-xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-secondary subtle-pulse"></span>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
            {project.status}
          </span>
        </div>
        <Icon name="rocket_launch" className="text-secondary" />
      </div>

      <h3 className="font-headline-md text-headline-md mb-2 text-on-surface">
        {project.name}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag) => (
          <span
            key={tag.label}
            className={`px-2 py-0.5 rounded font-label-sm text-label-sm border ${accentTag[tag.accent]}`}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Progress
          </span>
          <span className="font-label-sm text-label-sm text-secondary font-bold">
            <CountUp value={project.progress} suffix="%" />
          </span>
        </div>
        <ProgressBar progress={project.progress} />
      </div>
    </div>
  );
}
