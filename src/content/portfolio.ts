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

export type StackItem = {
  label: string;
  value: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Short label shown on the image badge, e.g. "Live in Production". */
  badge: string;
  /** One-liner used on cards and the featured tile. */
  summary: string;
  /** Longer description for the project detail page. */
  overview: string;
  /** Key technology chips shown on cards (keep to ~3–5). */
  tags: Tag[];
  /** Full categorized stack for the detail page. */
  stack: StackItem[];
  features: Feature[];
  /** Optional cover image; a gradient placeholder is shown when omitted. */
  image?: string;
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
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
    slug: "aptly",
    title: "Aptly",
    badge: "Live in Production",
    summary:
      "Full-stack scheduling SaaS that digitizes booking for small businesses and independent professionals.",
    overview:
      "Aptly is a live, full-stack scheduling SaaS platform built to help small businesses and independent professionals digitize their operations. The platform eliminates manual scheduling hassles by providing automated calendar management, streamlined client booking workflows, and an intuitive administrative interface designed to optimize daily appointment streams.",
    tags: [
      { label: "Next.js", accent: "on-surface" },
      { label: "NestJS", accent: "primary" },
      { label: "PostgreSQL", accent: "secondary" },
      { label: "TypeScript", accent: "tertiary" },
      { label: "GSAP", accent: "primary" },
    ],
    stack: [
      { label: "Frontend", value: "Next.js, Tailwind CSS" },
      { label: "Backend", value: "Node.js (NestJS)" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Language", value: "TypeScript" },
      { label: "Animations", value: "GSAP (GreenSock)" },
      { label: "DevOps", value: "Hetzner · automated CI/CD" },
    ],
    features: [
      {
        title: "Interactive Calendar & Booking Engine",
        description:
          "A seamless, high-performance calendar interface for both businesses and clients to manage slots effortlessly.",
      },
      {
        title: "Premium UX/UI",
        description:
          "A sleek modern layout enhanced by premium, hardware-accelerated visual transitions.",
      },
      {
        title: "Business Digitalization Toolkit",
        description:
          "Built-in tools tailored for solo practitioners and small teams to handle client data, tracking, and scheduling retention.",
      },
    ],
    imageAlt: "Aptly scheduling SaaS dashboard.",
    liveUrl: "#",
  },
  {
    slug: "optikdata",
    title: "OptikData",
    badge: "Live in Production",
    summary:
      "Production-grade B2B CRM purpose-built for optical stores — prescriptions, payments, and order pipelines in one place.",
    overview:
      "OptikData is a live, production-grade B2B CRM application custom-built to streamline operations for optical stores. Moving away from generic retail tools, this platform centralizes complex optical customer records, manages glass and frame vision prescriptions, integrates secure merchant payment gateways, and optimizes order pipelines for fast-paced retail environments.",
    tags: [
      { label: "React (Vite)", accent: "on-surface" },
      { label: "NestJS", accent: "primary" },
      { label: "PostgreSQL", accent: "secondary" },
      { label: "TypeScript", accent: "tertiary" },
    ],
    stack: [
      { label: "Frontend", value: "Vite (React)" },
      { label: "Backend", value: "Node.js (NestJS)" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Language", value: "JavaScript / TypeScript" },
      { label: "DevOps", value: "Automated CI/CD · zero-downtime" },
    ],
    features: [
      {
        title: "Vision Prescription Logging",
        description:
          "Secure, detailed profiles that track precise glass dimensions, focal measurements, and customer purchasing history.",
      },
      {
        title: "Integrated Payment Gateways",
        description:
          "Automated financial management integrated directly with secure enterprise payment processors.",
      },
      {
        title: "Workflow Automation",
        description:
          "Tailored administrative dashboards that minimize manual retail paperwork for opticians.",
      },
    ],
    imageAlt: "OptikData optometry B2B CRM interface.",
    liveUrl: "#",
  },
  {
    slug: "takipnet",
    title: "TakipNet",
    badge: "Live on the App Store",
    summary:
      "AI-powered native iOS app that tracks exam performance and pinpoints students' conceptual gaps.",
    overview:
      "TakipNet (NetTracker) is an AI-integrated native mobile application live on the App Store, built to revolutionize how students prepare for standardized examinations. Acting as an intelligent study companion, the app enables rigorous score tracking, deep question logging, and diagnostic feedback to maximize study efficiency.",
    tags: [
      { label: "Swift", accent: "tertiary" },
      { label: "iOS", accent: "on-surface" },
      { label: "MVVM", accent: "primary" },
      { label: "Firebase", accent: "secondary" },
    ],
    stack: [
      { label: "Mobile", value: "Native iOS (Swift)" },
      { label: "Architecture", value: "MVVM" },
      { label: "Backend & Auth", value: "Firebase" },
      { label: "DevOps", value: "App Store Connect · TestFlight" },
    ],
    features: [
      {
        title: "AI-Driven Performance Analytics",
        description:
          "Advanced algorithms automatically parse incorrect answers to pinpoint exact conceptual gaps and topic weaknesses.",
      },
      {
        title: "Advanced Progress Dashboard",
        description:
          "Organized data charts tracking individual performance, net scores, and preparation trajectory over time.",
      },
      {
        title: "Targeted Revision Insights",
        description:
          "Automated, data-driven guidance that helps students turn their weak points into strengths before exam day.",
      },
    ],
    imageAlt: "TakipNet exam performance tracking mobile app.",
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
