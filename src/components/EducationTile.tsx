import Icon from "./Icon";
import { education } from "@/content/portfolio";
import { accentText } from "@/lib/accent";

export default function EducationTile() {
  return (
    <div className="md:col-span-3 md:row-span-1 glass-card rounded-xl p-6 flex flex-col group overflow-hidden relative">
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon name="school" className="text-9xl" />
      </div>
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Icon name="school" className="text-on-surface" />
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Education
        </h3>
      </div>
      <div className="flex flex-col gap-4 relative z-10">
        {education.map((item) => (
          <div key={item.institution} className="flex items-start gap-3">
            <Icon
              name={item.icon}
              className={`text-xl mt-0.5 ${accentText[item.accent]}`}
            />
            <div>
              <p className="font-body-md text-body-md text-on-surface font-bold">
                {item.degree}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {item.institution}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant/70">
                {item.period}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
