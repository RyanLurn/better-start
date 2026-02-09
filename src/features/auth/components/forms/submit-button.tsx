import type { ComponentProps } from "react";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  isSubmitting: boolean;
  loadingText: string;
  isPristine: boolean;
  submitText: string;
  canSubmit: boolean;
  formId: string;
}

export function SubmitButton({
  isSubmitting,
  loadingText,
  submitText,
  isPristine,
  canSubmit,
  formId,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      disabled={!canSubmit || isSubmitting || isPristine}
      className="w-full"
      form={formId}
      type="submit"
      size="lg"
      {...props}
    >
      {isSubmitting ? (
        <>
          <Spinner />
          {loadingText}
        </>
      ) : (
        submitText
      )}
    </Button>
  );
}
