import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import LoginForm from '~/components/login/login-form'
import { Card } from '~/components/ui/card'

export const metadata: Metadata = {
  title: 'Intania Tech - Login',
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
    redirect(redirectUrl ?? '/')
  }

  return (
    <div className='flex items-center justify-center pt-40'>
      <Card className=''>
        <Suspense>
          <LoginForm />
        </Suspense>
      </Card>
    </div>
  )
}

export default Page
