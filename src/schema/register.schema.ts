import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters and iclude uppercase, lowercase, number, and special character")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "Password must be at least 8 characters and iclude uppercase, lowercase, number, and special character"

    ),
})

export type registerSchemaForm = z.infer<typeof registerSchema>;