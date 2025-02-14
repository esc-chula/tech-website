/* eslint-disable no-nested-ternary -- to handle cases */
import { User } from 'lucide-react';
import { cookies } from 'next/headers';

import { me } from '~/server/actions/auth';

import LoginButton from '../button/login-button';
import LogoutButton from '../button/logout-button';

const UserBox: React.FC = async () => {
  const cookieStore = cookies();
  const sid = cookieStore.get('sid')?.value;

  if (!sid) {
    return (
      <div className="flex items-center justify-between gap-4 border-neutral-800 px-4 py-5">
        <div className="flex items-center gap-4">
          <div className="grid aspect-square w-12 place-content-center rounded-full bg-white/20">
            <User size={24} />
          </div>
          <div>
            <p className="font-medium">Hello, Intania</p>
            <p className="text-sm">Please log in</p>
          </div>
        </div>
        <LoginButton />
      </div>
    );
  }

  const res = await me({
    sessionId: sid,
  });

  return (
    <div className="flex items-center justify-between gap-4 border-neutral-800 px-4 py-5">
      <div className="flex items-center gap-4">
        <div className="grid aspect-square w-12 place-content-center rounded-full bg-white/20">
          <User size={24} />
        </div>
        <div>
          {res.success ? (
            res.data.firstNameEn ? (
              <>
                <p className="font-medium">{res.data.firstNameEn}</p>
                <p className="text-sm">{res.data.studentId}</p>
              </>
            ) : (
              <p className="font-medium">{res.data.studentId}</p>
            )
          ) : (
            <>
              <p className="font-medium">Hello, Intania</p>
              <p className="text-sm">Please log in</p>
            </>
          )}
        </div>
      </div>
      {res.success ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default UserBox;
