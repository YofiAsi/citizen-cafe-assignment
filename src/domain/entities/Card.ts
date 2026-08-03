import { Entity } from "../_base/Entity";
import { Pair } from "../value-objects/Pair";

/**
 * One Hebrew ↔ English study item inside a Deck. Its business identity is the
 * `seedId` supplied by the seed data (decision #18), stable across content
 * edits and re-seeds; `id` is the surrogate database identity.
 *
 * Inner entity of the Deck aggregate. `position` is the canonical display order
 * within the Deck (seed array order); Shuffle is runtime-only and never stored.
 */
export class Card extends Entity {
  constructor(
    id: string,
    readonly deckId: string,
    readonly seedId: string,
    readonly pair: Pair,
    readonly position: number,
  ) {
    super(id);
  }
}
