import { magicLink } from "better-auth/plugins";

export const magicLinkPlugin = magicLink({
  sendMagicLink: async ({ email, token, url }, ctx) => {
    // send email to user
    await Promise.resolve(() => {
      console.log("Magic link sent to:", email, "URL:", url, "Token:", token);
      console.log("Context:", ctx);
    });
  },
});
