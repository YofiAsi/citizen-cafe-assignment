-- Add the Level identity slug (decision #21, superseding #19's number-only keys).
-- All rows are seed-owned regenerable content (decisions #3, #12), so the tables
-- are cleared to allow the required column, then repopulated with `pnpm seed`.
TRUNCATE "Card", "Deck", "Type", "Level", "Tier";

-- AlterTable
ALTER TABLE "Level" ADD COLUMN "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Level_tierId_slug_key" ON "Level"("tierId", "slug");
