import { notFound } from 'next/navigation';

import { findMyRegistration } from '~/server/actions/hackathon';

const Page: React.FC = async () => {
  const resMyRegistration = await findMyRegistration();
  if (!resMyRegistration.success || !resMyRegistration.data) {
    return notFound();
  }

  return <div>Your team is registered for the Intania Hackathon!</div>;
};

export default Page;
