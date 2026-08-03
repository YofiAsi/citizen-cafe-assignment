# Data Rules

- Schema changes go through Prisma migrations only — never edit the database directly.
- Every card, level, tier, and type has a stable database identity; never key on display names in persisted or client state.
- Single environment (decision #12): one Neon database for local, preview, and production.
- No colour or level-name columns (decisions #16, #19): levels are numbered within their tier; their display labels (colour names) and colours are UI mappings. Tier and Type store names; seed upserts taxonomy rows on `position` within parent.
- Connections (decision #13): runtime uses pooled `DATABASE_URL`; CLI/migrations use unpooled `DIRECT_URL`, wired via `prisma.config.ts` (Prisma 7 — no `directUrl` in schema, no `.env` auto-load; loaded with `process.loadEnvFile()`).
