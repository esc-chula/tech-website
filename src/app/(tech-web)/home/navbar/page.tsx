"use client"

import UserLogins from "@/components/home/user-card";
import Link from "next/link";
import Image from "next/image";
import { ToolCards } from "@/components/home/tool-card";

export default function Page() {
    return (
        <>
            <div className="top-16 flex-col bg-black">
                <div className="flex w-full h-16 border-y border-[#272727] items-center justify-center px-8">
                    <UserLogins isloggedIn={true}></UserLogins>
                </div>
                <Link href="/about" className="flex w-full h-16 border-y border-[#272727] items-center text-base font-medium px-8">
                    About
                </Link>
                <div className="flex w-full h-16 border-y border-[#272727] items-center text-base font-medium px-8">
                    Documentation
                </div>
                <div className="flex w-full h-16 border-y border-[#272727] items-center text-base font-medium px-8">
                    Tool & Apps
                </div>
            </div>
            <div className="px-1 mt-1 text-3xl font-semibold">Tool & Apps</div>
            <div className="mt-2 w-full h-fit flex-col space-y-1 justify-items-center">
                <ToolCards 
                    icon={
                        <div className="w-fit h-fit font-mono font-bold sm:text-xs text-[8px]">intania.link/xxx</div>
                    }
                    name="Link Shortener"
                    description="Shorten your link with intania.link"
                    navPage="/tools/link-shortener" />
                <ToolCards
                    icon={
                        <Image src="/QRCodeIcon.png" alt="QR Code icon" width={66} height={66} />
                    }
                    name="QR Code Generator"
                    description="Create custom QR Code with styles!" />
                <ToolCards
                    icon={
                        <Image src="/bugIcon.png" alt="bug icon" width={66} height={49} />
                    }
                    name="Report Bug"
                    description="Found a bug? Report to us!" />
            </div>
        </>
    );
}