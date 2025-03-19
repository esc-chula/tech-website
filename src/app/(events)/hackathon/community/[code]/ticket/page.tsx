import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  findMyRegistration,
  findMyTeamTicket,
} from '~/server/actions/hackathon'

import Building1Background from '../../../_components/common/bulding-1-background'
import CommunityTeamTicket from '../../../_components/ticket/community-team-ticket'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Community Ticket',
}

interface PageProps {
  params: {
    code: string
  }
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { code: communityCode } = params

  // TODO: find community ticket instead
  const resMyTeamTicket = await findMyTeamTicket()
  const resMyRegistration = await findMyRegistration()

  if (!resMyTeamTicket.success || !resMyRegistration.success) {
    return 'Something went wrong, please try again later...'
  }

  if (!resMyTeamTicket.data || !resMyRegistration.data) {
    return notFound()
  }

  return (
    <>
      <div className='flex min-h-dvh flex-col items-center gap-8 pb-24 pt-8'>
        <div className='mt-4 flex flex-col items-center gap-4'>
          <h1 className='text-center text-4xl font-semibold capitalize tracking-tighter text-white sm:text-5xl md:text-6xl'>
            Your Team Pass
          </h1>
        </div>
        <CommunityTeamTicket
          communityCode={communityCode}
          registration={resMyRegistration.data}
          teamTicket={resMyTeamTicket.data}
        />
      </div>
      <Building1Background />
    </>
  )
}

export default Page
