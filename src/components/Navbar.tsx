import Icon from "./Icon";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm">
      <div className="flex justify-between items-center px-margin-desktop py-4 max-w-[1280px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="font-code-md text-code-md font-bold text-secondary">
            DEV_ROOT.SYS
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a
            className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md"
            href="#"
          >
            Projects
          </a>
          <a
            className="text-on-surface-variant font-body-md text-body-md hover:text-secondary transition-colors duration-200"
            href="#"
          >
            Experience
          </a>
          <a
            className="text-on-surface-variant font-body-md text-body-md hover:text-secondary transition-colors duration-200"
            href="#"
          >
            Contact
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-surface-variant transition-colors active:scale-95">
            <Icon name="terminal" className="text-primary" />
          </button>
        </div>
      </div>
    </nav>
  );
}
