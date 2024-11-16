import React, { Suspense } from "react";
import Image from "next/image";
import Card from "../ui/card";
import Menu from "../common/menu";
import UserBox from "../common/user-box/user-box";
import UserBoxLoading from "../common/user-box/user-box-loading";

export default function Hero() {
  return (
    <Card className="grid w-full overflow-hidden p-0 lg:grid-cols-7">
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
        <Menu />
        <Suspense fallback={<UserBoxLoading />}>
          <UserBox />
        </Suspense>
      </div>
    </Card>
  );
}
