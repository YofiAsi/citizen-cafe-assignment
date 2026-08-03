# Plan 2a — Repo Scaffold

Goal: a building, deployable Next.js skeleton with the project's folder structure and all core dependencies pinned. No features.

## Pinned Versions (latest stable, npm registry, checked 2026-08-03)

| Package | Version |
|---|---|
| pnpm | 11.20.0 |
| next | 16.2.12 |
| react / react-dom | 19.2.8 |
| typescript | 7.0.2 |
| tailwindcss | 4.3.3 |
| radix-ui | 1.6.7 |
| prisma / @prisma/client | 7.9.1 |

## Tasks

### T1 — Scaffold Next.js app
- The repo already contains `docs/`, `src/`, `prisma/`, `seed/`, and scoped `CLAUDE.md` files, so `create-next-app` cannot run in place: scaffold into a temp directory (`pnpm create next-app` with TypeScript, ESLint, Tailwind, App Router, `src/` dir, `@/*` alias), then move the generated files into the repo without overwriting existing ones.
- Set every dependency in `package.json` to the exact pinned version above (strip `^`/`~`), reinstall, verify lockfile.

### T2 — Folder structure
Already created ahead of this plan — verify it matches:

```
src/
├── app/                         # routes, layouts — thin
├── domain/                      # entities, value objects, repository interfaces (pure TS)
├── application/services/        # application services, DTOs
└── infrastructure/persistence/  # Prisma repositories + mappers
prisma/                          # schema.prisma, migrations
seed/                            # data.ts + seed script (milestone 4c)
docs/                            # brief, design bible, plans
```

Add `.gitkeep` files so empty layers are committed.

### T3 — Add Prisma
- `pnpm add -D prisma@7.9.1`, `pnpm add @prisma/client@7.9.1`.
- `prisma init` with a placeholder model; `DATABASE_URL` read from `.env`.
- Commit `.env.example` with `DATABASE_URL=` documented; `.env` gitignored.

### T4 — Add Radix
- `pnpm add radix-ui@1.6.7` (unified package; import primitives per-component).

### T5 — Baseline config
- `tsconfig.json`: `strict: true`.
- Keep Next's default ESLint config; add nothing else (no Prettier, no husky).
- Root layout: minimal, empty homepage rendering a placeholder.

## Definition of Done

- `pnpm build` passes.
- `pnpm dev` renders the placeholder homepage.
- `pnpm prisma generate` succeeds against the placeholder schema.
- Folder structure above exists and is committed.

## Explicitly Not in This Plan

Neon connection (2b), real schema (3b), design tokens (8a), any UI beyond the placeholder page.
