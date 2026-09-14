# Design Implementation Plan — Animated & Interactive Portfolio

**Repo:** `Portfolio` · **Stack:** Next.js 16.2.9 (App Router) · React 19.2.4 · Tailwind CSS v4 · TypeScript
**Deploy target:** GitHub Pages (`output: "export"`, `basePath: /Portfolio`, `trailingSlash: true`), auto-deployed from `main` by `.github/workflows`
**Animation stack:** anime.js v4 (global) + three.js r186 (showcase only)
**Status:** Plan only — no code written yet.

---

## 1. Where the site stands today

| Area | Current state |
| --- | --- |
| Routes | `/`, `/projects`, `/projects/[slug]`, `/experience`, `/contact` |
| Components | 11 components, **all Server Components** — zero `"use client"`, zero client JS beyond Next's runtime |
| Design system | Material Design 3 dark palette + Inter/JetBrains Mono, declared as Tailwind v4 `@theme` tokens in `src/app/globals.css` |
| Content | Fully centralized in `src/content/portfolio.ts` (typed, 484 lines) — components are pure presentation |
| Motion | Three CSS hover rules (`.glass-card:hover`, `.subtle-pulse`, a grayscale image fade). Nothing enters, nothing responds to scroll, nothing transitions between routes |
| Images | **`public/` contains only `.nojekyll`.** Every project currently renders the gradient placeholder fallback |
| Layout | One bento grid (home) + three conventional stacked pages |

**The honest read:** the foundations are unusually good. Tokens are clean, content is decoupled, and `src/lib/accent.ts` already solves Tailwind's JIT class-scanning problem. What's missing is entirely the **motion layer**, the **real imagery**, and a **showcase surface**. This is an additive plan — almost nothing gets torn out.

**The constraint shaping every decision:** `output: "export"` means no server at runtime. All interactivity is client-side, every route must prerender to static HTML, and there is no image optimization server. That makes bundle size and image weight the two budgets that matter.

---

## 2. Design direction

**Concept: "The Terminal Becomes a Machine."**

The existing brand (`DEV_ROOT.SYS`, monospace labels, `// selected_work` headers, syntax-highlighted snippets) already implies a developer-console identity. Right now that identity is *stated* but not *felt* — it's a static poster of a terminal. The redesign makes the interface behave like a live system: things boot, register, respond, and report state.

Three principles, applied without exception:

1. **Motion carries meaning, never decoration.** Every animation answers a question: *what just arrived?* (reveal), *is this the same object?* (morph), *did I go forward or back?* (directional slide), *is this alive?* (ambient). If an animation answers nothing, it gets cut.
2. **The cursor is an input device, not just a pointer.** Tiles tilt toward it, glow follows it, the 3D scenes parallax against it. On touch this degrades to device-orientation or to static — never to broken.
3. **Dark theme stays exactly as-is.** The MD3 palette in `globals.css` is untouched. Every new visual — including all 3D lighting and materials — is built from the existing tokens (`--color-primary` `#b2cdbb`, `--color-secondary` `#b8c8da`, `--color-tertiary` `#f8b8a0`, surfaces `#131313`→`#353534`). **Zero new colors.**

### Motion vocabulary (fixed, shared by CSS and anime.js)

Added to `@theme` in `globals.css`, and mirrored as JS constants in `src/lib/motion.ts` so CSS and anime.js never drift:

```css
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);    /* entrances — fast start, soft landing */
--ease-in-out-quad: cubic-bezier(0.45, 0, 0.55, 1);   /* position changes */
--duration-instant: 120ms;   /* hover, press */
--duration-quick:   220ms;   /* state change, exit */
--duration-base:    420ms;   /* entrance, morph */
--duration-slow:    700ms;   /* hero / scene-level */
```

anime.js v4 expresses the spring cases natively as `createSpring({ stiffness: 120, damping: 14 })` — used for anything pressable or magnetic.

**Rule of thumb: exits are fast (~150ms), entrances are slower (~420ms) and delayed until the exit finishes.** Departing content shouldn't compete for attention; arriving content needs time to be read.

---

## 3. Animation stack

Both requested libraries are in, each with a clearly bounded job. The division is deliberate — it's what keeps the homepage fast while still allowing a genuinely heavy 3D showcase.

### 3.1 anime.js v4 — the global motion engine

