'use client';

import { Plus } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { useClientCreateDialog } from './client-create-dialog-context';

interface ClientCreateDialogTriggerProps {
  variant: 'button' | 'card';
}

const ClientCreateDialogTrigger: React.FC<ClientCreateDialogTriggerProps> = ({
  variant,
}) => {
  const { setOpen } = useClientCreateDialog();

  switch (variant) {
    case 'button':
      return (
        <Button
          variant="default"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus size={16} />
          New
        </Button>
      );
    case 'card':
      return (
        <button
          className="hidden md:flex min-h-80 justify-center items-center border-4 border-neutral-800 border-dashed rounded-3xl w-full place-self-center h-full"
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          <div className="flex justify-center items-center border-4 border-neutral-800 border-dashed rounded-full w-5/12 aspect-square">
            <Plus color="#262626" size={52} strokeWidth={4} />
          </div>
        </button>
      );
    default:
      return null;
  }
};

export default ClientCreateDialogTrigger;
