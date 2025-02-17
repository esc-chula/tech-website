'use client'

import CopyButton from '~/components/common/button/copy-button'
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

import { useClientSecretDialog } from './client-secret-dialog-context'

const ClientSecretDialogContent: React.FC = () => {
  const { secret } = useClientSecretDialog()

  return (
    <AlertDialogContent className='md:max-w-md'>
      <AlertDialogHeader>
        <AlertDialogTitle>Please Save Your Secret</AlertDialogTitle>
        <AlertDialogDescription>
          Client secret will be shown once and cannot be retrieved again
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div>
        <Label>Secret</Label>
        <div className='flex gap-4'>
          <Input className='w-full' value={secret} />
          <CopyButton
            className='h-auto p-0 hover:bg-transparent'
            value={secret}
          />
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>I have saved my secret</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default ClientSecretDialogContent
