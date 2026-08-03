import { Tier } from "../aggregates/Tier";
import { Level } from "../entities/Level";
import { Type } from "../entities/Type";

/**
 * Read-only access to the Catalog aggregate (root: Tier). Granular methods
 * mirror the cascading dropdowns rather than fetching the whole tree at once;
 * application services wrap them and return caller-shaped DTOs.
 *
 * Methods are async because the implementation (later milestone) is
 * Prisma-backed I/O; the runtime is read-only, so there are no writes.
 */
export interface CatalogRepository {
  /** Tiers ordered by progression (Foundation → Flow → Freedom). */
  listTiers(): Promise<Tier[]>;

  /** Levels of the given Tier, ordered within the Tier. */
  listLevels(tierId: string): Promise<Level[]>;

  /** Types of the given Level, ordered within it; empty when the Level is typeless. */
  listTypes(levelId: string): Promise<Type[]>;
}
