// Idempotent seed pipeline (plan 4c). Loads the taxonomy (seed/taxonomy.ts)
// and vocabulary (seed/data.ts) into the single Neon database (decision #12).
// This is the only path content enters the DB (seed/CLAUDE.md, decision #3).
//
// Flow: validate everything first and fail loudly before any write, then apply
// insert-or-update in dependency order (Tier -> Level -> Type -> Deck -> Card)
// inside one transaction, and finally reconcile-delete cards whose seedId left
// the file. A summary of created / updated / unchanged / deleted rows is printed.
//
// Level display names never enter the DB (decision #19): the human-readable
// level labels in the seed files are mapped to numeric positions here.

import { existsSync } from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "../generated/prisma/client";
import { DECKS, type TaxonomyDeck } from "./taxonomy";
import { content, type DeckContent, type Pair } from "./data";

// Prisma 7 no longer auto-loads .env (decision #13). prisma.config.ts loads it
// for the CLI, and `prisma db seed` spawns this script with the CLI's env, but
// guard-load it here too so a direct `tsx seed/seed.ts` run works identically.
if (existsSync(".env")) {
  process.loadEnvFile();
}

// Authoritative tier order; position is the 1-based index in this list
// (decision #19). Foundation -> Flow -> Freedom.
const TIER_ORDER = ["Foundation", "Flow", "Freedom"] as const;

// Content rule from plan 4b: exactly this many pairs per deck.
const PAIRS_PER_DECK = 10;

// First run creates ~280 rows with sequential round-trips inside one
// transaction; the default 5s interactive-transaction timeout is too short.
const TRANSACTION_TIMEOUT_MS = 120_000;

// A deck is identified across the two seed files by its (level, type) pair.
// Level names are globally unique across tiers, so this key is unambiguous.
function deckKey(level: string, type: number | null): string {
  return `${level}::${type ?? "none"}`;
}

// Level identity slug (decision #21): the taxonomy label lowercased with
// spaces as hyphens ("Light Blue" → "light-blue").
function levelSlug(levelName: string): string {
  return levelName.toLowerCase().replace(/\s+/g, "-");
}

// ── Validation (T2): collect every problem, then fail loudly before any write ──

function validate(): void {
  const errors: string[] = [];

  const taxonomyByKey = new Map<string, TaxonomyDeck>();
  for (const deck of DECKS) {
    const key = deckKey(deck.level, deck.type);
    if (taxonomyByKey.has(key)) {
      errors.push(`taxonomy.ts has a duplicate deck: ${key}`);
    }
    taxonomyByKey.set(key, deck);
  }

  const dataByKey = new Map<string, DeckContent>();
  for (const deck of content) {
    const key = deckKey(deck.level, deck.type);
    if (dataByKey.has(key)) {
      errors.push(`data.ts has a duplicate deck: ${key}`);
    }
    dataByKey.set(key, deck);
  }

  // 23/23 match: no extras, no gaps, in both directions.
  for (const key of dataByKey.keys()) {
    if (!taxonomyByKey.has(key)) {
      errors.push(`data.ts deck ${key} has no matching taxonomy.ts deck`);
    }
  }
  for (const key of taxonomyByKey.keys()) {
    if (!dataByKey.has(key)) {
      errors.push(`taxonomy.ts deck ${key} is missing from data.ts`);
    }
  }

  // Per-deck: exactly PAIRS_PER_DECK pairs, and ids unique within the deck.
  for (const deck of content) {
    const key = deckKey(deck.level, deck.type);
    if (deck.pairs.length !== PAIRS_PER_DECK) {
      errors.push(
        `deck ${key} has ${deck.pairs.length} pairs, expected ${PAIRS_PER_DECK}`,
      );
    }
    const seenIds = new Set<string>();
    for (const pair of deck.pairs) {
      if (seenIds.has(pair.id)) {
        errors.push(`deck ${key} has a duplicate card id: ${pair.id}`);
      }
      seenIds.add(pair.id);
    }
  }

  // Global no-repeat scan on hebrew across all decks (4b rule).
  const hebrewOrigin = new Map<string, string>();
  for (const deck of content) {
    const key = deckKey(deck.level, deck.type);
    for (const pair of deck.pairs) {
      const previous = hebrewOrigin.get(pair.hebrew);
      if (previous) {
        errors.push(
          `hebrew "${pair.hebrew}" appears in both ${previous} and ${key}`,
        );
      } else {
        hebrewOrigin.set(pair.hebrew, key);
      }
    }
  }

  if (errors.length > 0) {
    const details = errors.map((message) => `  - ${message}`).join("\n");
    throw new Error(
      `Seed validation failed (${errors.length} problem(s)); no rows written:\n${details}`,
    );
  }
}

