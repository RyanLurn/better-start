import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    NEON_POOLED_CONNECTION_STRING: z.url(),
  },
  runtimeEnv: process.env,
});
