/**
 * Level display identity — the UI half of decisions #16 and #21.
 *
 * The database stores a level's `slug` ("red", "light-blue") and nothing about
 * how it looks: its name is a colour name, and colour is a presentation
 * concern. Both the label and the colour token derive from the slug here, so
 * adding a level to the seed needs no change in this file — only a matching
 * `--color-level-<slug>` token in globals.css.
 */

/** "light-blue" → "Light Blue". */
export function levelLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * A level's colour, with a neutral fallback so a level whose token is missing
 * still renders. Every level colour is an `--color-level-*` token (never a
 * literal hex).
 */
export function levelColor(slug: string): string {
  return `var(--color-level-${slug}, var(--color-brand-charcoal))`;
}
