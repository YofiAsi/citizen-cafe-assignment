# Project Rules

## Source of Truth

- `docs/project-brief.md` — scope, stack, UX, milestones. Do not implement anything outside it without asking.
- `docs/citizen-cafe-design-bible.md` — all visual decisions.
- `docs/decision-log.md` — record every non-obvious technical or product decision there (next index number, decision, rationale) as soon as it is made.

## Scoped Rules

Each part of the tree carries its own rules — read the local `CLAUDE.md` when working there:

- `src/CLAUDE.md` — DDD architecture and layering
- `src/app/CLAUDE.md` — UI and design
- `prisma/CLAUDE.md` — schema and migrations
- `seed/CLAUDE.md` — content and seeding



## Code Style

- Keep solutions simple and practical. Don't introduce complex patterns or libraries unless necessary for the task.
- Use clear variable names, modular functions, and consistent formatting. Add comments where helpful, but avoid over-commenting obvious code. If something in the code is badly named and you think it should be renamed, ask me beforehand.
- Avoid using magic numbers.

## Git Commits

- Conventional Commits: `type(scope): summary` — e.g. `feat(app): add tier dropdown`.
- Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `seed`. Scope is the affected area: `domain`, `application`, `infra`, `app`, `prisma`, `seed`, `docs`. Omit the scope when it would just repeat the type (e.g. `docs: ...`, not `docs(docs): ...`).
- Summary in imperative mood, lowercase, no trailing period.
- Each plan file (`docs/plans/*`) is committed together with the implementation work it describes, not separately.

## Dependencies

- Use pnpm. Pin exact versions for every package and image — latest stable, checked online at time of adding.



## Verification

- No auth and no per-user state anywhere.

