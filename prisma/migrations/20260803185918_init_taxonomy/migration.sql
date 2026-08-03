/*
  Warnings:

  - You are about to drop the `Placeholder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Placeholder";

-- CreateTable
CREATE TABLE "Tier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Tier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "tierId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "typeId" TEXT,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "seedId" TEXT NOT NULL,
    "hebrew" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tier_position_key" ON "Tier"("position");

-- CreateIndex
CREATE UNIQUE INDEX "Level_tierId_position_key" ON "Level"("tierId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Type_levelId_position_key" ON "Type"("levelId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Deck_levelId_typeId_key" ON "Deck"("levelId", "typeId");

-- CreateIndex
-- Hand-added (plan 3b T5): enforce at most one typeless Deck per Level. Postgres
-- treats NULLs as distinct, so the composite unique index above does not cover
-- the typeId IS NULL case; this partial unique index completes invariant I4.
CREATE UNIQUE INDEX "Deck_levelId_typeless_key" ON "Deck"("levelId") WHERE "typeId" IS NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_deckId_seedId_key" ON "Card"("deckId", "seedId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_deckId_position_key" ON "Card"("deckId", "position");

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "Tier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
