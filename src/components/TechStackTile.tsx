import Icon from "./Icon";
import { techStack, profile } from "@/content/portfolio";
import { accentText, accentHoverBorder, accentGroupHoverText } from "@/lib/accent";

export default function TechStackTile() {
  return (
    <div className="md:col-span-4 md:row-span-2 glass-card rounded-xl p-6 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Tech Arsenal
        </h3>
        <Icon name="terminal" className="text-secondary" />
      </div>
      <div className="grid grid-cols-2 gap-4 flex-grow">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className={`bg-surface-container-low rounded-lg p-4 flex flex-col items-center justify-center border border-outline-variant/10 ${accentHoverBorder[tech.accent]} transition-all group/item`}
          >
            <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-surface-container-high relative">
              <Icon
                name={tech.icon}
                className={`text-3xl ${accentText[tech.accent]} relative z-10`}
              />
            </div>
            <span
              className={`font-label-sm text-label-sm text-on-surface-variant ${accentGroupHoverText[tech.accent]} transition-colors`}
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-outline-variant/10">
        <p className="font-label-sm text-label-sm text-on-surface-variant italic">
          &quot;{profile.arsenalQuote}&quot;
        </p>
      </div>
    </div>
  );
}
