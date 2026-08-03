import { Entity } from "../_base/Entity";
import { Level } from "../entities/Level";

/**
 * One of the three fixed progression stages (Foundation → Flow → Freedom) and
 * the root of the Catalog aggregate — the navigation tree of
 * Tier → ordered Levels → ordered Types that answers the cascading-dropdown
 * flow. The aggregate holds no Cards.
 *
 * Holds its ordered Levels when the tree is materialised; the list is empty
 * when Levels are loaded separately.
 */
export class Tier extends Entity {
  constructor(
    id: string,
    readonly name: string,
    readonly position: number,
    readonly levels: readonly Level[] = [],
  ) {
    super(id);
  }
}
