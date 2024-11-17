import { Suspense } from 'react';

import { Section } from '~/components/ui/section';
import { Title } from '~/components/ui/title';

import ProjectsContainer from './projects-container';
import ProjectsLoading from './projects-loading';

const ProjectsSection: React.FC = () => {
  return (
    <Section className="gap-6 bg-neutral-950">
      <Title className="text-4xl" color="primary" variant="sectionTitle">
        Our Projects
      </Title>

      <div className="flex w-full flex-col gap-5">
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsContainer />
        </Suspense>
      </div>
    </Section>
  );
};

export default ProjectsSection;
