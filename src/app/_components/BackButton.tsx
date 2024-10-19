"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const BackButton = ({
    backUrl,
}: {
    backUrl?: string;
}) => {
    const router = useRouter();

    const navigateBack = () => {
        if(backUrl) 
            router.push(backUrl);
        else router.back();
    };

    return (
        <>
            <button
                className="hidden sm:flex absolute w-[99px] h-9 px-[10%] py-[54px]" 
                onClick={navigateBack}>
                <div className="w-fit h-fit items-center flex space-x-1 text-white align-middle">
                    <ArrowLeft strokeWidth={3}/>
                    <h2>Back</h2>
                </div>
            </button>
            <button
                className="flex sm:hidden absolute w-[41px] h-[15px] px-[24px] py-[24px]" 
                onClick={navigateBack}>
                <div className="w-fit h-fit items-center flex space-x-1 text-white align-middle">
                    <ArrowLeft width={10} height={10} strokeWidth={3}/>
                    <h2 className="text-sm">Back</h2>
                </div>
            </button>
        </>
    )
};