'use client'

import { Plus } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { DialogTrigger } from '~/components/ui/dialog'

interface DialogTriggerProps {
  variant: 'button' | 'card'
}

const QrCodeCreateDialogTrigger: React.FC<DialogTriggerProps> = ({
  variant,
}) => {
  switch (variant) {
    case 'button':
      return (
        <DialogTrigger asChild>
          <Button variant='default'>
            <Plus size={16} />
            New
          </Button>
        </DialogTrigger>
      )
    case 'card':
      return (
        <DialogTrigger asChild>
          <button
            className='flex h-36 w-full items-center justify-center place-self-center rounded-3xl border-4 border-dashed border-neutral-800 md:h-[420px]'
            type='button'
          >
            <div className='flex aspect-square items-center justify-center rounded-full border-4 border-dashed border-neutral-800 p-4'>
              <Plus color='#262626' size={52} strokeWidth={2.5} />
            </div>
          </button>
        </DialogTrigger>
      )
    default:
      return null
  }
}

export default QrCodeCreateDialogTrigger
