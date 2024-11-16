"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { logout } from "@/server/actions/auth";

export function LoginButton() {
  return (
    <Link href="/login">
      <Button variant="primary" className="px-5" size="sm">
        Log in
      </Button>
    </Link>
  );
}

export function LogoutButton() {
  return (
    <Button
      variant="primary"
      className="px-5"
      size="sm"
      onClick={async () => {
        await logout(); // TODO: error handling
      }}
    >
      Log out
    </Button>
  );
}
