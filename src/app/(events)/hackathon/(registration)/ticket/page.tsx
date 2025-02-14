'use client';

import { Button } from '~/components/ui/button';
import { useToast } from '~/hooks/use-toast';
import { claimHackahonTicketWithRateLimit } from '~/server/actions/hackathon';

import UserBox from '../../_components/common/user-box';

const Page: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col items-center min-h-dvh gap-10 pt-8 pb-24">
      <UserBox />
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
    </div>
  );
};

export default Page;
