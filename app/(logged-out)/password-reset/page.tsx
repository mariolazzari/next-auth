import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordResetForm } from "./password-reset-form";
import Link from "next/link";

function PasswordResetPage() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <Card className="w-92">
        <CardHeader>
          <CardTitle>Password Reset</CardTitle>
          <CardDescription>
            Enter your email address to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordResetForm />
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <div className="text-muted-foreground text-sm">
            Remember your password?
            <Link className="underline ml-1" href="/login">
              Login
            </Link>
          </div>

          <div className="text-muted-foreground text-sm">
            Do not have an account?
            <Link className="underline ml-1" href="/register">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default PasswordResetPage;
