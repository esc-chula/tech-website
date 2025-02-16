import { type Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Building1Background from '../../_components/common/bulding-1-background'
import LoginForm from '../../_components/login/login-form'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Login',
}

interface PageProps {
  searchParams: {
    redirectUrl?: string
  }
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
  const redirectUrl = searchParams.redirectUrl

  const cookieStore = cookies()
  const sid = cookieStore.get('sid')?.value

  if (sid) {
    redirect(redirectUrl ?? '/hackathon')
  }

  return (
    <>
      <div className='flex h-dvh flex-col items-center justify-center gap-6'>
        <h1 className='text-4xl font-semibold md:text-5xl'>Login</h1>
        <div className='flex max-w-80 flex-col gap-6 rounded-2xl border-2 border-white/40 px-6 py-6 md:px-10'>
          <p className='text-center text-sm text-white/90 md:text-base'>
            Please login with
            <br />
            CUNET of Intania Student
          </p>
          <LoginForm />
        </div>
      </div>
      <Building1Background />
    </>
  )
}

export default Page
