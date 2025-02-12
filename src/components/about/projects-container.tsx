import React from 'react';

import { yearLabels } from '~/constants/about';
import { getProjects } from '~/server/actions/projects';

import ProjectCard from './project-card';

const ProjectsContainer: React.FC = async () => {
  const res = await getProjects();
  if (!res.success) {
    console.error('ProjectsContainer, failed to load projects: ', res.errors);
    return (
      <span className="aspect-[4/2] grid place-content-center text-white/20 select-none">
        Failed to load projects. Please try again later.
      </span>
    );
  }

  const projects = res.data;
  const years = [...new Set(projects.map((project) => project.year))];

  return (
    <>
      {years.map((year) => (
        <React.Fragment key={year}>
          <h3 className="flex items-center gap-1">
            <span className="text-lg font-semibold uppercase">{year}</span>
            <span className="text-sm font-medium normal-case text-neutral-600">
              {yearLabels[year as keyof typeof yearLabels]}
            </span>
          </h3>
          <div className="grid gap-3 md:gap-10 grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((project) => project.year === year)
              .map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default ProjectsContainer;
