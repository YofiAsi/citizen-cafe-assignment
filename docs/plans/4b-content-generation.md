# Plan 4b — Content Generation Workflow

Goal: a repeatable offline workflow that produces ~10 Hebrew ↔ English pairs (with nikud) for every deck in the taxonomy, lands them in `seed/data.ts`, and validates them — ready for the 4c seed pipeline.

## Prerequisites

- **4a taxonomy spec** — `docs/plans/4a-taxonomy.md` (23 decks). Every task below that iterates "per deck" consumes 4a's deck list.
- Milestone 3 (domain model / Prisma schema) — **soft** dependency only: `seed/data.ts` defines its own TS types; 4c maps them to the schema.

## Card Contract

- Fields per card: `hebrew` (with nikud, preserved exactly) and `english`. No transliteration, no notes.
- Seed file shape follows the brief's example, typed:

```ts
// seed/data.ts
export interface Pair { hebrew: string; english: string }
export interface DeckContent { level: string; type: number | null; pairs: Pair[] }
export const content: DeckContent[] = [ ... ]
```

- `level`/`type` here are taxonomy names used as *seed input keys* only; stable DB identities are minted at seed time (4c), per `prisma/CLAUDE.md`. Names must match 4a verbatim.

## Tasks

### T1 — Seed data contract
- Add the types above and an empty `content` array to `seed/data.ts`.
- Independent of 4a; can start immediately.

### T2 — Difficulty ladder (approved by Asaf, 2026-08-03)
Per-deck themes and frequency bands; generation follows this table exactly. Within each tier, levels ascend by frequency band (most common first) and decreasing concreteness.

**Foundation** — top ~500 most frequent words; concrete, single-word entries:

| Deck | Theme |
|---|---|
| Red | Greetings, courtesy & basic responses |
| Orange | Numbers, days & time words |
| Pink | Family & people |
| Yellow | Food & drink |

**Flow** — ~500–2,000 frequency band; everyday conversation, short collocations allowed:

| Deck | Theme |
|---|---|
| Light Blue | Around town & directions |
| Blue | Shopping & errands |
| Lime | Work & daily routine |
| Green | Feelings & basic opinions |

**Freedom** — 2,000+ band; nuanced/abstract, native register. Typed decks are parallel packs at equal difficulty, split by theme:

| Deck | Theme |
|---|---|
| Dark Green 1 | News & current events |
| Dark Green 2 | Culture & arts |
| Dark Green 3 | Nature & environment |
| Dark Green 4 | Health & body |
| Turquoise 1 | Common idioms |
| Turquoise 2 | Slang & street Hebrew |
| Turquoise 3 | Nuanced emotions & relationships |
| Turquoise 4 | Proverbs & sayings |
| Indigo 1 | Business & economy |
| Indigo 2 | Politics & society |
| Indigo 3 | Science & technology |
| Indigo 4 | Formal & literary register |
| Indigo 5 | Law & bureaucracy |
| Indigo 6 | Philosophy & abstract thought |
| Purple | Mastery capstone: rare, high-register & literary words |

- **Verb citation form — mixed by tier** (decision log #14): present tense masculine singular in Foundation, infinitive from Flow upward.

### T3 — Generation protocol
Per deck (one batch = one deck), offline with the AI assistant — no live LLM calls in the app:
- Generate exactly 10 pairs following the deck's theme + frequency band from T2.
- Full nikud on every Hebrew word; English glosses short (1–4 words), `/`-separated alternatives as in the brief example.
- No Hebrew word may repeat across any two decks — global rule.
- Paste each accepted batch into `seed/data.ts` in taxonomy order.

### T4 — Validation (self-check, no manual review)
**Independent AI review pass** — a fresh session (no generation context) checks each batch for nikud correctness, translation accuracy, level-appropriateness, exact taxonomy coverage (every 4a deck once, 10 pairs each), and the no-repeat rule; flagged words are regenerated and re-checked.

### T5 — Assemble & finish
- All decks generated (T3) and passing the T4 review.
- `pnpm build` still passes with the populated `seed/data.ts`.

## Task order

T1 → T3 per deck → T4 per batch → T5 (4a and T2 are done — all gates cleared)

## Flags

- ⚑ **Nikud correctness is the main quality risk** — caught only by the T4 AI review pass. If spot-checks show it's unreliable, escalate to manual review before accepting the milestone.

## Explicitly Not in This Plan

4a taxonomy content, 4c seed script / DB writes, Prisma schema (3b), any UI.
