# Plan 8a — Design Bible → Tailwind Tokens

Goal: encode the Design Bible's colour, typography, and spacing systems as Tailwind CSS 4 `@theme` tokens (CSS-first, no JS config). Every colour/type/space value used in components resolves to one of these tokens. No component code here — this plan defines the token layer 8b and all UI build on.

## Open Questions (resolve before coding the flagged tokens)

Values the Design Bible does not state and that must not be invented:

1. **Level colour palette.** Levels are colour-coded (brief §Learning Structure), but the full set of level names + hex values lives in the taxonomy spec (milestone 4a), which is not yet written. The brief only names `Red` (seed example) and the three typed Freedom levels `Dark Green`, `Turquoise`, `Indigo`. T2 defines the token *structure* now; the actual `--color-level-*` values are blocked on 4a.
2. **Spacing scale values.** Bible §14 marks spacing "Needs extraction … measured from Figma." Token names are given (`xs/sm/md/lg/xl/section`); numeric values are not.
3. **Radius values.** Bible §14 marks `radius.sm / md / signatureCurve` "Needs extraction." `signatureCurve` may need a clip-path/pseudo-element, "not just border-radius."
4. **Yellow hover / pressed states.** Bible §5 says "derive accessible hover / pressed states for yellow intentionally" but gives no values.
5. **Breakpoint values.** Bible §14 marks `mobile/tablet/desktop/wide` "Needs layout review … exact breakpoints need formalization."
6. **`border.strong` value.** Named in Bible §14 with no value (`border.default` = `#D2CEC6` 1px is given).
7. **`surface.base` exact value.** Bible gives a range `#F2F1EC`–`#EEECE6`; one value must be chosen.
8. **Typography exact sizes / weights / line-heights per role.** Bible §6/§14: roles and families are defined; "final font weights / exact styles should be checked against source design files." Only `body line-height >= 1.4` is fixed.

## Token file location

- Single source of truth: a `@theme { … }` block in `src/app/globals.css` (the global stylesheet created by scaffold 2a). Tailwind 4 is CSS-first — tokens are CSS custom properties inside `@theme`, which generate the utility classes; there is no `tailwind.config.js`.
- If the block grows large, split into `src/app/theme.css` and `@import "./theme.css";` from `globals.css`. Keep one `@theme` origin; do not scatter tokens across files.
- Naming follows Tailwind 4 namespaces so utilities generate predictably: `--color-*` → `bg-*/text-*/border-*`, `--font-*` → `font-*`, `--text-*` → text-size utilities, `--radius-*` → `rounded-*`, `--shadow-*` → `shadow-*`, `--breakpoint-*` → responsive variants, `--spacing-*` for named space tokens.

## Tasks

### T1 — Colour tokens (brand, surface, text, border)
Direct from Bible §5. All values below are stated in the Bible; no derivation.

| Token (`@theme`) | Value | Bible source | Utility |
|---|---|---|---|
| `--color-brand-yellow` | `#F9E24C` | `brand.yellow` | `bg-brand-yellow` |
| `--color-brand-charcoal` | `#373230` | `brand.charcoal` | `text-brand-charcoal` |
| `--color-brand-white` | `#FFFFFF` | `brand.white` | — |
| `--color-surface-base` | `#F2F1EC` (⚠ OQ7 range) | `surface.base` | `bg-surface-base` |
| `--color-surface-raised` | `#FFFFFF` | `surface.raised` | `bg-surface-raised` |
| `--color-surface-dark` | `#373230` | `surface.dark` | `bg-surface-dark` |
| `--color-text-primary` | `#373230` | `text.primary` | `text-text-primary` |
| `--color-text-muted` | `#716C66` | `text.muted` | `text-text-muted` |
| `--color-text-inverse` | `#FFFFFF` | `text.inverse` | `text-text-inverse` |
| `--color-border-subtle` | `#D2CEC6` | `line.subtle` / `border.default` | `border-border-subtle` |
| `--color-border-strong` | ⚠ OQ6 | `border.strong` | `border-border-strong` |
| `--color-brand-yellow-hover` | ⚠ OQ4 | derived yellow state | — |
| `--color-brand-yellow-pressed` | ⚠ OQ4 | derived yellow state | — |

Usage rules carried from Bible §5 (enforce in review, not tokens): charcoal text on yellow (never white on yellow); yellow is emphasis, never a large background fill; off-white base, not pure white, site-wide.