// ── Desired taxonomy derived from taxonomy.ts (T3) ──

interface DesiredTier {
  name: string;
  position: number;
}
interface DesiredLevel {
  tierName: string;
  levelName: string;
  slug: string;
  position: number;
}
interface DesiredType {
  tierName: string;
  levelName: string;
  position: number;
  name: string;
}

interface DesiredTaxonomy {
  tiers: DesiredTier[];
  levels: DesiredLevel[];
  types: DesiredType[];
}

function deriveTaxonomy(): DesiredTaxonomy {
  const tiers: DesiredTier[] = TIER_ORDER.map((name, index) => ({
    name,
    position: index + 1,
  }));

  // Levels numbered by order of first appearance within their tier.
  const levels: DesiredLevel[] = [];
  const levelPositionByName = new Map<string, number>();
  const levelCountByTier = new Map<string, number>();
  for (const deck of DECKS) {
    if (levelPositionByName.has(deck.level)) continue;
    const nextPosition = (levelCountByTier.get(deck.tier) ?? 0) + 1;
    levelCountByTier.set(deck.tier, nextPosition);
    levelPositionByName.set(deck.level, nextPosition);
    levels.push({
      tierName: deck.tier,
      levelName: deck.level,
      slug: levelSlug(deck.level),
      position: nextPosition,
    });
  }

  // Types numbered by their label (the label is the position); name is the
  // label as a string. Deduplicated by (level, type).
  const types: DesiredType[] = [];
  const seenTypeKeys = new Set<string>();
  for (const deck of DECKS) {
    if (deck.type === null) continue;
    const key = `${deck.level}::${deck.type}`;
    if (seenTypeKeys.has(key)) continue;
    seenTypeKeys.add(key);
    types.push({
      tierName: deck.tier,
      levelName: deck.level,
      position: deck.type,
      name: String(deck.type),
    });
  }

  return { tiers, levels, types };
}

// ── Summary bookkeeping ──

interface Counters {
  created: number;
  updated: number;
  unchanged: number;
}
const newCounters = (): Counters => ({ created: 0, updated: 0, unchanged: 0 });

// ── Seed run ──

