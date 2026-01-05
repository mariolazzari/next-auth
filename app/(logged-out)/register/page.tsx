import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "./register-form";
import Link from "next/link";

function RegisterPage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-92">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>

        <CardFooter>
          <div className="text-muted-foreground text-sm">
            Already have an account?
            <Link className="ml-1 underline" href="/login">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default RegisterPage;
