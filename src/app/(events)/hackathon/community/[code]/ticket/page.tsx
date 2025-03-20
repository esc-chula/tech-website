import { type Metadata } from 'next'

import { getCommunityRegistrationByCode } from '~/server/actions/hackathon'

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

  const resRegistrationByCode =
    await getCommunityRegistrationByCode(communityCode)

  if (
    !resRegistrationByCode.success ||
    !resRegistrationByCode.data.registration.team
  ) {
    return (
      <>
        <div className='flex min-h-dvh flex-col items-center justify-center space-y-2'>
          <h1 className='text-2xl font-semibold'>Invalid Ticket</h1>
          <p className='text-sm text-white/60'>This ticket is not valid.</p>
        </div>
        <Building1Background />
      </>
    )
  }

  return (
    <>
      <div className='flex min-h-dvh flex-col items-center gap-8 pb-24 pt-14'>
        <div className='mt-4 flex flex-col items-center gap-4'>
          <h1 className='text-center text-4xl font-semibold capitalize tracking-tighter text-white sm:text-5xl md:text-6xl'>
            Your Team Pass
          </h1>
        </div>
        <CommunityTeamTicket
          communityCode={communityCode}
          communityRegistration={resRegistrationByCode.data}
        />
      </div>
      <Building1Background />
    </>
  )
}

export default Page
