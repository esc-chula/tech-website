'use client';

import { useState } from 'react';

import { AlertDialog } from '~/components/ui/alert-dialog';

import ClientSecretDialogContent from './client-secret-dialog-content';
import ClientSecretDialogContext from './client-secret-dialog-context';

interface ClientSecretDialogProps {
  children?: React.ReactNode;
}

const ClientSecretDialog: React.FC<ClientSecretDialogProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [secret, setSecret] = useState('');

  return (
    <ClientSecretDialogContext.Provider
      value={{ open, setOpen, secret, setSecret }}
    >
      <AlertDialog open={open} onOpenChange={setOpen}>
        <ClientSecretDialogContent />
        {children}
      </AlertDialog>
    </ClientSecretDialogContext.Provider>
  );
};

export default ClientSecretDialog;
