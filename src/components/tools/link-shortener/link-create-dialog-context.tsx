'use client';

import { createContext, useContext } from 'react';

interface LinkCreateDialogContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LinkCreateDialogContext = createContext<LinkCreateDialogContextProps>({
  open: false,
  setOpen: () => null,
});

export default LinkCreateDialogContext;

export function useLinkCreateDialog(): LinkCreateDialogContextProps {
  const context = useContext(LinkCreateDialogContext);
  return context;
}
