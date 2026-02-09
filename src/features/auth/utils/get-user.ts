import { getRequest } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";

import { Route as WelcomeRoute } from "@/routes/welcome";
import { authMiddleware } from "@/middleware/auth";

export const getUser = createServerFn()
  .middleware([authMiddleware])
  .handler(({ context }) => {
    const { user } = context;
    const request = getRequest();

    const url = new URL(request.url);
    if (user.name.trim() === "" && url.pathname !== WelcomeRoute.to) {
      throw redirect({ to: "/welcome" });
    }
    return user;
  });
