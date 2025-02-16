'use client'

import { createContext, useContext } from 'react'

interface ClientCreateDialogContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ClientCreateDialogContext = createContext<ClientCreateDialogContextProps>(
  {
    open: false,
    setOpen: () => null,
  }
)

export default ClientCreateDialogContext

export function useClientCreateDialog(): ClientCreateDialogContextProps {
  const context = useContext(ClientCreateDialogContext)
  return context
}
