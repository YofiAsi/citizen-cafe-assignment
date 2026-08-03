import { Entity } from "../_base/Entity";
import { Card } from "../entities/Card";

/**
 * The studied unit that holds cards (decision #15): either a typeless Level or
 * a (Level, Type) pair. Root of the Deck aggregate and the consistency
 * boundary for its ~10 ordered Cards.
 *
 * References its Level (and optional Type) by id only, as they belong to the
 * separate Catalog aggregate. Holds its ordered Cards when they are loaded; the
 * list is empty when cards are fetched separately.
 */
export class Deck extends Entity {
  constructor(
    id: string,
    readonly levelId: string,
    readonly typeId: string | null,
    readonly cards: readonly Card[] = [],
  ) {
    super(id);
  }
}