**Version:** `animejs@^4.5.0` · **Bundle cost:** ~9 KB gz for the modules actually used · **Types:** built in, no `@types` package needed.

v4 ships as native ESM with granular subpath exports (`animejs`, `animejs/svg`, `animejs/text`, `animejs/timer`, `animejs/scope`), so Turbopack tree-shakes it properly — only imported modules land in the bundle.

| Job | anime.js v4 API |
| --- | --- |
| Scroll-triggered reveals | `onScroll()` with `{ enter, leave, sync }` — replaces the hand-rolled IntersectionObserver hook from the previous draft |
| Staggered grids/lists | `stagger()`, including `stagger(60, { grid: [3, 2], from: "center" })` for the bento and project grids |
| Sequenced scenes | `createTimeline()` — the showcase boot sequence, the terminal, the metrics strip |
| Animated counters | `animate(obj, { value: n, modifier: Math.round })` |
| Terminal typewriter | `animejs/text` `splitText()` + per-character stagger |
| SVG timeline draw | `animejs/svg` `createDrawable()` for the `/experience` line |
| Pressable / magnetic UI | `createSpring()` easing |
| React lifecycle safety | `createScope()` — scopes every animation to a component and auto-reverts on unmount, which is the correct pattern under React 19 Strict Mode |

**Why anime.js over CSS-only:** the previous draft's custom `useCountUp`/`useTypewriter`/`useInView` hooks are roughly 150 lines of code that anime.js already ships, tested, for ~9 KB. Sequencing (the boot log, the terminal) is where hand-rolled CSS genuinely falls apart — timelines are the right tool.

**What stays pure CSS:** hover states, focus rings, the `.glass-card` treatment, the cursor-glow custom properties, and `prefers-reduced-motion`. Never pay JS for something a `:hover` rule does.

### 3.2 three.js r186 — the showcase 3D layer

**Version:** `three@^0.186.0` + `@types/three@^0.186.0` (devDependency) · **Bundle cost:** ~150 KB gz, **lazy-loaded on `/showcase` only**.

**Use vanilla three.js, not React Three Fiber.** R3F 9.7 does support React 19.2 (peer range `>=19 <19.3`), but for two or three self-contained scenes, R3F + drei adds ~60 KB gz and a reconciler layer for no real gain. Vanilla three inside a `useEffect` with a `<canvas>` ref is simpler to reason about and meaningfully lighter. *Revisit only if scene count grows past ~4 or scenes need to share React state.*

**Loading pattern** — this is load-bearing for the performance budget:

```tsx
// src/components/showcase/Scene.tsx  ← "use client"
"use client";
import dynamic from "next/dynamic";

const ProjectStage3D = dynamic(() => import("./ProjectStage3D"), {
  ssr: false,                       // three.js touches window/WebGL — must not prerender
  loading: () => <StagePoster />,   // the flat screenshot; the 3D upgrades over it
});
```

> **Verified constraint:** `ssr: false` is **not allowed in a Server Component** — Next errors on it. The `dynamic()` call must live inside a file marked `"use client"`. Every 3D entry point follows this pattern.

**Import only what's used.** `import { Scene, PerspectiveCamera, WebGLRenderer, ... } from "three"` tree-shakes; `import * as THREE from "three"` does not. Enforce the named-import form.

