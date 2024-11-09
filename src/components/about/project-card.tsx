import Link from "next/link";
import Card from "../ui/card";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  projectLink: string;
  githubLink?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  projectLink,
  githubLink,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="group relative aspect-video w-full">
        <Link
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 flex items-center justify-center gap-1 bg-black/50 text-sm opacity-0 duration-200 group-hover:opacity-100"
        >
          <span>Visit Project</span> <ArrowUpRight size={12} className="mb-1" />
        </Link>
        <Image src={image} alt={title} fill className="z-0 object-cover" />
      </div>
      <div className="flex flex-col gap-1.5 p-4">
        <div className="flex justify-between gap-4">
          <h4 className="font-semibold">{title}</h4>
          {githubLink ? (
            <Link href={githubLink} target="_blank" rel="noopener noreferrer">
              <SiGithub />
            </Link>
          ) : null}
        </div>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </Card>
  );
}
