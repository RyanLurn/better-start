import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/middleware/auth";

export const getUser = createServerFn()
  .middleware([authMiddleware])
  .handler(({ context }) => {
    return context.user;
  });
