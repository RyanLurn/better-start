import { createFileRoute } from "@tanstack/react-router";

import { SignInForm } from "@/features/auth/components/forms/sign-in";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignIn,
});

function SignIn() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <SignInForm />
    </div>
  );
}
