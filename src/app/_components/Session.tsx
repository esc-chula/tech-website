"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Session = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center space-y-4 bg-neutral-900 px-4 py-10 text-white font-semibold",
        className,
      )}
    >
      {children}
    </div>
  );
};
