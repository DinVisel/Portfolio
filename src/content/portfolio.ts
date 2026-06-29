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

export type EducationItem = {
	institution: string;
	degree: string;
	period: string;
	detail: string;
	icon: string;
	accent: Accent;
};

export type CurrentProject = {
	status: string;
	name: string;
	summary: string;
	/** Rough completion percentage shown as a progress bar (0–100). */
	progress: number;
	tags: Tag[];
	url?: string;
};

export type Experience = {
	role: string;
	organization: string;
	type: string;
	period: string;
	summary: string;
	highlights: string[];
	stack: string[];
};

export type ContactChannel = {
	label: string;
	value: string;
	href: string;
	icon: string;
	accent: Accent;
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
	resumeUrl: "https://github.com/DinVisel",
	arsenalQuote:
		"Continuously optimizing the stack for performance and developer experience.",
};

export const navLinks: NavLink[] = [
	{ label: "Projects", href: "/projects" },
	{ label: "Experience", href: "/experience" },
	{ label: "Contact", href: "/contact" },
];

export const techStack: Tech[] = [
	{ name: "Next.js", icon: "deployed_code", accent: "on-surface" },
	{ name: "TypeScript", icon: "code", accent: "secondary" },
	{ name: "NestJS", icon: "dns", accent: "primary" },
	{ name: "PostgreSQL", icon: "database", accent: "tertiary" },
	{ name: "React", icon: "layers", accent: "primary" },
	{ name: "Swift", icon: "smartphone", accent: "secondary" },
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
		liveUrl: "https://aptly.com.tr",
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
		liveUrl: "https://optikdata.com.tr",
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
		liveUrl: "https://apps.apple.com/us/app/takip-net/id6755928528",
	},
];

// TODO: replace with the project you're actively building right now.
export const currentProject: CurrentProject = {
	status: "In Development",
	name: "New Project",
	summary:
		"Actively building my next product — a short one-liner about what it does goes here.",
	progress: 60,
	tags: [
		{ label: "Next.js", accent: "on-surface" },
		{ label: "TypeScript", accent: "secondary" },
		{ label: "PostgreSQL", accent: "tertiary" },
	],
	url: "#",
};

// TODO: fill in your real education (institution, degree, dates).
export const education: EducationItem[] = [
	{
		institution: "Your University",
		degree: "B.Sc. Computer Engineering",
		period: "2022 — Present",
		detail: "Relevant coursework, focus, or honors.",
		icon: "school",
		accent: "primary",
	},
];

export const socialTileLinks: SocialLink[] = [
	{ label: "Website", href: "#", icon: "link", accent: "primary" },
	{ label: "Share", href: "#", icon: "share", accent: "secondary" },
	{
		label: "Email",
		href: "mailto:arda3105ozcan@gmail.com",
		icon: "alternate_email",
		accent: "tertiary",
	},
];

export const footerLinks: NavLink[] = [
	{ label: "GitHub", href: "https://github.com/DinVisel" },
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/arda-özcan-707671327",
	},
	{ label: "Twitter", href: "#" },
	{ label: "Email", href: "mailto:arda3105ozcan@gmail.com" },
];

export const experiences: Experience[] = [
	{
		role: "Freelance Full-Stack Developer",
		organization: "Pharmacology Thesis Project",
		type: "Freelance · Contract",
		// TODO: set the real year/month range
		period: "01/2026 - 03/2026",
		summary:
			"Modernized a legacy desktop research application and migrated its data layer to a modern, reliable PostgreSQL stack to support an academic pharmacology thesis.",
		highlights: [
			"Migrated a production database of ~3 million rows from Microsoft SQL Server to PostgreSQL with full data integrity and zero data loss.",
			"Rebuilt and extended the UI of a legacy Delphi application nearly 30 years old, modernizing its workflows for the researcher's needs.",
			"Reconciled and validated complex relational data during the migration to keep the application fully functional on the new database.",
		],
		stack: ["PostgreSQL", "Microsoft SQL Server", "Delphi", "Data Migration"],
	},
];

export const contactChannels: ContactChannel[] = [
	{
		label: "Email",
		value: profile.email,
		href: `mailto:${profile.email}`,
		icon: "mail",
		accent: "primary",
	},
	{
		label: "GitHub",
		value: "@username",
		href: "https://github.com/DinVisel",
		icon: "code",
		accent: "secondary",
	},
	{
		label: "LinkedIn",
		value: "in/username",
		href: "#",
		icon: "person",
		accent: "tertiary",
	},
];

export const contact = {
	heading: "Let's build something.",
	intro:
		"I'm currently open to freelance work and new opportunities. Have a project in mind or just want to talk shop? Reach out through any of the channels below.",
};
