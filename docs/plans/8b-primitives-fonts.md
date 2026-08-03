# Plan 8b — Base Primitives + Hebrew Font Strategy

Goal: load the two brand font families (with Hebrew coverage), add the restrained motion tokens, and build the small set of presentational primitives that milestones 6b (dropdowns) and 7b (flashcard viewer) compose from. Everything styles exclusively through the 8a `@theme` tokens.

## Font strategy

1. **Assistant** (functional voice, Bible §6) — on Google Fonts with `hebrew` + `latin` subsets. Load via `next/font/google` (self-hosted at build time, zero runtime requests), exposed as CSS variable `--font-assistant`, referenced by the 8a `--font-sans` token.
2. **Fedra** (brand voice) — commercial Typotheque font; no licensed files in this repo. Stand-in: **Frank Ruhl Libre** (Google Fonts serif, `hebrew` + `latin` subsets) via `next/font/google` as `--font-frank-ruhl`. The `--font-brand` stack keeps `"Fedra Serif"` first so licensed files (via `next/font/local`) slot in later with no component changes. ⚠ Flagged as a product decision — logged in the decision log.
3. **Hebrew rule**: vocabulary content (the flashcard words) always renders in Assistant — it is a Hebrew-first typeface and the safest for nikud legibility. The brand serif is reserved for editorial headlines. Runtime RTL/nikud verification stays in milestone 9a.
4. Font files are pinned implicitly: `next/font` downloads at build and ships the files in the bundle; no npm dependency is added.

## Tasks

### T1 — Font loading
- `src/app/fonts.ts`: `Assistant` + `Frank_Ruhl_Libre` from `next/font/google`, both `subsets: ["hebrew", "latin"]`, `variable` CSS custom properties, `display: "swap"`.
- `src/app/layout.tsx`: font variable classes on `<html>`; `bg-surface-base text-text-primary font-sans antialiased` on `<body>` (off-white base site-wide, Bible §5).
- `src/app/globals.css`: point `--font-sans` at `var(--font-assistant)` and `--font-brand` at `"Fedra Serif", var(--font-frank-ruhl)`, keeping existing fallbacks.

### T2 — Motion tokens (Bible §13: calm, soft, restrained)
- `--ease-soft` easing token.
- `--animate-fade-in` (soft fade) and `--animate-fade-up` (subtle slide) with `@keyframes` in `@theme`.
- No scroll-reveal system; content must not hide without JS (Bible §13).

### T3 — Typography primitives — `src/app/components/ui/`
- `Heading`: `variant` = `display | h1 | h2` (Fedra roles), `as` for the rendered tag. Maps to `font-brand text-display/h1/h2`.
- `Text`: `variant` = `body | label | meta` (Assistant roles), `as` for the tag.

### T4 — Layout primitives
- `Container`: centered, side padding, `wide` prop switches `max-w-content` → `max-w-wide` (Bible §8 multiple max-widths).
- `Section`: vertical rhythm wrapper, `spacing` = `compact | regular | spacious | feature` tiers.

### T5 — Surface + control primitives
- `Button`: `variant` = `primary` (yellow fill, charcoal text — never white on yellow, hover/pressed from OQ4 tokens, visible focus ring, lightly rounded, generous horizontal padding — Bible §10) | `secondary` (charcoal text, thin subtle border). Plain `<button>`; Radix enters at 6b where behaviour is needed.
- `Card`: `surface-raised`, subtle border, `radius-md`, optional gentle hover lift (`shadow-card-hover`).

### T6 — Smoke test
- Restyle the placeholder `src/app/page.tsx` with the primitives (exercises every component + both fonts, including a Hebrew sample string in Assistant).

## Conventions
- Primitives live in `src/app/components/ui/`, are presentational only (no data fetching, no business logic), and take `className` for composition. No class-merge library — plain string concatenation keeps it dependency-free.
- All styling via 8a token utilities; no raw hex/size/space literals (grep-clean rule from 8a DoD).

## Definition of Done
- `pnpm build` passes; fonts self-hosted in the build output.
- Every primitive renders on the placeholder page in both families, Hebrew sample included.
- `docs/decision-log.md` + `src/app/CLAUDE.md` updated (font stand-in decision, primitives location/usage rule).

## Explicitly Not in This Plan
- Radix-based dropdown components — 6b.
- Flashcard viewer — 7b.
- Module families (hero, footer, testimonial…) and page templates — later milestones.
- RTL/nikud runtime verification — 9a.
- Signature-curve usage: `--radius-signature` already generates `rounded-*-signature` utilities; applied when a module first needs it, no extra code here.
