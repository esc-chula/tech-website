"use client"

import { User } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"

interface UserLoginProps {
    isloggedIn: boolean
    user?: User
    userName?: string
    profileIcon?: string 
}

export default function UserLogins({
    isloggedIn = false,
    user = {
        id:1,
        oidcId:"12",
        studentId:"6631234521",
        firstNameTh:"เจ้า",
        middleNameTh:null,
        lastNameTh:"เข้ม",
        firstNameEn:"Jao",
        middleNameEn:null,
        lastNameEn:"Kem",
    },
    userName = "JaoKem #2 CEDT",
    profileIcon = "/user.png",
}: UserLoginProps) {
    const [isLoggedIn, setIsLoggedin] = useState(isloggedIn);

    const handleClick = () => {
        setIsLoggedin(!isLoggedIn);
    };

    return (
        <div className="w-full h-11 flex items-center">
            <div className="flex w-11 h-11 rounded-full bg-gradient-to-tl from-neutral-700 to-neutral-600 items-center justify-center">
                <Image src={isLoggedIn? profileIcon:"/user.png"} alt="usetProfile" width={36} height={36}></Image>
            </div>
            <div className="flex flex-col text-white font-ibm-plex-sans-thai ml-4">
                <span className="font-semibold text-base">
                    {isLoggedIn? userName: "Hello, Intania"}
                </span>
                <span className="font-medium text-[12px]">
                    {isLoggedIn? user?.studentId: "Please log in"}
                </span>
            </div>
            <button onClick={handleClick} className="w-14 h-5 rounded-lg ml-auto bg-[#FCD34D] font-medium text-xs justify-center items-center text-black">
                {isLoggedIn? "Log Out": "Log In"}
            </button>
        </div>
    );
}