"use client"

import AdsText from "@/components/home/ads-text";
import { useEffect, useState } from "react";

export default function Page()
{
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 798);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if(isMobile) {
        return (
        <>
            <AdsText image="/adsEx.png" title="TECH website is now open!" subTitle="A place of tools and knowledges for geeks." />
        </>
        );
    }
    return null;
}