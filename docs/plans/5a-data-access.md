# Plan 5a — Data Access

Single plan for milestone 5 (replaces the planned 5a/5b split). The runtime is read-only and the UI needs exactly four queries; this plan delivers them with no repository implementations, no mappers, and no domain-object round-trips — per the DDD rule that reads query the DB directly and return plain DTOs. The domain layer (3a) stays as the model of record; its repository interfaces are unused at runtime and are deleted here as dead code.

## The four queries

| Query | Returns (plain DTOs, ordered by `position`) | Feeds |
|---|---|---|
| `listTiers()` | `{ id, name, position }[]` | Tier dropdown |
| `listLevels(tierId)` | `{ id, position }[]` (no name — decision #19; label mapped in UI) | Level dropdown |
| `listTypes(levelId)` | `{ id, name, position }[]` (empty = typeless level) | Type dropdown |
| `getCards(levelId, typeId \| null)` | `{ id, hebrew, english }[]` | Flashcard viewer |

## Tasks

### T1 — Runtime Prisma client
- `src/infrastructure/persistence/client.ts`: PrismaClient (from `/generated/prisma`) with the `PrismaPg` adapter on pooled `DATABASE_URL` (decision #13); `globalThis` singleton guard for dev hot-reload. Next.js loads `.env` itself — no manual env loading.
- Dependency `@prisma/adapter-pg@7.9.1` is already added by 4c (shared).

### T2 — Queries
- `src/infrastructure/persistence/queries.ts`: the four functions above as plain `findMany`/`findFirst` calls, each returning its DTO shape via `select` (Prisma types never leave the file). `getCards` resolves the deck first — `typeId === null` uses `findFirst({ where: { levelId, typeId: null } })` (the partial unique index isn't upsert/`findUnique`-addressable); missing deck returns `[]`.
- DTO types declared next to the functions and exported — they are plain object types, safe to import anywhere.

### T3 — Application seam
- `src/application/services/catalog.ts`: re-exports the four functions wrapped in React `cache()` (per-request dedupe). This is the only import surface the UI uses, keeping the `app → application → infrastructure` layering rule intact at the cost of ~10 lines. No other service code.

### T4 — Cleanup
- Delete `src/domain/repositories/` (CatalogRepository, DeckRepository) — interfaces with no implementation and no runtime caller. Entities, aggregates, and `Pair` remain as the domain reference.

## Definition of Done

- `tsc --noEmit` and `pnpm build` pass.
- A scratch script (not committed) calls all four functions against the seeded Neon DB and returns expected counts (3 tiers; 4/4/4 levels; types only where 4a says; 10 cards for a sampled deck; `[]` for a bogus selection).

## Explicitly Not in This Plan

- Any UI (6/7), edge-state handling (9), caching beyond `cache()` — ISR/revalidation belongs to the page layer if ever needed.
- Writes of any kind; the seed pipeline (4c) owns all writes.
