// Read-only queries backing the cascading-dropdown flow and the flashcard
// viewer (plan 5a). Each function is a plain findMany/findFirst returning its
// DTO shape via `select`, ordered by `position`; Prisma types never leave this
// file. The domain layer is the model of record — reads go straight to the DB
// and return caller-shaped DTOs (src/CLAUDE.md).

import { prisma } from "./client";

/** A progression stage: Foundation → Flow → Freedom. */
export interface TierDTO {
  id: string;
  name: string;
  position: number;
}

/** A fluency stage within a Tier, identified by its slug ("red", "light-blue"
 * — decision #21). The UI derives the shown label and colour token from the
 * slug; the DB stores no display name (decision #16). */
export interface LevelDTO {
  id: string;
  slug: string;
  position: number;
}

/** An optional content pack within a Level. */
export interface TypeDTO {
  id: string;
  name: string;
  position: number;
}

/** One Hebrew ↔ English study item from a Deck. */
export interface CardDTO {
  id: string;
  hebrew: string;
  english: string;
}

/** A Level with its Types, as part of the full catalog tree. */
export interface CatalogLevelDTO extends LevelDTO {
  types: TypeDTO[];
}

/** A Tier with its Levels and their Types — the full navigation tree. */
export interface CatalogTierDTO extends TierDTO {
  levels: CatalogLevelDTO[];
}

/**
 * The whole navigation tree (tiers → levels → types) in a single database
 * round trip. Rendering the cascading dropdowns from per-scope calls costs
 * 1 + 3 + 12 sequential queries; the taxonomy is tiny (29 rows), so the UI
 * should fetch it once with this and derive the dropdowns in memory.
 */
export function getCatalog(): Promise<CatalogTierDTO[]> {
  return prisma.tier.findMany({
    select: {
      id: true,
      name: true,
      position: true,
      levels: {
        select: {
          id: true,
          slug: true,
          position: true,
          types: {
            select: { id: true, name: true, position: true },
            orderBy: { position: "asc" },
          },
        },
        orderBy: { position: "asc" },
      },
    },
    orderBy: { position: "asc" },
  });
}

/** Tiers ordered by progression (Foundation → Flow → Freedom). */
export function listTiers(): Promise<TierDTO[]> {
  return prisma.tier.findMany({
    select: { id: true, name: true, position: true },
    orderBy: { position: "asc" },
  });
}

/** Levels of the given Tier, ordered within it. */
export function listLevels(tierId: string): Promise<LevelDTO[]> {
  return prisma.level.findMany({
    where: { tierId },
    select: { id: true, slug: true, position: true },
    orderBy: { position: "asc" },
  });
}

/** Types of the given Level, ordered within it; empty when the Level is typeless. */
export function listTypes(levelId: string): Promise<TypeDTO[]> {
  return prisma.type.findMany({
    where: { levelId },
    select: { id: true, name: true, position: true },
    orderBy: { position: "asc" },
  });
}

/**
 * Cards of the Deck for a (Level, Type?) selection, in canonical order.
 * `typeId === null` resolves the Level's typeless deck. The typeless case
 * (typeId IS NULL) is a partial-unique match, not addressable by findUnique,
 * so the deck is resolved with findFirst — cards ride along in the same
 * round trip via the relation. A missing deck returns `[]`.
 */
export async function getCards(
  levelId: string,
  typeId: string | null,
): Promise<CardDTO[]> {
  const deck = await prisma.deck.findFirst({
    where: { levelId, typeId },
    select: {
      cards: {
        select: { id: true, hebrew: true, english: true },
        orderBy: { position: "asc" },
      },
    },
  });
  return deck?.cards ?? [];
}
