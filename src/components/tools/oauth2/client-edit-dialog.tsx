'use client';

import { type OAuth2Client } from '@ory/hydra-client';
import { useState } from 'react';

import { Dialog } from '~/components/ui/dialog';

import ClientEditDialogContent from './client-edit-dialog-content';
import ClientEditDialogContext from './client-edit-dialog-context';

interface ClientEditDialogProps {
  children?: React.ReactNode;
}

const ClientEditDialog: React.FC<ClientEditDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<OAuth2Client>({});

  return (
    <ClientEditDialogContext.Provider value={{ open, setOpen, data, setData }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <ClientEditDialogContent />
        {children}
      </Dialog>
    </ClientEditDialogContext.Provider>
  );
};

export default ClientEditDialog;
