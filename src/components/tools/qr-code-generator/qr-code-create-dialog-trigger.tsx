'use client';
import { Plus } from 'lucide-react';
import { useContext } from 'react';

import { Button } from '~/components/ui/button';
import { DialogTrigger } from '~/components/ui/dialog';

import { CreateDialogContext } from './qr-code-create-dialog-context';

const QRCodeCreateDialogTrigger: React.FC = () => {
  const { isShowButton } = useContext(CreateDialogContext);
  return (
    <>
      {isShowButton ? (
        <DialogTrigger asChild>
          <Button variant="default">
            <Plus size={16} />
            New
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <button
            className="hidden md:flex justify-center items-center border-4 border-neutral-800 border-dashed rounded-3xl w-full max-w-[350px] place-self-center min-h-[420px] h-full"
            type="button"
          >
            <div className="flex justify-center items-center border-4 border-neutral-800 border-dashed rounded-full w-5/12 aspect-square">
              <Plus color="#262626" size={52} strokeWidth={4} />
            </div>
          </button>
        </DialogTrigger>
      )}
    </>
  );
};

export default QRCodeCreateDialogTrigger;
