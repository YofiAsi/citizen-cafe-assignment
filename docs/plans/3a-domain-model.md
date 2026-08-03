# Plan 3a — Domain Model

Goal: define the domain layer for the Hebrew-flashcard taxonomy — ubiquitous language, entities, value objects, aggregates, invariants, and read-only repository interfaces. Pure TypeScript in `src/domain/` (no Prisma, no Next.js, no I/O). This model drives the Prisma schema in 3b; it does not hardcode the taxonomy (level/type names live in 4a seed data).

## Resolved Decisions

Modelling questions settled in the decision log — this plan follows them:

- **Deck** is the ubiquitous term for the card-holding unit (decision #15) — a typeless level, or a (level, type) pair.
- **Colour is presentation-only** (decision #16): no colour in the domain or DB; the UI maps (tier, level number) → display label + design token. Types inherit their level's colour.
- **"Types only under Freedom" is descriptive, not an invariant** (decision #17): no tier constraint on types.
- **Cards carry an explicit stable id** from `seed/data.ts`, unique within their deck (decision #18) — the identity that survives content edits and re-seeds.
- **Taxonomy is keyed by numbers** (decision #19): Levels have no name in the domain or DB — a Level is "number *n* within its Tier". Tiers and Types keep names; level display labels (colour names) are a UI mapping.
- **Card order**: seed array order is the canonical display order (a `position`); Shuffle is runtime-only presentation state and never persists.

## Ubiquitous Language

| Term | Meaning |
|---|---|
| **Tier** | One of the three fixed progression stages: Foundation → Flow → Freedom. |
| **Level** | A numbered stage of fluency inside one Tier (shown in the UI under its colour label). |
| **Type** | An optional content pack at the same fluency as its Level (numeric label). |
| **Deck** | The studied unit that holds cards: a typeless Level, or a (Level, Type) pair. |
| **Card** | One Hebrew ↔ English study item inside a Deck. |
| **Pair** | The Hebrew/English content of a Card (value). |
| **Progression** | The fixed ordering of Tiers. |

## Tasks

### T1 — Entities
Define entities in `src/domain/` (each has stable, name-independent identity per `prisma/CLAUDE.md`):

- **Tier** — `id`, `name`, `position` (fixed order). Set is fixed (3).
- **Level** — `id`, `position` (within Tier), `tierId`. Belongs to exactly one Tier. No name and no colour (decisions #16, #19).
- **Type** — `id`, `name`, `position` (within Level), `levelId`. Optional per Level.
- **Card** — `id`, `seedId` (the seed-provided stable id, decision #18), `pair`, `position` (within Deck), `deckId`. Belongs to exactly one Deck.

(**Deck** is defined once, in T3 — it is an entity that serves as an aggregate root, not a separate concept.)

### T2 — Value Objects
- **Pair** — immutable `{ hebrew, english }`. Equality by value.
- `position` fields are plain `number`s, not a value object — they are seed-written, only used for ordering, and carry no behaviour worth encapsulating.

### T3 — Aggregates
Two aggregates (cross-aggregate references are by id only):

- **Catalog** (root: **Tier**) — the navigation tree: Tier → ordered Levels → ordered Types. No cards. Small and cacheable; answers the cascading-dropdown flow. Consistency boundary for ordering of the taxonomy.
- **Deck** — the root entity itself: `id`, `levelId`, `typeId | null`, holding its ordered Cards as the aggregate boundary. Loaded when a learner selects a deck; references its Level (and optional Type) by id. Consistency boundary for "a deck's ~10 cards".

Rationale: the read-only UX browses the taxonomy first, then loads one deck's cards — splitting keeps the browse tree light and avoids loading every card up front. Two roots ⇒ two repositories (aligns with query contracts in 5b).

### T4 — Invariants
- **I1** Tiers form a fixed, ordered progression (Foundation → Flow → Freedom).
- **I2** Every Level belongs to exactly one Tier; Levels are ordered (increasing fluency) within their Tier.
- **I3** Types are optional: a Level has zero or more Types, ordered within the Level. No tier restriction (decision #17).
- **I4** Deck definition: a Deck is either a **typeless Level** or a **(Level, Type)** pair. A Level *with* Types has exactly one Deck per Type and **no** bare deck; a Level *without* Types has exactly one (typeless) Deck.
- **I5** Every Card belongs to exactly one Deck; a Deck holds an ordered set of Cards (~10).
- **I6** Tier, Level, Type, Deck, and Card each have a stable identity independent of display name; nothing keys on names in persisted or client state. Taxonomy nodes are naturally keyed by `position` within their parent (decision #19); a Card's business identity is its seed id (decision #18).

### T5 — Repository Interfaces (read-only)
Define interfaces in `src/domain/` (implemented in `src/infrastructure/persistence/` in a later milestone). Read-only — no create/update/delete, no domain events (runtime is read-only).

- **CatalogRepository**
  - `listTiers(): Tier[]` — ordered by progression.
  - `listLevels(tierId): Level[]` — ordered within the Tier.
  - `listTypes(levelId): Type[]` — ordered within the Level; empty when the Level is typeless.
- **DeckRepository**
  - `findDeck(levelId, typeId | null): Deck | null` — resolves a selection to its deck.
  - `getCards(deckId): Card[]` — the deck's cards in canonical order.

Granular methods (rather than one whole-tree fetch) mirror the cascading dropdowns; application services wrap them and return caller-shaped DTOs (per `src/CLAUDE.md`).

## Definition of Done

- Ubiquitous language, entities, value objects, the two aggregates, invariants I1–I6, and the two repository interfaces are specified above with no unresolved modelling gaps.
- No taxonomy values (level/type names) are hardcoded — treated as seed data.
- The model is expressible as pure `src/domain/` TypeScript with no infrastructure dependency, and maps cleanly onto a Prisma schema (validated by 3b).

## Explicitly Not in This Plan

- Concrete Prisma models, tables/enums, columns, constraints, migrations (3b).
- Repository *implementations*, mappers, DTO shapes, caching (5a/5b).
- Seed data and the seeding script (4b/4c).
- Any UI, routing, or selection-state logic (milestones 6–7).
