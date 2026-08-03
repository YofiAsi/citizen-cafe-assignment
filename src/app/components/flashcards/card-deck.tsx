"use client";

import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Text } from "@/app/components/ui/text";
import { cn } from "@/app/components/ui/cn";
import { playLadder, playSound, warmUp, type LadderSpec } from "./sound";

/** One study item. Structurally the `CardDTO` returned by the catalog service. */
export type DeckCard = {
  id: string;
  hebrew: string;
  english: string;
};

export type CardDeckProps = {
  cards: DeckCard[];
  /** Deck caption, e.g. "Foundation · Red" — the caller owns the mapping. */
  label: string;
  /** Level colour token slug, e.g. "red" → `var(--color-level-red)`. */
  levelSlug: string;
};

/* Animation timings (ms). */
const NEXT_OUT_MS = 200; // top card slides clear of the deck
const NEXT_IN_MS = 260; // and slides back in at the back
const FALL_MS = 380;
const FALL_HOLD_MS = 300; // beat with an empty table before the rain-down
const FALL_STAGGER_MS = 60; // also the spacing of the falling click ladder
const ABOVE_SWAP_MS = 50; // instant (untransitioned) hop to above the frame
const RESTACK_STEP_MS = 90;
const RESTACK_CARD_MS = 450;

/* Geometry (px / deg). */
const LEAVE_SHIFT = 200; // short nudge aside, not a flight across the page
const LEAVE_TILT = 12;
/* Each card keeps its own resting offset for the whole session, so the deck
   never re-lays-out when a card leaves — only the moving card moves. Spread
   wide enough that the cards behind the top one stay visible. */
const REST_X = 10;
const REST_Y = 8;
const REST_TILT = 4; // cards behind only — the top card always sits square
/* Cards fade as they travel during a shuffle, so they vanish before leaving
   the page rather than being clipped: a clipping ancestor would flatten the
   3D flip. Next does not fade — that card stays visible the whole way. */
const FALL_Y = 420;
const FALL_DRIFT = 70;
const FALL_TILT = 25;
const DROP_Y = -360; // where cards wait above the frame before raining down
const DROP_DRIFT = 40;
const DROP_TILT = 18;

/* Pitch ladders: falls as the deck drops away, climbs as it stacks back up. */
const LADDER_SEMITONES_PER_CARD = 2;
const LAND_LADDER_LEAD_MS = 80; // offset into a card's travel where it lands
const FALL_LADDER_VOLUME = 0.35;
const LAND_LADDER_VOLUME = 0.4;

type Phase = "idle" | "fall" | "above" | "restack";

/**
 * A card on its way round via Next, tracked outside `phase` so the rest of the
 * deck can stay perfectly still while this one travels: "out" = sliding clear
 * of the deck (still on top), "in" = sliding back into its resting spot, now
 * at the back of the z-order.
 */
type Leave = { cardIndex: number; stage: "out" | "in"; flipped: boolean };

/**
 * Deterministic scatter (so SSR and client markup match), spread with
 * irrational step sizes: successive cards land far apart instead of
 * clustering, which is what keeps every card's edge visible in the pile.
 */
const SPREAD_STEPS = { x: 0.6180339887, y: 0.7548776662, rot: 0.3819660113 };

function spread(index: number, step: number): number {
  const position = ((index + 1) * step) % 1; // 0…1
  return position * 2 - 1; // -1…1
}

