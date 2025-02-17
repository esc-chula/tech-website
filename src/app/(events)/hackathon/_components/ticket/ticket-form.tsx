'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createHackathonTeamTicket } from '~/server/actions/hackathon'
import {
  type HackathonTicket,
  type HackathonTicketClaim,
} from '~/types/hackathon'

import ClaimedTicket from './claimed-ticket'
import CreateTeamBox from './create-team-box'
import TicketBox from './ticket-box'

export const codeSchema = z.object({
  code: z.string().regex(/^(?<type>DEV|DES|PRO|GEN)_[A-Z0-9]{10}$/, {
    message: 'Invalid ticket code',
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
  const router = useRouter()
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

  const onCreateTeam = async (): Promise<void> => {
    if (!ticket1 || !ticket2) return
    try {
      await createHackathonTeamTicket([ticket1.id, ticket2.id])

      router.refresh()
    } catch (err) {
      console.error(err instanceof Error ? err.message : err)
    }
  }

  return (
    <AnimatePresence initial={false} mode='wait'>
      {!showCreateTeamBox ? (
        <motion.div
          key='ticketContainer'
          layout
          className='flex flex-col gap-24 sm:flex-row'
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
        <CreateTeamBox key='createTeamBox' onSubmit={onCreateTeam} />
      )}
    </AnimatePresence>
  )
}

export default TicketForm
