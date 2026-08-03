import { defineConfig } from "prisma/config";

// Prisma v7 no longer auto-loads .env. The datasource URL is read from the
// DATABASE_URL environment variable; actual connection wiring (Neon, .env
// loading) lands in milestone 2b. `process.env` is used rather than the
// throwing `env()` helper so `prisma generate` works before a URL exists.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
