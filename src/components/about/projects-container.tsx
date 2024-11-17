import React from 'react';

import { yearLabels } from '~/constants/about';
import { type Project } from '~/types/about';

import ProjectCard from './project-card';

const ProjectsContainer: React.FC = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }); // Simulate loading

  const projects = [
    {
      year: 'ESC67',
      title: 'Orientation Website 67',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      image: '/assets/mock/banner.png',
      projectLink: 'https://or67.intania.org',
      githubLink: 'https://github.com/esc-chula/or67',
    },
  ] as Project[];

  return (
    <>
      {projects.map((project) => (
        <React.Fragment key={project.year}>
          <h3 className="flex items-center gap-1">
            <span className="text-lg font-semibold uppercase">
              {project.year}
            </span>
            <span className="text-sm font-medium normal-case text-neutral-600">
              {yearLabels[project.year as keyof typeof yearLabels]}
            </span>
          </h3>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard {...project} />
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default ProjectsContainer;
