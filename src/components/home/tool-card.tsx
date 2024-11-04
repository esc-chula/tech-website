"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"


interface ToolCardProps {
    icon: React.ReactNode
    name: string
    description: string
    navPage?: string
};

export const ToolCards = ({
    icon,
    name,
    description,
    navPage,
}: ToolCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        if(navPage)
            router.push(navPage);
        else router.back();
    };

    return (
        <div className="w-[95%] h-32 flex bg-black">
            <div className="w-1/4 h-full items-center justify-center flex">
                {icon}
            </div>
            <div className="w-3/4 h-full border-l border-[#272727] relative">
                <div className="px-5 py-4 w-fit">
                    <span className="flex text-base font-semibold">{name}</span>
                    <span className="text-xs font-normal">{description? description:null}</span>
                </div>
                <button onClick={handleClick} className="w-16 h-5 bg-[#FCD34D] text-black text-[10px] font-medium flex items-center justify-center absolute bottom-4 right-5">
                    Launch 
                    <ArrowRight className="ml-1" width={10} height={12} strokeWidth={2} />
                </button>
            </div>
            
        </div>
    );
};