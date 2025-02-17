'use client'

import { useState } from 'react'

import { Dialog } from '~/components/ui/dialog'

import LinkCreateDialogContent from './link-create-dialog-content'
import LinkCreateDialogContext from './link-create-dialog-context'

interface LinkCreateDialogProps {
  children?: React.ReactNode
}

const LinkCreateDialog: React.FC<LinkCreateDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <LinkCreateDialogContext.Provider value={{ open, setOpen }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <LinkCreateDialogContent />
        {children}
      </Dialog>
    </LinkCreateDialogContext.Provider>
  )
}

export default LinkCreateDialog
