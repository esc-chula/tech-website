"use client";

import { heroLinks } from "@/constants/home";
import Link from "next/link";
import { Link as Scroll } from "react-scroll";
import { useCloseNavMenu } from "./nav-menu";

export default function NavItems() {
  const closeNavMenu = useCloseNavMenu();

  return (
    <div className="flex flex-col">
      {heroLinks.map((link) => {
        if (link.scroll) {
          return (
            <Scroll
              key={link.href}
              to={link.href}
              spy={true}
              smooth={true}
              duration={700}
              offset={-100}
              className="cursor-pointer border-b border-neutral-800 px-7 py-5 font-semibold text-white hover:bg-white/5 lg:text-lg"
              onClick={closeNavMenu}
            >
              {link.label}
            </Scroll>
          );
        } else {
          return (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : ""}
              rel={link.external ? "noopener noreferrer" : ""}
              className="border-b border-neutral-800 px-7 py-5 font-semibold text-white hover:bg-white/5 lg:text-lg"
              onClick={closeNavMenu}
            >
              {link.label}
            </Link>
          );
        }
      })}
    </div>
  );
}
