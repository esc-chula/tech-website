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
    <Card className="flex w-full flex-row p-0 max-lg:h-36 sm:aspect-square lg:grid lg:grid-rows-9">
      <div className="relative flex max-lg:w-1/4 lg:row-span-6">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>
      <div className="relative flex flex-col justify-between border-l border-neutral-800 px-6 py-5 max-lg:w-3/4 lg:row-span-3 lg:border-t">
        <div>
          <h5 className="text-lg font-semibold">{title}</h5>
          <p className="text-sm font-light">{description}</p>
        </div>
        <div className="flex justify-end">
          <Button variant="primary" size="sm" asChild>
            <Link href={href} className="flex items-center space-x-2">
              Launch
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
