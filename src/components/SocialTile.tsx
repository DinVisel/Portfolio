import Icon from "./Icon";
import Magnetic from "./motion/Magnetic";
import { socialTileLinks } from "@/content/portfolio";
import { accentHoverText } from "@/lib/accent";

export default function SocialTile() {
  return (
    <div className="md:col-span-3 md:row-span-1 glass-card rounded-xl p-6 flex items-center justify-around">
      {socialTileLinks.map((social) => (
        <Magnetic key={social.label}>
          <a
            aria-label={social.label}
            className={`p-3 rounded-full bg-surface-container-high border border-outline-variant/10 text-on-surface-variant ${accentHoverText[social.accent]} transition-all hover:scale-105 hover:ring-2 hover:ring-current/30 active:scale-95`}
            href={social.href}
          >
            <Icon name={social.icon} className="text-2xl" />
          </a>
        </Magnetic>
      ))}
    </div>
  );
}
