import { Menu } from "lucide-react";
import Image from "next/image";
import { NavMenu, NavMenuContent, NavMenuTrigger } from "./nav-menu";

export function Header() {
  return (
    <NavMenu>
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 justify-center border-b border-neutral-800 bg-neutral-950/70 px-5 backdrop-blur-lg md:px-10">
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
          <NavMenuTrigger className="select-none p-1 lg:hidden">
            <Menu size={24} />
          </NavMenuTrigger>
        </div>
      </header>
      <NavMenuContent>mobile navigation</NavMenuContent>
    </NavMenu>
  );
}
