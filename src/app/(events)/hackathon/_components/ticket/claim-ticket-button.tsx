'use client';

import { Button } from '~/components/ui/button';
import { useToast } from '~/hooks/use-toast';
import { claimHackahonTicketWithRateLimit } from '~/server/actions/hackathon';

interface ClaimTicketButtonProps {
  code: string;
}

const ClaimTicketButton: React.FC<ClaimTicketButtonProps> = ({ code }) => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        claimHackahonTicketWithRateLimit(code)
          .then((res) => {
            console.log(res);
          })
          .catch((err: unknown) => {
            console.error(err instanceof Error ? err.message : err);
            toast({
              title: 'Error',
              description: err instanceof Error ? err.message : String(err),
              variant: 'destructive',
            });
          });
      }}
    >
      Claim {code}
    </Button>
  );
};

export default ClaimTicketButton;
