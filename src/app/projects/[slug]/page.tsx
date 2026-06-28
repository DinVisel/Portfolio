import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { projects } from "@/content/portfolio";
import { accentTag } from "@/lib/accent";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} | Arda Özcan`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm hover:text-secondary transition-colors mb-8"
        >
          <Icon name="arrow_back" className="text-sm" />
          All Projects
        </Link>

        {/* Cover */}
        <div className="glass-card rounded-xl overflow-hidden mb-10">
          <div className="h-56 md:h-72 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent z-10"></div>
            {project.image ? (
              <Image
                className="w-full h-full object-cover"
                alt={project.imageAlt}
                src={project.image}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            ) : (
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(178,205,187,0.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(184,200,218,0.2), transparent 55%)",
                }}
                aria-label={project.imageAlt}
              />
            )}
            <div className="absolute top-5 left-5 z-20">
              <span className="bg-surface-container-highest/90 px-3 py-1 rounded-full font-label-sm text-label-sm text-secondary border border-outline-variant/20 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary subtle-pulse"></span>
                {project.badge}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="font-headline-lg text-headline-lg md:text-headline-xl md:font-headline-xl text-on-surface">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-5 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`px-2 py-0.5 rounded font-label-sm text-label-sm border ${accentTag[tag.accent]}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <h2 className="font-headline-md text-headline-md text-on-surface mb-3">
              Overview
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
              {project.overview}
            </p>

            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
              Key Features
            </h2>
            <ul className="flex flex-col gap-4">
              {project.features.map((feature) => (
                <li
                  key={feature.title}
                  className="glass-card rounded-lg p-5 flex gap-4"
                >
                  <Icon name="check_circle" className="text-primary mt-0.5" />
                  <div>
                    <h3 className="font-body-md text-body-md font-bold text-on-surface mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6 lg:sticky lg:top-28">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-5">
                Tech Stack
              </h2>
              <dl className="flex flex-col gap-4">
                {project.stack.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-0.5 border-b border-outline-variant/10 pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      {item.label}
                    </dt>
                    <dd className="font-body-md text-body-md text-on-surface">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {(project.liveUrl || project.repoUrl) && (
                <div className="mt-6 flex flex-col gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary px-5 py-3 rounded-lg font-body-md text-on-primary font-bold flex items-center justify-center gap-2 hover:brightness-105 transition-all active:scale-95"
                    >
                      <Icon name="open_in_new" className="text-base" />
                      Visit Live Site
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-secondary/30 px-5 py-3 rounded-lg font-body-md text-secondary font-bold flex items-center justify-center gap-2 hover:bg-secondary/5 transition-all active:scale-95"
                    >
                      <Icon name="code" className="text-base" />
                      View Source
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
