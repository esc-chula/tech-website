import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { me } from '~/server/actions/auth';

import UserBox from '../../_components/common/user-box';
import RegistrationForm from '../../_components/registration/registration-form';

export const metadata: Metadata = {
  title: 'Intania Hackathon - Registration',
};

const Page: React.FC = async () => {
  const cookieStore = cookies();
  const sid = cookieStore.get('sid')?.value;

  if (!sid) {
    return notFound();
  }

  const res = await me({
    sessionId: sid,
  });
  if (!res.success) {
    return notFound();
  }

  // TODO: check if user has team ticket and not registered yet

  return (
    <div className="flex flex-col items-center min-h-dvh gap-10 pt-8 pb-24">
      <UserBox />
      <h1 className="text-4xl md:text-5xl font-semibold">Registration</h1>
      <RegistrationForm currentUserData={res.data} />
    </div>
  );
};

export default Page;
