'use client';
import { useState } from 'react';

import { Dialog } from '~/components/ui/dialog';

import QRCodeCreateDialogContent from './qr-code-create-dialog-content';
import { CreateDialogContext } from './qr-code-create-dialog-context';
import QRCodeCreateDialogTrigger from './qr-code-create-dialog-trigger';

const QRCodeCreateDialog: React.FC<{ isShowButton?: boolean }> = ({
  isShowButton = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <CreateDialogContext.Provider value={{ isShowButton, open, setOpen }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <QRCodeCreateDialogTrigger />
        <QRCodeCreateDialogContent />
      </Dialog>
    </CreateDialogContext.Provider>
  );
};

export default QRCodeCreateDialog;
