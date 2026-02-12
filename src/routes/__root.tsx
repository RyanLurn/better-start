import type { ReactNode } from "react";

import {
  createRootRoute,
  HeadContent,
  Scripts,
  Outlet,
} from "@tanstack/react-router";

import { UserButton } from "@/features/user/components/button";
import { ThemeToggle } from "@/components/utils/theme-toggle";
import { AppProviders } from "@/components/providers/app";
import { authClient } from "@/features/auth/client";
import { Toaster } from "@/components/ui/sonner";
import styles from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "Better Start",
      },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { type: "image/svg+xml", href: "/favicon.svg", rel: "icon" },
    ],
  }),
  component: RootComponent,
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { data } = authClient.useSession();

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppProviders>
          {children}
          {data ? (
            <UserButton className="fixed top-3 right-3 z-50" />
          ) : (
            <ThemeToggle className="fixed top-3 right-3 z-50" />
          )}
          <Toaster position="top-center" richColors />
        </AppProviders>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}
