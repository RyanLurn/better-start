import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { SubmitButton } from "@/features/auth/components/forms/submit-button";
import { TextField } from "@/features/auth/components/forms/text-field";
import { NameSchema } from "@/features/auth/utils/schemas";
import { getUser } from "@/features/auth/utils/get-user";
import { authClient } from "@/features/auth/client";

export const Route = createFileRoute("/welcome")({
  loader: () => getUser(),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate({ from: Route.to });
  const form = useForm({
    onSubmit: async ({ value }) => {
      const { error, data } = await authClient.updateUser({
        name: value.name,
      });

      if (data) {
        toast.success("Name saved!");
        void navigate({ to: "/dashboard" });
      } else {
        toast.error(error.message ?? "Failed to save name.");
      }
    },
    validators: {
      onSubmit: z.object({
        name: NameSchema,
      }),
    },
    defaultValues: {
      name: "",
    },
  });

  const formId = "welcome-form";

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-y-2">
      <h1 className="text-2xl font-bold">Welcome, let's get you started!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        id={formId}
      >
        <form.Subscribe<boolean>
          children={(isSubmitting) => (
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <TextField
                    handleChange={field.handleChange}
                    errors={field.state.meta.errors}
                    label="How should we call you?"
                    handleBlur={field.handleBlur}
                    isSubmitting={isSubmitting}
                    value={field.state.value}
                    placeholder="Your name"
                    isInvalid={isInvalid}
                    name={field.name}
                    id={field.name}
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
        <form.Subscribe<{
          isSubmitting: boolean;
          isPristine: boolean;
          canSubmit: boolean;
        }>
          children={({ isSubmitting, isPristine, canSubmit }) => (
            <SubmitButton
              isSubmitting={isSubmitting}
              loadingText="Saving..."
              isPristine={isPristine}
              canSubmit={canSubmit}
              submitText="Save"
              formId={formId}
            />
          )}
          selector={(state) => ({
            isSubmitting: state.isSubmitting,
            isPristine: state.isPristine,
            canSubmit: state.canSubmit,
          })}
        />
      </form>
    </div>
  );
}
