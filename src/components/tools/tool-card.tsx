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
    <Card className="grid aspect-square w-full grid-rows-9 p-0">
      <div className="relative row-span-6">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>
      <div className="relative row-span-3 flex flex-col justify-between border-t border-neutral-800 px-6 py-5">
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