async function seed(): Promise<void> {
  validate();
  const desired = deriveTaxonomy();

  const connectionString = process.env["DIRECT_URL"];
  if (!connectionString) {
    // Never echo the value; only report that it is missing.
    throw new Error("DIRECT_URL is not set; cannot connect to the database");
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  const tierStats = newCounters();
  const levelStats = newCounters();
  const typeStats = newCounters();
  const deckStats = newCounters();
  const cardStats = newCounters();
  let cardsDeleted = 0;

  try {
    await prisma.$transaction(
      async (tx) => {
        // Load current state up front so writes are limited to real changes and
        // a re-run performs zero writes (idempotent).
        const [
          existingTiers,
          existingLevels,
          existingTypes,
          existingDecks,
          existingCards,
        ] = await Promise.all([
          tx.tier.findMany(),
          tx.level.findMany(),
          tx.type.findMany(),
          tx.deck.findMany(),
          tx.card.findMany(),
        ]);

        // Fail loudly on taxonomy/deck rows the files no longer describe:
        // removing them is a schema-level event, never an automatic delete.
        assertNoOrphans(desired, {
          existingTiers,
          existingLevels,
          existingTypes,
          existingDecks,
        });

        // Tiers — key on position.
        const tierIdByName = new Map<string, string>();
        const tierByPosition = new Map(existingTiers.map((t) => [t.position, t]));
        for (const tier of desired.tiers) {
          const current = tierByPosition.get(tier.position);
          if (!current) {
            const created = await tx.tier.create({
              data: { name: tier.name, position: tier.position },
            });
            tierIdByName.set(tier.name, created.id);
            tierStats.created++;
          } else {
            tierIdByName.set(tier.name, current.id);
            if (current.name !== tier.name) {
              await tx.tier.update({
                where: { id: current.id },
                data: { name: tier.name },
              });
              tierStats.updated++;
            } else {
              tierStats.unchanged++;
            }
          }
        }

        // Levels — key on (tierId, slug) (decision #21); position is ordering
        // only and may change.
        const levelIdByName = new Map<string, string>();
        const levelByKey = new Map(
          existingLevels.map((l) => [`${l.tierId}::${l.slug}`, l]),
        );
        for (const level of desired.levels) {
          const tierId = requireId(tierIdByName, level.tierName, "tier");
          const current = levelByKey.get(`${tierId}::${level.slug}`);
          if (!current) {
            const created = await tx.level.create({
              data: { tierId, slug: level.slug, position: level.position },
            });
            levelIdByName.set(level.levelName, created.id);
            levelStats.created++;
          } else {
            levelIdByName.set(level.levelName, current.id);
            if (current.position !== level.position) {
              await tx.level.update({
                where: { id: current.id },
                data: { position: level.position },
              });
              levelStats.updated++;
            } else {
              levelStats.unchanged++;
            }
          }
        }

        // Types — key on (levelId, position); name may change.
        const typeIdByKey = new Map<string, string>();
        const typeByKey = new Map(
          existingTypes.map((t) => [`${t.levelId}::${t.position}`, t]),
        );
        for (const type of desired.types) {
          const levelId = requireId(levelIdByName, type.levelName, "level");
          const dbKey = `${levelId}::${type.position}`;
          const current = typeByKey.get(dbKey);
          const mapKey = `${type.levelName}::${type.position}`;
          if (!current) {
            const created = await tx.type.create({
              data: { levelId, position: type.position, name: type.name },
            });
            typeIdByKey.set(mapKey, created.id);
            typeStats.created++;
          } else {
            typeIdByKey.set(mapKey, current.id);
            if (current.name !== type.name) {
              await tx.type.update({
                where: { id: current.id },
                data: { name: type.name },
              });
              typeStats.updated++;
            } else {
              typeStats.unchanged++;
            }
          }
        }

        // Decks — key on (levelId, typeId). The typeless case (typeId IS NULL)
        // cannot be targeted by prisma.upsert's partial unique index, so we
        // match against the pre-loaded rows in memory instead. Decks have no
        // updatable columns, so they are only ever created or already correct.
        const deckIdByContentKey = new Map<string, string>();
        const deckByKey = new Map(
          existingDecks.map((d) => [`${d.levelId}::${d.typeId ?? "none"}`, d]),
        );
        for (const deck of DECKS) {
          const levelId = requireId(levelIdByName, deck.level, "level");
          const typeId =
            deck.type === null
              ? null
              : requireId(
                  typeIdByKey,
                  `${deck.level}::${deck.type}`,
                  "type",
                );
          const dbKey = `${levelId}::${typeId ?? "none"}`;
          const current = deckByKey.get(dbKey);
          const contentKey = deckKey(deck.level, deck.type);
          if (!current) {
            const created = await tx.deck.create({ data: { levelId, typeId } });
            deckIdByContentKey.set(contentKey, created.id);
            deckStats.created++;
          } else {
            deckIdByContentKey.set(contentKey, current.id);
            deckStats.unchanged++;
          }
        }

        // Cards — key on (deckId, seedId); hebrew/english/position may change.
        // Nikud is written verbatim (no normalisation). New cards are collected
        // and inserted in one createMany: per-row creates (~230 round trips)
        // can exceed the transaction timeout on a slow link, after which
        // statements run outside the rolled-back transaction and FK-fail.
        const cardsByDeckAndSeed = new Map(
          existingCards.map((c) => [`${c.deckId}::${c.seedId}`, c]),
        );
        const cardsToCreate: Prisma.CardCreateManyInput[] = [];
        for (const deck of content) {
          const contentKey = deckKey(deck.level, deck.type);
          const deckId = requireId(deckIdByContentKey, contentKey, "deck");
          for (const [index, pair] of deck.pairs.entries()) {
            const position = index + 1;
            const current = cardsByDeckAndSeed.get(`${deckId}::${pair.id}`);
            if (!current) {
              cardsToCreate.push(cardData(deckId, pair, position));
            } else if (
              current.hebrew !== pair.hebrew ||
              current.english !== pair.english ||
              current.position !== position
            ) {
              await tx.card.update({
                where: { id: current.id },
                data: {
                  hebrew: pair.hebrew,
                  english: pair.english,
                  position,
                },
              });
              cardStats.updated++;
            } else {
              cardStats.unchanged++;
            }
          }
        }
        if (cardsToCreate.length > 0) {
          await tx.card.createMany({ data: cardsToCreate });
          cardStats.created += cardsToCreate.length;
        }

        // Reconcile-delete: drop cards whose seedId left the file for its deck.
        const desiredSeedIdsByDeckId = new Map<string, Set<string>>();
        for (const deck of content) {
          const contentKey = deckKey(deck.level, deck.type);
          const deckId = requireId(deckIdByContentKey, contentKey, "deck");
          desiredSeedIdsByDeckId.set(
            deckId,
            new Set(deck.pairs.map((p) => p.id)),
          );
        }
        const retiredCardIds = existingCards
          .filter((c) => !desiredSeedIdsByDeckId.get(c.deckId)?.has(c.seedId))
          .map((c) => c.id);
        if (retiredCardIds.length > 0) {
          const result = await tx.card.deleteMany({
            where: { id: { in: retiredCardIds } },
          });
          cardsDeleted = result.count;
        }
      },
      { timeout: TRANSACTION_TIMEOUT_MS },
    );
  } finally {
    await prisma.$disconnect();
  }

  printSummary({
    Tier: tierStats,
    Level: levelStats,
    Type: typeStats,
    Deck: deckStats,
    Card: cardStats,
  }, cardsDeleted);
}

function cardData(
  deckId: string,
  pair: Pair,
  position: number,
): Prisma.CardCreateManyInput {
  return {
    deckId,
    seedId: pair.id,
    hebrew: pair.hebrew,
    english: pair.english,
    position,
  };
}

function requireId(
  map: Map<string, string>,
  key: string,
  kind: string,
): string {
  const id = map.get(key);
  if (!id) {
    throw new Error(`internal error: missing ${kind} id for "${key}"`);
  }
  return id;
}

interface ExistingRows {
  existingTiers: { position: number }[];
  existingLevels: { tierId: string; position: number }[];
  existingTypes: { levelId: string; position: number }[];
  existingDecks: { levelId: string; typeId: string | null }[];
}

function assertNoOrphans(
  desired: DesiredTaxonomy,
  rows: ExistingRows,
): void {
  const errors: string[] = [];

  const desiredTierPositions = new Set(desired.tiers.map((t) => t.position));
  for (const tier of rows.existingTiers) {
    if (!desiredTierPositions.has(tier.position)) {
      errors.push(`tier at position ${tier.position} is not in taxonomy.ts`);
    }
  }

  // Level/type/deck orphans are detected by count: if the DB holds more rows
  // than the files describe, a taxonomy row was removed. (Positions map to ids
  // that only exist post-insert, so a count comparison is the simplest signal.)
  if (rows.existingLevels.length > desired.levels.length) {
    errors.push(
      `database has ${rows.existingLevels.length} levels but taxonomy.ts has ${desired.levels.length}`,
    );
  }
  if (rows.existingTypes.length > desired.types.length) {
    errors.push(
      `database has ${rows.existingTypes.length} types but taxonomy.ts has ${desired.types.length}`,
    );
  }
  if (rows.existingDecks.length > DECKS.length) {
    errors.push(
      `database has ${rows.existingDecks.length} decks but taxonomy.ts has ${DECKS.length}`,
    );
  }

  if (errors.length > 0) {
    const details = errors.map((message) => `  - ${message}`).join("\n");
    throw new Error(
      `Seed aborted: taxonomy/deck rows exist in the database that the files no longer describe (removal is a schema-level event, not an automatic delete):\n${details}`,
    );
  }
}

function printSummary(
  stats: Record<string, Counters>,
  cardsDeleted: number,
): void {
  console.log("\nSeed complete. Rows (created / updated / unchanged):");
  for (const [model, counters] of Object.entries(stats)) {
    console.log(
      `  ${model.padEnd(6)} ${counters.created} / ${counters.updated} / ${counters.unchanged}`,
    );
  }
  console.log(`  Cards deleted (retired): ${cardsDeleted}`);
}

seed().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
