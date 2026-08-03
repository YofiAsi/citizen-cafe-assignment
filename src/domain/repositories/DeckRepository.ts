import { Deck } from "../aggregates/Deck";
import { Card } from "../entities/Card";

/**
 * Read-only access to the Deck aggregate. `typeId` of `null` resolves the
 * typeless deck of a Level.
 *
 * Methods are async because the implementation (later milestone) is
 * Prisma-backed I/O; the runtime is read-only, so there are no writes.
 */
export interface DeckRepository {
  /** Resolve a (Level, Type?) selection to its Deck, or null when none exists. */
  findDeck(levelId: string, typeId: string | null): Promise<Deck | null>;

  /** The Deck's cards in canonical (seed) order. */
  getCards(deckId: string): Promise<Card[]>;
}
