import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Header from '../_components/header';

const Page: React.FC = () => {
  const cookieStore = cookies();
  const studentId = cookieStore.get('studentId')?.value;
  if (!studentId) {
    redirect('/techmonth/login');
  }

  return (
    <main className="flex w-full flex-col items-center">
      <div className="flex min-h-screen w-full max-w-screen-xl flex-col space-y-16 px-8 py-16 font-tiny5 md:px-16 xl:px-4">
        <Header studentId={studentId} />
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="flex flex-col space-y-2 lg:space-y-1">
            <h2 className="text-5xl uppercase md:text-6xl lg:text-8xl">
              RE<span className="text-techmonth-magenta">WARDS</span>
            </h2>
          </div>
        </div>
        <p className="text-xl">Coming Very Soon 👀</p>
      </div>
    </main>
  );
};

export default Page;
