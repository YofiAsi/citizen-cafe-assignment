# Citizen Café — Hebrew Flashcards: Project Brief

## Overview

A public web app where learners study Hebrew vocabulary with flashcards, organised by Citizen Café's teaching progression. Users pick a tier, level, and (where applicable) type, then flip through Hebrew ↔ English cards.

## Learning Structure

- **Tiers** (fixed progression): Foundation → Flow → Freedom.
- **Levels**: each tier is split into colour-coded levels representing increasing fluency.
- **Types**: some Freedom levels (Dark Green, Turquoise, Indigo) have types — separate content packs at the same mastery level, so learners keep learning without repeating words.
- A **leaf node** is a level without types, or a level + type combination. Each leaf holds ~10 Hebrew ↔ English pairs.
- The full taxonomy (level names, colours, type names) is provided separately and specified in the taxonomy spec (milestone 4a).



## Core UX

1. **Tier dropdown** — selecting a tier filters the Level dropdown to that tier's levels.
2. **Level dropdown** — selecting a level either shows cards immediately (no types) or reveals a Type dropdown.
3. **Flashcard viewer** — shows the Hebrew word; tap/click reveals the English. Controls: **Next** and **Shuffle**.
4. No login. Fully public.



## Stack


| Concern       | Choice                           |
| ------------- | -------------------------------- |
| Framework     | Next.js (App Router), TypeScript |
| Styling       | Tailwind CSS                     |
| UI primitives | Radix UI                         |
| ORM           | Prisma                           |
| Database      | PostgreSQL on Neon               |
| Hosting       | Vercel                           |


Exact versions are pinned in the scaffold plan (milestone 2a).

## Content Pipeline

Vocabulary is generated **offline** with an AI assistant: for each leaf node, generate ~10 Hebrew ↔ English pairs, paste into `seed/data.ts`, and seed into Neon via an idempotent script. The app makes **no live LLM calls**.

Example seed shape:

```ts
{
  level: "Red",
  type: null,
  pairs: [
    { hebrew: "שָׁלוֹם", english: "Hello / Peace" },
    { hebrew: "תּוֹדָה", english: "Thank you" },
    // ... ~8 more
  ]
}
```



## Design

All visual decisions follow `docs/citizen-cafe-design-bible.md`: colour system, typography scale, spacing conventions, brand personality.

## Out of Scope

Auth, user accounts, progress tracking, spaced repetition, analytics, live AI features.

## Milestones

1. **Project brief** — 1a brief (this doc) · 1b engineering rules (`CLAUDE.md`)
2. **Scaffold & infra** — 2a repo scaffold (pinned versions, folder structure) · 2b Neon + Vercel + env wiring
3. **Data model** — 3a domain model · 3b Prisma schema + migrations
4. **Content & seeding** — 4a taxonomy spec · 4b content generation workflow · 4c seed pipeline
5. **Data access layer** — 5a architecture (server components vs. route handlers, caching) · 5b query contracts
6. **UI: selection flow** — 6a state strategy · 6b cascading dropdown components
7. **UI: flashcard viewer** — 7a interaction spec · 7b component build
8. **Design system** — 8a Design Bible → Tailwind tokens · 8b base primitives + Hebrew font strategy
9. **Polish & QA** — 9a Hebrew rendering (RTL, nikud) · 9b responsive + accessibility · 9c empty/edge states
10. **Deploy & verify** — 10a production wiring · 10b prod seed + smoke test

