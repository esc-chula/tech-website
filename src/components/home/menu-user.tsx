"use client";

import { User } from "lucide-react";
import { Button } from "../ui/button";

export default function MenuUser() {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-800 px-4 py-5">
      <div className="flex items-center gap-4">
        <div className="grid aspect-square w-12 place-content-center rounded-full bg-white/20">
          <User size={24} />
        </div>
        <div>
          <p className="font-medium">Hello, Intania</p>
          <p className="text-sm">Please log in</p>
        </div>
      </div>
      <Button variant="primary" className="px-5" size="sm">
        Log in
      </Button>
    </div>
  );
}
