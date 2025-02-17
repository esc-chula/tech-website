import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import {
  findMyRegistration,
  getMyRegistrationIndex,
} from '~/server/actions/hackathon'

import Building1Background from '../../../_components/common/bulding-1-background'
import UserBox from '../../../_components/common/user-box'
import ShareStory from '../../../_components/success/share-story'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Registration Complete',
}

const Page: React.FC = async () => {
  const resMyRegistration = await findMyRegistration()
  if (!resMyRegistration.success || !resMyRegistration.data) {
    return redirect(
      `/hackathon/login?redirectUrl=/hackathon/registration/success`
    )
  }

  const resMyRegistrationIndex = await getMyRegistrationIndex()
  if (!resMyRegistrationIndex.success || resMyRegistrationIndex.data === -1) {
    return notFound()
  }

  return (
    <>
      <div className='flex min-h-dvh flex-col items-center gap-8 pb-24 pt-8 md:gap-10'>
        <UserBox />
        <div className='flex flex-col items-center gap-2 text-center md:gap-6'>
          <h1 className='text-4xl font-semibold md:text-5xl'>
            Registration Complete
          </h1>
          <p className='text-sm text-white/60'>
            Share your team to Instagram,
            <br />
            {`Don't forget to tag @intania.tech and your team!`}
          </p>
        </div>
        <ShareStory teamNo={resMyRegistrationIndex.data + 1} />
        <Link className='underline' href='/hackathon/ticket'>
          View your team ticket.
        </Link>
      </div>
      <Building1Background hideHackathonTitle />
    </>
  )
}

export default Page
