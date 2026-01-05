import { z } from "zod";
import {
  passwordMatchSchema,
  passwordSchema,
} from "@/app/(logged-out)/register/validations";

export const changePasswordFormSchema = z
  .object({
    currentPassword: passwordSchema,
  })
  .and(passwordMatchSchema);

export type ChangePasswordFormType = z.infer<typeof changePasswordFormSchema>;
