import { redirect } from 'next/navigation';

import {
  findMyRegistration,
  findMyTeamTicket,
} from '~/server/actions/hackathon';

import Building1Background from '../../_components/common/bulding-1-background';
import UserBox from '../../_components/common/user-box';
import ClaimTicketButton from '../../_components/ticket/claim-ticket-button';
import CreateTeamTicket from '../../_components/ticket/create-team-ticket';

const Page: React.FC = async () => {
  const resMyTeamTicket = await findMyTeamTicket();

  if (resMyTeamTicket.success && resMyTeamTicket.data) {
    const resMyRegistration = await findMyRegistration();

    if (!resMyRegistration.success) {
      return 'Something went wrong, please try again later...';
    }

    if (resMyRegistration.data) {
      return redirect('/hackathon/registration/success');
    }

    return redirect('/hackathon/registration');
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-dvh gap-10 pt-8 pb-24">
        <UserBox />
        <ClaimTicketButton code="DEV-XXXXXXXXXX" />
        <ClaimTicketButton code="DES-XXXXXXXXXX" />
        <CreateTeamTicket />
      </div>
      <Building1Background />
    </>
  );
};

export default Page;
