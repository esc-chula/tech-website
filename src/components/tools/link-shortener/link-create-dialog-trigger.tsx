'use client'

import { Plus } from 'lucide-react'

import { Button } from '~/components/ui/button'

import { useLinkCreateDialog } from './link-create-dialog-context'

interface LinkCreateDialogTriggerProps {
  variant: 'button' | 'card'
}

const LinkCreateDialogTrigger: React.FC<LinkCreateDialogTriggerProps> = ({
  variant,
}) => {
  const { setOpen } = useLinkCreateDialog()

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
          className='flex h-36 w-full items-center justify-center place-self-center rounded-3xl border-4 border-dashed border-neutral-800'
          type='button'
          onClick={() => {
            setOpen(true)
          }}
        >
          <div className='flex aspect-square items-center justify-center rounded-full border-4 border-dashed border-neutral-800 p-4'>
            <Plus color='#262626' size={52} strokeWidth={2.5} />
          </div>
        </button>
      )
    default:
      return null
  }
}

export default LinkCreateDialogTrigger
