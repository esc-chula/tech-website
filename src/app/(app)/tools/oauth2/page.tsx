import BackButton from '~/components/common/button/back-button';
import ClientCreateDialog from '~/components/tools/oauth2/client-create-dialog';
import ClientCreateDialogTrigger from '~/components/tools/oauth2/client-create-dialog-trigger';
import ClientsContainer from '~/components/tools/oauth2/clients-container';

const Page: React.FC = async () => {
  return (
    <>
      <BackButton href="/" />
      <div className="flex w-full flex-col items-center gap-5 pb-10 pt-20 lg:gap-8">
        <ClientCreateDialog>
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-medium">Your Clients</h2>
            <ClientCreateDialogTrigger variant="button" />
          </div>
          <ClientsContainer />
        </ClientCreateDialog>
      </div>
    </>
  );
};

export default Page;
