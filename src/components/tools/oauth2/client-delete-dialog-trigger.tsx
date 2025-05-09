'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { useToast } from '~/hooks/use-toast'
import { deleteOAuth2Client } from '~/server/actions/oauth'

interface ClientDeleteDialogTriggerProps {
  name: string
  id: string
}

const ClientDeleteDialogTrigger: React.FC<ClientDeleteDialogTriggerProps> = ({
  id,
  name,
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const deleteHandler = async (): Promise<void> => {
    setLoading(true)

    const res = await deleteOAuth2Client(id)

    if (!res.success) {
      console.error(
        'ClientDeleteDialogTrigger, failed to delete QR code: ',
        res.errors
      )

      toast({
        title: 'Failed to delete QR code',
        description: res.message ?? 'Something went wrong',
        variant: 'destructive',
      })

      setLoading(false)
      return
    }

    setLoading(false)
    setOpen(false)

    router.refresh()
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='transparent'>
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete &quot;{name}&quot; ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this OAuth 2.0 Client will
            permanently remove it from your account and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={loading}
            variant='destructive'
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ClientDeleteDialogTrigger
