"use client";

import { heroLinks } from "@/constants/home";
import Link from "next/link";
import { Link as Scroll } from "react-scroll";

export default function Menu() {
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
              className="cursor-pointer border-b border-neutral-800 px-7 py-5 text-lg font-semibold text-white hover:bg-white/5"
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
              className="border-b border-neutral-800 px-7 py-5 text-base font-semibold text-white hover:bg-white/5"
            >
              {link.label}
            </Link>
          );
        }
      })}
    </div>
  );
}
