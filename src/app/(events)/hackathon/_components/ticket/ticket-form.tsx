'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '~/hooks/use-toast'
import {
  claimHackahonTicketWithRateLimit,
  createHackathonTeamTicket,
} from '~/server/actions/hackathon'
import {
  type HackathonTicket,
  type HackathonTicketClaim,
} from '~/types/hackathon'
import { type Response } from '~/types/server'

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
  const { toast } = useToast()
  const router = useRouter()

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

  const onSubmit: SubmitHandler<CodeSchema> = async (values) => {
    try {
      const res = (await claimHackahonTicketWithRateLimit(
        values.code
      )) as Response<HackathonTicket>

      if (!res.success) {
        toast({
          title: 'Something went wrong',
          description: res.message,
          variant: 'destructive',
        })
        return
      }

      router.refresh()
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : String(err),
        variant: 'destructive',
      })
    }
  }

  const onCreateTeam = async (): Promise<void> => {
    if (!ticket1 || !ticket2) return
    try {
      await createHackathonTeamTicket([ticket1.id, ticket2.id])
    } catch (err) {
      console.error(err instanceof Error ? err.message : err)
    }
  }

  return (
    <div className='flex flex-col gap-24 sm:flex-row'>
      {ticket1 ? (
        <ClaimedTicket
          expiredAt={ticket1.expiredAt}
          ticketType={ticket1.ticketType}
        />
      ) : (
        <TicketBox form={code1Form} name='Ticket 1' onSubmit={onSubmit} />
      )}
      {ticket2 ? (
        <ClaimedTicket
          expiredAt={ticket2.expiredAt}
          ticketType={ticket2.ticketType}
        />
      ) : (
        <TicketBox form={code2Form} name='Ticket 2' onSubmit={onSubmit} />
      )}
      {ticket1 && ticket2 ? <CreateTeamBox onSubmit={onCreateTeam} /> : null}
    </div>
  )
}

export default TicketForm
