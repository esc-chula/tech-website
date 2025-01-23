'use client';

import { useState } from 'react';

import { Dialog } from '~/components/ui/dialog';

import QRCodeCreateDialogContent from './qr-code-create-dialog-content';
import { OpenContext } from './qr-code-open-context';

interface QRCodeCreateDialogContentProps {
  children?: React.ReactNode;
}

const QRCodeCreateDialog: React.FC<QRCodeCreateDialogContentProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <OpenContext.Provider value={{ open, setOpen }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <QRCodeCreateDialogContent />
        {children}
      </Dialog>
    </OpenContext.Provider>
  );
};

export default QRCodeCreateDialog;
