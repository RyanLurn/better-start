import type { BetterAuthOptions } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";

import {
  verificationTable,
  accountTable,
  sessionTable,
  userTable,
} from "@/db/schema/auth";
import { db } from "@/db";

export const dbOptions: BetterAuthOptions = {
  database: drizzleAdapter(db, {
    schema: {
      verification: verificationTable,
      session: sessionTable,
      account: accountTable,
      user: userTable,
    },
    provider: "pg",
  }),
};
