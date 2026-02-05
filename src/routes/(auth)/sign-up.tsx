import { createFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "@/features/auth/components/forms/sign-up";

export const Route = createFileRoute("/(auth)/sign-up")({
  component: SignUp,
});

function SignUp() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <SignUpForm />
    </div>
  );
}
