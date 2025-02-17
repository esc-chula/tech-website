'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, LoaderCircle, UserIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form'
import { useToast } from '~/hooks/use-toast'
import { login } from '~/server/actions/auth'

const formSchema = z.object({
  studentId: z.string().length(10, {
    message: 'Student ID must be 10 characters',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

const LoginForm: React.FC = () => {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setLoading(true)

    const res = await login(values.studentId, values.password)

    if (!res.success) {
      console.error('LoginForm, failed to login: ', res.errors)

      toast({
        title: 'Failed to login',
        description: res.message ?? 'Something went wrong',
        variant: 'destructive',
      })

      setLoading(false)

      return
    }

    const redirectUrl = searchParams.get('redirectUrl')

    router.push(redirectUrl ?? '/hackathon')
  }

  return (
    <Form {...form}>
      <form
        className='flex flex-col items-center gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='studentId'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex rounded-xl border-2 border-white/10 bg-white/20 backdrop-blur-sm'>
                  <div className='py-3 pl-4 pr-3'>
                    <UserIcon className='text-white/50' />
                  </div>
                  <input
                    {...field}
                    className='w-full bg-transparent outline-none placeholder:text-white/50'
                    placeholder='Student ID'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex rounded-xl border-2 border-white/10 bg-white/20 backdrop-blur-sm'>
                  <div className='py-3 pl-4 pr-3'>
                    <KeyRound className='text-white/50' />
                  </div>
                  <input
                    {...field}
                    className='w-full bg-transparent outline-none placeholder:text-white/50'
                    placeholder='Password'
                    type='password'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          className='mt-2 rounded-full border-2 border-white/10 bg-white/20 px-8 py-1.5 backdrop-blur-sm hover:bg-white/25'
          disabled={loading}
          type='submit'
        >
          {loading ? (
            <LoaderCircle className='animate-spin opacity-50' />
          ) : (
            'Login'
          )}
        </button>
      </form>
    </Form>
  )
}

export default LoginForm
