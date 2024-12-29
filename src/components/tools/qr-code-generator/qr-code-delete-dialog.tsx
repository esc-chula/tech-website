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
// import { useToast } from '~/hooks/use-toast';

interface DeleteQRCodeProps {
  name: string;
  id: number;
}

const DeleteQRCode: React.FC<DeleteQRCodeProps> = ({ name }) => {
  // const { toast } = useToast();
  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(false);

  // const deleteHandler = async (): Promise<void> => {
  //   setLoading(true);

  // Delete api
  // const res = await

  // if (!res.success) {
  //   console.error(res.errors);

  //   toast({
  //     title: 'Failed to delete qr code',
  //     description: res.message ?? 'Something went wrong',
  //     variant: 'destructive',
  //   });

  //   setLoading(false);

  //   return;
  // }

  //   setLoading(false);
  //   setOpen(false);
  //   window.location.reload();
  // };

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
            Are you absolutely sure to delete {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            // disabled={loading}
            variant="destructive"
            onClick={() => setOpen(false)}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteQRCode;
