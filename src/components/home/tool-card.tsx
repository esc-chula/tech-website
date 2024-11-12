"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Card from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface ToolCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
}

export const ToolCards = ({
  image,
  title,
  description,
  href,
}: ToolCardProps) => {
  return (
    <Card className="flex h-36 w-[95%] bg-black sm:h-32">
      <div className="relative flex h-full w-1/4 items-center justify-center">
        <Image src={image} alt={title} fill className="object-contain"></Image>
      </div>
      <div className="relative flex w-3/4 flex-col border-l border-neutral-800 px-5 py-4 sm:flex-row">
        <div className="flex flex-col">
          <span className="text-base font-semibold">{title}</span>
          <span className="text-xs font-normal">{description}</span>
        </div>
        <Button
          variant="primary"
          className="absolute bottom-4 right-5 flex h-5 w-16 items-center justify-center bg-[#FCD34D] px-10 py-3 text-xs font-medium text-black"
          asChild
        >
          <Link href={href} className="flex items-center space-x-1">
            Launch
            <ArrowRight size={10} />
          </Link>
        </Button>
      </div>
    </Card>
  );
};
