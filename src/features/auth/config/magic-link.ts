import { magicLink } from "better-auth/plugins";

import type { Email } from "@/features/emails/types";

import { sendEmail } from "@/features/emails/send";

export const magicLinkPlugin = magicLink({
  sendMagicLink: async ({ email: emailAddress, url }) => {
    const email: Email = {
      html: `<p>Click the link below to sign in: <a href="${url}">${url}</a></p>`,
      text: `Click the link below to sign in: ${url}`,
      from: "support@betterstart.com",
      subject: "Sign in link",
      to: emailAddress,
    };

    await sendEmail({ email });
  },
});
