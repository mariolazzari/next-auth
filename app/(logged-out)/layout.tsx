import { auth } from "@/auth";
import { Layout } from "@/types/Layout";
import { redirect } from "next/navigation";

async function LoggegOutLayout({ children }: Layout) {
  const session = await auth();
  if (!!session?.user?.id) {
    redirect("/my-account");
  }

  return <div>{children}</div>;
}

export default LoggegOutLayout;
