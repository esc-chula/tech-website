"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/server/actions/auth";

export default function LogoutButton() {
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
