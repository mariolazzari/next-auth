"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function PasswordReset() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(localStorage.getItem("email"));
  }, []);

  const href = email
    ? `/password-reset?email=${encodeURIComponent(email)}`
    : "/password-reset";

  return (
    <div className="text-muted-foreground text-sm">
      Forgot password?
      <Link className="underline ml-1" href={href}>
        Reset password
      </Link>
    </div>
  );
}
