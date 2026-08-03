# Plan 6a — Selection State

Where the "which deck am I studying" state lives, and how the page gets from a choice to a set of cards.

## Decision: the URL is the state

`/?tier=<slug>&level=<slug>&type=<n>` is the only selection state in the app. No client store, no context, no session.

- The app has **one** page and **one** selection, and there is no auth or per-user state (brief, decision #2) — query parameters carry all of it.
- The page stays a server component: it resolves the cascade, then fetches that deck's cards. Cards never travel to the client except as props.
- Back/forward, refresh, and sharing a deck all work for free, and the picker needs no state of its own beyond the in-flight navigation.
- Remounting the deck when the slugs change (`key`) is what replays the deal-in animation (plan 7a), so the animation follows from the state model rather than being wired separately.

Rejected: client-side state in a page-level provider (loses shareable URLs, forces a client boundary around the whole page) and route segments `/deck/[slug]` (the brief calls for a single page).

## Slugs, not ids

The URL carries readable slugs, never database ids: `?tier=freedom&level=indigo&type=3`. Tier slugs come from the stored tier name, level slugs from the level's own `slug` column (decision #21), and a type's slug is its number. Ids stay inside `selection.ts`.

## Fetch the catalog once, narrow in memory

The taxonomy is 29 rows, so the page loads all of it with `getCatalog()` (5a) and derives every dropdown from that. Choosing a tier or a level costs no database work; only the cards are fetched:

| URL state | Queries |
|---|---|
| nothing chosen | `getCatalog` |
| tier, or tier + level with no deck yet | `getCatalog` |
| a complete choice | `getCatalog` + `getCards` |

The picker holds the choice optimistically (`useOptimistic`) and pushes the URL inside a transition, so the dropdowns move on click while the deck catches up. That is what keeps the cascade feeling instant even though the URL is the source of truth.

Measured against Neon in production: ~0.5s for the catalog, ~0.85s for a complete deck URL. If the catalog's share matters later, it is static content and belongs behind a cache in the application service, not here.

## Shape

`src/app/components/catalog/selection.ts` — `resolveSelection(params)` returns the options for each dropdown (levels keyed by tier, types keyed by level), the current choice at each step, and a `deck` (`{ levelId, typeId, caption, levelSlug }`) once the choice is complete.

`selection-url.ts` — `selectionHref()` and the params type, kept separate so the client picker can build URLs without pulling the data layer into its bundle.

`level-map.ts` — the UI half of decisions #16/#21: a level's `slug` → its label (title-cased) and its `--color-level-*` tokens. The only place level names and colours are derived; a new level in the seed needs no edit here.

## Definition of Done

- Each step narrows the next with no request of its own; an unknown or half-complete selection renders the empty state rather than erroring.
- `pnpm build` passes; `/` is a dynamic route.

## Explicitly Not in This Plan

- The picker's markup and styling (6b), the deck's behaviour (7a/7b).
- Empty and error states beyond "choice incomplete" / "deck has no cards" (9c).
