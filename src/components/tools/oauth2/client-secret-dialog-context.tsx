'use client';

import { createContext, useContext } from 'react';

interface ClientSecretDialogContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  secret: string;
  setSecret: React.Dispatch<React.SetStateAction<string>>;
}

const ClientSecretDialogContext = createContext<ClientSecretDialogContextProps>(
  {
    open: false,
    setOpen: () => null,
    secret: '',
    setSecret: () => null,
  },
);

export default ClientSecretDialogContext;

export function useClientSecretDialog(): ClientSecretDialogContextProps {
  const context = useContext(ClientSecretDialogContext);
  return context;
}
