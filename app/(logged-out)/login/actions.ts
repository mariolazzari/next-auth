"use server";
import { signIn } from "@/auth";
import { loginFormSchema, LoginFormSchema } from "./schemas";
import db from "@/db/drizzle";
import { users } from "@/db/userSchema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";

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
      message: "Invalid credentials",
    };
  }
};

export const preLoginCheck = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return {
      error: true,
      message: "Incorrect credentials",
    };
  } else {
    const passwordCorrect = await compare(password, user.password!);
    if (!passwordCorrect) {
      return {
        error: true,
        message: "Incorrect credentials",
      };
    }
  }

  return {
    twoFactorActivated: user.twoFactorActivated,
  };
};
