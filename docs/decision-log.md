# Decision Log

Newest first. Every non-obvious technical or product decision gets a row: what was decided, and why.

| # | Decision | Rationale |
|---|---|---|
| 11 | Conventional Commits format (`type(scope): summary`, scopes mirror the directory areas) | Widely understood, greppable history, no tooling needed |
| 10 | Scoped `CLAUDE.md` rules per directory (root, `src/`, `src/app/`, `prisma/`, `seed/`) | Rules load in context exactly where they apply; root stays global-only |
| 9 | Decision log maintained in this file | Single place to trace why choices were made |
| 8 | Latest stable pinned exact for all packages, including TypeScript 7 (native compiler line) | Project convention: no floating ranges; latest stable checked online at add time |
| 7 | pnpm as package manager | First-class Vercel support, fast installs |
| 6 | Radix Primitives (unified `radix-ui` package), not Radix Themes | Styling comes from the Design Bible via Tailwind tokens; only behaviour/a11y needed from Radix |
| 5 | DDD layering (`domain` / `application` / `infrastructure`); no domain events or write-side plumbing | Runtime app is read-only; events add machinery with no current use case |
| 4 | Plans live in `docs/plans/<milestone><letter>-name.md` | Numbering matches the milestone map in the brief |
| 3 | Vocabulary generated offline with an AI assistant into `seed/data.ts`; no live LLM calls in the app | Content is static per level; avoids runtime cost, latency, and key management |
| 2 | No auth, no per-user state | Public-facing study tool; requirement from the brief |
| 1 | Stack: Next.js (App Router) + TypeScript, Tailwind, Radix, Prisma, PostgreSQL on Neon, Vercel | Set at project kickoff |
