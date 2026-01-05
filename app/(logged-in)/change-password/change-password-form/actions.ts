"use server";

import { auth } from "@/auth";
import db from "@/db/drizzle";
import { users } from "@/db/userSchema";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcryptjs";
import { changePasswordFormSchema, ChangePasswordFormType } from "./schemas";

export async function changePassword({
  currentPassword,
  password,
  passwordConfirm,
}: ChangePasswordFormType) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: true,
        message: "User not logged",
      };
    }

    const passwordValidation = changePasswordFormSchema.safeParse({
      currentPassword,
      password,
      passwordConfirm,
    });

    if (!passwordValidation.success) {
      return {
        error: true,
        message:
          passwordValidation.error.issues[0]?.message ?? "Invalid password",
      };
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, +session.user.id));

    if (!user) {
      return {
        error: true,
        message: "User not found",
      };
    }

    const passwordMatch = await compare(currentPassword, user.password!);
    if (!passwordMatch) {
      return {
        error: true,
        message: "Invalid password",
      };
    }

    const hashed = await hash(password, 10);

    await db
      .update(users)
      .set({ password: hashed })
      .where(eq(users.id, +session.user.id));

    return {
      error: false,
      message: "Password changed successfully",
    };
  } catch (ex) {
    console.error(ex);

    return {
      error: true,
      message: "Error changing password",
    };
  }
}
