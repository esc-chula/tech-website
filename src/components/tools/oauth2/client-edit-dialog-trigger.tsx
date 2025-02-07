'use client';

import { type OAuth2Client } from '@ory/hydra-client';
import { SquarePen } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { useClientEditDialog } from './client-edit-dialog-context';

interface ClientEditDialogTriggerProps {
  data: OAuth2Client;
}

const ClientEditDialogTrigger: React.FC<ClientEditDialogTriggerProps> = ({
  data,
}) => {
  const { setOpen, setData } = useClientEditDialog();

  return (
    <Button
      variant="transparent"
      onClick={() => {
        setOpen(true);
        setData(data);
      }}
    >
      <SquarePen size={16} />
    </Button>
  );
};

export default ClientEditDialogTrigger;
