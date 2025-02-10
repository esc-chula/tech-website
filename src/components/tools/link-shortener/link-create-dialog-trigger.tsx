'use client';

import { Plus } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { useLinkCreateDialog } from './link-create-dialog-context';

interface LinkCreateDialogTriggerProps {
  variant: 'button' | 'card';
}

const LinkCreateDialogTrigger: React.FC<LinkCreateDialogTriggerProps> = ({
  variant,
}) => {
  const { setOpen } = useLinkCreateDialog();

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
          className="flex h-36 justify-center items-center border-4 border-neutral-800 border-dashed rounded-3xl w-full place-self-center"
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          <div className="flex justify-center items-center border-4 border-neutral-800 border-dashed rounded-full p-4 aspect-square">
            <Plus color="#262626" size={52} strokeWidth={2.5} />
          </div>
        </button>
      );
    default:
      return null;
  }
};

export default LinkCreateDialogTrigger;
