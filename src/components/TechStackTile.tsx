import Icon from "./Icon";

const techs = [
  {
    name: "Next.js",
    icon: "deployed_code",
    cardBorder: "hover:border-primary/20",
    iconColor: "text-on-surface",
    labelHover: "group-hover/item:text-on-surface",
  },
  {
    name: "TypeScript",
    icon: "javascript",
    cardBorder: "hover:border-secondary/20",
    iconColor: "text-secondary",
    labelHover: "group-hover/item:text-secondary",
  },
  {
    name: "React",
    icon: "layers",
    cardBorder: "hover:border-primary/20",
    iconColor: "text-primary",
    labelHover: "group-hover/item:text-primary",
  },
  {
    name: "Node.js",
    icon: "hub",
    cardBorder: "hover:border-tertiary/20",
    iconColor: "text-tertiary",
    labelHover: "group-hover/item:text-tertiary",
  },
];

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
        {techs.map((tech) => (
          <div
            key={tech.name}
            className={`bg-surface-container-low rounded-lg p-4 flex flex-col items-center justify-center border border-outline-variant/10 ${tech.cardBorder} transition-all group/item`}
          >
            <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-surface-container-high relative">
              <Icon
                name={tech.icon}
                className={`text-3xl ${tech.iconColor} relative z-10`}
              />
            </div>
            <span
              className={`font-label-sm text-label-sm text-on-surface-variant ${tech.labelHover} transition-colors`}
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-outline-variant/10">
        <p className="font-label-sm text-label-sm text-on-surface-variant italic">
          &quot;Continuously optimizing the stack for performance and developer
          experience.&quot;
        </p>
      </div>
    </div>
  );
}
