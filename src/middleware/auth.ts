import { createMiddleware } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";

import { Route as WelcomeRoute } from "@/routes/welcome";
import { auth } from "@/features/auth";

export const authMiddleware = createMiddleware().server(
  async ({ request, next }) => {
    const getSessionResult = await auth.api.getSession({
      headers: request.headers,
    });
    if (!getSessionResult) {
      throw redirect({ to: "/sign-in" });
    }
    const { session, user } = getSessionResult;

    const url = new URL(request.url);
    if (user.name.trim() === "" && url.pathname !== WelcomeRoute.to) {
      throw redirect({ to: "/welcome" });
    }

    return await next({
      context: {
        session,
        user,
      },
    });
  }
);
