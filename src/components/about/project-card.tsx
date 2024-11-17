import { SiGithub } from '@icons-pack/react-simple-icons';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Card } from '../ui/card';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  projectLink: string;
  githubLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  projectLink,
  githubLink,
}) => {
  return (
    <Card className="overflow-hidden p-0">
      <div className="group relative aspect-video w-full">
        <Link
          className="absolute inset-0 z-10 flex items-center justify-center gap-1 bg-black/50 text-sm opacity-0 duration-200 group-hover:opacity-100"
          href={projectLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>Visit Project</span> <ArrowUpRight className="mb-1" size={12} />
        </Link>
        <Image fill alt={title} className="z-0 object-cover" src={image} />
      </div>
      <div className="flex flex-col gap-1.5 p-4">
        <div className="flex justify-between gap-4">
          <h4 className="font-semibold">{title}</h4>
          {githubLink ? (
            <Link href={githubLink} rel="noopener noreferrer" target="_blank">
              <SiGithub />
            </Link>
          ) : null}
        </div>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </Card>
  );
};

export default ProjectCard;
