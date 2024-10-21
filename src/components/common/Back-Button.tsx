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
                className="hidden sm:flex absolute w-24 w-h-9 px-[10%] py-14" 
                onClick={navigateBack}>
                <div className="w-fit h-fit items-center flex space-x-1 text-white">
                    <div className="hidden md:flex"><ArrowLeft strokeWidth={3}/></div>
                    <div className="flex md:hidden"><ArrowLeft width={18} height={18} strokeWidth={3}/></div>
                    <span className="font-semibold md:text-3xl text-2xl">Back</span>
                </div>
            </button>
            <button
                className="flex sm:hidden absolute w-10 h-4 px-6 py-6" 
                onClick={navigateBack}>
                <div className="w-fit h-fit items-center flex space-x-1 text-white">
                    <ArrowLeft width={10} height={10} strokeWidth={3}/>
                    <span className="font-semibold text-sm">Back</span>
                </div>
            </button>
        </>
    )
};