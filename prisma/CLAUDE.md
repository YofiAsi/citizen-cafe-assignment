# Data Rules

- Schema changes go through Prisma migrations only — never edit the database directly.
- Every card, level, tier, and type has a stable database identity; never key on display names in persisted or client state.
