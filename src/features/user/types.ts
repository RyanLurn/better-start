import type { authClient } from "@/features/auth/client";

export type User = typeof authClient.$Infer.Session.user;
