import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function RegisterPage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-92">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}

export default RegisterPage;
