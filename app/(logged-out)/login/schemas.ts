import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(5, "Passworm must be at least 5 chars"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
