import { type Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { isMobile } from '~/lib/is-mobile'
import {
  findMyRegistration,
  getMyRegistrationIndex,
} from '~/server/actions/hackathon'

import BackButton from '../../../../_components/common/back-button'
import Building1Background from '../../../../_components/common/bulding-1-background'
import ShareStory from '../../../../_components/success/share-story'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Share',
}

interface PageProps {
  params: {
    code: string
  }
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { code: communityCode } = params

  // TODO: find registration from code
  const resMyRegistration = await findMyRegistration()
  if (!resMyRegistration.success || !resMyRegistration.data) {
    return redirect(`/hackathon/login?redirectUrl=/hackathon/ticket/share`)
  }

  const resMyRegistrationIndex = await getMyRegistrationIndex()
  if (!resMyRegistrationIndex.success || resMyRegistrationIndex.data === -1) {
    return notFound()
  }

  const userAgent = headers().get('user-agent') ?? ''
  const mobileCheck = isMobile(userAgent)

  return (
    <>
      <BackButton />
      <div className='flex min-h-dvh flex-col items-center gap-8 pb-24 pt-8 md:gap-10'>
        <div className='flex flex-col items-center gap-2 text-center md:gap-6'>
          <h1 className='text-4xl font-semibold md:text-5xl'>Share</h1>
          <p className='text-sm text-white/60'>
            {`Don't forget to tag @intania.tech and your team!`}
          </p>
        </div>
        <ShareStory
          isMobile={mobileCheck}
          teamName={resMyRegistration.data.teamName}
          teamNo={resMyRegistrationIndex.data + 1}
        />
        <Link
          className='underline'
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
