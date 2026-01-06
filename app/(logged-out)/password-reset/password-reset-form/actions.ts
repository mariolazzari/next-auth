"use server";

import { auth } from "@/auth";
import db from "@/db/drizzle";
import { passwordResetTokens } from "@/db/passwordResetTokenSchema";
import { users } from "@/db/userSchema";
import { mailer } from "@/lib/mail";
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

  const passwordResetToken = randomBytes(32).toString("hex");
  const tokenExpiry = new Date(Date.now() + 3600000);

  await db
    .insert(passwordResetTokens)
    .values({
      userId: user.id,
      token: passwordResetToken,
      tokenExpiry,
    })
    .onConflictDoUpdate({
      target: passwordResetTokens.userId,
      set: {
        token: passwordResetToken,
        tokenExpiry,
      },
    });

  const resetLink = `http://localhost:3000/update-password?token=${passwordResetToken}`;

  await mailer.sendMail({
    from: "test@resend.dev",
    subject: "Password reset request",
    to: email,
    html: `Password reset link: <a href=${resetLink}>${resetLink}</a>`,
  });
}
