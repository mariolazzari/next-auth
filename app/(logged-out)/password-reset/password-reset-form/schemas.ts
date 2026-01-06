import { z } from "zod";

export const passwordResetSchema = z.object({
  email: z.email("Invalid email address"),
});

export type PasswordReset = z.infer<typeof passwordResetSchema>;
