"use server";
import { signIn } from "@/auth";
import { loginFormSchema, LoginFormSchema } from "./schemas";

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

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (ex) {
    console.error(ex);

    return {
      error: true,
      message: "Database error",
    };
  }
};
