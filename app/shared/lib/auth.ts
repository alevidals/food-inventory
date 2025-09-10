import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { db } from "@/app/shared/db/drizzle";
import * as schema from "@/app/shared/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      ...schema,
      users: schema.usersSchema,
      accounts: schema.accountsSchema,
      sessions: schema.sessionsSchema,
      verifications: schema.verificationsSchema,
    },
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}
