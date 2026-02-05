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
import { NameSchema } from "@/features/auth/utils/schemas";
import { authClient } from "@/features/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignUpForm() {
  const form = useForm({
    onSubmit: async ({ value }) => {
      const { error, data } = await authClient.signIn.magicLink({
        ...value,
      });

      if (data) {
        toast.success("Check your email for a magic link");
      } else {
        toast.error(error.message);
        form.reset();
      }
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
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Welcome to Better Start</CardTitle>
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
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      placeholder="Your name"
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
                onBlur: NameSchema,
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
                      placeholder="Your best email"
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
                onBlur: z.email(),
              }}
              name="email"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <form.Subscribe
          children={({ isSubmitting, canSubmit }) => (
            <Button disabled={!canSubmit || isSubmitting} type="submit">
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          )}
        />
      </CardFooter>
    </Card>
  );
}
