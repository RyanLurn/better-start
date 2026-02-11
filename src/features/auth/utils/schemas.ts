import { z } from "zod";

export const NameSchema = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .max(32, "Name cannot exceed 32 characters");

export const EmailSchema = z.string().trim().toLowerCase().pipe(z.email());
