import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const passwordMatchSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }
  });
