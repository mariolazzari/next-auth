"use server";

import { auth } from "@/auth";
import db from "@/db/drizzle";
import { users } from "@/db/userSchema";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";

export async function resetPassword(email: string) {
  const session = await auth();
  if (!!session?.user?.id) {
    return {
      error: true,
      message: "User already logged",
    };
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    return;
  }

  const token = randomBytes(32).toString("hex");
  console.log(token);
}
