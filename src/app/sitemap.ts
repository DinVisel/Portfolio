import type { MetadataRoute } from "next";
import { projects } from "@/content/portfolio";

export const dynamic = "force-static";

const baseUrl = "https://dinvisel.github.io/Portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/experience", "/contact"].map((path) => ({
    url: `${baseUrl}${path}/`,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}/`,
  }));

  return [...staticRoutes, ...projectRoutes];
}
