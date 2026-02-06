import { createFileRoute } from "@tanstack/react-router";

import { getUser } from "@/features/auth/utils/get-user";

export const Route = createFileRoute("/welcome")({
  loader: () => getUser(),
  component: Welcome,
});

function Welcome() {
  const { name } = Route.useLoaderData();
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-y-2">
      <h1 className="text-2xl font-bold">Welcome, {name}!</h1>
      <p className="text-muted-foreground">
        You are now signed up and ready to go!
      </p>
    </div>
  );
}
