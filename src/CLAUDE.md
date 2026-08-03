# Architecture Rules (DDD)

- Follow the DDD layering under `src/`:
  - `src/domain/` — entities, value objects, repository **interfaces**. Pure TypeScript: no Prisma, no Next.js, no I/O imports.
  - `src/application/services/` — one service per domain area. Coordination only; reads return plain DTOs shaped for the caller.
  - `src/infrastructure/persistence/` — Prisma repository implementations + mappers (Prisma model ↔ domain object). Prisma types never leak past this layer.
- `app/` (routes, server components) and UI components are thin: translate input → call application service → render. **No business logic in routes, components, or server actions.**
- The runtime app is read-only (no user writes). Do not add domain events, messaging, or write-side plumbing unless a write use case is added to the brief.
