// Runtime Prisma Client (plan 5a). Uses the PrismaPg adapter on the pooled
// DATABASE_URL (decision #13); the unpooled DIRECT_URL is for CLI/migrations
// only. Next.js loads .env at runtime, so no manual env loading here.
//
// A globalThis singleton keeps dev hot-reload from opening a new pool on every
// module reload; in production a fresh instance is created once per process.

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";

function createPrismaClient(): PrismaClient {
  const connectionString = process.env["DATABASE_URL"];
  if (!connectionString) {
    // Never echo the value; only report that it is missing.
    throw new Error("DATABASE_URL is not set; cannot connect to the database");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
