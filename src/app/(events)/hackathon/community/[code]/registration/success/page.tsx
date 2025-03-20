import { type Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { isMobile } from '~/lib/is-mobile'
import {
  getCommunityRegistrationByCode,
  getHackathonCommunityTeamIndex,
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
  searchParams: {
    teamId?: string
  }
}

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const { code: communityCode } = params
  const { teamId } = searchParams

  if (!teamId) {
    // Redirect if no teamId was provided
    return redirect(`/hackathon/community/${communityCode}/registration`)
  }

  // Get community registration data using the code
  const resCommunityRegistration =
    await getCommunityRegistrationByCode(communityCode)

  if (!resCommunityRegistration.success) {
    return notFound()
  }

  // Check if the community has a team and if it matches the teamId from URL
  const { registration } = resCommunityRegistration.data
  const team = registration.team

  if (!team || team.publicId !== teamId) {
    return notFound()
  }

  const resTeamIndex = await getHackathonCommunityTeamIndex(teamId)
  const teamNo = resTeamIndex.success
    ? resTeamIndex.data + 1
    : parseInt(teamId.substring(0, 4), 16) || 999

  const userAgent = headers().get('user-agent') ?? ''
  const mobileCheck = isMobile(userAgent)

  return (
    <>
      <div className='flex min-h-dvh flex-col items-center gap-8 pb-24 pt-8 md:gap-10'>
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
          teamName={team.teamName}
          teamNo={teamNo}
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
