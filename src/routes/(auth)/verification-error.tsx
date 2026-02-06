import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(auth)/verification-error")({
  component: VerificationError,
});

function VerificationError() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-y-4">
      <h1 className="text-2xl font-bold">Invalid magic link</h1>
      <div className="flex flex-col text-center text-muted-foreground">
        <p>The link you provided is invalid or has expired.</p>
        <p>
          Please double check to make sure that there's no typos or try again.
        </p>
      </div>
      <Button variant="outline" size="lg">
        <Link to="/sign-in">Try signing in again</Link>
      </Button>
      <Button variant="outline" size="lg">
        <Link to="/sign-up">Try signing up again</Link>
      </Button>
    </div>
  );
}
