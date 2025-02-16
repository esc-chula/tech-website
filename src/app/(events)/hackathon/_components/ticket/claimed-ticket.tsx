'use client'

import { CodeXml, Figma, Lightbulb, Settings } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { cn } from '~/lib/utils'
import {
  type HackathonTicket,
  type HackathonTicketClaim,
} from '~/types/hackathon'


interface ClaimedTicketProps {
  ticketType: HackathonTicket['ticketType']
  expiredAt: HackathonTicketClaim['expiredAt']
}

const ClaimedTicket: React.FC<ClaimedTicketProps> = ({
  ticketType,
  expiredAt,
}: ClaimedTicketProps) => {
  const [timeLeft, setTimeLeft] = useState<string>('0 minutes 0 seconds')

  useEffect(() => {
    if (!expiredAt) return
    const calculateTimeLeft = (): void => {
      const now = new Date().getTime()
      const distance = expiredAt.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeLeft(`${days} days ${hours} hours`)
      } else if (hours > 0) {
        setTimeLeft(`${hours} hours ${minutes} minutes`)
      } else if (minutes > 0) {
        setTimeLeft(`${minutes} minutes ${seconds} seconds`)
      } else {
        setTimeLeft(`${seconds} seconds`)
      }
    }

    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [expiredAt])

  const renderIcon = useMemo(() => {
    switch (ticketType) {
      case 'GENERAL':
        return <Settings className='size-36' />
      case 'DEVELOPER':
        return <CodeXml className='size-36' />
      case 'DESIGNER':
        return <Figma className='size-36' />
      case 'PRODUCT':
        return <Lightbulb className='size-36' />
      default:
        return null
    }
  }, [ticketType])

  return (
    <div
      className={cn(
        'flex aspect-[4/3] w-full flex-col items-center justify-center gap-7 rounded-3xl border-2 border-white bg-gradient-to-b px-4 py-12 text-center',
        ticketType === 'GENERAL' && 'from-red-700 to-red-950',
        ticketType === 'DEVELOPER' && 'from-indigo-900 to-black',
        ticketType === 'DESIGNER' && 'from-violet-500 to-green-500',
        ticketType === 'PRODUCT' && 'from-yellow-700 to-black'
      )}
    >
      {renderIcon}
      <p className='text-nowrap text-xl font-medium tracking-tight text-white'>
        Expiring in {timeLeft}
      </p>
    </div>
  )
}

export default ClaimedTicket
