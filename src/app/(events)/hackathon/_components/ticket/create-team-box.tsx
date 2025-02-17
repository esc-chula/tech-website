'use client'

import { motion } from 'framer-motion'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { createHackathonTeamTicket } from '~/server/actions/hackathon'
import {
  type HackathonTicket,
  type HackathonTicketClaim,
} from '~/types/hackathon'


interface CreateTeamBoxProps {
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

const CreateTeamBox: React.FC<CreateTeamBoxProps> = ({ ticket1, ticket2 }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const onSubmit = async (): Promise<void> => {
    if (!ticket1 || !ticket2) return
    try {
      setLoading(true)

      await createHackathonTeamTicket([ticket1.id, ticket2.id])

      setLoading(false)

      router.push('/hackathon/registration')
    } catch (err) {
      console.error(err instanceof Error ? err.message : err)
    }
  }

  return (
    <motion.div
      className='flex aspect-[4/3] w-[320px] flex-col items-center justify-center rounded-3xl border-2 border-white/40 py-8 backdrop-blur-sm sm:py-12 lg:w-[440px]'
      transition={{ duration: 1.5, ease: 'easeOut' }}
      animate={{
        backgroundColor: 'rgba(0, 0, 0, 1)',
        scale: 1,
        boxShadow: `0 0 100px 80px rgba(255, 255, 255, 0.5)`,
      }}
      initial={{
        backgroundColor: 'rgba(255, 255, 255, 0)',
        scale: 1.25,
        boxShadow: `0 0 720px 600px rgba(255, 255, 255, 1)`,
      }}
    >
      <h2 className='select-none text-center font-ndot47 text-5xl font-normal tracking-tighter text-white sm:text-6xl'>
        Team
        <br />
        Ticket
      </h2>
      <button
        className='mt-4 rounded-full border-2 border-white/40 bg-white/20 px-6 py-1.5 tracking-tight text-white backdrop-blur-sm hover:bg-white/25 sm:mt-8 sm:px-10 sm:py-2.5'
        disabled={loading}
        type='button'
        onClick={onSubmit}
      >
        {loading ? <LoaderCircle className='animate-spin' /> : 'Register'}
      </button>
    </motion.div>
  )
}

export default CreateTeamBox
