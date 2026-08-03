/**
 * Base class for domain entities: objects defined by a stable identity rather
 * than by their attributes. Two entities are equal when they are of the same
 * type and share the same id, regardless of any other field.
 *
 * Ids always originate from persistence or seed data, so the domain never
 * generates them — the id is supplied at construction time.
 */
export abstract class Entity {
  protected constructor(readonly id: string) {}

  equals(other: Entity | null | undefined): boolean {
    if (!other) return false;
    if (this === other) return true;
    return this.constructor === other.constructor && this.id === other.id;
  }
}
