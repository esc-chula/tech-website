import UserBox from '../../_components/common/user-box';
import ClaimTicketButton from '../../_components/ticket/claim-ticket-button';

const Page: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-dvh gap-10 pt-8 pb-24">
      <UserBox />
      <ClaimTicketButton />
    </div>
  );
};

export default Page;