function restTransform(cardIndex: number, isTop: boolean): string {
  const x = spread(cardIndex, SPREAD_STEPS.x) * REST_X;
  const y = spread(cardIndex, SPREAD_STEPS.y) * REST_Y;
  // The card being read always straightens up; the pile behind it stays messy.
  const rot = isTop ? 0 : spread(cardIndex, SPREAD_STEPS.rot) * REST_TILT;
  return `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
}

/** A card's target while it is off the table during a shuffle. */
type Toss = { x: number; y: number; rot: number };

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** Falling out the bottom of the frame. */
function randomFall(): Toss {
  return {
    x: rand(-FALL_DRIFT, FALL_DRIFT),
    y: FALL_Y,
    rot: rand(-FALL_TILT, FALL_TILT),
  };
}

/** Waiting above the frame, ready to rain down onto the stack. */
function randomDrop(): Toss {
  return {
    x: rand(-DROP_DRIFT, DROP_DRIFT),
    y: DROP_Y,
    rot: rand(-DROP_TILT, DROP_TILT),
  };
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function cardStyle({
  cardIndex,
  slot,
  count,
  phase,
  toss,
  leaveStage,
}: {
  cardIndex: number;
  slot: number;
  count: number;
  phase: Phase;
  toss: Toss | undefined;
  leaveStage: Leave["stage"] | undefined;
}) {
  if (leaveStage === "out") {
    return {
      transform: `translateX(${LEAVE_SHIFT}px) rotate(${LEAVE_TILT}deg)`,
      opacity: 1, // no fade — the card stays visible the whole way round
      delayMs: 0,
    };
  }
  if ((phase === "fall" || phase === "above") && toss) {
    return {
      transform: `translate(${toss.x}px, ${toss.y}px) rotate(${toss.rot}deg)`,
      opacity: 0,
      // Top card falls off the pile first; the "above" hop is instant.
      delayMs: phase === "fall" ? (count - 1 - slot) * FALL_STAGGER_MS : 0,
    };
  }
  return {
    transform: restTransform(cardIndex, slot === count - 1),
    opacity: 1,
    // Restack lands the bottom card first, then each next card on top of it.
    delayMs: phase === "restack" ? slot * RESTACK_STEP_MS : 0,
  };
}

/** Per-card transition duration; `undefined` keeps the class default. */
function cardDuration(
  phase: Phase,
  leaveStage: Leave["stage"] | undefined,
): string | undefined {
  if (phase === "above") return "0ms"; // untransitioned hop while invisible
  if (leaveStage === "out") return `${NEXT_OUT_MS}ms`;
  if (leaveStage === "in") return `${NEXT_IN_MS}ms`;
  return undefined;
}

function ladders(count: number): { fall: LadderSpec; land: LadderSpec } {
  const shared = {
    sound: "click",
    steps: count,
    semitonesPerStep: LADDER_SEMITONES_PER_CARD,
  } as const;
  return {
    fall: {
      ...shared,
      stepMs: FALL_STAGGER_MS,
      direction: "down",
      volume: FALL_LADDER_VOLUME,
    },
    land: {
      ...shared,
      stepMs: RESTACK_STEP_MS,
      leadMs: LAND_LADDER_LEAD_MS,
      direction: "up",
      volume: LAND_LADDER_VOLUME,
    },
  };
}

export function CardDeck({ cards, label, levelSlug }: CardDeckProps) {
  // stack[0] = bottom of the deck, stack[last] = top (mirrors z-order).
  // Entries are indices into `cards`.
  const [stack, setStack] = useState<number[]>(() => cards.map((_, i) => i));
  const [flipped, setFlipped] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  // Toss targets per card (keyed by card index), fresh every shuffle.
  const [tosses, setTosses] = useState<Toss[]>([]);
  const [leave, setLeave] = useState<Leave | null>(null);

  const ladderSpecs = useMemo(() => ladders(cards.length), [cards.length]);

  const shuffling = phase !== "idle";
  const busy = shuffling || leave?.stage === "out";

  function next() {
    if (busy) return;
    playSound("next");
    // Reorder immediately: the deck's resting positions belong to the cards,
    // so nothing else shifts — only z-order changes behind the moving card.
    setStack((s) => [s[s.length - 1], ...s.slice(0, -1)]);
    setLeave({ cardIndex: stack[stack.length - 1], stage: "out", flipped });
    setFlipped(false);
    window.setTimeout(() => {
      // Clear of the deck: drop to the back and slide home.
      setLeave((l) => (l ? { ...l, stage: "in", flipped: false } : null));
      window.setTimeout(() => setLeave(null), NEXT_IN_MS);
    }, NEXT_OUT_MS);
  }

  function shuffle() {
    if (busy) return;
    playLadder(ladderSpecs.fall);
    setFlipped(false);
    setTosses(cards.map(randomFall));
    setPhase("fall");
    window.setTimeout(() => {
      // Offscreen: reorder, hop instantly above the frame, then rain down.
      setStack((s) => shuffled(s));
      setTosses(cards.map(randomDrop));
      setPhase("above");
      window.setTimeout(() => {
        setPhase("restack");
        playLadder(ladderSpecs.land);
        window.setTimeout(
          () => setPhase("idle"),
          RESTACK_CARD_MS + RESTACK_STEP_MS * cards.length,
        );
      }, ABOVE_SWAP_MS);
    }, FALL_MS + FALL_HOLD_MS);
  }

  // Empty decks are an edge case owned by milestone 9c, not this component.
  if (cards.length === 0) return null;

  return (
    // No overflow clipping anywhere above the cards: a clipping ancestor
    // flattens the 3D flip context and cuts the card's corners and shadow.
    // onPointerDown warms the audio cache on the first gesture (browsers
    // block AudioContext until then); it is idempotent.
    <div onPointerDown={warmUp}>
      {/* Headroom around the pile so travelling cards stay visible. */}
      <div className="relative mx-auto h-64 w-80">
        {stack.map((cardIndex, slot) => {
          const card = cards[cardIndex];
          const isTop = slot === stack.length - 1;
          const leaveStage =
            leave?.cardIndex === cardIndex ? leave.stage : undefined;
          const showFlipped =
            leave && leaveStage
              ? leaveStage === "out" && leave.flipped
              : isTop && flipped;
          const { transform, opacity, delayMs } = cardStyle({
            cardIndex,
            slot,
            count: stack.length,
            phase,
            toss: tosses[cardIndex],
            leaveStage,
          });
          return (
            <div
              key={card.id}
              className="absolute inset-x-0 top-0 h-52 transition-[transform,opacity] duration-500 ease-spring"
              style={{
                // A departing card rides above the deck until it is clear.
                zIndex: leaveStage === "out" ? cards.length + 1 : slot,
                transform,
                opacity,
                transitionDelay: `${delayMs}ms`,
                transitionDuration: cardDuration(phase, leaveStage),
              }}
            >
              <button
                type="button"
                disabled={!isTop || shuffling}
                onClick={() => {
                  playSound(flipped ? "flipBack" : "flip");
                  setFlipped((f) => !f);
                }}
                aria-label={flipped ? "Show Hebrew" : "Reveal English"}
                className="block h-full w-full cursor-pointer select-none perspective-distant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-charcoal disabled:cursor-default"
              >
                {/* Flip pivot — slight spring rotation (--ease-spring). */}
                <div
                  className={cn(
                    "relative h-full w-full transition-transform duration-500 ease-spring transform-3d",
                    showFlipped && "rotate-y-180",
                  )}
                >
                  {/* Front — Hebrew (always Assistant, explicit dir/lang). */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-sm rounded-md border border-border-subtle bg-surface-raised shadow-card-hover backface-hidden">
                    <span className="flex items-center gap-sm font-sans text-meta text-text-muted">
                      <span
                        className="size-2 rounded-full"
                        style={{
                          backgroundColor: `var(--color-level-${levelSlug})`,
                        }}
                      />
                      {label}
                    </span>
                    <span dir="rtl" lang="he" className="font-sans text-h1">
                      {card.hebrew}
                    </span>
                    <span className="font-sans text-meta text-text-muted">
                      tap to flip
                    </span>
                  </div>
                  {/* Back — English on charcoal, yellow accent rule. */}
                  <div className="absolute inset-0 flex rotate-y-180 flex-col items-center justify-center gap-sm rounded-md border border-brand-charcoal bg-surface-dark backface-hidden">
                    <span className="font-sans text-meta text-text-muted">
                      English
                    </span>
                    <span className="px-md text-center font-sans text-h2 text-text-inverse">
                      {card.english}
                    </span>
                    <span className="mt-xs h-1 w-lg rounded-sm bg-brand-yellow" />
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-xl flex items-center justify-center gap-md">
        <Button onClick={next} disabled={busy}>
          Next card
        </Button>
        <Button variant="secondary" onClick={shuffle} disabled={busy}>
          Shuffle
        </Button>
      </div>
      <Text variant="meta" as="p" className="mt-md text-center">
        {cards.length} cards in the deck · tap the top card to flip it
      </Text>
    </div>
  );
}
