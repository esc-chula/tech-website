"use client";

import { logout } from "@/server/actions/techmonth";

export default function Header({ studentId }: { studentId: string }) {
  return (
    <div className="flex w-full items-center justify-between text-3xl">
      <p>{studentId}</p>
      <button
        onClick={() => {
          logout().catch(console.error);
        }}
      >
        logout
      </button>
    </div>
  );
}
