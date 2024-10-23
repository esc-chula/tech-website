"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  href?: string;
  fixed?: boolean;
}

export const BackButton = ({ href, fixed }: BackButtonProps) => {
  const router = useRouter();

  const navigateBack = () => {
    if (href) router.push(href);
    else router.back();
  };

  return (
    <>
      <button
        type="button"
        onClick={navigateBack}
        className={cn(
          "z-10 flex items-center gap-2",
          fixed ? "fixed top-24" : "absolute top-24",
        )}
      >
        <ArrowLeft className="h-4 w-4 md:h-6 md:w-6" />
        <span className="font-medium md:text-lg">Back</span>
      </button>
    </>
  );
};
