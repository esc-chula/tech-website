import { Suspense } from 'react';

import { Section } from '~/components/ui/section';
import { Title } from '~/components/ui/title';

import MemberContainer from './members-container';
import MembersLoading from './members-loading';

const MembersSection: React.FC = () => {
  return (
    <Section className="gap-6">
      <Title className="text-4xl" color="primary" variant="sectionTitle">
        Members
      </Title>
      <p className="max-w-3xl text-center font-medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation
      </p>
      <Suspense fallback={<MembersLoading />}>
        <MemberContainer />
      </Suspense>
    </Section>
  );
};

export default MembersSection;
