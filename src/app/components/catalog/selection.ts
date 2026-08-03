/**
 * Turns the URL (`/?tier=&level=&type=`) into the options the three dropdowns
 * offer and, once the choice is complete, the deck to study (plan 6a).
 *
 * The whole taxonomy arrives in one query (`getCatalog`, 29 rows), so every
 * step of the cascade is narrowed in memory — picking a tier or a level costs
 * no database work, and only the cards are fetched. Ids stay in here; URLs and
 * dropdowns carry readable slugs.
 */

import { getCatalog } from "@/application/services/catalog";
import { levelLabel } from "./level-map";
import type { SelectionParams } from "./selection-url";

export type TierOption = { slug: string; label: string };
export type LevelOption = { slug: string; label: string };
export type TypeOption = { slug: string; label: string };

/** The deck a complete selection points at. */
export type DeckRef = {
  levelId: string;
  typeId: string | null;
  /** Caption shown on the card, e.g. "Foundation · Red", "Freedom · Indigo 3". */
  caption: string;
  /** Level colour token slug. */
  levelSlug: string;
};

export type Selection = {
  tiers: TierOption[];
  /** Levels of every tier, so the picker narrows without another request. */
  levelsByTier: Record<string, LevelOption[]>;
  /** Type packs keyed by level slug; a typeless level has no entry. */
  typesByLevel: Record<string, TypeOption[]>;
  tier: string | null;
  level: string | null;
  type: string | null;
  /** Set once the selection names a deck; null while it is still incomplete. */
  deck: DeckRef | null;
};

const CAPTION_SEPARATOR = " · ";

/** Tier slugs come from the stored name: "Foundation" → "foundation". */
function tierSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export async function resolveSelection(
  params: SelectionParams,
): Promise<Selection> {
  const catalog = await getCatalog();

  const tiers: TierOption[] = [];
  const levelsByTier: Record<string, LevelOption[]> = {};
  const typesByLevel: Record<string, TypeOption[]> = {};

  for (const tier of catalog) {
    const slug = tierSlug(tier.name);
    tiers.push({ slug, label: tier.name });
    levelsByTier[slug] = tier.levels.map((level) => ({
      slug: level.slug,
      label: levelLabel(level.slug),
    }));
    for (const level of tier.levels) {
      if (level.types.length > 0) {
        typesByLevel[level.slug] = level.types.map((type) => ({
          slug: type.name,
          label: type.name,
        }));
      }
    }
  }

  const options = { tiers, levelsByTier, typesByLevel };
  const nothing = { tier: null, level: null, type: null, deck: null };

  const tier = catalog.find((row) => tierSlug(row.name) === params.tier);
  if (!tier) return { ...options, ...nothing };

  const chosenTier = tierSlug(tier.name);
  const level = tier.levels.find((row) => row.slug === params.level);
  if (!level) {
    return { ...options, ...nothing, tier: chosenTier };
  }

  const label = levelLabel(level.slug);
  const caption = (suffix?: string) =>
    [tier.name, suffix ? `${label} ${suffix}` : label].join(CAPTION_SEPARATOR);
  const chosen = { ...options, tier: chosenTier, level: level.slug };

  // A typeless level is a deck in its own right; a typed one needs the pack.
  if (level.types.length === 0) {
    return {
      ...chosen,
      type: null,
      deck: {
        levelId: level.id,
        typeId: null,
        caption: caption(),
        levelSlug: level.slug,
      },
    };
  }

  const type = level.types.find((row) => row.name === params.type);
  if (!type) return { ...chosen, type: null, deck: null };

  return {
    ...chosen,
    type: type.name,
    deck: {
      levelId: level.id,
      typeId: type.id,
      caption: caption(type.name),
      levelSlug: level.slug,
    },
  };
}
