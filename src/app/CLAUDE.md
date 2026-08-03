# UI & Design Rules

- Colours, typography, and spacing come exclusively from Tailwind theme tokens derived from the Design Bible (`docs/citizen-cafe-design-bible.md`). No ad-hoc hex values, font sizes, or magic spacing numbers in components.
- Hebrew text renders RTL (`dir="rtl"`); English LTR. Never rely on browser auto-detection for direction.
- Level display labels ("Red", "Light Blue", …) and colours resolve in the UI by mapping the level's `slug` → label + design token (decisions #16, #21); the DB carries neither. Types inherit their level's colour.
- Build interactive primitives (dropdowns, etc.) on Radix; do not hand-roll accessibility.

## Fonts (plan 8b)

- Fonts load once in `src/app/fonts.ts` via `next/font` and are exposed as CSS variables consumed by the `--font-sans` / `--font-brand` tokens. Never import fonts elsewhere.
- All Hebrew vocabulary content renders in Assistant (`font-sans`) — never in the brand serif. The brand serif (`font-brand`) is for editorial headlines only.
- Fedra has no licensed files; Frank Ruhl Libre stands in behind `"Fedra Serif"` in the stack. Licensed files slot in via `next/font/local` in `fonts.ts` only.

## Base primitives (plan 8b)

- Presentational primitives live in `src/app/components/ui/` (`Container`, `Section`, `Heading`, `Text`, `Button`, `Card`). Compose UI from them instead of restyling raw elements; they take `className` for extension.
- Width caps: only `max-w-content` / `max-w-wide` / `max-w-prose`. Tailwind's default sized `max-w-sm|md|lg|…` are shadowed by the named `--spacing-*` tokens (they compile to spacing values, e.g. `max-w-sm` → 0.5rem) — never use them.
- Primitives stay presentational — no data fetching, no business logic, no state beyond what the element itself needs.

## Selection flow (plans 6a, 6b)

- The chosen deck is URL state: `/?tier=&level=&type=`. There is no client store — the page resolves the cascade server-side. Do not add selection state to a component.
- The page loads the whole taxonomy once with `getCatalog()` and narrows every dropdown in memory. Do not add a query per cascade step.
- Level labels and colours derive from the level's `slug` in `catalog/level-map.ts` — never hardcode a level list there. Ids stay inside `catalog/selection.ts`; URLs and picker props carry slugs.
- `selection-url.ts` stays free of data-layer imports: the client picker imports it.
- Dropdowns are Radix `Select`. The type dropdown renders only for levels that have packs.

## Flashcard deck (plan 7a)

- The deck lives in `src/app/components/flashcards/`; its interaction model is frozen in `docs/plans/7a-flashcard-interaction.md`. Read that plan before changing motion, timings, or sound.
- `CardDeck` takes cards plus a `label` and `levelSlug` — it never resolves level labels or colours itself, and never fetches.
- It deals itself in on mount, so give it `key={deckSlug}`: without the remount, switching decks skips the animation.
- Never place an `overflow: clip/hidden` ancestor above the cards: it flattens the 3D flip and clips the card to its own box.
- Sound goes through `flashcards/sound.ts` (Web Audio). Files live in `public/sounds/`; keep that README's mapping current.
- `ease-spring` is for the deck's game-feel only — the deliberate exception to Bible §13. Do not reach for it in general UI.
