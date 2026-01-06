"use server";

import { auth } from "@/auth";
import db from "@/db/drizzle";
import { users } from "@/db/userSchema";
import { eq } from "drizzle-orm";
import { authenticator } from "otplib";
//import speakeasy from "speakeasy";

export const get2faSecret = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const [user] = await db
    .select({
      twoFactorSecret: users.twoFactorSecret,
    })
    .from(users)
    .where(eq(users.id, +session.user.id));

  if (!user) {
    return {
      error: true,
      message: "User not found",
    };
  }

  let { twoFactorSecret } = user;

  // const token1Test = authenticator.generateSecret();
  // if authenticator.generateSecret doesn't work, try this line instead:
  // note you'll need to `npm i speakeasy && npm i -D @types/speakeasy`
  //  const generatedSecret = speakeasy.generateSecret({ length: 10 });
  // const token2Test = generatedSecret.base32;

  if (!twoFactorSecret) {
    twoFactorSecret = authenticator.generateSecret();
    await db
      .update(users)
      .set({
        twoFactorSecret,
      })
      .where(eq(users.id, +session.user.id));
  }

  return {
    twoFactorSecret: authenticator.keyuri(
      session.user.email ?? "",
      "WebDevEducation",
      twoFactorSecret
    ),
  };
};
