import { createEnv } from "@t3-oss/env-core";
import { defineConfig } from "drizzle-kit";
import { z } from "zod";

const devEnv = createEnv({
  server: {
    NEON_DIRECT_CONNECTION_STRING: z.url(),
  },
  runtimeEnv: process.env,
});

export default defineConfig({
  dbCredentials: {
    url: devEnv.NEON_DIRECT_CONNECTION_STRING,
  },
  out: "./src/db/migrations",
  schema: "./src/db/schema",
  dialect: "postgresql",
});
