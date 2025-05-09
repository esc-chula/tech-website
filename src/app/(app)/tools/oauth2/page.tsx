import { type Metadata } from 'next'
import { Suspense } from 'react'

import BackButton from '~/components/common/button/back-button'
import ClientCreateDialog from '~/components/tools/oauth2/client-create-dialog'
import ClientCreateDialogTrigger from '~/components/tools/oauth2/client-create-dialog-trigger'
import ClientEditDialog from '~/components/tools/oauth2/client-edit-dialog'
import ClientSecretDialog from '~/components/tools/oauth2/client-secret-dialog'
import ClientsContainer from '~/components/tools/oauth2/clients-container'
import ClientsLoading from '~/components/tools/oauth2/clients-loading'

export const metadata: Metadata = {
  title: 'Intania Tech - OAuth2.0',
}

const Page: React.FC = () => {
  return (
    <>
      <BackButton href='/' />
      <div className='flex w-full flex-col items-center gap-5 pb-10 pt-20 lg:gap-8'>
        <ClientSecretDialog>
          <ClientCreateDialog>
            <ClientEditDialog>
              <div className='flex w-full items-center justify-between'>
                <h2 className='text-2xl font-medium'>Your Clients</h2>
                <ClientCreateDialogTrigger variant='button' />
              </div>
              <div className='grid w-full gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
                <Suspense fallback={<ClientsLoading />}>
                  <ClientsContainer />
                </Suspense>
              </div>
            </ClientEditDialog>
          </ClientCreateDialog>
        </ClientSecretDialog>
      </div>
    </>
  )
}

export default Page
