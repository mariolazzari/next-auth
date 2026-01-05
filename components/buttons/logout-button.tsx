"use client";
import { Button } from "../ui/button";
import { logout } from "./actions";

export function LogoutButton() {
  return (
    <Button size="sm" onClick={logout}>
      Logout
    </Button>
  );
}
