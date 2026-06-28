import Icon from "./Icon";

export default function ArticleTile() {
  return (
    <div className="md:col-span-3 md:row-span-1 glass-card rounded-xl p-6 flex flex-col justify-between group cursor-pointer overflow-hidden relative">
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon name="rss_feed" className="text-9xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm text-label-sm border border-tertiary/20">
            Article
          </span>
          <span className="text-on-surface-variant font-label-sm text-label-sm">
            5 min read
          </span>
        </div>
        <h3 className="font-headline-md text-headline-md mb-2 group-hover:text-tertiary transition-colors text-on-surface">
          The Future of RSCs
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
          Exploring the architectural shifts in React Server Components and what
          it means for the next generation of web apps.
        </p>
      </div>
      <div className="flex items-center gap-2 text-tertiary font-label-sm text-label-sm mt-4 group-hover:translate-x-1 transition-transform">
        <span>Read Full Article</span>
        <Icon name="arrow_forward" className="text-sm" />
      </div>
    </div>
  );
}
