'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { useToast } from '~/hooks/use-toast';
import { deleteQRCode } from '~/server/actions/qr-code';

interface DeleteQRCodeProps {
  name: string;
  id: string;
}

const DeleteQRCode: React.FC<DeleteQRCodeProps> = ({ id, name }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteHandler = async (): Promise<void> => {
    setLoading(true);

    const res = await deleteQRCode({ id });

    if (!res.success) {
      console.error(res.errors);

      toast({
        title: 'Failed to delete qr code',
        description: res.message ?? 'Something went wrong',
        variant: 'destructive',
      });

      setLoading(false);
      return;
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="transparent">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete the QR code &quot;{name}&quot; ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this QR code will permanently
            remove it from your account and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={loading}
            variant="destructive"
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteQRCode;
