# Data Rules

- Schema changes go through Prisma migrations only — never edit the database directly.
- Every card, level, tier, and type has a stable database identity; never key on display names in persisted or client state.
- Single environment (decision #12): one Neon database for local, preview, and production.
- No colour or level-name columns (decisions #16, #21): a Level's identity is its `slug` ("red", "light-blue"), unique per tier; display labels and colour tokens are UI mappings from the slug. Tier and Type store names. Seed upsert keys: Tier/Type on `position` within parent, Level on `(tierId, slug)`.
- Connections (decision #13): runtime uses pooled `DATABASE_URL`; CLI/migrations use unpooled `DIRECT_URL`, wired via `prisma.config.ts` (Prisma 7 — no `directUrl` in schema, no `.env` auto-load; loaded with `process.loadEnvFile()`).
- Least privilege (decision #20): `DATABASE_URL` authenticates as the SELECT-only `app_readonly` role; `DIRECT_URL` as `neondb_owner`. New tables get SELECT automatically via default privileges — nothing to re-grant after migrations.
