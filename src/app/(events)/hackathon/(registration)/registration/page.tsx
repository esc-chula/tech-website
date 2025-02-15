import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { me } from '~/server/actions/auth';
import { findMyRegistration } from '~/server/actions/hackathon';

import BirdsBackground from '../../_components/common/birds-background';
import UserBox from '../../_components/common/user-box';
import RegistrationForm from '../../_components/registration/registration-form';

export const metadata: Metadata = {
  title: 'Intania Hackathon - Registration',
};

const Page: React.FC = async () => {
  const resMe = await me();
  if (!resMe.success) {
    return notFound();
  }

  const resMyRegistration = await findMyRegistration();
  if (!resMyRegistration.success) {
    return notFound();
  }
  if (resMyRegistration.data) {
    return redirect('/hackathon/registration/success');
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-dvh gap-10 pt-8 pb-24">
        <UserBox />
        <h1 className="text-4xl md:text-5xl font-semibold">Registration</h1>
        <RegistrationForm currentUserData={resMe.data} />
      </div>
      <BirdsBackground />
    </>
  );
};

export default Page;
