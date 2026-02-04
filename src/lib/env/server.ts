import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    GITHUB_CLIENT_SECRET: z.string().min(1),
    NEON_POOLED_CONNECTION_STRING: z.url(),
    GITHUB_CLIENT_ID: z.string().min(1),
    BETTER_AUTH_SECRET: z.base64(),
    BETTER_AUTH_URL: z.url(),
  },
  runtimeEnv: process.env,
});
