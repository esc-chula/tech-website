'use client';

import { LoaderCircle, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useToast } from '~/hooks/use-toast';
import { getSession, logout } from '~/server/actions/auth';

const UserBox: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    getSession()
      .then((res) => {
        setStudentId(res.success ? res.data.studentId : null);
      })
      .catch(() => {
        setStudentId(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex items-center gap-2 h-8 z-40">
      <div className="w-44 h-full flex items-center gap-2 px-4 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm">
        {loading ? (
          <LoaderCircle className="animate-spin opacity-50" size={20} />
        ) : (
          <>
            <User className="opacity-50" size={20} />
            <span className="text-sm font-medium">
              Hi, {studentId ?? 'Hackers'}
            </span>
          </>
        )}
      </div>
      {studentId ? (
        <button
          className="rounded-full bg-hackathon-primary h-full px-5"
          type="button"
          onClick={() => {
            logout()
              .then(() => {
                router.replace('/hackathon');
              })
              .catch(() => {
                toast({
                  title: 'Failed to logout',
                  description: 'Please try again later.',
                  variant: 'destructive',
                });
              });
          }}
        >
          Logout
        </button>
      ) : (
        <Link
          className="rounded-full overflow-hidden h-full"
          href={loading ? '#' : `/hackathon/login?redirectUrl=${pathname}`}
        >
          <button
            className="rounded-full bg-hackathon-primary h-full px-5"
            type="button"
          >
            {loading ? (
              <LoaderCircle className="animate-spin opacity-50" size={20} />
            ) : (
              'Login'
            )}
          </button>
        </Link>
      )}
    </div>
  );
};

export default UserBox;
