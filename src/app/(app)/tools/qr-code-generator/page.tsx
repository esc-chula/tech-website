import type { Metadata } from 'next'
import { Suspense } from 'react'

import BackButton from '~/components/common/button/back-button'
import QrCodeCreateDialog from '~/components/tools/qr-code-generator/qr-code-create-dialog'
import QrCodeCreateDialogTrigger from '~/components/tools/qr-code-generator/qr-code-create-dialog-trigger'
import QrCodeLoading from '~/components/tools/qr-code-generator/qr-code-loading'
import QrCodesContainer from '~/components/tools/qr-code-generator/qr-codes-container'

export const metadata: Metadata = {
  title: 'Intania Tech - QR Code Generator',
}

const Page: React.FC = () => {
  return (
    <>
      <BackButton href='/' />
      <div className='flex w-full flex-col items-center gap-5 pb-10 pt-20 lg:gap-8'>
        <QrCodeCreateDialog>
          <div className='flex w-full items-center justify-between'>
            <h2 className='text-2xl font-medium'>Your QR Codes</h2>
            <QrCodeCreateDialogTrigger variant='button' />
          </div>
          <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
            <QrCodeCreateDialogTrigger variant='card' />
            <Suspense fallback={<QrCodeLoading />}>
              <QrCodesContainer />
            </Suspense>
          </div>
        </QrCodeCreateDialog>
      </div>
    </>
  )
}

export default Page