**Where 3D is actually used** (three places, each justified — 3D that doesn't earn its weight gets cut):

1. **Act I — boot field.** A particle field / wireframe grid that resolves from noise into a stable plane as the boot log completes. Points material tinted `--color-primary`, additive blending, ~2,000 particles. Cheap, sets the tone immediately.
2. **Act III — project screens.** The strongest idea in the plan: each project's **real screenshot is loaded as a `CanvasTexture` onto a plane in 3D**, floating with a subtle tilt that tracks the pointer, edge-lit in that project's accent color, with a soft reflection below. This is what ties the screenshots and the 3D together rather than having them be two unrelated features.
3. **Act IV — stack orbit.** The `techStack` array as sprites orbiting in real 3D space. Hover raycasts to the nearest sprite, pauses the orbit, and expands a label. Replaces the previous draft's fake CSS counter-rotation with the real thing.

**Mandatory hygiene** (otherwise a 3D portfolio becomes a laptop-fan portfolio):

- Cap `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`
- Drive the render loop with `renderer.setAnimationLoop()`, and **stop it** when the canvas leaves the viewport (`IntersectionObserver`) or the tab is hidden (`visibilitychange`)
- Full teardown on unmount: dispose geometries, materials, textures, and call `renderer.dispose()`
- Bail out entirely — render the flat poster instead — when: `prefers-reduced-motion: reduce`, no WebGL context available, `navigator.hardwareConcurrency <= 4`, or `navigator.connection.saveData` is true
- The flat screenshot poster is always the SSR'd baseline. **3D is a progressive enhancement over content that already works.**

### 3.3 Route transitions — React `<ViewTransition>` (native)

Kept from the previous draft, because neither library replaces it: cross-*route* shared-element morphs require browser View Transitions. Requires `experimental.viewTransition: true` in `next.config.ts`.

```ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repoBasePath : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { viewTransition: true },   // ← new
};
```

> ⚠️ **Verify first (Phase 0 gate):** `experimental.viewTransition` + `output: "export"` is untested in this repo. On a throwaway branch, confirm `npm run build` still emits a complete `out/` and that navigation animates when served (`npx serve out`). If it breaks the export, fall back to §7.2 (CSS-only route transitions keyed on `usePathname()`) and drop the shared-element morph. **Nothing else in this plan depends on that flag.**

### 3.4 Revised performance budgets

The previous draft's single 12 KB budget no longer applies — it's now split, and the split is the whole point:

| Surface | JS budget (gzipped) | Contents |
| --- | --- | --- |
| Shared/global bundle | **≤ 15 KB** | anime.js modules + motion primitives. Loaded on every route |
| `/` homepage | **≤ 15 KB** | Shared bundle only. **No three.js. Non-negotiable.** |
| `/projects`, `/experience`, `/contact`, `/projects/[slug]` | ≤ 18 KB | Shared + small per-route logic |
| `/showcase` | ≤ 180 KB, **lazy** | three.js in a separate chunk, fetched after first paint, never blocking |

`/showcase` is the only route that pays for three.js. That isolation is the single strongest argument for the placement decision in §5.

---

## 4. Project screenshots — the simple path

You have real screenshots and don't want to stand up a bucket. **You don't need one.** For a statically-exported GitHub Pages site, object storage would add cost, CORS config, and an upload step while solving a problem you don't have.

### Decision: commit optimized images to `public/projects/`

They're deployed by the existing workflow with zero new infrastructure. `public/` is currently empty except `.nojekyll`, and nothing in `.gitignore` excludes it — this works today.

```
public/
  projects/
    cov0/
      cover.webp          1600×1000, ~120 KB   ← cards, showcase, 3D texture
      cover@2x.webp       3200×2000, ~300 KB   ← optional, retina detail pages
      shot-01.webp        gallery
    <slug>/...
```

Reference them with a **root-relative path and no `basePath` prefix** — Next prepends `/Portfolio` automatically at build. `src="/projects/cov0/cover.webp"` is correct; `src="/Portfolio/projects/..."` is a double-prefix bug that only appears in production. This is the #1 thing to get wrong here.

### Three tiers — pick by how much effort you want to spend

**Tier 0 — zero effort.** Drop the PNGs straight into `public/projects/<slug>/`. It works immediately. The cost is weight: raw screenshots are often 1–3 MB each, and with `images: { unoptimized: true }` **Next does not compress them** — the browser downloads exactly what you committed. Fine for 2–3 images; painful at 10+.

**Tier 1 — one-off script (recommended).** A ~40-line `scripts/optimize-images.mjs` using `sharp` as a **devDependency** (never shipped to the client, never run in CI):

```jsonc
// package.json
"scripts": { "images": "node scripts/optimize-images.mjs" },
"devDependencies": { "sharp": "^0.35.4" }
```

Drop raw screenshots into a gitignored `assets/raw/`, run `npm run images`, and the script writes optimized WebP at two widths into `public/projects/` **plus** a generated `src/content/images.ts` exporting a tiny base64 `blurDataURL` per image. Commit the outputs. You run it only when adding a project. A 2 MB PNG becomes ~120 KB WebP at visually identical quality — a ~94% reduction.

**Tier 2 — not recommended.** Git LFS, a CDN, or a bucket. LFS is actively worse here: `actions/checkout@v4` doesn't fetch LFS objects unless explicitly configured, so images would silently 404 in production. Skip it.

### Why this is safe

- GitHub Pages allows 100 MB per file and 1 GB per site. At Tier 1, ten projects ≈ 3 MB total — a rounding error.
- Git stores binaries fine at this scale. It only becomes a problem with frequently-rewritten large binaries, which screenshots are not.
- **Blur-up placeholders work with `unoptimized: true`**: `placeholder="blur"` + an explicit `blurDataURL` needs no optimization server, and eliminates the pop-in that a 3D-heavy site would otherwise suffer.

### Component changes

`ProjectCard`, `FeaturedProjectTile`, and `projects/[slug]` already branch on `project.image` with a gradient fallback — **keep that fallback**, it's good defensive design. Changes needed:

- Extend the `Project` type: `image?: string` gains `imageBlur?: string`, `images?: string[]` (gallery), `imageAspect?: number` (prevents CLS)
- Add `width`/`height` or a fixed aspect container to every `<Image>` so nothing shifts
- `priority` on the `/projects/[slug]` hero only; everything else lazy
- The 3D stage in Act III loads the same `cover.webp` as its texture — one asset, two uses, no duplicate download

---

## 5. Showcase placement — decision

**Decision: a dedicated route at `/showcase`, promoted to the first item in the navbar and made the homepage's primary CTA.**

You asked where I think it belongs, so here's the reasoning rather than just the answer.

### Why a separate route beats merging it into `/`

1. **Bundle isolation — decisive.** three.js is ~150 KB gz. On a dedicated route it lazy-loads for visitors who opted in. Merged into `/`, every visitor pays it, and the homepage's Lighthouse score and LCP drop for people who'd have bounced anyway. This argument alone settles it.
2. **Two genuinely different audiences.** A recruiter with 20 seconds needs the bento grid: scannable, fast, complete. Someone already interested wants the slow cinematic argument. These are opposed goals; one page serving both serves neither.
3. **It's linkable.** `arda.../Portfolio/showcase/` is a URL you can put in an application or a DM — a scroll-anchor on the homepage is not.
4. **It's revertable.** If the showcase underperforms, you delete one directory. If it were fused into the homepage, unwinding means surgery on your most important page.

### Why not bury it deeper (e.g. `/projects/showcase`)

`/showcase` is the most impressive thing on the site. It should be one hop from the root, and the nav's **first** item — not something found by accident after scrolling a project list.

### Specific placement

| Surface | Change |
| --- | --- |
| `navLinks` in `portfolio.ts` | Insert `{ label: "Showcase", href: "/showcase" }` **first**, before Projects |
| `HeroTile` CTAs | Primary becomes **"Enter Showcase"** (`Magnetic`, `--color-primary` fill, arrow icon). "Get In Touch" demotes to the outlined secondary slot. Resume moves into the command palette and footer |
| Below the bento grid on `/` | A full-width band: a **muted, autoplaying, ~3-second silent loop** of the showcase (or an animated gradient + text if capturing video is a hassle) with `Enter the showcase →`. Prefetches the route on hover so the transition feels instant. **No three.js on the homepage** — this is a poster, not a live scene |
| `Footer` | `Showcase` added to `footerLinks` |
| Command palette (⌘K) | Showcase is the first result |

**Explicitly rejected:** making `/showcase` the landing page. A first-time visitor — especially a recruiter on mobile on a slow connection — should not be held behind a boot animation and a 150 KB WebGL download before seeing who you are. The homepage stays fast and informative. The showcase is the door you *choose* to walk through.

---

## 6. Architecture: the client/server boundary

Today everything is a Server Component. The discipline to maintain: **push `"use client"` as deep down the tree as possible.**

```
src/
  components/
    motion/                    ← "use client", anime.js-powered
      Reveal.tsx               onScroll()-triggered entrance wrapper
      Stagger.tsx              stagger() over children
      TiltCard.tsx             pointer-reactive tilt + cursor glow (CSS vars, no re-render)
      Magnetic.tsx             springs toward the cursor
      CountUp.tsx              animated numeric counter
      Typewriter.tsx           splitText() terminal typing
      ScrollProgress.tsx       reading progress bar
      CommandPalette.tsx       ⌘K navigation overlay
      MotionProvider.tsx       createScope() root + reduced-motion context
    showcase/                  ← /showcase only
      ShowcaseHero.tsx         Act I shell ("use client", dynamic-imports the 3D)
      BootField3D.tsx          three.js particle field
      MetricsStrip.tsx         Act II
      ProjectStage.tsx         Act III shell — renders StagePoster, upgrades to 3D
      ProjectStage3D.tsx       three.js screenshot plane
      StagePoster.tsx          flat <Image> fallback — the SSR'd baseline
      StackOrbit3D.tsx         Act IV
      TerminalPanel.tsx        Act V
      ShowcaseTeaser.tsx       the homepage band (no three.js)
    ... existing 11 components, mostly unchanged — wrapped, not rewritten
  hooks/
    useReducedMotion.ts        matchMedia, SSR-safe
    useCanCapably3D.ts         WebGL + hardware + saveData + reduced-motion gate
    usePointerPosition.ts      rAF-throttled, writes CSS vars
  lib/
    accent.ts                  unchanged
    motion.ts                  ← durations/easings mirroring the CSS tokens
    three/
      createRenderer.ts        shared renderer setup + teardown
      useThreeScene.ts         lifecycle: mount, resize, visibility pause, dispose
  content/
    portfolio.ts               extended, never restructured
    images.ts                  ← generated by npm run images (blurDataURLs)
```

**The rule that makes the budget work — `Reveal` wraps, it does not replace:**

```tsx
// page.tsx stays a Server Component
<Reveal delay={100}>
  <FeaturedProjectTile />   {/* still a Server Component, passed as children */}
</Reveal>
```

Because `Reveal` takes children as a prop, the tiles stay server-rendered and never enter the client bundle. **This single rule is what keeps the shared bundle at 15 KB instead of 80 KB.**

---

## 7. Accessibility & performance guardrails

Acceptance criteria for **every** phase, not a cleanup pass at the end.

**Reduced motion.** Global CSS kill-switch, plus `useReducedMotion()` so JS effects disable outright (and three.js never initializes at all):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  ::view-transition-old(*), ::view-transition-new(*), ::view-transition-group(*) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
```

**Reveals must start from `opacity: 1`.** The hidden state is applied by JS only after anime.js attaches. If JS fails, content is visible — never a blank page. This is the most common way animated portfolios ship a broken site to a fraction of their visitors.

**Performance rules.**
- Animate only `transform`, `opacity`, `filter`. Never `top`/`left`/`width`/`height`.
- `will-change` set on interaction start, removed on end — never left standing.
- `pointermove` handlers rAF-throttled, writing CSS custom properties rather than React state.
- Every anime.js animation created inside a `createScope()` so Strict Mode double-mounts and unmounts clean up correctly.
- three.js: render loop stopped off-screen and on hidden tab; full `dispose()` teardown; pixel ratio capped at 2.

**Keyboard & a11y.** Every hover affordance also reachable on `:focus-visible`. Command palette has a focus trap and `Esc`. Canvases are `aria-hidden="true"` with the real content in the DOM beside them — **the 3D is never the only carrier of information**. The terminal in Act V is keyboard-operable by construction.

**Budgets.** Lighthouse Performance ≥ 95 (≥ 90 on `/showcase`), Accessibility 100 everywhere. LCP < 1.8s, CLS < 0.05, INP < 200ms on a mid-tier mobile profile.

---

## 8. The showcase — five acts

**Act I — Boot.** Full-viewport terminal over a three.js particle field that resolves from noise into a stable grid as the boot log types out (`> initializing dev_root.sys`, `> loading projects [3]`, `> status: available`). An anime.js timeline sequences the log lines against the 3D resolution so they finish together. Resolves into name and role at large type with a pulsing scroll hint. Skippable by scroll or keypress; `sessionStorage`-gated so it plays once per session.

**Act II — Metrics strip.** A horizontal band of `CountUp` figures animating on scroll-enter: projects shipped, ~3M rows migrated, a 30-year-old Delphi app modernized, tech count. Sourced from a new `metrics` export in `portfolio.ts` — never hardcoded in JSX. Each figure sits in a `TiltCard`.

**Act III — Project stages.** The centerpiece, and where the screenshots pay off. One full-height section per project in `projects[]`. A sticky visual on one side, scroll-advancing detail on the other, alternating sides. As each stage enters:

- The screenshot renders immediately as a flat `<Image>` (`StagePoster`), then **upgrades in place to a three.js plane** — floating, pointer-tracking tilt, edge-lit in the project's accent, soft reflection below
- Title, summary, and tags stagger in at 60 ms intervals via anime.js
- The stack list writes itself out like console output
- A background gradient blob drifts, tinted with that project's accent

Each stage's visual carries `<ViewTransition name={\`project-${slug}\`}>`, matched on `/projects/[slug]`'s hero — clicking **morphs the screenshot into the detail page**. Highest-impact single interaction on the site.

**Act IV — Stack orbit.** `techStack` as sprites orbiting in real 3D. Hover raycasts to the nearest sprite, pauses the orbit, expands a one-line "what I use it for" note (new optional `note?: string` on the `Tech` type). Reduced-motion or no-WebGL: falls back to today's static 2-column grid.

**Act V — Live terminal CTA.** An interactive faux-terminal contact block. A real `<input>` accepting `help`, `whoami`, `projects`, `stack`, `contact`, `resume`, `clear`. Pure client-side string matching against `portfolio.ts` — no network, nothing to exploit. Falls back to the ordinary contact card grid without JS.

**Scroll mechanics.** Acts II–V use `position: sticky` and anime.js `onScroll({ sync: true })` — **no scroll-jacking**. The user's scroll always maps 1:1 to page movement. No hijacked wheel events. `scroll-snap-type: y proximity` (proximity, never mandatory) on Act III only.

---

## 9. Phased implementation

Each phase is independently shippable and revertable. Don't start one before the previous phase's acceptance criteria pass.

### Phase 0 — Foundation & feasibility gate

| File | Change |
| --- | --- |
| `package.json` | `npm i animejs@^4.5.0` · `npm i -D sharp@^0.35.4` (three.js deferred to Phase 4) |
| `next.config.ts` | Add `experimental.viewTransition: true` |
| `src/app/globals.css` | Motion tokens in `@theme`; `prefers-reduced-motion` block; keyframes for `fade-up`, `scale-in`, `shimmer` |
| `src/lib/motion.ts` | Durations/easings mirroring the CSS tokens |
| `src/hooks/useReducedMotion.ts` | SSR-safe `matchMedia` listener |
| `src/components/motion/MotionProvider.tsx` | `createScope()` root |

**Acceptance:** `npm run build` emits a complete `out/`; served locally, route changes animate; `npm run lint` clean; **zero visual change to the existing site.**
**If the gate fails:** revert the flag, use §7.2 fallback, strike the Act III morph.

<a id="72"></a>**§7.2 CSS-only fallback:** a client `<PageTransition>` in `layout.tsx` keyed on `usePathname()`, applying `fade-up` on route change. Loses the shared-element morph; keeps continuity.

---

### Phase 1 — Images (do this early)

Front-loaded deliberately: real screenshots make every later phase look finished, and Act III's 3D is built against real textures rather than placeholders.

1. `scripts/optimize-images.mjs` + `npm run images` (Tier 1, §4)
2. `assets/raw/` added to `.gitignore`
3. Process existing screenshots → `public/projects/<slug>/`
4. Generate `src/content/images.ts` with `blurDataURL`s
5. Populate `image` on each entry in `projects[]`; extend the `Project` type
6. Add `width`/`height` or aspect containers to every `<Image>`; add `placeholder="blur"`

**Acceptance:** every project card shows a real screenshot; total `public/` under 5 MB; CLS 0 on all image routes; **production build verified at `/Portfolio/` with no double-prefixed paths.**

---

### Phase 2 — Motion primitives

Build and verify the reusable client components. No page consumes them yet.

`Reveal`, `Stagger`, `TiltCard` (max 6° tilt, `perspective: 1000px`, disabled on coarse pointer), `Magnetic` (6px, 24px radius, spring return), `CountUp`, `Typewriter`.

**Acceptance:** each renders correctly SSR'd with JS disabled; reduced-motion disables everything; CLS contribution 0; shared bundle ≤ 15 KB gz.

---

### Phase 3 — Homepage & global chrome

Highest value-per-hour in the plan.

| Component | Change |
| --- | --- |
| `BentoGrid` | `Stagger` with `stagger(70, { grid: [12, 4], from: "first" })` — tiles fade up 24px in sequence |
| `HeroTile` | Pointer parallax on dot-grid and code snippet (±8px); `Typewriter` on `headline.highlight`; caret-blink on the availability dot; **primary CTA becomes "Enter Showcase"** wrapped in `Magnetic` |
| `TechStackTile` | Icons spring 1.0→1.12 on hover; accent color bleeds into a radial backdrop |
| `CurrentProjectTile` | Progress bar animates 0→`progress`% on scroll-enter with a shimmer sweep; `%` uses `CountUp` |
| `FeaturedProjectTile` / `ProjectCard` | Wrapped in `TiltCard`; cursor-following border glow; arrow slides, label underline wipes from left |
| `EducationTile` / `SocialTile` | Background icon drifts on hover; social icons get `Magnetic` + accent ring pulse |
| `Navbar` | Becomes client: shrinks on scroll (py-4→py-2, blur up), sliding active-route indicator, `⌘K` chip. Gets `viewTransitionName: "site-header"` + the CSS to hold it still during transitions. **Showcase added first** |
| `Footer` | Real pulsing status indicator + live local-time readout |
| `layout.tsx` | Mount `MotionProvider`, `ScrollProgress`, `CommandPalette`; add the `<ViewTransition>` route wrapper |
| `page.tsx` | Add `ShowcaseTeaser` band below the bento grid |
| `globals.css` | `.glass-card:hover` upgraded to a token-driven system with inner highlight + cursor glow |

**Acceptance:** homepage Lighthouse Performance ≥ 95; **no three.js in the homepage bundle**; every tile keyboard-focusable with a visible ring; reduced-motion yields today's static experience; CLS < 0.05.

---

### Phase 4 — Route transitions & sub-pages

- `transitionTypes={["nav-forward"]}` going deeper, `["nav-back"]` on return links
- Directional slide CSS (60px offset); header pinned via `::view-transition-group(site-header) { animation: none; z-index: 100 }`
- **Shared-element morph:** matching `<ViewTransition name>` on `ProjectCard`'s image and the detail hero, `share="morph"` with a mid-flight blur keyframe to mask interpolation artifacts
- `/projects` — tech filter chips with same-route crossfade (`<ViewTransition key={filter} share="auto">`) and an anime.js `stagger` re-layout
- `/experience` — timeline line draws itself via `createDrawable()`; nodes pop in as reached; highlights stagger
- `/contact` — `TiltCard` + `Magnetic` on channel cards; "email copied" micro-interaction
- `/projects/[slug]` — hero parallax on scroll; feature cards reveal in sequence; sticky section nav; screenshot gallery with a lightbox

**Acceptance:** forward/back reads directionally correct; card→hero morph smooth at 60fps; browser back never breaks layout; all routes still export statically.

---

### Phase 5 — The showcase route

`npm i three@^0.186.0` · `npm i -D @types/three@^0.186.0`. Build Acts I–V in order, one commit per act.

**Build each act's flat version first, then layer 3D on top.** This guarantees the fallback genuinely works rather than being an afterthought that was never tested.

**Content additions to `portfolio.ts`** (extend, never restructure):

```ts
export type Metric = { label: string; value: number; suffix?: string; icon: string; accent: Accent };
export const metrics: Metric[] = [ /* … */ ];

export type Tech = { name: string; icon: string; accent: Accent; note?: string };  // + note

export const bootLog: string[] = [ /* Act I */ ];
export const terminalCommands: Record<string, string[]> = { /* Act V */ };
```

**Acceptance:** Act I skippable and session-gated; Act III morphs into detail pages; Act V fully keyboard-operable; **with WebGL disabled the page is a clean, complete static long-scroll**; three.js in a separate lazy chunk (verify in build output); no WebGL context leaks across navigations; `/showcase` Lighthouse Performance ≥ 90; sustained 60fps on a 2020-era laptop.

---

### Phase 6 — Polish

- Custom cursor (ring scaling over interactive elements) — pointer-fine only; cut it if it costs more than it gives
- Route-change progress bar; skeleton shimmer on image load
- `404` page with terminal-error personality
- OG image generation for social sharing
- **Sound design — explicitly rejected.** Unprompted audio on a portfolio is a liability.

---

## 10. Risk register

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| three.js leaks into the shared bundle | **High** | The one that actually sinks this. Only `dynamic({ ssr: false })` from a `"use client"` file; named imports only; **check build output size every commit in Phase 5** |
| `experimental.viewTransition` incompatible with `output: "export"` | Medium | Phase 0 gate; §7.2 fallback ready; nothing else depends on it |
| 3D tanks mobile performance/battery | Medium | Capability gate (§3.2) bails to flat posters; render loop pauses off-screen; pixel ratio capped |
| WebGL context leak across route changes | Medium | Centralized teardown in `useThreeScene.ts`; browsers cap at ~16 contexts and fail silently past it |
| Motion overwhelms content | Medium | §2 principle 1. Review every phase on a real phone, not just desktop |
| Client-component creep inflates bundle | Medium | Children-as-props rule (§6); hard-fail above budget |
| `basePath: /Portfolio` breaks new asset paths | **Medium** | Root-relative paths only, never a manual `/Portfolio` prefix. **Test the production build, not just dev** — this class of bug is invisible locally |
| Screenshots bloat the repo | Low | Tier 1 script; ~120 KB per cover; ten projects ≈ 3 MB |
| anime.js v4 API differs from v3 memory | Low | v4 is a full rewrite (`animate()`/`createTimeline()`/`onScroll()`, not `anime()`). Check `node_modules/animejs` types, don't write from memory |
| Safari View Transitions quirks | Low | Degradation is graceful — no animation, site works |
| Showcase becomes a second maintenance burden | Medium | It reads entirely from `portfolio.ts`; adding a project updates both surfaces |

---

## 11. Sequencing summary

| Phase | Scope | Ship alone? | Risk |
| --- | --- | --- | --- |
| 0 — Foundation | anime.js, tokens, config gate | Yes (invisible) | **Gate** |
| 1 — Images | Screenshot pipeline + real covers | Yes — instant quality jump | Low |
| 2 — Primitives | 6 motion components | Yes (unused) | Low |
| 3 — Homepage & chrome | Bento, navbar, footer come alive | Yes — **biggest visible win** | Low |
| 4 — Transitions & sub-pages | Route morphs, filters, timeline | Yes | Medium |
| 5 — Showcase | `/showcase`, 5 acts, three.js | Yes | **High** |
| 6 — Polish | Cursor, 404, OG | Yes | Low |

**If only two phases ship: Phases 1 and 3.** Real screenshots plus a living homepage transform the perceived quality of the whole site for a fraction of Phase 5's effort. The showcase is the ceiling; those two are the floor, and the floor matters more.

---

## 12. Definition of done

- [ ] All seven routes prerender; `out/` complete and correct under `/Portfolio/`
- [ ] Lighthouse: Performance ≥ 95 (≥ 90 `/showcase`), Accessibility 100, Best Practices 100, SEO 100
- [ ] three.js appears in **no** bundle except `/showcase`'s lazy chunk — verified in build output
- [ ] `prefers-reduced-motion: reduce` produces a calm, fully functional site with 3D disabled
- [ ] With WebGL unavailable, `/showcase` is a complete static page
- [ ] Full keyboard traversal of every route with visible focus states
- [ ] No layout shift from any animation or image (CLS < 0.05)
- [ ] Readable content with JavaScript disabled
- [ ] No WebGL context leaks after navigating in and out of `/showcase` ten times
- [ ] Verified on iOS Safari, Chrome Android, Firefox, desktop Safari/Chrome
- [ ] `npm run lint` clean; no TypeScript errors
- [ ] `portfolio.ts` remains the sole content source — no copy hardcoded in components
- [ ] `public/` under 5 MB

---

## 13. Remaining open questions

1. **Screenshot inventory** — how many exist per project, and are there device-framed or full-bleed versions? Act III's 3D plane looks best with a clean 16:10 full-bleed capture, no browser chrome.
2. **Showcase teaser medium (§5)** — a 3-second silent video loop is the strongest option but needs a capture. An animated gradient + type treatment is the zero-effort substitute. Decide before Phase 3.
3. **Act V terminal scope** — the 7-command set is deliberately small. Expandable (`ls`, `cat projects/cov0`, history, tab-completion), but each addition is maintenance with diminishing returns.
4. **`socialTileLinks`** has two `href: "#"` placeholders (Website, Share). Worth resolving before drawing more attention to that tile.
5. **`profile.resumeUrl`** currently points at the GitHub profile rather than a PDF. If a real resume exists, `public/resume.pdf` fits the same commit-it-directly logic as the screenshots.
