import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TwoFactorAuthForm } from "./two-factor-auth-form";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/userSchema";

async function MyAccountPage() {
  const session = await auth();

  const [user] = await db
    .select({
      twoFactorActivated: users.twoFactorActivated,
    })
    .from(users)
    .where(eq(users.id, +(session?.user?.id ?? "")));

  return (
    <Card className="w-92">
      <CardHeader>
        <CardTitle>My Account</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Label>Email</Label>
        <p className="text-muted-foreground">{session?.user?.email}</p>

        <div className="mx-auto mt-4">
          <TwoFactorAuthForm
            twoFactorActivated={user.twoFactorActivated ?? false}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default MyAccountPage;
