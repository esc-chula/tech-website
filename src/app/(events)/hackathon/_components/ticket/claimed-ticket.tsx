'use client'

import { CodeXml, Figma, Lightbulb, Settings } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { cn } from '~/lib/utils'
import { type HackathonTicket } from '~/types/hackathon'


interface ClaimedTicketProps {
  ticketType: HackathonTicket['ticketType']
  expiredAt: Date
}

const ClaimedTicket: React.FC<ClaimedTicketProps> = ({
  ticketType,
  expiredAt,
}: ClaimedTicketProps) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = (): void => {
      const now = new Date().getTime()
      const distance = expiredAt.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [expiredAt])

  const renderTimeLeft = (): string => {
    const { days, hours, minutes, seconds } = timeLeft

    if (days > 0) {
      return `${days} days ${hours} hours`
    }

    if (hours > 0) {
      return `${hours} hours ${minutes} minutes`
    }

    if (minutes > 0) {
      return `${minutes} minutes ${seconds} seconds`
    }

    return `${seconds} seconds`
  }

  const renderIcon = useMemo(() => {
    switch (ticketType) {
      case 'GENERAL':
        return <Settings />
      case 'DEVELOPER':
        return <Figma />
      case 'DESIGNER':
        return <CodeXml />
      case 'PRODUCT':
        return <Lightbulb />
      default:
        return null
    }
  }, [ticketType])

  return (
    <div
      className={cn(
        'flex bg-gradient-to-b py-12',
        ticketType === 'GENERAL' && 'from-red-700 to-red-950',
        ticketType === 'DEVELOPER' && 'from-indigo-900 to-black',
        ticketType === 'DESIGNER' && 'from-violet-500 to-green-500',
        ticketType === 'PRODUCT' && 'from-yellow-700 to-black'
      )}
    >
      {renderIcon}
      {ticketType}
      <p>Expiring in {renderTimeLeft()}</p>
    </div>
  )
}

export default ClaimedTicket
