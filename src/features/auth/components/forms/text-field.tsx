import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import type { ComponentProps } from "react";

import {
  FieldDescription,
  FieldError,
  FieldLabel,
  Field,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface TextFieldProps extends ComponentProps<typeof Field> {
  errors: (StandardSchemaV1Issue | undefined)[];
  handleChange: (value: string) => void;
  handleBlur: () => void;
  isSubmitting: boolean;
  description?: string;
  placeholder: string;
  isInvalid: boolean;
  label: string;
  value: string;
  type: string;
  name: string;
  id: string;
}

export function TextField({
  isSubmitting,
  handleChange,
  placeholder,
  description,
  handleBlur,
  isInvalid,
  errors,
  label,
  value,
  name,
  type,
  id,
  ...props
}: TextFieldProps) {
  return (
    <Field data-invalid={isInvalid} {...props}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={isInvalid}
        disabled={isSubmitting}
        onBlur={handleBlur}
        value={value}
        type={type}
        name={name}
        id={id}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
}