### T2 — Level-colour tokens (first-class, colour-coded levels)
Levels are colour-coded and the colour is semantic (the level *is* its colour). Model as a dedicated `--color-level-*` family so a level's badge/card/accent all reference one token.

- Structure: `--color-level-<slug>` (e.g. `--color-level-red`, `--color-level-dark-green`, `--color-level-turquoise`, `--color-level-indigo`), plus, where the taxonomy needs it, on-colour text pairs `--color-level-<slug>-on` for accessible text over the level colour.
- ⚠ OQ1: exact slug set + hex values are owned by taxonomy spec 4a. Do not hardcode here. When 4a lands, add one token per level; keep slugs identical to the taxonomy's level identifiers so app code can map `level.slug → var(--color-level-<slug>)` without a lookup table.
- Contrast: each level colour used as a fill must pass AA against its paired `-on` text; charcoal (`#373230`) or white (`#FFFFFF`) chosen per level. Confirm during 4a.

### T3 — Typography tokens
Families are stated (Bible §6); font *loading* is 8b. Here only declare the family + scale tokens.

- Families: `--font-sans: <Assistant stack>` (functional/system — default), `--font-brand: <Fedra stack>` (expressive/voice). Actual stacks wired in 8b; the `@theme` names are fixed now.
- Role scale — token per Bible §6 role; sizes/weights/line-heights are ⚠ OQ8 (extract from source). Fixed constraint: body `line-height >= 1.4`.

| Role token | Family | Bible role |
|---|---|---|
| `--text-display` | brand (Fedra) | `display.hero` |
| `--text-h1` | brand (Fedra) | `heading.h1` |
| `--text-h2` | brand (Fedra) | `heading.h2` |
| `--text-body` | sans (Assistant) | `body.default` |
| `--text-label` | sans (Assistant) | `ui.label` |
| `--text-meta` | sans (Assistant) | `meta.small` |
| `--text-button` | sans (Assistant) | `button.label` |

Guardrail (review, not token): never swap Fedra display voice for sans "for convenience"; never mix both families inside one small UI component.

### T4 — Spacing tokens
Named tiers from Bible §14 + §8 section-spacing tiers. ⚠ OQ2 for all values.

- Scale: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`.
- Section rhythm (Bible §8 "compact / regular / spacious / feature"): `--spacing-section-compact`, `--spacing-section-regular`, `--spacing-section-spacious`, `--spacing-section-feature`.
- Container max-widths (Bible §8 "Use multiple max-width tokens, not one container"): `--container-content`, `--container-wide` (bleed). Values ⚠ OQ2/OQ5.

### T5 — Radius + border tokens
- Radius (Bible §8/§14): `--radius-sm` (subtle rounding), `--radius-md` (card/input), `--radius-signature` (quarter-circle/swoop). Values ⚠ OQ3; note `--radius-signature` may be implemented via clip-path in 8b rather than `border-radius`.
- Border widths: `--border-width-default: 1px` (Bible §14, thin neutral rule). Colours come from T1 (`--color-border-subtle` / `-strong`).

### T6 — Elevation tokens
Depth is "very restrained" (Bible §14). Values ⚠ (minimal, not specified).

- `--shadow-none: none`.
- `--shadow-card-hover`: gentle lift only (Bible §10 "gentle lift, border-darken, or mild image motion" — avoid dramatic e-commerce hover). Starting value to be confirmed with design; keep near-invisible.

### T7 — Breakpoint tokens
- `--breakpoint-mobile`, `--breakpoint-tablet`, `--breakpoint-desktop`, `--breakpoint-wide`. ⚠ OQ5 for all values.

## Definition of Done
- `@theme` block exists in `src/app/globals.css` with every T1 colour populated (stated Bible values) and every T2–T7 token *named* with either a real value or an inline `/* OQ# */` placeholder comment pointing at the Open Question.
- Generated utilities (`bg-brand-yellow`, `text-text-muted`, `border-border-subtle`, `rounded-md`, etc.) compile with `pnpm build`.
- No hex/size/space literal appears anywhere outside this `@theme` block (grep-clean).
- Every populated value traces to a Bible section; every placeholder traces to a numbered Open Question.

## Explicitly Not in This Plan
- Loading Fedra/Assistant fonts, fallback stacks, `next/font` wiring — plan 8b.
- Typography/layout primitive components — plan 8b.
- Motion utilities/keyframes — plan 8b.
- Level colour *values* — taxonomy spec 4a (this plan only reserves their token slots).
- Module-family components (hero, cards, footer, etc.) and page templates — later milestones.
- Runtime RTL/nikud verification — milestone 9a.
