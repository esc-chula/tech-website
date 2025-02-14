import { type Metadata } from 'next';

import RegistrationForm from '../../_components/registration/registration-form';

export const metadata: Metadata = {
  title: 'Intania Hackathon - Registration',
};

const Page: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-dvh gap-6 pt-20 pb-28 px-3">
      <h1 className="text-4xl md:text-5xl font-semibold">Registration</h1>
      <RegistrationForm />
    </div>
  );
};

export default Page;
