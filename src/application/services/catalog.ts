// Catalog application seam (plan 5a). The only import surface the UI uses,
// keeping the app → application → infrastructure layering intact. Each query is
// wrapped in React `cache()` for per-request dedupe; DTO types re-exported so
// callers never reach into infrastructure. No other service code.

import { cache } from "react";
import { unstable_cache } from "next/cache";
import {
  getCatalog as getCatalogQuery,
  listTiers as listTiersQuery,
  listLevels as listLevelsQuery,
  listTypes as listTypesQuery,
  getCards as getCardsQuery,
} from "@/infrastructure/persistence/queries";

export type {
  TierDTO,
  LevelDTO,
  TypeDTO,
  CardDTO,
  CatalogLevelDTO,
  CatalogTierDTO,
} from "@/infrastructure/persistence/queries";

/* Content is static and only changes via a manual reseed (project-brief.md
   "Content Pipeline"), so an hour of staleness is fine — not a correctness
   risk, given there's no per-user state and no writes (decision #28). */
const CONTENT_REVALIDATE_SECONDS = 60 * 60;

// getCatalog and getCards sit behind every dropdown navigation (the URL is
// the source of truth per decision #26), so `cache()`'s per-request dedupe
// wasn't enough — each navigation is a new request and re-hit Neon. Adding
// `unstable_cache` persists results across requests instead.
export const getCatalog = cache(
  unstable_cache(getCatalogQuery, ["catalog"], {
    revalidate: CONTENT_REVALIDATE_SECONDS,
  }),
);
export const listTiers = cache(listTiersQuery);
export const listLevels = cache(listLevelsQuery);
export const listTypes = cache(listTypesQuery);
export const getCards = cache(
  unstable_cache(getCardsQuery, ["cards"], {
    revalidate: CONTENT_REVALIDATE_SECONDS,
  }),
);
