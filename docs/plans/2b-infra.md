# Plan 2b — Neon + Vercel + Env Wiring

Goal: the scaffolded app connects to Neon locally and deploys on Vercel. Accounts for both services already exist; this plan starts at project creation.

Single environment (decision #12): one Neon database serves local development, Vercel previews, and production.

## Tasks

### T1 — Neon project
- Create a Neon project for this app (region closest to primary audience), default branch only.
- Collect the pooled connection string (app runtime) and the direct connection string (Prisma migrations).

### T2 — Local env wiring
- `.env` (gitignored): `DATABASE_URL` = pooled string, `DIRECT_URL` = direct string.
- `.env.example` (committed): both variables documented, values empty.
- `prisma/schema.prisma` datasource uses `url` + `directUrl`.

### T3 — Vercel project
- Link the git repo to a Vercel project; framework preset Next.js, package manager pnpm (auto-detected from lockfile).
- Env vars: `DATABASE_URL` and `DIRECT_URL` set once, shared across Production / Preview / Development.

### T4 — Verify
- `pnpm prisma migrate dev` runs against Neon with the placeholder schema.
- Push to main → Vercel production deploy renders the placeholder page.

## Definition of Done

- Local `prisma migrate dev` and `prisma generate` succeed against Neon.
- Production deploy on Vercel is live and connected to Neon.
- No secrets committed; `.env.example` documents every variable.

## Explicitly Not in This Plan

Real schema (3b), seeding (4c), custom domains, monitoring.
