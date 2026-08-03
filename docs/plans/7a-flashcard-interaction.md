# Plan 7a — Flashcard Interaction Spec

The deck's interaction model, settled by prototyping in a dev harness and now
frozen. Implemented in `src/app/components/flashcards/card-deck.tsx` and fed
real cards by the home page (7b). The prototyping harness and the design-system
showcase have been removed — the router carries the one product route.

## Model

The deck is a physical pile: every card in the deck is a real stacked element,
not a single card swapping content. `stack` holds indices into `cards`, bottom
first, mirroring z-order.

Each card owns a fixed resting offset and tilt for the session (deterministic,
so SSR and client markup match). Offsets belong to the *card*, not to its depth
in the pile, which is what lets the deck stay still while one card moves. The
top card is the one exception: it is always rotated to 0 so the card being read
sits square.

## Interactions

| Gesture | Behaviour |
|---|---|
| Tap top card | Flips in 3D with a slight spring overshoot; English on the charcoal back. Only the top card is interactive. |
| Next | Top card slides a short distance aside (200px, 220ms) staying fully visible, riding above the pile; then drops to the back of the z-order and slides home. The rest of the deck does not move. The incoming card is flippable immediately. |
| Shuffle | Whole deck falls out of frame downward, fading as it goes, one card at a time. A 300ms beat with an empty table. Cards then fall back in from above and land on the stack one by one, bottom first. |
| Deal in (on mount) | The deck mounts already waiting above the frame and plays only the landing half of Shuffle, in seed order. Picking a deck remounts the component (`key`), so this is how a chosen deck arrives. |

The waiting positions for the deal-in are derived from the card index, not
random: it is the deck's first render, which the server produces too, so it has
to match on hydration.

Timings and geometry are named constants at the top of the component — that is
the tuning surface.

## Constraints discovered

- **No clipping ancestor.** `overflow: clip/hidden` anywhere above the cards
  breaks the 3D flip: Chrome flattens each card and clips it to its own box,
  squaring the corners and cutting the shadow. Travelling cards therefore fade
  rather than being clipped, and no wrapper clips overflow.
- **Untransitioned repositioning.** Moving a card from below the frame to above
  it, or returning a departed card to the pile, must happen with the transition
  disabled for one tick, or the card visibly slides back through the deck.
- **Scatter needs spreading, not hashing.** Resting offsets step by irrational
  fractions so successive cards land far apart; a hash clusters cards and the
  pile loses its visible depth.

## Sound

Web Audio (`sound.ts`), not `<audio>`: clips decode once and replay with no
latency, and playback rate gives pitch. The audio cache warms on the first
pointer gesture, since browsers block `AudioContext` until then.

Shuffle plays a pitch ladder — one click per card, scheduled on the audio clock
so the rhythm is exact: descending as the deck falls away, ascending the same
span as it stacks back up. Gain scales with pitch, since a pitched-up sample is
shorter and thinner and would otherwise be swallowed. Flip and Next are plain
one-shots. Files and mapping: `public/sounds/README.md`.

## Deliberate exception

The spring overshoot (`--ease-spring`) bends Bible §13 "avoid bouncy motion".
The deck is the one playful surface in the app; the overshoot stays subtle and
this token is not for general UI use.

## Not in this plan

- Feeding real cards, deck selection, and the product page — 7b.
- Empty/edge states (deck with no cards) — 9c.
- Level label + colour mapping: the component takes `label` and `levelSlug` as
  props; the mapping is owned by the catalog UI (decisions #16, #19).
- Progress, scoring, or any per-user state — out of scope (no auth).
