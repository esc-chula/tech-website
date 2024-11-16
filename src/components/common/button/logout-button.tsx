"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/server/actions/auth";

export default function LogoutButton() {
  const { toast } = useToast();

  return (
    <Button
      variant="primary"
      className="px-5"
      size="sm"
      onClick={async () => {
        try {
          await logout();
        } catch (error) {
          toast({
            title: "Failed to log out",
            description: "Please try again",
            variant: "destructive",
          });
        }
      }}
    >
      Log out
    </Button>
  );
}
