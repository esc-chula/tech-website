'use client';

import { Button } from '~/components/ui/button';
import { useToast } from '~/hooks/use-toast';
import { claimHackahonTicketWithRateLimit } from '~/server/actions/hackathon';

import UserBox from '../../_components/common/user-box';
import ClaimTicketButton from '../../_components/ticket/claim-ticket-button';

const Page: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col items-center min-h-dvh gap-10 pt-8 pb-24">
      <UserBox />
      <ClaimTicketButton />
    </div>
  );
};

export default Page;
