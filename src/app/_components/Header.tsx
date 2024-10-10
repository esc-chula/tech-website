"use client";
import "@/styles/globals.css";
import Image from "next/image";

export function Header() 
{
    return (
        <>
            <div className="hidden md:flex relative top-0 bg-black w-full h-20 flex-row justify-between items-center text-white px-[195px] font-inter">
                <h2 className="text-left">tech</h2>
                <div className="flex justify-center absolute inset-x-0 mx-auto">
                    <Image src="escIcon.svg" alt="ESC icon" width={35} height={40} />
                </div>
                <h2 className="text-right">67</h2>
            </div>

            <div className="md:hidden flex top-0 bg-black w-full h-[60px] flex-row justify-between items-center text-white px-[22px]">
                <Image src="escIcon.svg" alt="ESC icon" width={24} height={28} />
                <Image src="MenuIcon.svg" alt="Menu icon" width={24} height={34} />
            </div>
        </>
    )
}