import Icon from "./Icon";

const socials = [
  { icon: "link", hover: "hover:text-primary" },
  { icon: "share", hover: "hover:text-secondary" },
  { icon: "alternate_email", hover: "hover:text-tertiary" },
];

export default function SocialTile() {
  return (
    <div className="md:col-span-3 md:row-span-1 glass-card rounded-xl p-6 flex items-center justify-around">
      {socials.map((social) => (
        <a
          key={social.icon}
          className={`p-3 rounded-full bg-surface-container-high border border-outline-variant/10 text-on-surface-variant ${social.hover} transition-all hover:scale-105 active:scale-95`}
          href="#"
        >
          <Icon name={social.icon} className="text-2xl" />
        </a>
      ))}
    </div>
  );
}
