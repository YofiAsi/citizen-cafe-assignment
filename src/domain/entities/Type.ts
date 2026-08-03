import { Entity } from "../_base/Entity";

/**
 * An optional content pack at the same fluency as its Level, ordered within
 * that Level. Types carry a display name but no colour — they inherit their
 * Level's colour in the UI (decision #16) — and are not restricted to any Tier
 * (decision #17).
 *
 * Inner entity of the Catalog aggregate (root: Tier).
 */
export class Type extends Entity {
  constructor(
    id: string,
    readonly levelId: string,
    readonly name: string,
    readonly position: number,
  ) {
    super(id);
  }
}
