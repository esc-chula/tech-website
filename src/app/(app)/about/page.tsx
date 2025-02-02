import MembersSection from '~/components/about/members-section';
import ProjectsSection from '~/components/about/projects-section';
import BackButton from '~/components/common/button/back-button';

const Page: React.FC = () => {
  return (
    <>
      <BackButton fixed href="/" />
      <ProjectsSection />
      <MembersSection />
    </>
  );
};

export default Page;
