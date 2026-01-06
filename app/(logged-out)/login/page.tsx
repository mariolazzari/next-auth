import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";
import Link from "next/link";
import { PasswordReset } from "./password-reset";

function LoginPage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-92">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <div className="text-muted-foreground text-sm">
            Don&apos;t have an account?
            <Link className="underline ml-1" href="/register">
              Register
            </Link>
          </div>

          <PasswordReset />
        </CardFooter>
      </Card>
    </main>
  );
}

export default LoginPage;
