'use client';

import { Button } from '~/components/ui/button';
import { useToast } from '~/hooks/use-toast';
import { claimHackahonTicketWithRateLimit } from '~/server/actions/hackathon';

const ClaimTicketButton: React.FC = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        claimHackahonTicketWithRateLimit('ticketCode')
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
      Claim
    </Button>
  );
};

export default ClaimTicketButton;
