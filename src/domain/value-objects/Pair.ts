/**
 * The Hebrew/English content of a Card, as a value object: immutable and
 * compared by its contents, with no identity of its own.
 */
export class Pair {
  constructor(
    readonly hebrew: string,
    readonly english: string,
  ) {
    Object.freeze(this);
  }

  equals(other: Pair | null | undefined): boolean {
    if (!other) return false;
    return this.hebrew === other.hebrew && this.english === other.english;
  }
}
