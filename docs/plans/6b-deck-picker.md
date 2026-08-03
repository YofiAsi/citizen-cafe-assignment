# Plan 6b — Deck Picker & Home Page

The selection flow as built: the brief's cascading dropdowns, in a row above the flashcard deck.

## The cascade

```
Tier             Level            Type
[ Freedom  ▾ ]   [ Indigo   ▾ ]   [ 3  ▾ ]
                  ↑ this tier's    ↑ only for levels
                    levels only      that have packs
```

1. **Tier** — Foundation / Flow / Freedom.
2. **Level** — filtered to the chosen tier; disabled until a tier is picked. Each option carries a dot in its own level colour.
3. **Type** — rendered only when the chosen level has packs (Dark Green, Turquoise, Indigo). A typeless level shows its cards as soon as it is chosen.

Built on Radix `Select` (project rule: don't hand-roll dropdown accessibility). Styling follows Bible §10 forms — white surface, thin subtle border, nothing browser-default. The listbox renders in a portal, so it is never clipped by the card stack's layout.

The whole catalog arrives in props (plan 6a), so narrowing happens in memory. Each choice is a `router.push` inside a transition with the choice applied optimistically: the dropdown moves on click, the previous deck stays on screen, and the picker dims until the new cards arrive.

## Page composition

`src/app/page.tsx` (server): one centred column — logo lockup (Bible §7) → "Vocabulary Flashcard Game" → the dropdowns as a left-aligned row → the deck, centred below. The dropdowns are fixed-width and wrap to a stack on narrow viewports.

- No `overflow` clipping anywhere around the deck column (see plan 7a).
- Until the choice is complete, a dashed panel the size of a card stands in.
- Sound clips warm up on the picker's first `pointerdown`, so the deck's deal-in ladder is decoded before it plays.

## Definition of Done

- All 23 decks reachable; a choice survives refresh and back/forward.
- Typed levels show the third dropdown; typeless levels never do.
- Keyboard: every dropdown opens, moves, and commits from the keyboard with a visible focus ring.
- `pnpm build` passes; no console errors when choosing, flipping, advancing, shuffling, or switching decks.

## Explicitly Not in This Plan

- Responsive polish and full a11y review (9b), empty/edge states (9c).
- The deck's own interaction model (7a) — this plan only supplies its props.
