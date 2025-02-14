import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { me } from '~/server/actions/auth';

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

  return (
    <div className="flex flex-col items-center min-h-dvh gap-6 pt-20 pb-28">
      <h1 className="text-4xl md:text-5xl font-semibold">Registration</h1>
      <RegistrationForm currentUserData={res.data} />
    </div>
  );
};

export default Page;
