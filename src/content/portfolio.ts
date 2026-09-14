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
	/** One-line "what I use it for" note, shown in the showcase stack orbit. */
	note?: string;
};

export type Metric = {
	label: string;
	value: number;
	suffix?: string;
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
	{
		name: "Next.js",
		icon: "deployed_code",
		accent: "on-surface",
		note: "App Router front ends, statically exported where the host allows it.",
	},
	{
		name: "TypeScript",
		icon: "code",
		accent: "secondary",
		note: "Default language across frontend, backend, and shared types.",
	},
	{
		name: "NestJS",
		icon: "dns",
		accent: "primary",
		note: "Structured Node APIs for platforms that outgrow a single script.",
	},
	{
		name: ".NET",
		icon: "memory",
		accent: "tertiary",
		note: "ASP.NET Core APIs for domains that need strong typing and EF Core.",
	},
	{
		name: "Go",
		icon: "bolt",
		accent: "secondary",
		note: "Standalone services for CPU-heavy work like video processing.",
	},
	{
		name: "PostgreSQL",
		icon: "database",
		accent: "tertiary",
		note: "The default datastore, from small CRMs to multi-million-row migrations.",
	},
	{
		name: "React",
		icon: "layers",
		accent: "primary",
		note: "Component layer under Next.js, and standalone Vite admin consoles.",
	},
	{
		name: "Swift",
		icon: "smartphone",
		accent: "secondary",
		note: "Native iOS apps where a cross-platform shell isn't worth it.",
	},
];

export const metrics: Metric[] = [
	{ label: "Live products shipped", value: 6, icon: "rocket_launch", accent: "primary" },
	{
		label: "Rows migrated in one project",
		value: 3,
		suffix: "M",
		icon: "database",
		accent: "secondary",
	},
	{
		label: "Years modernizing a legacy app",
		value: 30,
		icon: "history",
		accent: "tertiary",
	},
	{ label: "Core technologies in rotation", value: 8, icon: "layers", accent: "primary" },
];

export const bootLog: string[] = [
	"> initializing dev_root.sys",
	"> loading projects [6]",
	"> linking stack: next.js · typescript · .net · go · postgresql",
	"> status: available",
];

