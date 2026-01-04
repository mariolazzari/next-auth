"use server";
import { hash } from "bcrypt";
import { formSchema, FormSchema } from "./schemas";
import db from "@/db/drizzle";
import { users } from "@/db/userSchema";
import { isUniqueViolation } from "@/db/utils";

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: FormSchema) => {
  try {
    const newUserValidation = formSchema.safeParse({
      email,
      password,
      passwordConfirm,
    });

    if (!newUserValidation.success) {
      return {
        error: true,
        message: newUserValidation.error.issues?.[0]?.message ?? "Invalid data",
      };
    }

    const hashed = await hash(password, 10);
    await db.insert(users).values({
      email,
      password: hashed,
    });
  } catch (ex) {
    // already registred
    if (isUniqueViolation(ex)) {
      return {
        error: true,
        message: "Account already registred",
      };
    }

    return {
      error: true,
      message: "Database error",
    };
  }
};
