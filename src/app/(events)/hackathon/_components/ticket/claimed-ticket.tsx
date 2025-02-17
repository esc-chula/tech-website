'use client'

import { motion } from 'framer-motion'
import { CodeXml, Figma, Lightbulb, Settings } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { cn } from '~/lib/utils'
import {
  type HackathonTicket,
  type HackathonTicketClaim,
} from '~/types/hackathon'

interface ClaimedTicketProps {
  ticketType: HackathonTicket['ticketType']
  expiredAt: HackathonTicketClaim['expiredAt']
  moveDirection: 'left' | 'right'
}

const ClaimedTicket: React.FC<ClaimedTicketProps> = ({
  ticketType,
  expiredAt,
  moveDirection,
}: ClaimedTicketProps) => {
  const [timeLeft, setTimeLeft] = useState<string>('0 minutes 0 seconds')
  const isMobile = useMediaQuery({ maxWidth: 640 })

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
        return <Settings className='size-24 sm:size-36' />
      case 'DEVELOPER':
        return <CodeXml className='size-24 sm:size-36' />
      case 'DESIGNER':
        return <Figma className='size-24 sm:size-36' />
      case 'PRODUCT':
        return <Lightbulb className='size-24 sm:size-36' />
      default:
        return null
    }
  }, [ticketType])

  const shadowColor = useMemo(() => {
    switch (ticketType) {
      case 'GENERAL':
        return 'rgba(185, 28, 28, 0.5)'
      case 'DEVELOPER':
        return 'rgba(49, 46, 129, 0.5)'
      case 'DESIGNER':
        return 'rgba(139, 92, 246, 0.5)'
      case 'PRODUCT':
        return 'rgba(161, 98, 7, 0.5)'
      default:
        return 'rgba(255, 255, 255, 0.5)'
    }
  }, [ticketType])

  return (
    <motion.div
      className={cn(
        'flex aspect-[4/3] w-full flex-col items-center justify-center gap-7 rounded-3xl border-2 border-white bg-gradient-to-b px-4 py-7 text-center sm:py-12',
        ticketType === 'GENERAL' && 'from-red-700 to-red-950',
        ticketType === 'DEVELOPER' && 'from-indigo-900 to-black',
        ticketType === 'DESIGNER' && 'from-violet-500 to-green-500',
        ticketType === 'PRODUCT' && 'from-yellow-700 to-black'
      )}
      exit={{
        translateX: isMobile ? 0 : `${moveDirection === 'left' ? 70 : -70}%`,
        translateY: isMobile ? `${moveDirection === 'left' ? 70 : -70}%` : 0,
        boxShadow: `0 0 240px 200px ${shadowColor}`,
        scale: 1.25,
        transition: { duration: 0.75, ease: 'easeIn' },
      }}
      whileInView={{
        boxShadow: [
          `0 0 60px 40px ${shadowColor}`,
          `0 0 100px 80px ${shadowColor}`,
          `0 0 60px 40px ${shadowColor}`,
        ],
        transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
      }}
    >
      {renderIcon}
      <p className='text-nowrap text-xs font-medium tracking-tight text-white sm:text-xl'>
        Expiring in {timeLeft}
      </p>
    </motion.div>
  )
}

export default ClaimedTicket
