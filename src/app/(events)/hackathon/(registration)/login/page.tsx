import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import LoginForm from '../../_components/login/login-form';

export const metadata: Metadata = {
  title: 'Intania Hackathon - Login',
};

interface PageProps {
  searchParams: {
    redirectUrl?: string;
  };
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
  const redirectUrl = searchParams.redirectUrl;

  const cookieStore = cookies();
  const sid = cookieStore.get('sid')?.value;

  if (sid) {
    redirect(redirectUrl ?? '/hackathon/register');
  }

  return (
    <div className="flex flex-col justify-center items-center h-dvh gap-6">
      <h1 className="text-4xl md:text-5xl font-semibold">Login</h1>
      <div className="flex flex-col border-white/40 border-2 rounded-2xl py-6 px-6 md:px-10 max-w-80 gap-6">
        <p className="text-sm md:text-base text-center text-white/90">
          Please login with
          <br />
          CUNET of Intania Student
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
