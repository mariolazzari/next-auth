"use server";
import { hash } from "bcrypt";
import { loginFormSchema, LoginFormSchema } from "./schemas";
import db from "@/db/drizzle";
import { users } from "@/db/userSchema";
import { isUniqueViolation } from "@/db/utils";

export const loginUser = async ({ email, password }: LoginFormSchema) => {
  try {
    const loginValidation = loginFormSchema.safeParse({
      email,
      password,
    });

    if (!loginValidation.success) {
      return {
        error: true,
        message:
          loginValidation.error.issues?.[0]?.message ?? "Invalid login data",
      };
    }

    console.log("Todo...");
  } catch (_ex) {
    return {
      error: true,
      message: "Database error",
    };
  }
};
