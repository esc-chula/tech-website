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

import TeamPass from './team-pass'

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
    <div className='flex flex-col items-center justify-center'>
      <motion.div
        className='relative flex items-center justify-center'
        transition={{ duration: 2, ease: 'easeInOut' }}
        animate={{
          scale: 1,
        }}
        initial={{
          scale: 1.25,
        }}
      >
        <TeamPass className='scale-50 duration-500 ease-in-out hover:scale-[0.52] active:scale-[1.02] sm:scale-90 sm:hover:scale-[0.92] md:scale-100 md:hover:scale-[1.02]' />

        <motion.div
          className='absolute -z-10 aspect-video rounded-[100%]'
          transition={{ duration: 2, ease: 'easeOut' }}
          animate={{
            opacity: 1,
            width: '80vw',
          }}
          initial={{
            opacity: 0,
            width: '0vw',
          }}
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(248, 248, 248, 0.20) 44%, rgba(102, 102, 102, 0.00) 100%)',
          }}
          whileInView={{
            width: ['65vw', '80vw', '65vw'],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
        />
        <motion.div
          className='absolute -z-10 aspect-video rounded-[100%]'
          transition={{ duration: 2, ease: 'easeOut' }}
          animate={{
            opacity: 1,
            width: '80vw',
          }}
          initial={{
            opacity: 0,
            width: '0vw',
          }}
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(248, 248, 248, 0.20) 44%, rgba(102, 102, 102, 0.00) 100%)',
          }}
          whileInView={{
            width: ['85vw', '100vw', '85vw'],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
        />
        <motion.div
          className='absolute -z-10 aspect-video rounded-[100%]'
          transition={{ duration: 2, ease: 'easeOut' }}
          animate={{
            opacity: 1,
            width: '100vw',
          }}
          initial={{
            opacity: 0,
            width: '0vw',
          }}
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(248, 200, 200, 0.20) 44%, rgba(102, 102, 102, 0.00) 100%)',
          }}
          whileInView={{
            width: ['85vw', '100vw', '85vw'],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
        />
      </motion.div>
      <button
        className='-mt-6 rounded-full border-2 border-white/40 bg-white/20 px-6 py-1.5 tracking-tight text-white backdrop-blur-sm hover:bg-white/25 sm:mt-2 sm:px-10 sm:py-2.5 md:mt-8'
        disabled={loading}
        type='button'
        onClick={onSubmit}
      >
        {loading ? <LoaderCircle className='animate-spin' /> : 'Register'}
      </button>
      <p className='pt-3 text-center text-xs text-white/50'>
        Expiration time is still counting,
        <br />
        click the button to secure your Team Pass!
      </p>
      <div className='pointer-events-none fixed inset-0 z-10 flex items-center justify-center overflow-hidden'>
        <motion.div
          className='aspect-square h-[50vh] rounded-full opacity-0'
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          animate={{
            height: '80vh',
            opacity: 0,
          }}
          initial={{
            height: '250vh',
            opacity: 1,
          }}
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0.00) 100%)',
          }}
        />
      </div>
    </div>
  )
}

export default CreateTeamBox
