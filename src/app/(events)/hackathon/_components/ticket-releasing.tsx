'use client'

import { useEffect, useState } from 'react'

export const TicketConsoleLog: React.FC = () => {
  console.log('DEV_GM0HP5G68B')
  return null
}

export const TransparentHeroText: React.FC = () => {
  const [random, setRandom] = useState<0 | 1>(0)

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 2) as 0 | 1)
  }, [])

  return (
    <p className='absolute opacity-0'>
      {random === 0 ? 'hehe' : 'DEV_ITJI4UHDIO'}
    </p>
  )
}
