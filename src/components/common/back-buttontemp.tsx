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
        className="w-h-9 absolute hidden w-24 px-10 py-14 sm:flex"
        onClick={navigateBack}
      >
        <div className="flex h-fit w-fit items-center space-x-1 text-white">
          <div className="hidden md:flex">
            <ArrowLeft strokeWidth={3} />
          </div>
          <div className="flex md:hidden">
            <ArrowLeft width={18} height={18} strokeWidth={3} />
          </div>
          <span className="text-2xl font-semibold md:text-3xl">Back</span>
        </div>
      </button>
      <button
        className="absolute flex h-4 w-10 px-6 py-6 sm:hidden"
        onClick={navigateBack}
      >
        <div className="flex h-fit w-fit items-center space-x-1 text-white">
          <ArrowLeft width={10} height={10} strokeWidth={3} />
          <span className="text-sm font-semibold">Back</span>
        </div>
      </button>
    </>
  );
};
