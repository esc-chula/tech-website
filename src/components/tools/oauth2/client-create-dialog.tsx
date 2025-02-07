'use client';

import { useState } from 'react';

import { Dialog } from '~/components/ui/dialog';

import ClientCreateDialogContent from './client-create-dialog-content';
import ClientCreateDialogContext from './client-create-dialog-context';

interface ClientCreateDialogProps {
  children?: React.ReactNode;
}

const ClientCreateDialog: React.FC<ClientCreateDialogProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ClientCreateDialogContext.Provider value={{ open, setOpen }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <ClientCreateDialogContent />
        {children}
      </Dialog>
    </ClientCreateDialogContext.Provider>
  );
};

export default ClientCreateDialog;
