import { drizzle } from "drizzle-orm/neon-http";

import * as authSchema from "@/db/schema/auth";
import { serverEnv } from "@/lib/env/server";

export const db = drizzle(serverEnv.NEON_POOLED_CONNECTION_STRING, {
  schema: { ...authSchema },
});
