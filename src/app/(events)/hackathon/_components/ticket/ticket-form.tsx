'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  type HackathonTicket,
  type HackathonTicketClaim,
} from '~/types/hackathon'

import ClaimedTicket from './claimed-ticket'
import CreateTeamBox from './create-team-box'
import TicketBox from './ticket-box'

export const codeSchema = z.object({
  code: z
    .string()
    .min(1, {
      message: 'Please fill in the code',
    })
    .regex(/^(?<type>DEV|DES|PRO|GEN)_[A-Z0-9]{10}$/, {
      message: 'Must be in the format of (DEV|DES|PRO|GEN)_XXXXXXXXXX',
    }),
})

export type CodeSchema = z.infer<typeof codeSchema>

interface TicketFormProps {
  ticket1?: {
    id: HackathonTicket['id']
    ticketType: HackathonTicket['ticketType']
    expiredAt: HackathonTicketClaim['expiredAt']
  }
  ticket2?: {
    id: HackathonTicket['id']
    ticketType: HackathonTicket['ticketType']
    expiredAt: HackathonTicketClaim['expiredAt']
  }
}

const TicketForm: React.FC<TicketFormProps> = ({ ticket1, ticket2 }) => {
  const [showCreateTeamBox, setShowCreateTeamBox] = useState(false)

  useEffect(() => {
    if (!ticket1 || !ticket2) return

    setTimeout(() => setShowCreateTeamBox(true), 1500)
  }, [ticket1, ticket2])

  const code1Form = useForm<CodeSchema>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: '',
    },
  })

  const code2Form = useForm<CodeSchema>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: '',
    },
  })

  return (
    <AnimatePresence initial={false} mode='wait'>
      {!showCreateTeamBox ? (
        <motion.div
          key='ticketContainer'
          layout
          className='flex flex-col gap-10 md:flex-row lg:gap-24'
        >
          <AnimatePresence propagate initial={false} mode='wait'>
            {ticket1 ? (
              <ClaimedTicket
                key='claimedTicket1'
                expiredAt={ticket1.expiredAt}
                moveDirection='left'
                ticketType={ticket1.ticketType}
              />
            ) : (
              <TicketBox key='ticketBox1' form={code1Form} name='Ticket 1' />
            )}
            <div className='pointer-events-none fixed inset-0 z-10 flex items-center justify-center overflow-hidden'>
              <motion.div
                className='aspect-square h-[50vh] rounded-full opacity-0'
                exit={{
                  opacity: 1,
                  height: '250vh',
                  transition: { duration: 2.5, ease: 'easeInOut' },
                }}
                style={{
                  background:
                    'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0.00) 100%)',
                }}
              />
            </div>
          </AnimatePresence>
          <AnimatePresence propagate initial={false} mode='wait'>
            {ticket2 ? (
              <ClaimedTicket
                key='claimedTicket2'
                expiredAt={ticket2.expiredAt}
                moveDirection='right'
                ticketType={ticket2.ticketType}
              />
            ) : (
              <TicketBox key='ticketBox2' form={code2Form} name='Ticket 2' />
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <CreateTeamBox
          key='createTeamBox'
          ticket1={ticket1}
          ticket2={ticket2}
        />
      )}
    </AnimatePresence>
  )
}

export default TicketForm
