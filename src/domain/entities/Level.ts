import { Entity } from "../_base/Entity";
import { Type } from "./Type";

/**
 * A numbered stage of fluency inside one Tier. A Level has no name and no
 * colour (decisions #16, #19): it is simply "number `position` within its
 * Tier"; its display label and colour are resolved by the UI.
 *
 * Inner entity of the Catalog aggregate (root: Tier). Holds its ordered Types
 * when the taxonomy tree is materialised; the list is empty for a typeless
 * Level or when Types are loaded separately.
 */
export class Level extends Entity {
  constructor(
    id: string,
    readonly tierId: string,
    readonly position: number,
    readonly types: readonly Type[] = [],
  ) {
    super(id);
  }
}
