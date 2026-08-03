# Content & Seeding Rules

- Vocabulary lives in `seed/data.ts` and enters the DB only via the seed script.
- The seed script must be idempotent (safe to re-run via upserts).
- Preserve nikud (vowel marks) exactly as written in seed data.
