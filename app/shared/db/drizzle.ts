import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "@/app/shared/lib/env";

import * as schema from "./schema";

if (!env.TURSO_AUTH_TOKEN || !env.TURSO_DATABASE_URL) {
  throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
}

const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const db = drizzle({ client, schema });
