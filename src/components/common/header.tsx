import { Menu } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 justify-center border-b border-neutral-800 bg-neutral-950/70 px-5 backdrop-blur-lg lg:px-10">
      <div className="flex h-full w-full max-w-screen-xl items-center justify-between">
        <Image
          src="/assets/esc_icon.svg"
          alt="ESC icon"
          width={24}
          height={28}
          className="select-none"
        />
        <span className="hidden text-right text-xl font-semibold lg:inline">
          tech
        </span>
        <button type="button" className="select-none p-1 lg:hidden">
          <Menu size={24} />
        </button>
      </div>
      {/* <div className="relative top-0 hidden h-20 w-full flex-row items-center justify-between bg-black text-white sm:flex">
        <span className="text-left text-3xl font-semibold">tech</span>
        <div className="absolute inset-x-0 mx-auto flex justify-center">
          <Image src="escIcon.svg" alt="ESC icon" width={35} height={40} />
        </div>
        <span className="text-right text-3xl font-semibold">67</span>
      </div>

      <div className="top-0 flex h-[60px] w-full flex-row items-center justify-between bg-black px-6 text-white sm:hidden">
        <Image src="MenuIcon.svg" alt="Menu icon" width={24} height={34} />
      </div> */}
    </header>
  );
}
