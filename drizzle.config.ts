import { defineConfig } from "drizzle-kit";
import { env } from "@/app/shared/lib/env";

if (!env.TURSO_AUTH_TOKEN || !env.TURSO_DATABASE_URL) {
  throw new Error("Missing TURSO_AUTH_TOKEN or TURSO_DATABASE_URL");
}

export default defineConfig({
  out: "./app/shared/db/migrations",
  schema: "./app/shared/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
});
