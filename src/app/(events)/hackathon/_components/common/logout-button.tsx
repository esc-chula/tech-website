'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useToast } from '~/hooks/use-toast';
import { logout } from '~/server/actions/auth';

const LogoutButton: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { toast } = useToast();

  return (
    <button
      className="rounded-full bg-hackathon-primary h-full px-5"
      type="button"
      onClick={() => {
        logout()
          .then(() => {
            router.push(`/hackathon/login?redirectUrl=${pathname}`);
          })
          .catch(() => {
            console.error('LogoutButton: failed to logout');
            toast({
              title: 'Failed to logout',
              description: 'Please try again later',
              variant: 'destructive',
            });
          });
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
