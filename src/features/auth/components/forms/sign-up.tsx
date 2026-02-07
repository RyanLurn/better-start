import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  Card,
} from "@/components/ui/card";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
  Field,
} from "@/components/ui/field";
import { Route as VerificationErrorRoute } from "@/routes/(auth)/verification-error";
import { Route as DashboardRoute } from "@/routes/dashboard";
import { NameSchema } from "@/features/auth/utils/schemas";
import { Route as WelcomeRoute } from "@/routes/welcome";
import { authClient } from "@/features/auth/client";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignUpForm() {
  const form = useForm({
    onSubmit: async ({ value }) => {
      const { error, data } = await authClient.signIn.magicLink({
        ...value,
        errorCallbackURL: VerificationErrorRoute.to,
        newUserCallbackURL: WelcomeRoute.to,
        callbackURL: DashboardRoute.to,
      });

      if (data) {
        toast.success("Check your email for a magic link");
      } else {
        toast.error(
          error.message ?? "Something went wrong. Please try again later."
        );
      }

      form.reset();
    },
    validators: {
      onSubmit: z.object({
        email: z.email(),
        name: NameSchema,
      }),
    },
    defaultValues: {
      email: "",
      name: "",
    },
  });

  return (
    <Card className="w-full sm:max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Welcome to Better Start</CardTitle>
        <CardDescription>
          Please enter your information below to sign up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit();
          }}
          id="sign-up-form"
        >
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="How should we call you?"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      name={field.name}
                      id={field.name}
                      type="text"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              validators={{
                onChange: NameSchema,
              }}
              name="name"
            />
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                    <Input
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="How can we contact you?"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      name={field.name}
                      id={field.name}
                      type="email"
                    />
                    <FieldDescription>
                      A magic link will be sent to your email address to
                      complete the sign up process
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              validators={{
                onChange: z.email(),
              }}
              name="email"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <form.Subscribe
          children={({ isSubmitting, isPristine, canSubmit }) => (
            <Button
              disabled={!canSubmit || isSubmitting || isPristine}
              form="sign-up-form"
              className="w-full"
              type="submit"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Signing up...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          )}
        />
      </CardFooter>
    </Card>
  );
}
