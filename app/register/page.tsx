import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "./register-form";

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
      </Card>
    </main>
  );
}

export default RegisterPage;
