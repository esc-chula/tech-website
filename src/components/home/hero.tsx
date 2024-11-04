import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import { heroLinks } from "@/constants/home";
import Card from "../ui/card";

export default function Hero() {
  return (
    <Card className="grid w-full overflow-hidden bg-black p-0 lg:grid-cols-7">
      {/* banner */}
      <div className="relative col-span-5 aspect-video bg-neutral-700 lg:aspect-[4/2]">
        <Image
          src="/assets/mock/banner.png"
          alt="banner"
          fill
          className="select-none object-cover"
        />
        <div className="absolute z-10 h-full w-full bg-gradient-to-t from-black to-transparent to-35%"></div>
        <div className="absolute z-20 flex h-full flex-col justify-end p-4 lg:gap-1 lg:px-7 lg:py-6">
          <h4 className="align-bottom text-lg font-semibold text-white lg:text-2xl">
            TECH website is now open!
          </h4>
          <p className="align-bottom text-xs font-light text-white">
            A place of tools and knowledges for geeks.
          </p>
        </div>
      </div>

      {/* menu */}
      <div className="col-span-2 hidden flex-col justify-between lg:flex">
        <div className="flex flex-col">
          {heroLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-neutral-800 bg-black px-7 py-5 text-lg font-semibold text-white hover:bg-neutral-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-5">
          <div className="flex items-center gap-4">
            <div className="grid aspect-square w-12 place-content-center rounded-full bg-white/20">
              <User size={24} />
            </div>
            <div>
              <p className="font-medium">Hello, Intania</p>
              <p className="text-sm">Please log in</p>
            </div>
          </div>
          <Button variant="primary" className="px-5" size="sm">
            Log in
          </Button>
        </div>
      </div>
    </Card>
  );
}
