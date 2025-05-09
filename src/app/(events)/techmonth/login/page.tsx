'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

import { useToast } from '~/hooks/use-toast'
import { login } from '~/server/actions/techmonth'

const LoginPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback='Loading...'>
      <LoginPage />
    </Suspense>
  )
}

export default LoginPageWithSuspense

const LoginPage: React.FC = () => {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get('callbackUrl')

  const [loading, setLoading] = useState(false)

  const formHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const studentId = formData.get('studentId')

    const regex = /^6\d{7}21$/

    if (!regex.test(studentId as string)) {
      toast({
        title: 'Invalid student ID',
        description: 'Please enter a valid student ID',
        variant: 'destructive',
      })
      return
    }
    setLoading(true)

    await login(studentId as string)
    if (callbackUrl) {
      router.push(callbackUrl)
    } else {
      router.push('/techmonth/stamps')
    }
  }

  return (
    <main className='flex w-full flex-col items-center'>
      <div className='flex min-h-screen w-full max-w-screen-xl flex-col justify-center space-y-8 px-8 py-28 font-tiny5 md:px-16 xl:px-4'>
        <h2 className='text-left text-6xl uppercase md:text-5xl lg:text-8xl'>
          <span className='text-techmonth-green'>LOG</span>
          IN
        </h2>
        <form
          className='flex flex-col items-start justify-between'
          onSubmit={formHandler}
        >
          <input
            className='h-16 w-full border-4 border-techmonth-white bg-transparent p-4 text-2xl text-techmonth-white outline-none placeholder:text-techmonth-white lg:w-1/2'
            name='studentId'
            placeholder='Fill your student ID'
          />
          <button
            className='mt-40 bg-techmonth-yellow px-6 py-2 text-3xl text-techmonth-black duration-200 hover:translate-x-3'
            disabled={loading}
            type='submit'
          >
            {loading ? `LOADING...` : `GO gO Go ->`}
          </button>
        </form>
      </div>
    </main>
  )
}
