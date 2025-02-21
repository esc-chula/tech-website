'use client'

import { ChevronLeft, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useToast } from '~/hooks/use-toast'
import { deleteMyHackathonRegistration } from '~/server/actions/hackathon'

const RemoveRegistrationButton: React.FC = () => {
  const router = useRouter()

  const { toast } = useToast()

  const [loading, setLoading] = useState(false)

  return (
    <button
      className='flex items-center gap-1.5 rounded-xl border-2 border-white/10 bg-white/10 py-2 pl-4 pr-5 backdrop-blur-sm hover:bg-white/20'
      disabled={loading}
      type='button'
      onClick={() => {
        setLoading(true)
        deleteMyHackathonRegistration()
          .then(() => {
            router.push('/hackathon/ticket')
          })
          .catch(() => {
            console.error(
              'RemoveRegistrationButton, Failed to remove registration'
            )
            toast({
              title: 'Failed to remove registration',
              description: 'Please try again later',
              variant: 'destructive',
            })
          })
          .finally(() => {
            setLoading(false)
          })
      }}
    >
      {loading ? (
        <LoaderCircle className='animate-spin' />
      ) : (
        <>
          {' '}
          <ChevronLeft size={20} />
          <span>Back</span>
        </>
      )}
    </button>
  )
}

export default RemoveRegistrationButton
