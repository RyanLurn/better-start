import type { BetterAuthOptions } from "better-auth";

import { serverEnv } from "@/lib/env/server";

export const oauthOptions: BetterAuthOptions = {
  socialProviders: {
    github: {
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
      clientId: serverEnv.GITHUB_CLIENT_ID,
    },
  },
};
