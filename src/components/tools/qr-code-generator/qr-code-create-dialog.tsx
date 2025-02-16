'use client'

import { useState } from 'react'

import { Dialog } from '~/components/ui/dialog'

import QrCodeCreateDialogContent from './qr-code-create-dialog-content'
import { OpenContext } from './qr-code-open-context'

interface QrCodeCreateDialogContentProps {
  children?: React.ReactNode
}

const QrCodeCreateDialog: React.FC<QrCodeCreateDialogContentProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <OpenContext.Provider value={{ open, setOpen }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <QrCodeCreateDialogContent />
        {children}
      </Dialog>
    </OpenContext.Provider>
  )
}

export default QrCodeCreateDialog
