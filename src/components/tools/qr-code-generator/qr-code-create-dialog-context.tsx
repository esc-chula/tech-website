import { createContext } from 'react';

interface QRCodeCreateDialogProps {
  isShowButton: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateDialogContext = createContext<QRCodeCreateDialogProps>({
  isShowButton: false,
  open: false,
  setOpen: () => null,
});
