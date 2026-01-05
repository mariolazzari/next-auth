import { z } from "zod";
import { passwordMatchSchema } from "./validations";

export const formSchema = z
  .object({
    email: z.email("Invalid email address"),
  })
  .and(passwordMatchSchema);

export type FormSchema = z.infer<typeof formSchema>;
