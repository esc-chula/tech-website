'use client'

import { motion } from 'framer-motion'
import { Info, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, type UseFormReturn } from 'react-hook-form'

import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
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

  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<CodeSchema> = async (values) => {
    try {
      setLoading(true)

      const res = await claimHackahonTicketWithRateLimit(values.code)

      if (!res.success) {
        toast({
          title: 'Error',
          description: res.message,
          variant: 'destructive',
        })

        if (res.message?.includes('Unauthorized')) {
          router.push('/hackathon/login?redirectUrl=/hackathon/ticket')
        }

        setLoading(false)

        return
      }

      if (!res.data.success) {
        form.setError('code', {
          type: 'manual',
          message: res.data.message ?? 'Invalid ticket code',
        })

        setLoading(false)

        return
      }

      setLoading(false)

      router.refresh()
    } catch (err) {
      setLoading(false)

      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : String(err),
        variant: 'destructive',
      })
    }
  }

  return (
    <motion.div className='flex aspect-[4/3] w-[320px] items-center gap-6 rounded-3xl border-2 border-white/40 p-6 backdrop-blur-sm sm:p-10 lg:w-[440px]'>
      <Form {...form}>
        <form
          className='flex h-full w-full flex-col items-center justify-center gap-3.5 sm:gap-6'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2 className='select-none text-center font-ndot47 text-4xl tracking-tighter text-white sm:text-5xl lg:text-6xl'>
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
                    className='w-full rounded-2xl border-2 border-white/10 bg-white/10 px-4 py-2 font-geistSans text-base font-medium tracking-tighter text-white outline-none backdrop-blur-sm placeholder:text-white/50 focus-visible:border-white/50 focus-visible:bg-white/20 md:px-6 md:py-3.5 md:text-xl'
                    placeholder='Fill Your Ticket Code Here'
                  />
                </FormControl>
                <div className='flex items-center gap-2'>
                  {form.formState.errors.code?.message ===
                  'Ticket already claimed by someone else' ? (
                    <Dialog modal>
                      <DialogTrigger asChild>
                        <button className='animate-bounce' type='button'>
                          <Info size={20} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className='w-4/5 rounded-2xl border-2 border-white/40 bg-white/10 px-10 py-8 backdrop-blur-md sm:w-full'>
                        <h2 className='select-none text-center font-ndot47 text-xl tracking-tighter sm:text-4xl'>
                          Claiming System
                        </h2>
                        <p>
                          When you claim a ticket, each ticket will have around
                          48 hours before it expires.
                        </p>
                        <p>
                          While the ticket is yours, no one else can claim it.
                        </p>
                        <p>
                          {`If it's expired, you cannot reclaim it and the ticket
                          will be available for others to claim if they have the
                          same code.`}
                        </p>
                      </DialogContent>
                    </Dialog>
                  ) : null}
                  <FormMessage className='text-xs lg:text-sm' />
                </div>
              </FormItem>
            )}
          />
          <button
            className='rounded-full border-2 border-white/20 bg-white/20 px-4 py-1.5 tracking-tight backdrop-blur-sm hover:bg-white/30 sm:px-8 sm:py-2.5'
            disabled={loading}
            type='submit'
          >
            {loading ? (
              <LoaderCircle className='animate-spin' />
            ) : (
              'Claim Ticket'
            )}
          </button>
        </form>
      </Form>
    </motion.div>
  )
}

export default TicketBox
