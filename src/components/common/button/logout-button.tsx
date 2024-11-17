'use client';

import { Button } from '~/components/ui/button';
import { useToast } from '~/hooks/use-toast';
import { logout } from '~/server/actions/auth';

const LogoutButton: React.FC = () => {
  const { toast } = useToast();

  return (
    <Button
      className="px-5"
      size="sm"
      variant="primary"
      onClick={async () => {
        try {
          await logout();
        } catch (error) {
          toast({
            title: 'Failed to log out',
            description: 'Please try again',
            variant: 'destructive',
          });
        }
      }}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
