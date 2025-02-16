import { User } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

import { getSession } from '~/server/actions/auth'

import LogoutButton from './logout-button'

const UserBox: React.FC = async () => {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') ?? ''

  const res = await getSession()
  if (!res.success) {
    return (
      <div className='z-40 flex h-8 items-center gap-2'>
        <div className='flex h-full w-44 items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 backdrop-blur-sm'>
          <User className='opacity-50' size={20} />
          <span className='text-sm font-medium'>Hi, Hackers</span>
        </div>

        <Link
          className='h-full overflow-hidden rounded-full'
          href={`/hackathon/login?redirectUrl=${pathname}`}
        >
          <button
            className='h-full rounded-full bg-hackathon-primary px-5'
            type='button'
          >
            Login
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className='z-40 flex h-8 items-center gap-2'>
      <div className='flex h-full w-44 items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 backdrop-blur-sm'>
        <User className='opacity-50' size={20} />
        <span className='text-sm font-medium'>Hi, {res.data.studentId}</span>
      </div>
      <LogoutButton />
    </div>
  )
}

export default UserBox
