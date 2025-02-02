import BackButton from '~/components/common/button/back-button';
import ClientsContainer from '~/components/tools/oauth2/clients-container';
import { Title } from '~/components/ui/title';

const Page: React.FC = () => {
  return (
    <>
      <BackButton href="/" />
      <div className="flex w-full flex-col items-center gap-5 pb-10 pt-20 lg:gap-8 lg:pt-8">
        <Title className="hidden lg:inline">OAuth 2.0</Title>
        <ClientsContainer />
      </div>
    </>
  );
};

export default Page;
