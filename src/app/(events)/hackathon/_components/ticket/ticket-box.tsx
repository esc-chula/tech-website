'use client'

import { type SubmitHandler, type UseFormReturn } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form'
import { useToast } from '~/hooks/use-toast'

import { type CodeSchema } from './ticket-form'

interface TicketFormProps {
  name: string
  form: UseFormReturn<CodeSchema>
  onSubmit: SubmitHandler<CodeSchema>
}

const TicketBox = ({ name, form, onSubmit }: TicketFormProps): JSX.Element => {
  const { toast } = useToast()

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col items-center gap-6 rounded-3xl border-2 border-white/40 bg-white/10 p-10 backdrop-blur-sm'
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          toast({
            title: errors.code?.message,
            description:
              'Must be in the format of (DEV|DES|PRO|GEN)-XXXXXXXXXX',
            variant: 'destructive',
          })
        })}
      >
        <h2 className='font-ndot47 text-6xl tracking-tighter text-white'>
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
                  className='w-full rounded-2xl border border-white bg-white/20 px-8 py-3.5 font-geistSans text-xl font-medium tracking-tighter text-white opacity-50 outline-none backdrop-blur-sm placeholder:text-white/50 focus-visible:border-white focus-visible:bg-white/20'
                  placeholder='Fill Your Ticket Code Here'
                />
              </FormControl>
              <FormMessage className='absolute' />
            </FormItem>
          )}
        />
        <button
          className='mt-2 rounded-full border-2 border-white/40 bg-white/20 px-8 py-2.5 tracking-tight opacity-50 backdrop-blur-sm hover:bg-white/25'
          type='submit'
        >
          Claim Ticket
        </button>
      </form>
    </Form>
  )
}

export default TicketBox
