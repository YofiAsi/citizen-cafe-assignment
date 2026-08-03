import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

// Prisma v7 no longer auto-loads .env. Load it here with Node's built-in
// loader (zero dependencies) so CLI commands that need a database — migrate,
// introspect, studio — can read the connection string from .env. Guarded so
// `prisma generate` (which needs no connection) still works before a .env
// exists.
if (existsSync(".env")) {
  process.loadEnvFile();
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Prisma 7 registers the seed command here (the package.json#prisma key is
    // deprecated). `prisma db seed` / `pnpm seed` and `prisma migrate reset`
    // run this via tsx (decision #13, plan 4c).
    seed: "tsx seed/seed.ts",
  },
  // The Prisma CLI (migrations, introspection) connects with DIRECT_URL — the
  // direct, unpooled Neon connection string, which is what migrations require.
  // The app runtime uses the pooled DATABASE_URL when the Prisma Client is
  // instantiated (persistence layer, later milestone); prisma.config.ts is
  // consumed only by CLI tooling, never bundled into the runtime.
  // `process.env` (not the throwing `env()` helper) keeps `prisma generate`
  // working before a URL exists.
  datasource: {
    url: process.env["DIRECT_URL"],
  },
});
