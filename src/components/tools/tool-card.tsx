import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Card from "../ui/card";
import Image from "next/image";
import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  image: string;
}

export default function ToolCard({
  title,
  description,
  href,
  image,
}: ToolCardProps) {
  return (
    <Card className="flex w-full items-center p-0 lg:grid lg:grid-rows-9">
      <div className="relative flex aspect-square h-3/4 select-none lg:row-span-6 lg:aspect-auto lg:h-full">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>
      <div className="relative flex w-full flex-col justify-between gap-5 border-l border-neutral-800 px-4 py-4 lg:row-span-3 lg:gap-3 lg:border-t lg:px-6 lg:py-5">
        <div>
          <h5 className="font-semibold lg:text-lg">{title}</h5>
          <p className="text-xs font-light lg:text-sm">{description}</p>
        </div>
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="sm"
            asChild
            className="h-7 px-2 lg:h-9 lg:px-3"
          >
            <Link
              href={href}
              className="flex items-center text-xs lg:text-base"
            >
              <span>Launch</span>
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
