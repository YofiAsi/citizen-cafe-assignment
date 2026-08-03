/**
 * The URL shape of a selection. Kept apart from `selection.ts` so the client
 * picker can build links without pulling the data layer into its bundle.
 */

export type SelectionParams = {
  tier?: string;
  level?: string;
  type?: string;
};

/** URL for a selection step; a missing step drops everything below it. */
export function selectionHref(params: SelectionParams): string {
  const query = new URLSearchParams();
  if (params.tier) query.set("tier", params.tier);
  if (params.tier && params.level) query.set("level", params.level);
  if (params.tier && params.level && params.type) query.set("type", params.type);
  const search = query.toString();
  return search ? `/?${search}` : "/";
}
