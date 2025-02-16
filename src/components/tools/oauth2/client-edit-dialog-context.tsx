'use client'

import type { OAuth2Client } from '@ory/hydra-client'
import { createContext, useContext } from 'react'

interface ClientEditDialogContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: OAuth2Client
  setData: React.Dispatch<React.SetStateAction<OAuth2Client>>
}

const ClientEditDialogContext = createContext<ClientEditDialogContextProps>({
  open: false,
  setOpen: () => null,
  data: {},
  setData: () => null,
})

export default ClientEditDialogContext

export function useClientEditDialog(): ClientEditDialogContextProps {
  const context = useContext(ClientEditDialogContext)
  return context
}
