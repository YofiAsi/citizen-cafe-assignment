# Citizen Café — Hebrew Flashcards

## Key Decisions

Every non-obvious decision is recorded with its rationale in `[docs/decision-log.md](docs/decision-log.md)`;

- **Slug-keyed levels.** A level's identity is a stable slug ("red", "light-blue"); its display label and colour exist only as a UI mapping to design tokens - the database never stores a display name for a level. Tiers and types key on position.
- **Domain model kept proportionate.** The domain layer (`src/domain/`) records the ubiquitous language and invariants, but reads go through a thin query layer returning plain DTOs.
- **Least-privilege runtime access.** The app connects as a SELECT-only Postgres role; the owner role is used only for migrations and seeding.

## Schema Rationale

Five tables: `Tier` → `Level` → `Type` (the navigation tree), `Deck` (the studied unit: a typeless level, or a level + type pair), and `Card`.

- **Tables -** taxonomy rows need stable identity, ordering, and relations; enum values are display names, which nothing is allowed to key on.
- **Surrogate cuid PKs + natural upsert keys.** Foreign keys and client state use opaque ids; the seed upserts on natural keys — `position` within parent for tiers and types, `(tierId, slug)` for levels, `(levelId, typeId)` for decks, and an explicit per-deck `seedId` for cards. Re-running the seed after content edits updates rows in place instead of churning ids, so per-user progress could attach to cards later without breaking.
- **An explicit** `Deck` **table** gives the card-holding unit one stable identity whether or not its level has types. A partial unique index (`levelId` where `typeId IS NULL`) enforces "at most one typeless deck per level" — something a plain composite unique can't express in Postgres.
- `Level` **stores no name or colour.** Presentation concerns live in the UI's token mapping; the schema survives a rebrand untouched.



## Trade-offs

- **One Neon database for local, preview, and production.** Simple to set up and seed, and drift-free for static read-only content.
- **Position as identity for tiers and types.** Reordering them would re-key rows on the next seed. Accepted because the progression is a fixed part of the method; levels key on slugs and cards on explicit ids, so the two things that might actually change are insertion-safe.
- **Reads bypass the domain layer.** Less DDD purity in exchange for far less code; the domain stays as the model of record and the invariant reference.
- **Scripted verification instead of a test suite.** Correctness is enforced where the risk actually is: seed-time validation (taxonomy match, duplicate scan, per-deck counts), idempotency checks, and live query verification against the seeded database.



## What I'd Do With More Time

- Separate the codebase into dev and prod environments (currently a single shared environment).
- Use git worktrees and branches for cleaner git work.
- Improve UX and sound design.
- Review and Improve word decks.

