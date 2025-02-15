import { User } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';

import { getSession } from '~/server/actions/auth';

import LogoutButton from './logout-button';

const UserBox: React.FC = async () => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') ?? '';

  const res = await getSession();
  if (!res.success) {
    return (
      <div className="flex items-center gap-2 h-8 z-40">
        <div className="w-44 h-full flex items-center gap-2 px-4 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm">
          <User className="opacity-50" size={20} />
          <span className="text-sm font-medium">Hi, Hackers</span>
        </div>

        <Link
          className="rounded-full overflow-hidden h-full"
          href={`/hackathon/login?redirectUrl=${pathname}`}
        >
          <button
            className="rounded-full bg-hackathon-primary h-full px-5"
            type="button"
          >
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 h-8 z-40">
      <div className="w-44 h-full flex items-center gap-2 px-4 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm">
        <User className="opacity-50" size={20} />
        <span className="text-sm font-medium">Hi, {res.data.studentId}</span>
      </div>
      <LogoutButton />
    </div>
  );
};

export default UserBox;
