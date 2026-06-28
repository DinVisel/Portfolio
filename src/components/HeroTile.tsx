import Icon from "./Icon";

export default function HeroTile() {
  return (
    <div className="md:col-span-8 md:row-span-2 glass-card rounded-xl p-8 relative overflow-hidden flex flex-col justify-between group">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(178, 205, 187) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>
      {/* Background Code Snippet */}
      <div className="absolute top-0 right-0 p-6 opacity-5 font-label-sm text-label-sm select-none pointer-events-none group-hover:opacity-10 transition-opacity">
        <pre>
          <code>
            <span className="syntax-keyword">const</span>{" "}
            <span className="syntax-function">initPortfolio</span> = () =&gt; {"{"}
            {"\n"}
            {"  "}
            <span className="syntax-keyword">return</span> {"{"}
            {"\n"}
            {"    "}stack: [<span className="syntax-string">&apos;Next.js&apos;</span>,{" "}
            <span className="syntax-string">&apos;TS&apos;</span>],{"\n"}
            {"    "}status: <span className="syntax-string">&apos;Available&apos;</span>
            {"\n"}
            {"  }"}
            {"\n"}
            {"}"}
          </code>
        </pre>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-2 w-2 rounded-full bg-secondary subtle-pulse"></span>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
            Available for hire
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl mb-4 max-w-2xl text-on-surface">
          Building <span className="text-primary">high-performance</span> web
          experiences with precision.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
          I&apos;m a Next.js and TypeScript specialist focused on creating
          scalable, architecturally sound applications that don&apos;t compromise
          on design.
        </p>
      </div>
      <div className="mt-8 flex gap-4">
        <button className="bg-primary px-6 py-3 rounded-lg font-body-md text-on-primary font-bold flex items-center gap-2 hover:brightness-105 transition-all active:scale-95">
          <Icon name="mail" />
          Get In Touch
        </button>
        <button className="border border-secondary/30 px-6 py-3 rounded-lg font-body-md text-secondary font-bold flex items-center gap-2 hover:bg-secondary/5 transition-all active:scale-95">
          <Icon name="download" />
          Resume
        </button>
      </div>
    </div>
  );
}
