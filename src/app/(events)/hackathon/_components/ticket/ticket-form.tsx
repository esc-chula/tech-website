'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '~/hooks/use-toast'
import { claimHackahonTicketWithRateLimit } from '~/server/actions/hackathon'
import { type HackathonTicket } from '~/types/hackathon'
import { type Response } from '~/types/server'

import ClaimedTicket from './claimed-ticket'
import TicketBox from './ticket-box'

export const codeSchema = z.object({
  code: z.string().regex(/^(?<type>DEV|DES|PRO|GEN)-[A-Z0-9]{10}$/, {
    message: 'Invalid ticket code',
  }),
})

export type CodeSchema = z.infer<typeof codeSchema>

const TicketForm: React.FC = () => {
  const { toast } = useToast()
  const [ticket1, setTicket1] = useState<HackathonTicket | null>(null)
  const [ticket2, setTicket2] = useState<HackathonTicket | null>(null)

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

  const handleSubmit = async (
    values: CodeSchema
  ): Promise<HackathonTicket | null> => {
    try {
      const res = (await claimHackahonTicketWithRateLimit(
        values.code
      )) as Response<HackathonTicket>
      console.log(res)

      if (!res.success) {
        toast({
          title: 'Something went wrong',
          description: res.message,
          variant: 'destructive',
        })
        return null
      }

      return res.data
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : String(err),
        variant: 'destructive',
      })
    }
    return null
  }

  const onSubmitTicket1: SubmitHandler<CodeSchema> = async (values) => {
    const ticket = await handleSubmit(values)
    if (!ticket) return
    setTicket1(ticket)
  }

  const onSubmitTicket2: SubmitHandler<CodeSchema> = async (values) => {
    const ticket = await handleSubmit(values)
    if (!ticket) return
    setTicket2(ticket)
  }

  return (
    <div className='flex flex-col gap-24 sm:flex-row'>
      {ticket1 ? (
        <ClaimedTicket
          expiredAt={new Date('17-02-2025')}
          ticketType={ticket1.ticketType}
        />
      ) : (
        <TicketBox
          form={code1Form}
          name='Ticket 1'
          onSubmit={onSubmitTicket1}
        />
      )}
      {ticket2 ? (
        <ClaimedTicket
          expiredAt={new Date('17-02-2025')}
          ticketType={ticket2.ticketType}
        />
      ) : (
        <TicketBox
          form={code2Form}
          name='Ticket 2'
          onSubmit={onSubmitTicket2}
        />
      )}
    </div>
  )
}

export default TicketForm