export const projects: Project[] = [
	{
		slug: "edlib",
		title: "EdLib",
		badge: "Live on iOS & Android",
		summary:
			"Cross-platform education platform that fuses primary-school classroom management with a follow-graph-ranked social feed for teachers.",
		overview:
			"EdLib is a cross-platform education platform for primary-school teachers that fuses classroom management — students, classes, attendance, homework, reading logs, quizzes — with a social network where teachers publish and discover teaching material through a personalized, follow-graph-ranked feed. It ships as a Flutter app for iOS and Android, an ASP.NET Core 10 API backed by PostgreSQL, and a Next.js admin console, plus a static marketing and legal site. Submitted to the Apple App Store and Google Play, the build spans auth (JWT + rotating refresh tokens + Google/Apple sign-in), real-time SignalR notifications, Cloudflare R2 object storage, content moderation, and a custom feed-ranking algorithm.",
		tags: [
			{ label: "Flutter", accent: "on-surface" },
			{ label: "ASP.NET Core 10", accent: "primary" },
			{ label: "PostgreSQL", accent: "secondary" },
			{ label: "SignalR", accent: "tertiary" },
			{ label: "Next.js", accent: "primary" },
		],
		stack: [
			{ label: "Mobile", value: "Flutter · Riverpod · dio · go_router" },
			{ label: "Backend", value: "ASP.NET Core 10 · EF Core 10" },
			{ label: "Database", value: "PostgreSQL (Npgsql)" },
			{ label: "Admin", value: "Next.js 14 · React · Recharts" },
			{ label: "Realtime", value: "SignalR" },
			{ label: "Storage", value: "Cloudflare R2 (S3-compatible)" },
			{ label: "Moderation", value: "AWS Rekognition" },
			{ label: "Testing", value: "xUnit · in-memory SQLite" },
			{ label: "DevOps", value: "Docker · Vercel" },
		],
		features: [
			{
				title: "Follow-Graph Feed Ranking",
				description:
					"A configurable ranking function blends follow-graph distance, exponential recency decay, log-scaled engagement, and a per-author trust multiplier — computed per request in memory, fully unit-tested, and retunable from config without a redeploy.",
			},
			{
				title: "Unified Identity Model",
				description:
					"A single user table with role-based Teacher, Student, and Admin profiles behind one auth path, carrying JWT access tokens with rotating refresh tokens and server-verified Google and Apple sign-in.",
			},
			{
				title: "Real-Time Notifications & Moderation",
				description:
					"Persisted notifications pushed live over a SignalR hub, with a per-teacher trust score, an admin moderation queue, a profanity filter, and optional AWS Rekognition image moderation behind a pluggable interface.",
			},
		],
		imageAlt: "EdLib cross-platform education platform for teachers.",
	},
	{
		slug: "pecunie",
		title: "Pecunie",
		badge: "Full-Stack Platform",
		summary:
			"Trading-discipline tool that turns a written entry/stop/target plan and a risk limit into an exact position size — then watches the market and holds the trader to it.",
		overview:
			"Pecunie is a full-stack trading-discipline tool: a trader writes an entry/stop/target plan and a per-trade risk limit up front, the system computes the exact position size from that risk, watches the market for the trigger, and later scores whether following the plan actually paid off — a plan engine, not a stock-tip engine. The core sizing, rules, backtesting, and metrics logic lives in a pure library with zero I/O, enforced by architecture tests that fail the build if EF Core, HTTP, or a clock dependency leaks in. It runs under an ASP.NET Core (.NET 10) API with a Next.js web app and a separate admin console, a Flutter companion app for monitoring and journaling, PostgreSQL + TimescaleDB for time-series market data, and Hangfire workers that poll armed plans every five minutes during market hours.",
		tags: [
			{ label: ".NET 10", accent: "on-surface" },
			{ label: "Next.js", accent: "primary" },
			{ label: "Flutter", accent: "secondary" },
			{ label: "PostgreSQL", accent: "tertiary" },
			{ label: "Redis", accent: "primary" },
		],
		stack: [
			{ label: "API", value: "ASP.NET Core (.NET 10) · vertical-slice" },
			{ label: "Core Domain", value: "Pure rules/backtest engine — zero I/O" },
			{ label: "Database", value: "PostgreSQL + TimescaleDB" },
			{ label: "Cache & Jobs", value: "Redis · Hangfire" },
			{ label: "Web & Admin", value: "Next.js 15 · TanStack Query" },
			{ label: "Mobile", value: "Flutter · Riverpod · Drift" },
			{ label: "Market Data", value: "Alpaca · Yahoo Finance · Finnhub" },
			{ label: "Testing", value: "xUnit · ~91% engine coverage · property-based" },
		],
		features: [
			{
				title: "Risk-Derived Position Sizing",
				description:
					"Position size is computed live from account equity and per-trade and portfolio 'heat' risk caps; a correctly-sized trade can still be rejected if it would push total account risk too high, with correlation warnings across open positions.",
			},
			{
				title: "Backtesting & Monte Carlo Projections",
				description:
					"A bar-replay backtest engine with parameter sweeps and a realistic cost model, plus a deterministic future-value savings projector and a 10,000-path Monte Carlo simulation.",
			},
			{
				title: "Multi-Market with Full Turkish Localization",
				description:
					"US equities and Borsa İstanbul (BIST) — including BIST tick sizes and cross-currency USD/TRY position sizing with live FX — with the UI, ~75-term finance glossary, alert emails, and API errors all translated into Turkish.",
			},
		],
		imageAlt: "Pecunie trading-discipline platform dashboard.",
	},
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
		slug: "cov0",
		title: "Cov0",
		badge: "Live in Production",
		summary:
			"Next-gen football analysis, game-design, and storage platform with a dedicated video-processing pipeline.",
		overview:
			"Cov0 is a live, continuously evolving platform for football teams, coaches, scouts, and players to analyze player performance, design game plans, and store match footage and historical data. It pairs a Next.js frontend with a .NET backend and a dedicated Go service for heavy video processing, backed by object storage, caching, and message-queue infrastructure to keep ingestion and analysis fast and reliable at scale.",
		tags: [
			{ label: "Next.js", accent: "on-surface" },
			{ label: ".NET", accent: "primary" },
			{ label: "Go", accent: "secondary" },
			{ label: "Redis", accent: "tertiary" },
			{ label: "RabbitMQ", accent: "primary" },
		],
		stack: [
			{ label: "Frontend", value: "Next.js, TypeScript" },
			{ label: "Backend", value: ".NET" },
			{ label: "Video Processing", value: "Go" },
			{ label: "Storage", value: "Cloudflare R2" },
			{ label: "Cache & Queue", value: "Redis · RabbitMQ" },
			{ label: "Delivery", value: "Cloudflare CDN" },
			{ label: "DevOps", value: "Automated CI/CD pipeline" },
		],
		features: [
			{
				title: "Dedicated Video Processing Pipeline",
				description:
					"A standalone Go service handles heavy match-footage processing, decoupled from the API via a RabbitMQ message queue for resilient, parallel ingestion.",
			},
			{
				title: "Performance & Game Analysis",
				description:
					"Tools for teams, coaches, and scouts to break down player performance, track match statistics, and design game plans from stored footage and data.",
			},
			{
				title: "Edge-Delivered Media at Scale",
				description:
					"Footage and assets are stored in Cloudflare R2 and served through Cloudflare's CDN, with Redis caching hot data for low-latency access.",
			},
		],
		imageAlt: "Cov0 football analysis platform interface.",
		liveUrl: "https://cov0.com",
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

export const terminalCommands: Record<string, string[]> = {
	help: ["Available commands: help, whoami, projects, stack, contact, resume, clear"],
	whoami: [
		profile.name,
		profile.headline.before + profile.headline.highlight + profile.headline.after,
	],
	projects: projects.map((p) => `${p.slug} — ${p.title}: ${p.summary}`),
	stack: techStack.map((t) => `${t.name}${t.note ? " — " + t.note : ""}`),
	contact: [`email: ${profile.email}`, "github: github.com/DinVisel"],
	resume: [`resume: ${profile.resumeUrl}`],
};

export const currentProject: CurrentProject = {
	status: "Live · Active Development",
	name: "Cov0 — Football Analysis Platform",
	summary:
		"A next-gen football analysis, game-design, and storage platform for teams, coaches, scouts, and players. Polyglot stack with a dedicated Go video processor, shipping continuous updates behind a CI/CD pipeline.",
	progress: 75,
	tags: [
		{ label: "Next.js", accent: "on-surface" },
		{ label: ".NET", accent: "primary" },
		{ label: "Go", accent: "secondary" },
		{ label: "Redis", accent: "tertiary" },
		{ label: "RabbitMQ", accent: "primary" },
	],
	url: "https://cov0.com",
};

export const education: EducationItem[] = [
	{
		institution: "Yasar University",
		degree: "B.Sc. Software Engineering",
		period: "2023 — Present",
		detail: "Full Scholarship",
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
	{ label: "Resume", href: profile.resumeUrl },
	{ label: "GitHub", href: "https://github.com/DinVisel" },
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/arda-özcan-707671327",
	},
	{ label: "Email", href: "mailto:arda3105ozcan@gmail.com" },
];

export const experiences: Experience[] = [
	{
		role: "Freelance Full-Stack Developer",
		organization: "Pharmacology Thesis Project",
		type: "Freelance · Contract",
		period: "01/2026 - 03/2026",
		summary:
			"Modernized a legacy desktop research application and migrated its data layer to a modern, reliable PostgreSQL stack to support an academic pharmacology thesis.",
		highlights: [
			"Migrated a production database of ~3 million rows from Microsoft SQL Server to PostgreSQL with full data integrity and zero data loss.",
			"Rebuilt and extended the UI of a legacy Delphi application nearly 30 years old, modernizing its workflows for the researcher's needs.",
			"Reconciled and validated complex relational data during the migration to keep the application fully functional on the new database.",
		],
		stack: ["PostgreSQL", "Microsoft SQL Server", ".NET", "Data Migration"],
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
		value: "@DinVisel",
		href: "https://github.com/DinVisel",
		icon: "code",
		accent: "secondary",
	},
	{
		label: "LinkedIn",
		value: "in/arda-özcan-707671327",
		href: "https://www.linkedin.com/in/arda-özcan-707671327",
		icon: "person",
		accent: "tertiary",
	},
];

export const contact = {
	heading: "Let's build something.",
	intro:
		"I'm currently open to freelance work and new opportunities. Have a project in mind or just want to talk shop? Reach out through any of the channels below.",
};
