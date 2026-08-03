# Content & Seeding Rules

- Vocabulary lives in `seed/data.ts` and enters the DB only via the seed script.
- The seed script must be idempotent (safe to re-run via upserts).
- Preserve nikud (vowel marks) exactly as written in seed data.
- Every pair carries a stable `id`, unique within its deck (decision #18) — the seed's upsert key. Ids are never reused or renumbered; editing a card's text keeps its id, replacing a card retires the old id and mints a new one.
