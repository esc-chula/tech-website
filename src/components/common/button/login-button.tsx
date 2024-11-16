import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  return (
    <Link href="/login">
      <Button variant="primary" className="px-5" size="sm">
        Log in
      </Button>
    </Link>
  );
}
