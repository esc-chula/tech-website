'use client';

import { Plus } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { DialogTrigger } from '~/components/ui/dialog';

interface DialogTriggerProps {
  variant: 'button' | 'card';
}

const QRCodeCreateDialogTrigger: React.FC<DialogTriggerProps> = ({
  variant,
}) => {
  switch (variant) {
    case 'button':
      return (
        <DialogTrigger asChild>
          <Button variant="default">
            <Plus size={16} />
            New
          </Button>
        </DialogTrigger>
      );
    case 'card':
      return (
        <DialogTrigger asChild>
          <button
            className="flex h-36 md:h-[420px] justify-center items-center border-4 border-neutral-800 border-dashed rounded-3xl w-full place-self-center"
            type="button"
          >
            <div className="flex justify-center items-center border-4 border-neutral-800 border-dashed rounded-full p-4 aspect-square">
              <Plus color="#262626" size={52} strokeWidth={2.5} />
            </div>
          </button>
        </DialogTrigger>
      );
    default:
      return null;
  }
};

export default QRCodeCreateDialogTrigger;
