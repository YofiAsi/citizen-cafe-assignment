# Plan 4c — Seed Pipeline

Goal: load `seed/taxonomy.ts` + `seed/data.ts` into Postgres (Neon) through one idempotent, re-runnable seed script wired to pnpm. This is the only path content enters the DB (`seed/CLAUDE.md`, decision #3). The schema is implemented (3b): Tier, Level, Type, Deck, Card with number-keyed taxonomy (#19), deck upserts on `(levelId, typeId)`, card upserts on `(deckId, seedId)` (#18).

## Resolved Decisions

- **Upsert keys** (#18, #19): Tier on `position`; Level on `(tierId, position)`; Type on `(levelId, position)`; Deck on `(levelId, typeId)`; Card on `(deckId, seedId)`.
- **Taxonomy rows are seeded here**, derived from `seed/taxonomy.ts` — migrations carry no data (3b is shape-only), so this script owns all rows.
- **Level names never enter the DB** (#19): the script maps the human-readable `level`/`type` labels in the seed files to `(tier position, level position)` via the order they appear in `seed/taxonomy.ts`. Tier order is Foundation → Flow → Freedom.
- **Pruning: full reconcile.** After upserting, the script deletes cards whose `seedId` is absent from the deck's entry in `data.ts` — a replaced card retires its id (`seed/CLAUDE.md`), and the DB must mirror the file. Taxonomy/deck rows are never auto-deleted (removal there is a schema-level event; fail loudly instead).

## Tasks

### T1 — Seed input contracts (already in place)
- `seed/taxonomy.ts` — `DECKS: TaxonomyDeck[]` (tier, level label, type number | null): the authoritative 23-deck list.
- `seed/data.ts` — `content: DeckContent[]` with `Pair { id, hebrew, english }`: the vocabulary.
- This plan adds no fields; the script consumes both files as-is. Nikud preserved verbatim — no normalisation.

### T2 — Validation (before any write, fail loudly)
- Every `data.ts` deck matches exactly one `taxonomy.ts` deck and vice versa (23/23, no extras, no gaps).
- 10 pairs per deck; `id` unique within its deck; global no-repeat scan on `hebrew` across decks (4b rule).

### T3 — Seed script (`seed/seed.ts`)
- Derive taxonomy rows from `taxonomy.ts`: tiers with fixed positions 1–3 and their names; levels numbered by order of appearance within their tier; types numbered by their label, `name` = the label as string.
- Upsert in dependency order (tier → level → type → deck → card) on the keys above; then reconcile-delete retired cards per deck.
- All writes in one transaction; deterministic order; summary printed (rows created / updated / unchanged / deleted).
- Idempotent: an immediate second run reports zero changes.

### T4 — pnpm + Prisma wiring
- TS runner: `tsx` pinned `4.23.4` (latest stable, checked 2026-08-03), dev dependency.
- Prisma 7 registers the seed command in `prisma.config.ts` (`migrations.seed: "tsx seed/seed.ts"` — the `package.json#prisma` key is deprecated); add `"seed": "prisma db seed"` to package.json scripts so `pnpm seed` runs it. Seeding also auto-triggers on `prisma migrate reset`.
- The script builds its PrismaClient (generated in `/generated/prisma`) with a Postgres driver adapter on **`DIRECT_URL`** — seeding is a CLI operation and uses the unpooled connection (decision #13). ⚑ The adapter package must match what 5a selects for the runtime client (one shared dependency, exact version pinned at add time) — align before implementing whichever lands second.

## Definition of Done

- `pnpm seed` populates the single Neon DB (decision #12) with 3 tiers, 12 levels, 14 types, 23 decks, 230 cards; a second immediate run reports zero changes.
- Validation failures (taxonomy mismatch, duplicate ids, cross-deck Hebrew repeats) abort before any write.
- Removing or replacing a card in `data.ts` and re-running leaves the DB mirroring the file.

## Explicitly Not in This Plan

- Schema/migrations (3b — done), taxonomy values and vocabulary (4a/4b — done).
- The runtime data-access layer (5a/5b) and any UI (6+).
