import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import { Button } from "@/components/ui/button";

const ErrorSearchSchema = z.object({
  error: z
    .enum([
      "INVALID_TOKEN",
      "EXPIRED_TOKEN",
      "failed_to_create_user",
      "new_user_signup_disabled",
      "failed_to_create_session",
    ])
    .default("failed_to_create_session"),
});

export const Route = createFileRoute("/(auth)/verification-error")({
  validateSearch: zodValidator(ErrorSearchSchema),
  component: VerificationError,
});

function VerificationError() {
  const { error } = Route.useSearch();

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-y-4">
      <h1 className="text-2xl font-bold">
        {error === "INVALID_TOKEN"
          ? "Invalid magic link"
          : error === "EXPIRED_TOKEN"
            ? "Expired magic link"
            : "Something went wrong"}
      </h1>
      <div className="flex flex-col text-center text-muted-foreground">
        {error === "INVALID_TOKEN" && (
          <>
            <p>The link you provided is invalid.</p>
            <p>
              Please double check to make sure that there's no typos or try
              again.
            </p>
          </>
        )}
        {error === "EXPIRED_TOKEN" && (
          <>
            <p>The link you provided has expired.</p>
            <p>Please request a new link.</p>
          </>
        )}
        {error !== "INVALID_TOKEN" && error !== "EXPIRED_TOKEN" && (
          <p>Please try again later.</p>
        )}
      </div>
      <Button
        render={<Link to="/sign-in">Try signing in again</Link>}
        variant="outline"
        size="lg"
      />
    </div>
  );
}
