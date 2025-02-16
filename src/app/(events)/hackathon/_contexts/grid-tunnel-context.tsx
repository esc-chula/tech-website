'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { cn } from '~/lib/utils'

interface GridTunnelContextProps {
  offset: number
  setOffset: (offset: number) => void
  perspective: number
  setPerspective: (perspective: number) => void
}

const GridTunnelContext = createContext<GridTunnelContextProps>({
  offset: 0,
  setOffset: () => null,
  perspective: 500,
  setPerspective: () => null,
})

export const useGridTunnelContext = (): GridTunnelContextProps => {
  return useContext(GridTunnelContext)
}

interface GridTunnelContextProviderProps {
  children: React.ReactNode
}

const GridTunnelContextProvider: React.FC<GridTunnelContextProviderProps> = ({
  children,
}) => {
  const [offset, setOffset] = useState<number | null>(null)
  const [perspective, setPerspective] = useState(700)

  useEffect(() => {
    const onScroll = (): void => {
      setOffset(1.2 * window.scrollY)
      setPerspective(Math.max(700 - window.scrollY * 0.3, 80))
    }

    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })

    setOffset(1.2 * window.scrollY)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <GridTunnelContext.Provider
      value={{
        offset: offset ?? 0,
        setOffset,
        perspective,
        setPerspective,
      }}
    >
      <main
        className={cn(
          'duration-500 ease-in-out',
          offset !== null ? 'opacity-100' : 'opacity-0'
        )}
      >
        {children}
      </main>
    </GridTunnelContext.Provider>
  )
}

export default GridTunnelContextProvider
