import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function RegisterSuccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <Button className="w-full" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
