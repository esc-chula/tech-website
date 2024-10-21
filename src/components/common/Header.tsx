import Image from "next/image";

export function Header() 
{
    return (
        <>
            <div className="hidden sm:flex relative top-0 bg-black w-full h-20 flex-row justify-between items-center text-white px-[10%] font-inter">
                <span className="font-semibold text-3xl text-left">tech</span>
                <div className="flex justify-center absolute inset-x-0 mx-auto">
                    <Image src="escIcon.svg" alt="ESC icon" width={35} height={40} />
                </div>
                <span className="font-semibold text-3xl text-right">67</span>
            </div>

            <div className="sm:hidden flex top-0 bg-black w-full h-[60px] flex-row justify-between items-center text-white px-6">
                <Image src="escIcon.svg" alt="ESC icon" width={24} height={28} />
                <Image src="MenuIcon.svg" alt="Menu icon" width={24} height={34} />
            </div>
        </>
    )
}