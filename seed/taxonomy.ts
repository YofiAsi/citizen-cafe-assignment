// Mirrors docs/plans/4a-taxonomy.md — the authoritative deck list.
// A deck is a level with no types, or a level + type pair.

export interface TaxonomyDeck {
  tier: "Foundation" | "Flow" | "Freedom";
  level: string;
  type: number | null;
}

export const DECKS: TaxonomyDeck[] = [
  // Foundation
  { tier: "Foundation", level: "Red", type: null },
  { tier: "Foundation", level: "Orange", type: null },
  { tier: "Foundation", level: "Pink", type: null },
  { tier: "Foundation", level: "Yellow", type: null },
  // Flow
  { tier: "Flow", level: "Light Blue", type: null },
  { tier: "Flow", level: "Blue", type: null },
  { tier: "Flow", level: "Lime", type: null },
  { tier: "Flow", level: "Green", type: null },
  // Freedom
  { tier: "Freedom", level: "Dark Green", type: 1 },
  { tier: "Freedom", level: "Dark Green", type: 2 },
  { tier: "Freedom", level: "Dark Green", type: 3 },
  { tier: "Freedom", level: "Dark Green", type: 4 },
  { tier: "Freedom", level: "Turquoise", type: 1 },
  { tier: "Freedom", level: "Turquoise", type: 2 },
  { tier: "Freedom", level: "Turquoise", type: 3 },
  { tier: "Freedom", level: "Turquoise", type: 4 },
  { tier: "Freedom", level: "Indigo", type: 1 },
  { tier: "Freedom", level: "Indigo", type: 2 },
  { tier: "Freedom", level: "Indigo", type: 3 },
  { tier: "Freedom", level: "Indigo", type: 4 },
  { tier: "Freedom", level: "Indigo", type: 5 },
  { tier: "Freedom", level: "Indigo", type: 6 },
  { tier: "Freedom", level: "Purple", type: null },
];
