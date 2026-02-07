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
import { Route as VerificationErrorRoute } from "@/routes/(auth)/verification-error";
import { SubmitButton } from "@/features/auth/components/forms/submit-button";
import { EmailSchema, NameSchema } from "@/features/auth/utils/schemas";
import { TextField } from "@/features/auth/components/forms/text-field";
import { Route as DashboardRoute } from "@/routes/dashboard";
import { Route as WelcomeRoute } from "@/routes/welcome";
import { authClient } from "@/features/auth/client";
import { FieldGroup } from "@/components/ui/field";

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
        email: EmailSchema,
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
            <form.Subscribe<boolean>
              children={(isSubmitting) => (
                <form.Field
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <TextField
                        placeholder="How should we call you?"
                        handleChange={field.handleChange}
                        errors={field.state.meta.errors}
                        handleBlur={field.handleBlur}
                        isSubmitting={isSubmitting}
                        value={field.state.value}
                        isInvalid={isInvalid}
                        name={field.name}
                        id={field.name}
                        label="Name"
                        type="text"
                      />
                    );
                  }}
                  validators={{
                    onChange: NameSchema,
                  }}
                  name="name"
                />
              )}
              selector={(state) => state.isSubmitting}
            />
            <form.Subscribe<boolean>
              children={(isSubmitting) => (
                <form.Field
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <TextField
                        placeholder="How can we contact you?"
                        handleChange={field.handleChange}
                        errors={field.state.meta.errors}
                        handleBlur={field.handleBlur}
                        isSubmitting={isSubmitting}
                        value={field.state.value}
                        isInvalid={isInvalid}
                        label="Email address"
                        name={field.name}
                        id={field.name}
                        type="email"
                      />
                    );
                  }}
                  validators={{
                    onChange: z.email(),
                  }}
                  name="email"
                />
              )}
              selector={(state) => state.isSubmitting}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <form.Subscribe<{
          isSubmitting: boolean;
          isPristine: boolean;
          canSubmit: boolean;
        }>
          children={({ isSubmitting, isPristine, canSubmit }) => (
            <SubmitButton
              isSubmitting={isSubmitting}
              isPristine={isPristine}
              canSubmit={canSubmit}
            />
          )}
          selector={(state) => ({
            isSubmitting: state.isSubmitting,
            isPristine: state.isPristine,
            canSubmit: state.canSubmit,
          })}
        />
      </CardFooter>
    </Card>
  );
}
