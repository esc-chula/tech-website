import { Suspense } from 'react';

import BackButton from '~/components/common/button/back-button';
import ClientCreateDialog from '~/components/tools/oauth2/client-create-dialog';
import ClientCreateDialogTrigger from '~/components/tools/oauth2/client-create-dialog-trigger';
import ClientEditDialog from '~/components/tools/oauth2/client-edit-dialog';
import ClientsContainer from '~/components/tools/oauth2/clients-container';

const Page: React.FC = () => {
  return (
    <>
      <BackButton href="/" />
      <div className="flex w-full flex-col items-center gap-5 pb-10 pt-20 lg:gap-8">
        <ClientCreateDialog>
          <ClientEditDialog>
            <div className="flex w-full items-center justify-between">
              <h2 className="text-2xl font-medium">Your Clients</h2>
              <ClientCreateDialogTrigger variant="button" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
              <Suspense fallback={<p>Loading...</p>}>
                <ClientsContainer />
              </Suspense>
            </div>
          </ClientEditDialog>
        </ClientCreateDialog>
      </div>
    </>
  );
};

export default Page;
