import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import LoginForm from '~/components/login/login-form';
import { Card } from '~/components/ui/card';

const Page: React.FC = () => {
  const cookieStore = cookies();
  const sid = cookieStore.get('sid')?.value;

  if (sid) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center pt-40">
      <Card className="">
        <LoginForm />
      </Card>
    </div>
  );
};

export default Page;
