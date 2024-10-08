"use client";
import "@/styles/globals.css";
import ESCLogo from "@/assets/images/escLogo";

export function Header() 
{
    return (
        <div className="relative top-0 bg-black w-full h-[80px] flex flex-row justify-between items-center text-white px-[195px]">
            <h2 className="text-left">tech</h2>
            <div className="flex justify-center absolute inset-x-0 mx-auto"><ESCLogo/></div>
            <h2 className="text-right">67</h2>
        </div>
    )
}