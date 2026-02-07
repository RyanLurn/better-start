import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import type { ComponentProps } from "react";

import { FieldError, FieldLabel, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface NameFieldProps extends ComponentProps<typeof Field> {
  errors: (StandardSchemaV1Issue | undefined)[];
  handleChange: (value: string) => void;
  handleBlur: () => void;
  isSubmitting: boolean;
  isInvalid: boolean;
  value: string;
  name: string;
  id: string;
}

export function NameField({
  isSubmitting,
  handleChange,
  handleBlur,
  isInvalid,
  errors,
  value,
  name,
  id,
  ...props
}: NameFieldProps) {
  return (
    <Field data-invalid={isInvalid} {...props}>
      <FieldLabel htmlFor={name}>Name</FieldLabel>
      <Input
        onChange={(e) => handleChange(e.target.value)}
        placeholder="How should we call you?"
        aria-invalid={isInvalid}
        disabled={isSubmitting}
        onBlur={handleBlur}
        value={value}
        name={name}
        type="text"
        id={id}
      />
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
}
