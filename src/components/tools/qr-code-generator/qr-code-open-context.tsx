import { createContext } from 'react'

interface OpenContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const OpenContext = createContext<OpenContextProps>({
  open: false,
  setOpen: () => null,
})
