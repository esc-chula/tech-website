'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, type UseFormReturn } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form'
import { useToast } from '~/hooks/use-toast'
import { claimHackahonTicketWithRateLimit } from '~/server/actions/hackathon'

import { type CodeSchema } from './ticket-form'

interface TicketFormProps {
  name: string
  form: UseFormReturn<CodeSchema>
}

const TicketBox = ({ name, form }: TicketFormProps): JSX.Element => {
  const router = useRouter()

  const { toast } = useToast()

  const onSubmit: SubmitHandler<CodeSchema> = async (values) => {
    try {
      const res = await claimHackahonTicketWithRateLimit(values.code)

      if (!res.success) {
        toast({
          title: 'Rate Limit',
          description: res.message,
          variant: 'destructive',
        })
        return
      }

      if (!res.data.success) {
        form.setError('code', {
          type: 'manual',
          message: res.data.message ?? 'Invalid ticket code',
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

  return (
    <motion.div
      className='flex w-full items-center gap-6 rounded-3xl border-2 border-white/40 p-6 backdrop-blur-sm sm:p-10'
      animate={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
      exit={{
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 0 50px 50px rgba(255, 255, 255, 1)',
        transition: { duration: 1, ease: 'easeInOut' },
      }}
    >
      <Form {...form}>
        <form
          className='flex aspect-[4/3] w-full flex-col items-center justify-center gap-3.5 sm:gap-6'
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            toast({
              title: errors.code?.message,
              description:
                'Must be in the format of (DEV|DES|PRO|GEN)-XXXXXXXXXX',
              variant: 'destructive',
            })
          })}
        >
          <h2 className='font-ndot47 text-4xl tracking-tighter text-white sm:text-6xl'>
            {name}
          </h2>
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    {...field}
                    className='w-full rounded-2xl border border-white bg-white/20 px-4 py-2 font-geistSans text-base font-medium tracking-tighter text-white opacity-50 outline-none backdrop-blur-sm placeholder:text-white/50 focus-visible:border-white focus-visible:bg-white/20 sm:px-8 sm:py-3.5 sm:text-xl'
                    placeholder='Fill Your Ticket Code Here'
                  />
                </FormControl>
                <FormMessage className='absolute' />
              </FormItem>
            )}
          />
          <button
            className='rounded-full border-2 border-white/40 bg-white/20 px-4 py-1.5 tracking-tight opacity-50 backdrop-blur-sm hover:bg-white/25 sm:px-8 sm:py-2.5'
            type='submit'
          >
            Claim Ticket
          </button>
        </form>
      </Form>
    </motion.div>
  )
}

export default TicketBox
