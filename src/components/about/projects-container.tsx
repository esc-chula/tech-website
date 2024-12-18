import React from 'react';

import { yearLabels } from '~/constants/about';
import { getProjects } from '~/server/actions/projects';

import ProjectCard from './project-card';

const ProjectsContainer: React.FC = async () => {
  const res = await getProjects();
  if (!res.success) {
    return <div>Something went wrong ...</div>;
  }
  const projects = res.data;

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
