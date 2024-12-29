import { Suspense } from 'react';

import BackButton from '~/components/common/button/back-button';
import QRCodeCreateButton from '~/components/tools/qr-code-generator/qr-code-create-button';
import QRCodeCreateDialog from '~/components/tools/qr-code-generator/qr-code-create-dialog';
import QRCodesContainer from '~/components/tools/qr-code-generator/qr-codes-container';
import { Title } from '~/components/ui/title';

const Page: React.FC = () => {
  return (
    <>
      <BackButton href="/" />
      <div className="flex w-full flex-col items-center gap-5 pb-10 pt-20 lg:gap-8 lg:pt-8">
        <Title className="hidden lg:inline">QR Code Generator</Title>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-medium">Your QR Codes</h2>
          <div className="md:hidden">
            <QRCodeCreateButton />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <Suspense>
            <QRCodeCreateDialog />
            <QRCodesContainer />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Page;
