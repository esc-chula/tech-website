'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
import { deleteShortenedLink } from '~/server/actions/link-shortener';

interface DeleteButtonProps {
  slug: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ slug }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteHandler = async (): Promise<void> => {
    setLoading(true);

    const res = await deleteShortenedLink(slug);

    if (!res.success) {
      setLoading(false);

      toast({
        title: 'Failed to delete link',
        description: res.message ?? 'Something went wrong',
        variant: 'destructive',
      });

      console.error(res.errors);

      return;
    }

    setLoading(false);
    setOpen(false);

    router.push('/tools/link-shortener');
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
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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

export default DeleteButton;
