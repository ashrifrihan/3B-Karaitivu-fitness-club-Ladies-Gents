# 3B Karaitivu Fitness Club — Website

Official website for **3B Karaitivu Fitness Club Ladies & Gents**, a gym in
Karaitivu, Sri Lanka.

- **Address:** 11 Main Street, Karaitivu 13250, Sri Lanka
- **Phone:** 067 205 0465
- **Hours:** Daily, 6:00–10:00 AM and 4:30–10:00 PM

---

## Why

The gym needed a site that does two jobs at once: convert visitors into
walk-ins/calls, and look credible enough to compete with modern fitness
brands online — without pricing out the actual audience. Most members and
prospects browse on mid-range or budget Android phones over mobile data in a
small town, not on high-end devices over fibre. So the site is being pushed
toward a modern, motion-rich, "award-site" look and feel, but every design
decision is filtered through one constraint: **it has to stay smooth on a
4GB RAM budget phone.** Good animation that stutters is worse than no
animation.

## What

A single-page marketing site covering:

- **Hero** — headline, call-to-action, location/hours at a glance
- **Service zones** — Power Zone (weights), Cardio Zone, Ladies-only private
  section, 1-on-1 Personal Training
- **Stats** — animated counters (members, years open, etc.)
- **Service tabs** — Personal Training / Group / Cardio / Recovery
- **Gallery** — gym photography
- **FAQ** — opening hours, location, ladies zone, services, membership pricing
- **Contact/footer** — phone, address, social links

Structured data (schema.org `HealthClub` + `FAQPage`, injected as JSON-LD in
`src/routes/index.tsx`) is baked in so the FAQ and business info are eligible
for rich results in Google search — this must be preserved through any
redesign.

## How

### Tech stack

| Layer       | Choice                                    |
|-------------|--------------------------------------------|
| Framework   | React 19 + TanStack Start + TanStack Router |
| Styling     | Tailwind CSS v4 + shadcn/ui (Radix primitives) |
| Animation   | Motion (Framer Motion) → migrating to GSAP + ScrollTrigger |
| Icons       | lucide-react                              |
| Build       | Vite 8                                    |
| Package mgr | Bun (`bun.lock`, `bunfig.toml`)           |
| Forms       | react-hook-form + zod                     |
| SEO         | schema.org JSON-LD, injected in `src/routes/index.tsx` |

### Project structure

```
src/
  routes/
    index.tsx        # main page (being split into sections — see below)
    __root.tsx        # root layout, error/404 boundaries
  components/
    ui/                # shadcn/ui primitives
    sections/           # one component per page section (redesign target)
      Hero.tsx
      ServicesGrid.tsx
      StatsCounters.tsx
      ServiceTabs.tsx
      Gallery.tsx
      Faq.tsx
      ContactFooter.tsx
  assets/               # gym photography (hero, zones, gallery)
  lib/                  # utils, error reporting
```

### Redesign approach

Built with **Claude Code** (Opus 4.8), using:

| Tool | Type | Purpose |
|------|------|---------|
| `design-taste-frontend` | Claude Code skill | Design direction & critique |
| `gsap-master` | Claude Code skill | GSAP / ScrollTrigger animation patterns |
| 21st.dev Magic | MCP server | Sourcing/generating polished React + Tailwind components |
| Higgsfield | MCP server | AI-generated hero background video/image |

Executed in five phases, each reviewed on a real low-end device before
moving to the next:

0. **Direction** — critique the current design, settle on one clear
   typography/color/mood direction.
1. **Restructure** — split `index.tsx` into `src/components/sections/*` so
   each section gets its own scoped GSAP context and lazy-load boundary.
   Copy, phone, address, hours, and SEO JSON-LD stay untouched.
2. **Hero video** — short (8–10s) cinematic loop generated via Higgsfield,
   plus a static poster frame. Video autoplay is gated on viewport width and
   connection speed; poster-only on mobile, `save-data` connections, and
   `prefers-reduced-motion`.
3. **Scroll animation** — per-section ScrollTrigger animations (own
   `gsap.context()` per section, reverted on unmount), with
   `ScrollTrigger.matchMedia()` giving mobile a lighter animation profile
   than desktop.
4. **Component polish** — nav, cards, FAQ accordion, and footer sourced/
   generated via 21st.dev Magic to match the Phase 0 direction.

### Performance rules (non-negotiable)

- GSAP animates `transform`/`opacity` only — never `width`/`height`/`top`/`left`.
- Max 2–3 elements animating simultaneously on scroll, anywhere on the page.
- All images WebP, lazy-loaded below the fold, responsive `srcset`.
- Hero video: compressed <2MB, muted/loop/playsinline, paused via
  `IntersectionObserver` when off-screen, poster-only fallback on low-end
  devices and slow connections.
- `prefers-reduced-motion` disables all scroll animation and hero video,
  site-wide.
- No WebGL/3D/particle/full-page canvas effects.
- Target: no dropped frames under Chrome DevTools 4x CPU throttle, Fast 3G.

### Status

- [ ] Phase 0 — Direction
- [ ] Phase 1 — Section restructure
- [ ] Phase 2 — Hero video
- [ ] Phase 3 — Scroll animation
- [ ] Phase 4 — Component polish

---

## Run

### Prerequisites

- [Bun](https://bun.sh) (preferred) or Node.js 18+

### Setup

```sh
bun install
bun run dev       # start dev server (http://localhost:3000 by default)
```

(`npm i && npm run dev` also works if you don't have Bun installed.)

### Other commands

```sh
bun run build      # production build
bun run preview    # preview production build locally
bun run lint       # eslint
bun run format     # prettier — auto-formats the codebase
```

### Redesign tooling setup (one-time, for Claude Code)

```sh
# Skills — clone and copy the SKILL.md folder into .claude/skills/
mkdir -p .claude/skills
git clone https://github.com/greensock/gsap-skills /tmp/gsap
cp -r /tmp/gsap/gsap-master .claude/skills/
git clone https://github.com/Leonxlnx/taste-skill /tmp/taste
cp -r /tmp/taste/design-taste-frontend .claude/skills/

# 21st.dev Magic MCP — get a free key at 21st.dev/mcp first
npx @21st-dev/cli@latest install claude --api-key YOUR_KEY

# Higgsfield MCP — OAuth login, no API key needed
claude mcp add --transport http --scope user higgsfield https://mcp.higgsfield.ai/mcp
```

Restart Claude Code after adding the MCP servers, then verify with
`/mcp` or `claude mcp list` inside a session.