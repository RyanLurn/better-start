import { tanstackStartCookies } from "better-auth/tanstack-start";
import { betterAuth } from "better-auth";

import { magicLinkPlugin } from "@/features/auth/config/magic-link";
import { oauthOptions } from "@/features/auth/config/oauth";
import { dbOptions } from "@/features/auth/config/db";
import { serverEnv } from "@/lib/env/server";

export const auth = betterAuth({
  advanced: {
    database: {
      generateId: false,
    },
  },
  secret: serverEnv.BETTER_AUTH_SECRET,
  baseURL: serverEnv.BETTER_AUTH_URL,
  ...dbOptions,
  ...oauthOptions,
  plugins: [magicLinkPlugin, tanstackStartCookies()], // TanStack Start cookie plugin must come last
});
