const links = ["GitHub", "LinkedIn", "Twitter", "Email"];

export default function Footer() {
  return (
    <footer className="w-full py-stack-lg border-t border-outline-variant/20 bg-surface-container-lowest flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-stack-md">
      <div className="font-code-md text-code-md text-secondary">
        © 2024 DEV_ROOT.SYS
      </div>
      <div className="flex gap-8">
        {links.map((link) => (
          <a
            key={link}
            className="font-code-md text-code-md text-on-surface-variant hover:text-tertiary hover:translate-x-1 transition-all cursor-pointer"
            href="#"
          >
            {link}
          </a>
        ))}
      </div>
      <div className="text-tertiary font-code-md text-code-md flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-tertiary subtle-pulse"></span>
        System Status: Nominal
      </div>
    </footer>
  );
}
