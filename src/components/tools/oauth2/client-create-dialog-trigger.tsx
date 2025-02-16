'use client'

import { Plus } from 'lucide-react'

import { Button } from '~/components/ui/button'

import { useClientCreateDialog } from './client-create-dialog-context'

interface ClientCreateDialogTriggerProps {
  variant: 'button' | 'card'
}

const ClientCreateDialogTrigger: React.FC<ClientCreateDialogTriggerProps> = ({
  variant,
}) => {
  const { setOpen } = useClientCreateDialog()

  switch (variant) {
    case 'button':
      return (
        <Button
          variant='default'
          onClick={() => {
            setOpen(true)
          }}
        >
          <Plus size={16} />
          New
        </Button>
      )
    case 'card':
      return (
        <button
          className='flex h-full min-h-36 w-full items-center justify-center place-self-center rounded-3xl border-4 border-dashed border-neutral-800 md:min-h-80'
          type='button'
          onClick={() => {
            setOpen(true)
          }}
        >
          <div className='flex aspect-square w-5/12 items-center justify-center rounded-full border-4 border-dashed border-neutral-800'>
            <Plus color='#262626' size={52} strokeWidth={2.5} />
          </div>
        </button>
      )
    default:
      return null
  }
}

export default ClientCreateDialogTrigger
