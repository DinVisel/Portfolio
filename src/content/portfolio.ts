// Central content source for the portfolio.
// Edit the values here to update the site — components read from this file.
// `accent` values map to a fixed set of Tailwind classes inside each component,
// so only use one of: "primary" | "secondary" | "tertiary" | "on-surface".

export type Accent = "primary" | "secondary" | "tertiary" | "on-surface";

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
  accent: Accent;
};

export type Tech = {
  name: string;
  icon: string;
  accent: Accent;
};

export type Tag = {
  label: string;
  accent: Accent;
};

export type Project = {
  slug: string;
  title: string;
  badge: string;
  summary: string;
  tags: Tag[];
  image: string;
  imageAlt: string;
  caseStudyUrl?: string;
  liveUrl?: string;
};

export type Article = {
  tag: string;
  readTime: string;
  title: string;
  excerpt: string;
  url: string;
};

export const profile = {
  brand: "DEV_ROOT.SYS",
  name: "Arda Özcan",
  availability: "Available for hire",
  headline: {
    before: "Building ",
    highlight: "high-performance",
    after: " web experiences with precision.",
  },
  bio: "I'm a Next.js and TypeScript specialist focused on creating scalable, architecturally sound applications that don't compromise on design.",
  email: "arda3105ozcan@gmail.com",
  resumeUrl: "#",
  arsenalQuote:
    "Continuously optimizing the stack for performance and developer experience.",
};

export const navLinks: NavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const techStack: Tech[] = [
  { name: "Next.js", icon: "deployed_code", accent: "on-surface" },
  { name: "TypeScript", icon: "javascript", accent: "secondary" },
  { name: "React", icon: "layers", accent: "primary" },
  { name: "Node.js", icon: "hub", accent: "tertiary" },
];

export const projects: Project[] = [
  {
    slug: "novaflow",
    title: "Project: NovaFlow",
    badge: "Case Study",
    summary:
      "Enterprise-grade CI/CD orchestration platform built with Next.js 14 and tRPC.",
    tags: [
      { label: "Next.js 14", accent: "primary" },
      { label: "PostgreSQL", accent: "secondary" },
      { label: "Tailwind", accent: "tertiary" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAe146QWTZhwlly2USrGeMJ4DEp1EsvFGfl4F-uIT4HYALPcbZ3T1Kc_ND_5l9eqZI0GlNuuN_pXdH2aVrUPg9L-ru-naMP65d1M0vKuN-0aMLX7bcBNisqNVp4Ua4LK_YwOWoowI-C2MmdVJPZIP3sCcQG-IiVeDIbOv2vHqSGRB3Q6Te44fCeLOzTK0ygRlqpVNUSTbCCRfsovJM4TPC7th6rGW-JPZ2LItE4LaYI2tPDXs_mnRIZg",
    imageAlt:
      "A sleek web application dashboard with complex data visualizations, glowing neon blue charts, and a clean dark interface.",
    caseStudyUrl: "#",
    liveUrl: "#",
  },
];

export const contributions = {
  totalPRs: "2.4k+",
  activeStreak: "42 Days",
};

export const featuredArticle: Article = {
  tag: "Article",
  readTime: "5 min read",
  title: "The Future of RSCs",
  excerpt:
    "Exploring the architectural shifts in React Server Components and what it means for the next generation of web apps.",
  url: "#",
};

export const socialTileLinks: SocialLink[] = [
  { label: "Website", href: "#", icon: "link", accent: "primary" },
  { label: "Share", href: "#", icon: "share", accent: "secondary" },
  { label: "Email", href: "#", icon: "alternate_email", accent: "tertiary" },
];

export const footerLinks: NavLink[] = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Email", href: "#" },
];
