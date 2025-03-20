import { type Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'

import { isMobile } from '~/lib/is-mobile'
import {
  getCommunityRegistrationByCode,
  getMyRegistrationIndex,
} from '~/server/actions/hackathon'

import Building1Background from '../../../../_components/common/bulding-1-background'
import ShareStory from '../../../../_components/success/share-story'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Registration Complete',
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
  const resTeamIndex = await getMyRegistrationIndex({ communityCode })

  if (
    !resRegistrationByCode.success ||
    !resRegistrationByCode.data.registration.team ||
    !resTeamIndex.success
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

  const userAgent = headers().get('user-agent') ?? ''
  const mobileCheck = isMobile(userAgent)

  return (
    <>
      <div className='flex min-h-dvh flex-col items-center gap-8 pb-24 pt-14 md:gap-10'>
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
        <ShareStory
          isMobile={mobileCheck}
          teamName={resRegistrationByCode.data.registration.team.teamName}
          teamNo={resTeamIndex.data + 1}
        />
        <Link
          className='text-center underline'
          href={`/hackathon/community/${communityCode}/ticket`}
        >
          View your Team Pass.
        </Link>
      </div>
      <Building1Background hideHackathonTitle />
    </>
  )
}

export default Page
