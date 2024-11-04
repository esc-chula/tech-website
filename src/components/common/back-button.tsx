"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const BackButton = ({ backUrl }: { backUrl?: string }) => {
  const router = useRouter();

  const navigateBack = () => {
    if (backUrl) router.push(backUrl);
    else router.back();
  };

  return (
    <>
      <button
        type="button"
        onClick={navigateBack}
        className="fixed top-24 z-10 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4 md:h-6 md:w-6" />
        <span className="font-medium md:text-lg">Back</span>
      </button>
    </>
  );
};
