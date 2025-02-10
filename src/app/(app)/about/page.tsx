import type { Metadata } from 'next';

import MembersSection from '~/components/about/members-section';
import ProjectsSection from '~/components/about/projects-section';
import BackButton from '~/components/common/button/back-button';

export const metadata: Metadata = {
  title: 'Intania Tech - About',
};

const Page: React.FC = () => {
  return (
    <>
      <BackButton href="/" />
      <ProjectsSection />
      <MembersSection />
    </>
  );
};

export default Page;
