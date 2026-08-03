# Plan 3b — Prisma Schema & Initial Migration

Goal: translate the 3a domain model into concrete Prisma models plus one initial migration, on PostgreSQL (Neon). Schema changes go through migrations only — never edit the database directly (`prisma/CLAUDE.md`). Every Tier, Level, Type, Deck, and Card gets a stable identity that supports idempotent re-seeding. No taxonomy values are hardcoded here — 3b defines shape only; 4a/4c supply data.

Follows the resolved decisions in 3a: deck naming (#15), no colour columns (#16), no tier restriction on types (#17), explicit card ids from seed (#18), number-keyed taxonomy with nameless levels (#19).

## Decisions & Rationale

### D1 — Tables, not enums, for Tier/Level/Type
Enums carry no database identity and cannot hold `position` or relations, and their values *are* display names — which `prisma/CLAUDE.md` forbids keying on. Model **Tier, Level, Type, Deck, Card as tables**.

### D2 — ID strategy: surrogate PK + natural upsert keys (no slugs)
- **Primary key:** `id String @id @default(cuid())` on every model — opaque, stable, used for all FKs and client/selection state (satisfies I6).
- **Business key for idempotent upsert** (decision #19): taxonomy nodes upsert on `position` within their parent — Tier on `position`, Level on `(tierId, position)`, Type on `(levelId, position)`. Decks upsert on `(levelId, typeId)`; Cards on `(deckId, seedId)` (decision #18). Safe because the taxonomy is a fixed progression — numbers are its stable identity. Client state still keys on `id`, never on names or numbers.

### D3 — Explicit `Deck` table
An explicit `Deck` table gives a stable deck `id` for `DeckRepository`, a clean FK target for `Card`, a natural place to enforce I4, and a representable "empty deck" for edge states (9c). Trade-off vs. putting `(levelId, typeId)` directly on `Card`: one extra table and mild redundancy, accepted for stable deck identity and a single enforcement point.

## Tasks

### T1 — Datasource & generator
- `datasource db` = `postgresql`, `url = env("DATABASE_URL")` (Neon; wired in 2b).
- `generator client` per the 2a scaffold (output to `/generated/prisma`).

### T2 — `Tier`
- `id` (cuid PK), `name`, `position Int`.
- `@@unique([position])` — enforce a total order (fixed 3-row set) and the seed's upsert key.
- Relation: `levels Level[]`.

### T3 — `Level`
- `id` (cuid PK), `tierId` (FK → Tier), `position Int`. **No name and no colour columns** (decisions #16, #19) — a level is "number *n* in its tier"; display labels live in the UI mapping.
- `@@unique([tierId, position])` — ordering guard and the seed's upsert key.
- Relations: `tier`, `types Type[]`, `decks Deck[]`.

### T4 — `Type`
- `id` (cuid PK), `levelId` (FK → Level), `name`, `position Int`. No colour column; no tier restriction (decision #17).
- `@@unique([levelId, position])` — ordering guard and the seed's upsert key.
- Relations: `level`, `decks Deck[]`.

### T5 — `Deck`
- `id` (cuid PK), `levelId` (FK → Level), `typeId String?` (FK → Type, nullable).
- Relations: `level`, `type?`, `cards Card[]`.
- **Uniqueness (enforces I4):** one deck per (Level, Type), and at most one *typeless* deck per Level. Postgres treats `NULL`s as distinct, so a plain `@@unique([levelId, typeId])` will not stop two typeless decks. Handle with **two indexes** added via the migration SQL:
  - `@@unique([levelId, typeId])` for the type-bearing case, **plus**
  - a partial unique index `CREATE UNIQUE INDEX ... ON "Deck"("levelId") WHERE "typeId" IS NULL` (hand-added to the generated migration — still a migration, not a direct DB edit).
- **Seed idempotency key:** upsert a deck on `(levelId, typeId)` (both resolved from already-upserted numbered rows).

### T6 — `Card`
- `id` (cuid PK), `deckId` (FK → Deck), `seedId` (the seed-provided id, e.g. `red-01` — decision #18), `hebrew String`, `english String`, `position Int` (canonical display order = seed array order).
- `@@unique([deckId, seedId])` — the seed's upsert key; `@@unique([deckId, position])` — ordering guard.
- Relation: `deck`.

### T7 — Ordering & referential rules
- Every ordered scope uses an explicit `position Int` (Tier global; Level per tier; Type per level; Card per deck), with the `@@unique([parent, position])` guards above.
- FK on-delete behaviour: default `Restrict` is fine (read-only runtime; deletes only happen during controlled re-seeds).

### T8 — Initial migration
- Single migration `prisma migrate dev --name init_taxonomy` creating all five tables and their constraints (greenfield, no data).
- Hand-add the partial unique index from T5 into the generated migration SQL before applying.
- `prisma generate` must succeed; seeding is separate (4c). Replaces the 2a placeholder model.

## Definition of Done

- `prisma/schema.prisma` defines Tier, Level, Type, Deck, Card per T2–T6; `prisma validate` and `prisma generate` pass.
- All PKs are cuid; upsert keys are `position`-within-parent for taxonomy, `(levelId, typeId)` for decks, `(deckId, seedId)` for cards; ordering/unique constraints from T2–T7 are present, including the partial unique index for typeless decks.
- One `init_taxonomy` migration applies cleanly to the Neon database and expresses invariants I1–I6 as far as the DB can (name-independent identity, one-tier-per-level, deck uniqueness, per-scope ordering).

## Explicitly Not in This Plan

- Domain modelling (3a) — this plan follows it.
- Seed data, `seed/data.ts`, and the seeding script (4b/4c); the taxonomy values (4a).
- Repository implementations, mappers, DTOs, caching (5a/5b).
- Neon/Vercel/env wiring (2b) beyond consuming `DATABASE_URL`.
