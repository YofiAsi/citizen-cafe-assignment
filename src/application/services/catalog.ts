// Catalog application seam (plan 5a). The only import surface the UI uses,
// keeping the app → application → infrastructure layering intact. Each query is
// wrapped in React `cache()` for per-request dedupe; DTO types re-exported so
// callers never reach into infrastructure. No other service code.

import { cache } from "react";
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

export const getCatalog = cache(getCatalogQuery);
export const listTiers = cache(listTiersQuery);
export const listLevels = cache(listLevelsQuery);
export const listTypes = cache(listTypesQuery);
export const getCards = cache(getCardsQuery);
