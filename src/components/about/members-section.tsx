import { Suspense } from 'react';

import { Section } from '~/components/ui/section';
import { Title } from '~/components/ui/title';

import MemberContainer from './members-container';
import MembersLoading from './members-loading';

const MembersSection: React.FC = () => {
  return (
    <Section className="gap-6 pb-20">
      <Title className="text-4xl" color="primary" variant="sectionTitle">
        Our Members
      </Title>
      <p className="max-w-3xl text-center font-medium">
        ฝ่าย TECH กรรมการนิสิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
        คือที่รวบรวมแก๊งเดฟชั้นเทพจากวิศวะจุฬาฯ
        ที่รวมตัวกันมาสร้างนวัตกรรมและเทคโนโลยีให้กับ Intania นั่นเอง!
      </p>
      <Suspense fallback={<MembersLoading />}>
        <MemberContainer />
      </Suspense>
    </Section>
  );
};

export default MembersSection;
